pub use crate::{
    ensure,
    impls::types::{
        Courier, CourierId, Customer, CustomerId, Data, Delivery, DeliveryId, DeliveryStatus, Food,
        FoodId, FoodOrderError, Order, OrderId, OrderStatus, Restaurant, RestaurantId,
    },
    traits::payment_service::*,
    traits::restaurant_service::*,
};
use crud_macro::*;
use ink::prelude::{string::String, vec::Vec};
use openbrush::{
    contracts::ownable::*,
    modifier_definition, modifiers,
    traits::{Balance, Storage},
};

use super::types::{FoodResult, OrderResult};

/// Restaurant Events Definition
pub trait RestaurantServiceEvents {
    fn emit_add_food_event(
        &self,
        food_id: FoodId,
        food_name: String,
        restaurant_id: RestaurantId,
        description: String,
        price: Balance,
        eta: u64,
    );

    fn emit_update_food_event(
        &self,
        food_id: FoodId,
        food_name: String,
        description: String,
        price: Balance,
        eta: u64,
    );

    fn emit_confirm_order_event(&self, order_id: OrderId, eat: u64);

    fn emit_request_delivery_event(
        &self,
        order_id: OrderId,
        restaurant_id: RestaurantId,
        customer_id: CustomerId,
        delivery_address: String,
        eat: u64,
    );

    fn emit_finish_cook_event(&self, order_id: OrderId);

    fn emit_deliver_food_event(
        &self,
        order_id: OrderId,
        restaurant_id: RestaurantId,
        customer_id: CustomerId,
        courier_id: CourierId,
    );
}

/// Implementation of Restaurant Service
impl<T> RestaurantService for T
where
    T: Storage<Data> + Storage<ownable::Data>,
{
    /// Restaurant's function.
    /// Function that add new food with information.
    #[create_food]
    #[modifiers(is_restaurant_user)]
    fn add_food(
        &mut self,
        food_name: String,
        description: String,
        price: Balance,
        eta: u64,
    ) -> FoodResult {
        // Emit `AddFoodEvent`
        self.emit_add_food_event(
            food_id,
            food.food_name,
            restaurant_id,
            food.description,
            price,
            eta,
        );
    }

    /// Restaurant's function.
    /// Function that update the food inforamtion using food_id.
    #[update_food]
    #[modifiers(is_restaurant_user)]
    fn update_food(
        &mut self,
        food_id: FoodId,
        food_name: String,
        description: String,
        price: Balance,
        eta: u64,
    ) -> FoodResult {
        // Emit `UpdateFoodEvent`
        self.emit_update_food_event(food_id, food_name.clone(), description.clone(), price, eta);
    }

    /// Restaurant's function.
    /// Function that confirm the order requested by customer.
    #[modifiers(is_restaurant_user)]
    default fn confirm_order(&mut self, order_id: OrderId, eta: u64) -> OrderResult {
        let restaurant_account = T::env().caller();

        let restaurant_id = self
            .data::<Data>()
            .restaurant_account_id
            .get(&restaurant_account)
            .unwrap();
        ensure!(
            self.data::<Data>().order_data.contains(&order_id),
            FoodOrderError::OrderNotExist
        );

        let food_id = self
            .data::<Data>()
            .order_data
            .get(&order_id)
            .unwrap()
            .food_id;
        ensure!(
            self.data::<Data>()
                .food_data
                .get(&food_id)
                .unwrap()
                .restaurant_id
                == restaurant_id,
            FoodOrderError::CallerIsNotRestaurantOrder
        );

        // Change order status from `OrderSubmitted` to `OrderConfirmed`
        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        let status = OrderStatus::OrderConfirmed;
        order.status = status;
        order.eta = eta;
        self.data::<Data>().order_data.insert(&order_id, &order);

        // Emit `ConfirmOrderEvent`
        self.emit_confirm_order_event(order_id, eta);

        // Request delivery
        // Create a new delivery data and insert it into storage
        let delivery_id = self.data::<Data>().delivery_id;
        self.data::<Data>().delivery_id += 1;
        let customer_id = self
            .data::<Data>()
            .order_data
            .get(&order_id)
            .unwrap()
            .customer_id;
        let delivery_address = self
            .data::<Data>()
            .order_data
            .get(&order_id)
            .unwrap()
            .delivery_address;

        let delivery = Delivery {
            order_id,
            restaurant_id,
            customer_id,
            courier_id: 0,
            delivery_address: delivery_address.clone(),
            status: DeliveryStatus::Waiting,
            timestamp: T::env().block_timestamp(),
        };
        self.data::<Data>()
            .delivery_data
            .insert(&delivery_id, &delivery);

        let mut restaurant_delivery_vec = self
            .data::<Data>()
            .restaurant_delivery_data
            .get(&restaurant_id)
            .unwrap_or(Vec::new());
        restaurant_delivery_vec.push(delivery_id);
        self.data::<Data>()
            .restaurant_delivery_data
            .insert(&restaurant_id, &restaurant_delivery_vec);

        let mut customer_delivery_vec = self
            .data::<Data>()
            .customer_delivery_data
            .get(&customer_id)
            .unwrap_or(Vec::new());
        customer_delivery_vec.push(delivery_id);
        self.data::<Data>()
            .customer_delivery_data
            .insert(&customer_id, &customer_delivery_vec);

        // Emit `RequestDeliveryEvent`
        self.emit_request_delivery_event(
            order_id,
            restaurant_id,
            customer_id,
            delivery_address,
            eta,
        );

        // Return with a confirmed order event
        Ok(order_id)
    }

    /// Restaurant's function.
    /// Function that finish cook.
    #[modifiers(is_restaurant_user)]
    default fn finish_cook(&mut self, order_id: OrderId) -> OrderResult {
        let restaurant_account = T::env().caller();
        ensure!(
            self.data::<Data>()
                .order_data
                .get(&order_id)
                .unwrap()
                .restaurant_id
                == self
                    .data::<Data>()
                    .restaurant_account_id
                    .get(&restaurant_account)
                    .unwrap(),
            FoodOrderError::CallerIsNotRestaurantOrder
        );
        ensure!(
            self.data::<Data>().order_data.contains(&order_id),
            FoodOrderError::OrderNotExist
        );
        ensure!(
            self.data::<Data>()
                .order_data
                .get(&order_id)
                .unwrap()
                .status
                == OrderStatus::OrderConfirmed,
            FoodOrderError::OrderStatusNotConfirmed
        );

        // Change order status from `OrderConfirmed` to `FoodPrepared`
        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        let status = OrderStatus::FoodPrepared;
        order.status = status;
        self.data::<Data>().order_data.insert(&order_id, &order);

        // Emit `FinishCookEvent`
        self.emit_finish_cook_event(order_id);

        // Pay money to Restaurant
        PaymentService::transfer_restaurant(self, order_id)
    }

    default fn deliver_order(&mut self, order_id: OrderId) -> OrderResult {
        let restaurant_account = T::env().caller();
        ensure!(
            self.data::<Data>()
                .restaurant_account_id
                .contains(&restaurant_account),
            FoodOrderError::CallerIsNotRestaurant
        );
        ensure!(
            self.data::<Data>()
                .order_data
                .get(&order_id)
                .unwrap()
                .restaurant_id
                == self
                    .data::<Data>()
                    .restaurant_account_id
                    .get(&restaurant_account)
                    .unwrap(),
            FoodOrderError::CallerIsNotRestaurantOrder
        );
        ensure!(
            self.data::<Data>().order_data.contains(&order_id),
            FoodOrderError::OrderNotExist
        );
        ensure!(
            self.data::<Data>()
                .order_data
                .get(&order_id)
                .unwrap()
                .status
                == OrderStatus::FoodPrepared,
            FoodOrderError::OrderStatusNotPrepared
        );
        ensure!(
            self.data::<Data>()
                .order_data
                .get(&order_id)
                .unwrap()
                .courier_id
                != 0,
            FoodOrderError::DeliveryStatusNotPickUp
        );

        // Change Order Status from `FoodPrepared` to `FoodDelivered` and Emit an `DeliveryOrderEvent`
        let order_status = OrderStatus::FoodDelivered;
        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        order.status = order_status;
        self.data::<Data>().order_data.insert(&order_id, &order);

        // Emit `DeliverFoodEvent`
        let restaurant_id = self
            .data::<Data>()
            .order_data
            .get(&order_id)
            .unwrap()
            .restaurant_id;
        let customer_id = self
            .data::<Data>()
            .order_data
            .get(&order_id)
            .unwrap()
            .customer_id;
        let courier_id = self
            .data::<Data>()
            .order_data
            .get(&order_id)
            .unwrap()
            .courier_id;
        self.emit_deliver_food_event(order_id, restaurant_id, customer_id, courier_id);

        // Return with a order id
        Ok(order_id)
    }
}

/// Restaurant Event Initation
impl<T> RestaurantServiceEvents for T
where
    T: Storage<Data>,
{
    default fn emit_add_food_event(
        &self,
        _food_id: FoodId,
        _food_name: String,
        _restaurant_id: RestaurantId,
        _description: String,
        _price: Balance,
        _eta: u64,
    ) {
    }

    default fn emit_update_food_event(
        &self,
        _food_id: FoodId,
        _food_name: String,
        _description: String,
        _price: Balance,
        _eta: u64,
    ) {
    }

    default fn emit_confirm_order_event(&self, _order_id: OrderId, _eta: u64) {}

    default fn emit_request_delivery_event(
        &self,
        _order_id: OrderId,
        _restaurant_id: RestaurantId,
        _customer_id: CustomerId,
        _delivery_address: String,
        _eat: u64,
    ) {
    }

    default fn emit_finish_cook_event(&self, _order_id: OrderId) {}

    default fn emit_deliver_food_event(
        &self,
        _order_id: OrderId,
        _restaurant_id: RestaurantId,
        _customer_id: CustomerId,
        _courier_id: CourierId,
    ) {
    }
}

/// modifier to check restaurant user
#[modifier_definition]
pub fn is_restaurant_user<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Data>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<FoodOrderError>,
{
    ensure!(
        instance
            .data()
            .restaurant_account_id
            .contains(&T::env().caller()),
        FoodOrderError::CallerIsNotRestaurant,
    );
    body(instance)
}
