use crate::impls::types::{
    Courier, CourierId, Customer, CustomerId, Delivery, DeliveryId, Food, FoodId, FoodOrderError,
    Order, OrderId, Restaurant, RestaurantId,
};
use ink::prelude::vec::Vec;
use openbrush::traits::AccountId;

/// Get Service Definition
#[openbrush::trait_definition]
pub trait GetService {
    /// Function to get food delivery ETA given an order identifier
    #[ink(message)]
    fn get_eta(&self, order_id: OrderId) -> Result<u64, FoodOrderError>;

    /// Function to get order information given an order identifier
    #[ink(message)]
    fn get_order_from_id(&self, order_id: OrderId) -> Result<Order, FoodOrderError>;

    /// Function to list all orders placed for a restaurant
    #[ink(message)]
    fn get_order_from_restaurant(
        &self,
        restaurant_id: RestaurantId,
    ) -> Result<Vec<Order>, FoodOrderError>;

    /// Function to list all orders placed by a customer
    #[ink(message)]
    fn get_order_from_customer(
        &self,
        customer_id: CustomerId,
    ) -> Result<Vec<Order>, FoodOrderError>;

    /// Function to list all orders from order id1 to order id2 for display pagination 
    #[ink(message)]
    fn get_order_all(&self, from: u64, to: u64) -> Result<Vec<Order>, FoodOrderError>;

    /// Function to get food information given a food identifier
    #[ink(message)]
    fn get_food_from_id(&self, food_id: FoodId) -> Result<Food, FoodOrderError>;

    /// Function to list menu items from a restaurant.
    #[ink(message)]
    fn get_food_from_restaurant(
        &self,
        restaurant_id: RestaurantId,
    ) -> Result<Vec<Food>, FoodOrderError>;

    /// Function to list all menu items from food id1 to food id2 for display pagination
    #[ink(message)]
    fn get_food_all(&self, from: u64, to: u64) -> Result<Vec<Food>, FoodOrderError>;

    /// Function to get delivery information given delivery identifier
    #[ink(message)]
    fn get_delivery_from_id(&self, delivery_id: DeliveryId) -> Result<Delivery, FoodOrderError>;

    /// Function to list all deliveries by a courier
    #[ink(message)]
    fn get_delivery_from_courier(
        &self,
        courier_id: CourierId,
    ) -> Result<Vec<Delivery>, FoodOrderError>;

    /// Function to list all deliveries requested by a restaurant
    #[ink(message)]
    fn get_delivery_from_restaurant(
        &self,
        restaurant_id: RestaurantId,
    ) -> Result<Vec<Delivery>, FoodOrderError>;

    /// Function to list all deliveries to a customer
    #[ink(message)]
    fn get_delivery_from_customer(
        &self,
        customer_id: CustomerId,
    ) -> Result<Vec<Delivery>, FoodOrderError>;

    /// Function to list all deliveries
    #[ink(message)]
    fn get_delivery_all(&self, from: u64, to: u64) -> Result<Vec<Delivery>, FoodOrderError>;

    /// Function to list all restaurants
    #[ink(message)]
    fn get_restaurant_all(&self, from: u64, to: u64) -> Result<Vec<Restaurant>, FoodOrderError>;

    /// Function to list all couriers
    #[ink(message)]
    fn get_courier_all(&self, from: u64, to: u64) -> Result<Vec<Courier>, FoodOrderError>;

    /// Function to list all customers
    #[ink(message)]
    fn get_customer_all(&self, from: u64, to: u64) -> Result<Vec<Customer>, FoodOrderError>;

    /// Function to list manager account
    #[ink(message)]
    fn get_owner(&self) -> AccountId;

    /// Function to get courier charge rate
    #[ink(message)]
    fn get_fee_rate(&self) -> u32;
}
