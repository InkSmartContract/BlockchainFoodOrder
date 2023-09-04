use ink::prelude::string::String;
use openbrush::traits::Balance;

use crate::impls::data::{FoodId, Food, FoodOrderError, RestaurantId, Restaurant, OrderId};

#[openbrush::trait_definition]
pub trait RestaurantService {

    /// Function that create a food
    #[ink(message)]
    fn create_food(&mut self, food_name: String, food_description: String, food_price: Balance, food_eta: u64) -> Result<FoodId, FoodOrderError>;

    /// Function that reads a food from given id
    #[ink(message)]
    fn read_food(&self, food_id: FoodId) -> Result<Food, FoodOrderError>;

    /// Function that reads foods from given scope
    #[ink(message)]
    fn read_food_all(&self, from: FoodId, to: FoodId) -> Result<Vec<Food>, FoodOrderError>;

    /// Function that updates a food
    #[ink(message)]
    fn update_food(&mut self, food_id: FoodId, food_name: String, food_description: String, food_price: Balance, food_eta: u64) -> Result<(), FoodOrderError>;

    /// Function that deletes a food
    #[ink(message)]
    fn delete_food(&mut self, food_id: FoodId) -> Result<(), FoodOrderError>;

    /// Function that create a restaurant account
    #[ink(message)]
    fn create_restaurant(&mut self, restaurant_name: String, restaurant_address: String, phone_number: String) -> Result<RestaurantId, FoodOrderError>;

    /// Function that read a restaurant infomation
    #[ink(message)]
    fn read_restaurant(&self) -> Result<Restaurant, FoodOrderError>;
    
    /// Function that read a restaurant from given id
    #[ink(message)]
    fn read_restaurant_from_id(&self, restaurant_id: RestaurantId) -> Result<Restaurant, FoodOrderError>;

    /// Function that read restaurants from given scope
    #[ink(message)]
    fn read_restaurant_all(&self, from: RestaurantId, to: RestaurantId) -> Result<Vec<Restaurant>, FoodOrderError>;
    
    /// Function that updates a restaurant
    #[ink(message)]
    fn update_restaurant(&mut self, restaurant_name: String, restaurant_address: String, restaurant_data: String) -> Result<(), FoodOrderError>;

    /// Function that delete a restaurant
    #[ink(message)]
    fn delete_restaurant(&mut self) -> Result<(), FoodOrderError>;

    /// Function that a restaurant confirms an order
    #[ink(message)]
    fn confirm_order(&mut self, order_id: OrderId, eta: u64) -> Result<OrderId, FoodOrderError>;

    /// Function that a restaurant finishes cooking of an order
    #[ink(message)]
    fn finish_cook(&mut self, order_id: OrderId) -> Result<OrderId, FoodOrderError>;

    /// Function that a restaurant delivers an order
    #[ink(message)]
    fn deliver_order(&mut self, order_id: OrderId) -> Result<OrderId, FoodOrderError>;
}