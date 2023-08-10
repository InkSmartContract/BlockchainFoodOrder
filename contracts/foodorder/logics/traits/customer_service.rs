use crate::impls::{
    types::{
        FoodId, 
        DeliveryId, 
        OrderResult, 
        DeliveryResult, 
        CustomerResult, 
    },
};
use ink::prelude::string::String;

/// Customer Service Definition
#[openbrush::trait_definition]
pub trait CustomerService {
    #[ink(message)]
    fn add_customer(
        &mut self,
        customer_name: String,
        customer_address: String,
        phone_number: String,
    ) -> CustomerResult;

    #[ink(message, payable)]
    fn submit_order(
        &mut self, 
        food_id: FoodId,
        delivery_address: String,
    ) -> OrderResult;

    #[ink(message)]
    fn accept_delivery(
        &mut self, 
        delivery_id: DeliveryId,
    ) -> DeliveryResult;
}
