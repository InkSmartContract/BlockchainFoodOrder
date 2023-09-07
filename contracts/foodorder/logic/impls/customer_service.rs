use crud_macro::{create_item, read_item, read_item_from_id, read_item_all, update_item, delete_item};
use openbrush::traits::Storage;
use ink::prelude::{vec::Vec, string::String};

use crate::{
    ensure,
    impls::data::{
        Data, CustomerId, Customer, FoodOrderError, FoodId, DeliveryId, OrderId, Order, OrderStatus, DeliveryStatus
    },
    impls::payment_service::PaymentServiceImpl,
    traits::events::FoodOrderEvents,
};

use openbrush::{modifiers, modifier_definition};

use core::cmp::{max, min};

#[openbrush::trait_definition]
pub trait CustomerServiceImpl: Storage<Data> + FoodOrderEvents + PaymentServiceImpl
{
    /// Function to create a customer
    /// Use create_item procedure macro for Customer
    #[ink(message)]
    #[create_item(Customer)]
    fn create_customer(&mut self, customer_name: String, customer_address: String, phone_number: String) -> Result<CustomerId, FoodOrderError> {
        // **

        // Comments below are current expanded code from the create_item macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // ensure!(customer_name.len() > 0, FoodOrderError::InvalidNameLength);
        // ensure!(customer_address.len() > 0, FoodOrderError::InvalidAddressLength);
        // ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        // let customer_account = Self::env().caller();

        // ensure!(!self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::AlreadyExist);

        // let customer_id = self.data::<Data>().customer_id;
        // let customer = Customer {
        //     customer_id,
        //     customer_account,
        //     customer_name,
        //     customer_address,
        //     phone_number,
        // };
        // self.data::<Data>().customer_id += 1;
        // self.data::<Data>().customer_data.insert(&customer_account, &customer);
        // self.data::<Data>().customer_accounts.insert(&customer_id, &customer_account);
        
        // Ok(customer_id)
    }

    /// Function to read a customer
    /// Use read_item procedure macro for Customer
    #[ink(message)]
    #[read_item(Customer)]
    fn read_customer(&self) -> Result<Customer, FoodOrderError> {
        // **

        // Comments below are current expanded code from the read_item macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // let customer_account = Self::env().caller();

        // ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::NotExist);

        // Ok(self.data::<Data>().customer_data.get(&customer_account).unwrap())
    }

    /// Function to read a customer from id
    /// Use read_item_from_id procedure macro for Customer
    #[ink(message)]
    #[read_item_from_id(Customer)]
    fn read_customer_from_id(&self, customer_id: CustomerId) -> Result<Customer, FoodOrderError> {
        // **

        // Comments below are current expanded code from the read_item_from_id macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // ensure!(self.data::<Data>().customer_accounts.contains(&customer_id), FoodOrderError::NotExist);
        
        // let customer_account = self.data::<Data>().customer_accounts.get(&customer_id).unwrap();

        // Ok(self.data::<Data>().customer_data.get(&customer_account).unwrap())
    }

    /// Function to read customers from given scope
    /// Use read_item_all procedure macro for Customer
    #[ink(message)]
    #[read_item_all(Customer)]
    fn read_customer_all(&self, from: CustomerId, to: CustomerId) -> Result<Vec<Customer>, FoodOrderError> {
        // **

        // Comments below are current expanded code from the read_item_all macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // ensure!(from < to, FoodOrderError::InvalidParameters);
        // ensure!(from < self.data::<Data>().customer_id, FoodOrderError::InvalidParameters);

        // let mut customer_list: Vec<Customer> = Vec::new();
        // let start = max(1, from);
        // let end = min(self.data::<Data>().customer_id, to);

        // for i in start..end {
        //     if self.data::<Data>().customer_accounts.contains(&i) {
        //         let customer_account = self.data::<Data>().customer_accounts.get(&i).unwrap();
        //         customer_list.push(self.data::<Data>().customer_data.get(&customer_account).unwrap())
        //     }
        // }

        // Ok(customer_list)
    }

    /// Function to update a customer
    /// Use update_item procedure macro for Customer
    #[ink(message)]
    #[update_item(Customer)]
    #[modifiers(is_customer)]
    fn update_customer(&mut self, customer_name: String, customer_address: String, phone_number: String) -> Result<(), FoodOrderError> {
        // **

        // Comments below are current expanded code from the update_item macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // ensure!(customer_name.len() > 0, FoodOrderError::InvalidNameLength);
        // ensure!(customer_address.len() > 0, FoodOrderError::InvalidAddressLength);
        // ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        // let customer_account = Self::env().caller();

        // ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::NotExist);
        
        // let mut customer =  self.data::<Data>().customer_data.get(&customer_account).unwrap();
        // customer.customer_name = customer_name;
        // customer.customer_address = customer_address;
        // customer.phone_number = phone_number;

        // self.data::<Data>().customer_data.insert(&customer_account, &customer);

        // Ok(())
    }

    /// Function to delete a customer
    /// Use delete_item procedure macro for Customer
    #[ink(message)]
    #[delete_item(Customer)]
    #[modifiers(is_customer)]
    fn delete_customer(&mut self) -> Result<(), FoodOrderError> {
        // **

        // Comments below are current expanded code from the delete_item macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // let customer_account = Self::env().caller();

        // ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::NotExist);

        // let customer = self.data::<Data>().customer_data.get(&customer_account).unwrap();

        // self.data::<Data>().customer_data.remove(&customer_account);
        // self.data::<Data>().customer_accounts.remove(&customer.customer_id);

        // Ok(())
    }

    /// Function that a customer submits an order
    #[ink(message, payable)]
    #[modifiers(is_customer)]
    fn submit_order(&mut self, food_id: FoodId, delivery_address: String) -> Result<OrderId, FoodOrderError> {
        let customer_account = Self::env().caller();
        let price = Self::env().transferred_value();

        // ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::NotExist);
        ensure!(self.data::<Data>().food_data.contains(&food_id), FoodOrderError::FoodNotExist);
        ensure!(delivery_address.len() > 0, FoodOrderError::InvalidAddressLength);
        ensure!(price == self.data::<Data>().food_data.get(&food_id).unwrap().food_price.into(), FoodOrderError::NotSamePrice);

        let customer_id = self.data::<Data>().customer_data.get(&customer_account).unwrap().customer_id;
        let restaurant_id = self.data::<Data>().food_data.get(&food_id).unwrap().restaurant_id;

        let order_id = self.data::<Data>().order_id;
        let order = Order {
            order_id,
            food_id,
            restaurant_id,
            customer_id,
            courier_id: 0,
            delivery_id: 0,
            delivery_address,
            status: OrderStatus::OrderSubmitted,
            timestamp: Self::env().block_timestamp(),
            price,
            eta: 0,
        };
        self.data::<Data>().order_id += 1;
        self.data::<Data>().order_data.insert(&order_id, &order);

        self.emit_submit_order_event(order_id, customer_account);

        Ok(order_id)

    }

    /// Function that a customer accepts its delivery
    #[ink(message)]
    #[modifiers(is_customer)]
    fn accept_delivery(&mut self, delivery_id: DeliveryId) -> Result<DeliveryId, FoodOrderError> {
        let customer_account = Self::env().caller();

        // ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::NotExist);
        ensure!(self.data::<Data>().delivery_data.contains(&delivery_id), FoodOrderError::DeliveryNotExist);

        let customer_id = self.data::<Data>().customer_data.get(&customer_account).unwrap().customer_id;
        let order_id = self.data::<Data>().delivery_data.get(&delivery_id).unwrap().order_id;

        ensure!(self.data::<Data>().order_data.get(&delivery_id).unwrap().status == OrderStatus::FoodDelivered, FoodOrderError::OrderStatusNotDelivered);
        ensure!(self.data::<Data>().delivery_data.get(&order_id).unwrap().status == DeliveryStatus::PickedUp, FoodOrderError::DeliveryStatusNotPickUp);
        ensure!(self.data::<Data>().order_data.get(&order_id).unwrap().customer_id == customer_id, FoodOrderError::CallerIsNotCustomerOrder);

        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        order.status = OrderStatus::DeliveryAccepted;
        self.data::<Data>().order_data.insert(&order_id, &order);

        let mut delivery = self.data::<Data>().delivery_data.get(&delivery_id).unwrap();
        delivery.status = DeliveryStatus::Accepted;
        self.data::<Data>().delivery_data.insert(&delivery_id, &delivery);

        self.emit_accept_delivery_event(delivery_id, order_id);

        // Transfer money to courier.
        let courier_account = self.data::<Data>().courier_accounts.get(&delivery.courier_id).unwrap();
        let amount = order.price / (self.data::<Data>().fee_rate as u128);
        
        PaymentServiceImpl::transfer_to(self, courier_account, amount).expect("Err");

        Ok(delivery_id)
    }
}


#[modifier_definition]
pub fn is_customer<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Data>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<FoodOrderError>,
{
    ensure!(
        instance
            .data()
            .customer_data
            .contains(&T::env().caller()),
        FoodOrderError::NotExist,
    );
    body(instance)
}