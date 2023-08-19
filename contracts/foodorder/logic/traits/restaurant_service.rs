use crate::impls::types::{FoodId, FoodResult, OrderId, OrderResult};
use ink::prelude::string::String;
use openbrush::traits::Balance;

/// Restaurant Service Definition
#[openbrush::trait_definition]
pub trait RestaurantService {
    /// Function that add a food item to the restaurant menu
    #[ink(message)]
    fn add_food(
        &mut self,
        food_name: String,
        description: String,
        price: Balance,
        eta: u64,
    ) -> FoodResult;

    /// Function that update a food item to the restaurant menu
    #[ink(message)]
    fn update_food(
        &mut self,
        food_id: FoodId,
        food_name: String,
        description: String,
        price: Balance,
        eta: u64,
    ) -> FoodResult;

    /// Function that restaurant confirms an order    
    #[ink(message)]
    fn confirm_order(&mut self, order_id: OrderId, eta: u64) -> OrderResult;

    /// Function that restaurant finished cooking food for an order
    #[ink(message)]
    fn finish_cook(&mut self, order_id: OrderId) -> OrderResult;

    /// Function that restaurant advance the order status to be delivered
    #[ink(message)]
    fn deliver_order(&mut self, order_id: OrderId) -> OrderResult;
}
