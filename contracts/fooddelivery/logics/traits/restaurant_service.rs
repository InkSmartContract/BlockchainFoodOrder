use crate::impls::{
    types::{
        FoodId, 
        OrderId, 
        FoodResult, 
        OrderResult, 
    },
};
use ink::prelude::string::String;
use openbrush::traits::Balance;

// Restaurant Service Definition
#[openbrush::trait_definition]
pub trait RestaurantService {

    #[ink(message)]
    fn add_food(
        &mut self, 
        food_name: String,
        description: String,
        price: Balance,
        eta: u64,
    ) -> FoodResult;

    #[ink(message)]
    fn update_food(
        &mut self, 
        food_id: FoodId,
        food_name: String,
        description: String,
        price: Balance,
        eta: u64,
    ) -> FoodResult;

    #[ink(message)]
    fn confirm_order(
        &mut self,
        order_id: OrderId,
        eta: u64
    ) -> OrderResult;

    #[ink(message)]
    fn finish_cook(
        &mut self,
        order_id: OrderId,
    ) -> OrderResult;

    #[ink(message)]
    fn deliver_order(
        &mut self,
        order_id: OrderId,
    ) -> OrderResult;
}
