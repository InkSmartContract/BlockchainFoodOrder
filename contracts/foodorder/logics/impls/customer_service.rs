pub use crate::{
    ensure,
    impls::types::{
        Customer, CustomerId, Data, DeliveryId, DeliveryStatus, FoodId, FoodOrderError, Order,
        OrderId, OrderStatus, RestaurantId,
    },
    traits::customer_service::*,
    traits::payment_service::*,
};
use ink::prelude::{string::String, vec::Vec};
use openbrush::{contracts::ownable::*, modifier_definition, modifiers, traits::Storage};

use super::types::{CustomerResult, DeliveryResult, OrderResult};

/// Customer Events Definition
pub trait CustomerServiceEvents {
    fn emit_submit_order_event(
        &self,
        order_id: OrderId,
        food_id: FoodId,
        restaurant_id: RestaurantId,
        customer_id: CustomerId,
        delivery_address: String,
        phone_number: String,
    );

    fn emit_accept_delivery_event(&self, delivery_id: DeliveryId, order_id: OrderId);
}

/// Implementation of Customer Service
impl<T> CustomerService for T
where
    T: Storage<Data> + Storage<ownable::Data>,
{
    /// Customer's function.
    /// Function that adds a new customer.
    default fn add_customer(
        &mut self,
        customer_name: String,
        customer_address: String,
        phone_number: String,
    ) -> CustomerResult {
        let customer_account = T::env().caller();
        ensure!(customer_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(
            customer_address.len() > 0,
            FoodOrderError::InvalidAddressLength
        );
        ensure!(
            phone_number.len() > 0,
            FoodOrderError::InvalidPhoneNumberLength
        );

        // Make a new customer struct and insert it into storage
        let customer = Customer {
            customer_account,
            customer_name,
            customer_address,
            phone_number,
        };
        let customer_id = self.data::<Data>().customer_id;
        self.data::<Data>().customer_id += 1;
        self.data::<Data>()
            .customers
            .insert(&customer_id, &customer);
        self.data::<Data>()
            .customer_account_id
            .insert(&customer_account, &customer_id);

        // Return CustomerResult with a created customer_id
        Ok(customer_id)
    }

    /// Customer's function.
    /// Function taht request an order.
    #[modifiers(is_customer_user)]
    default fn submit_order(&mut self, food_id: FoodId, delivery_address: String) -> OrderResult {
        let customer_account = T::env().caller();
        let price = T::env().transferred_value();

        ensure!(
            self.data::<Data>().food_data.contains(&food_id),
            FoodOrderError::FoodNotExist
        );
        ensure!(
            delivery_address.len() > 0,
            FoodOrderError::InvalidAddressLength
        );
        ensure!(
            price
                == self
                    .data::<Data>()
                    .food_data
                    .get(&food_id)
                    .unwrap()
                    .price
                    .into(),
            FoodOrderError::NotSamePrice
        );

        // Create an Order and insert it into storage.
        let customer_id = self
            .data::<Data>()
            .customer_account_id
            .get(&customer_account)
            .unwrap();
        let restaurant_id = self
            .data::<Data>()
            .food_data
            .get(&food_id)
            .unwrap()
            .restaurant_id;
        let phone_number = self
            .data::<Data>()
            .customers
            .get(&customer_id)
            .unwrap()
            .phone_number;
        let order = Order {
            food_id,
            restaurant_id,
            customer_id,
            courier_id: 0,
            delivery_address: delivery_address.clone(),
            status: OrderStatus::OrderSubmitted,
            timestamp: T::env().block_timestamp(),
            price,
            eta: 0,
        };
        let order_id = self.data::<Data>().order_id;
        self.data::<Data>().order_id += 1;
        self.data::<Data>().order_data.insert(&order_id, &order);

        // Emit an SubmitOrderEvent
        self.emit_submit_order_event(
            order_id,
            food_id,
            restaurant_id,
            customer_id,
            delivery_address,
            phone_number,
        );

        // Insert it into customer_order_data storage
        let mut customer_vec = self
            .data::<Data>()
            .customer_order_data
            .get(&customer_id)
            .unwrap_or(Vec::new());
        customer_vec.push(order_id);
        self.data::<Data>()
            .customer_order_data
            .insert(&customer_id, &customer_vec);

        // Insert it into restaurant_order_data storage
        let mut restaurant_vec = self
            .data::<Data>()
            .restaurant_order_data
            .get(&restaurant_id)
            .unwrap_or(Vec::new());
        restaurant_vec.push(order_id);
        self.data::<Data>()
            .restaurant_order_data
            .insert(&restaurant_id, &restaurant_vec);

        // Return a success OrderResult with a created order_id
        Ok(order_id)
    }

    /// Customer's function.
    /// Function that confirm a delivery.
    #[modifiers(is_customer_user)]
    default fn accept_delivery(&mut self, delivery_id: DeliveryId) -> DeliveryResult {
        let customer_account = T::env().caller();
        ensure!(
            self.data::<Data>().delivery_data.contains(&delivery_id),
            FoodOrderError::DeliveryNotExist
        );

        let customer_id = self
            .data::<Data>()
            .customer_account_id
            .get(&customer_account)
            .unwrap();
        let order_id = self
            .data::<Data>()
            .delivery_data
            .get(&delivery_id)
            .unwrap()
            .order_id;
        ensure!(
            self.data::<Data>()
                .order_data
                .get(&order_id)
                .unwrap()
                .status
                == OrderStatus::FoodDelivered,
            FoodOrderError::OrderStatusNotDelivered
        );
        ensure!(
            self.data::<Data>()
                .order_data
                .get(&order_id)
                .unwrap()
                .customer_id
                == customer_id,
            FoodOrderError::CallerIsNotCustomerOrder
        );

        // Change order status from `FoodDelivered` to `DeliveryAcceptted`
        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        let status = OrderStatus::DeliveryAcceptted;
        order.status = status;
        self.data::<Data>().order_data.insert(&order_id, &order);

        // Emit `AcceptDeliveryEvent`
        self.emit_accept_delivery_event(order_id, delivery_id);

        // Change delivery status from 'PickUp' to 'Accept'
        let mut delivery = self.data::<Data>().delivery_data.get(&delivery_id).unwrap();
        let delivery_status = DeliveryStatus::Accepted;
        delivery.status = delivery_status;
        self.data::<Data>()
            .delivery_data
            .insert(&delivery_id, &delivery);

        // Transfer money to courier.
        PaymentService::transfer_courier(self, delivery_id)
    }
}

/// Courier Event Initation
impl<T> CustomerServiceEvents for T
where
    T: Storage<Data>,
{
    default fn emit_submit_order_event(
        &self,
        _order_id: OrderId,
        _food_id: FoodId,
        _restaurant_id: RestaurantId,
        _customer_id: CustomerId,
        _delivery_address: String,
        _phone_number: String,
    ) {
    }

    default fn emit_accept_delivery_event(&self, _delivery_id: DeliveryId, _order_id: OrderId) {}
}

/// modifier to check customer user
#[modifier_definition]
pub fn is_customer_user<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Data>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<FoodOrderError>,
{
    ensure!(
        instance
            .data()
            .customer_account_id
            .contains(&T::env().caller()),
        FoodOrderError::CallerIsNotCustomer,
    );
    body(instance)
}
