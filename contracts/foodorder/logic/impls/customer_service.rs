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

use core::cmp::{max, min};

#[openbrush::trait_definition]
pub trait CustomerServiceImpl: Storage<Data> + FoodOrderEvents + PaymentServiceImpl
{
    /// Function to create a customer
    #[ink(message)]
    fn create_customer(&mut self, customer_name: String, customer_address: String, phone_number: String) -> Result<CustomerId, FoodOrderError> {
        ensure!(customer_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(customer_address.len() > 0, FoodOrderError::InvalidAddressLength);
        ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        let customer_account = Self::env().caller();

        ensure!(!self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::CustomerAlreadyExist);

        let customer_id = self.data::<Data>().customer_id;
        let customer = Customer {
            customer_id,
            customer_account,
            customer_name,
            customer_address,
            phone_number,
        };
        self.data::<Data>().customer_id += 1;
        self.data::<Data>().customer_data.insert(&customer_account, &customer);
        self.data::<Data>().customer_accounts.insert(&customer_id, &customer_account);
        
        Ok(customer_id)
    }

    /// Function to read a customer
    #[ink(message)]
    fn read_customer(&self) -> Result<Customer, FoodOrderError> {
        let customer_account = Self::env().caller();

        ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::CustomerNotExist);

        Ok(self.data::<Data>().customer_data.get(&customer_account).unwrap())
    }

    /// Function to read a customer from id
    #[ink(message)]
    fn read_customer_from_id(&self, customer_id: CustomerId) -> Result<Customer, FoodOrderError> {
        ensure!(self.data::<Data>().customer_accounts.contains(&customer_id), FoodOrderError::CustomerNotExist);
        
        let customer_account = self.data::<Data>().customer_accounts.get(&customer_id).unwrap();

        Ok(self.data::<Data>().customer_data.get(&customer_account).unwrap())
    }

    /// Function to read customers from given scope
    #[ink(message)]
    fn read_customer_all(&self, from: CustomerId, to: CustomerId) -> Result<Vec<Customer>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);
        ensure!(from < self.data::<Data>().customer_id, FoodOrderError::InvalidParameters);

        let mut customer_list: Vec<Customer> = Vec::new();
        let start = max(1, from);
        let end = min(self.data::<Data>().customer_id, to);

        for i in start..end {
            if self.data::<Data>().customer_accounts.contains(&i) {
                let customer_account = self.data::<Data>().customer_accounts.get(&i).unwrap();
                customer_list.push(self.data::<Data>().customer_data.get(&customer_account).unwrap())
            }
        }

        Ok(customer_list)
    }

    /// Function to update a customer
    #[ink(message)]
    fn update_customer(&mut self, customer_name: String, customer_address: String, phone_number: String) -> Result<(), FoodOrderError> {
        ensure!(customer_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(customer_address.len() > 0, FoodOrderError::InvalidAddressLength);
        ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        let customer_account = Self::env().caller();

        ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::CustomerNotExist);
        
        let mut customer =  self.data::<Data>().customer_data.get(&customer_account).unwrap();
        customer.customer_name = customer_name;
        customer.customer_address = customer_address;
        customer.phone_number = phone_number;

        self.data::<Data>().customer_data.insert(&customer_account, &customer);

        Ok(())
    }

    /// Function to delete a customer
    #[ink(message)]
    fn delete_customer(&mut self) -> Result<(), FoodOrderError> {
        let customer_account = Self::env().caller();

        ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::CustomerNotExist);

        let customer = self.data::<Data>().customer_data.get(&customer_account).unwrap();

        self.data::<Data>().customer_data.remove(&customer_account);
        self.data::<Data>().customer_accounts.remove(&customer.customer_id);

        Ok(())
    }

    /// Function that a customer submits an order
    #[ink(message, payable)]
    fn submit_order(&mut self, food_id: FoodId, delivery_address: String) -> Result<OrderId, FoodOrderError> {
        let customer_account = Self::env().caller();
        let price = Self::env().transferred_value();

        ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::CustomerNotExist);
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
    fn accept_delivery(&mut self, delivery_id: DeliveryId) -> Result<DeliveryId, FoodOrderError> {
        let customer_account = Self::env().caller();

        ensure!(self.data::<Data>().customer_data.contains(&customer_account), FoodOrderError::CustomerNotExist);
        ensure!(self.data::<Data>().delivery_data.contains(&delivery_id), FoodOrderError::DeliveryNotExist);

        let customer_id = self.data::<Data>().customer_data.get(&customer_account).unwrap().customer_id;
        let order_id = self.data::<Data>().delivery_data.get(&delivery_id).unwrap().order_id;

        ensure!(self.data::<Data>().order_data.get(&order_id).unwrap().status == OrderStatus::FoodDelivered, FoodOrderError::OrderStatusNotDelivered);
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