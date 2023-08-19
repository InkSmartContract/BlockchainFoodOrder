use crate::impls::types::{CustomerResult, DeliveryId, DeliveryResult, FoodId, OrderResult};
use ink::prelude::string::String;

/// Customer Service Definition
#[openbrush::trait_definition]
pub trait CustomerService {
    /// Function that customer registers
    #[ink(message)]
    fn add_customer(
        &mut self,
        customer_name: String,
        customer_address: String,
        phone_number: String,
    ) -> CustomerResult;

    /// Function that customer submits an order
    #[ink(message, payable)]
    fn submit_order(&mut self, food_id: FoodId, delivery_address: String) -> OrderResult;

    /// Function that customer accepts food delivery by courier 
    #[ink(message)]
    fn accept_delivery(&mut self, delivery_id: DeliveryId) -> DeliveryResult;
}
