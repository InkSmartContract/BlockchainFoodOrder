use crate::impls::{
    types::{
        Food,
        Order,
        Delivery,
        FoodId,
        OrderId,
        DeliveryId,
        CustomerId,
        RestaurantId,
        CourierId,
        Restaurant,
        Courier,
        Customer,
        FoodOrderError,
    },
};
use ink::prelude::vec::Vec;
use openbrush::traits::AccountId;

// Get Service Definition
#[openbrush::trait_definition]
pub trait GetService {
    // Function that get eta deadline using order identifier.
    #[ink(message)]
    fn get_eta(&self, order_id: OrderId) -> Result<u64, FoodOrderError>;

    // Function that get order information using order identifier.
    #[ink(message)]
    fn get_order_from_id(&self, order_id: OrderId) -> Result<Order, FoodOrderError>;

    // Function that get all order information placed in a restaurant.
    #[ink(message)]
    fn get_order_from_restaurant(&self, restaurant_id: RestaurantId) -> Result<Vec<Order>, FoodOrderError>;

    // Function that get all order information placed by customers.
    #[ink(message)]
    fn get_order_from_customer(&self, customer_id: CustomerId) -> Result<Vec<Order>, FoodOrderError>;

    // Function that get all orders from A to B.
    #[ink(message)]
    fn get_order_all(&self, from: u64, to: u64) -> Result<Vec<Order>, FoodOrderError>;

    // Function that get food information using food identifier.
    #[ink(message)]
    fn get_food_from_id(&self, food_id: FoodId) -> Result<Food, FoodOrderError>;

    // Function that get all food information posted by the restaurant.
    #[ink(message)]
    fn get_food_from_restaurant(&self, restaurant_id: RestaurantId) -> Result<Vec<Food>, FoodOrderError>;

    // Function that get all food information from A to B.
    #[ink(message)]
    fn get_food_all(&self, from: u64, to: u64) -> Result<Vec<Food>, FoodOrderError>;

    // Function that get delivery information using delivery identifier.
    #[ink(message)]
    fn get_delivery_from_id(&self, delivery_id: DeliveryId) -> Result<Delivery, FoodOrderError>;

    // Function that get all delivery information ordered form the forwarder.
    #[ink(message)]
    fn get_delivery_from_courier(&self, courier_id: CourierId) -> Result<Vec<Delivery>, FoodOrderError>;

    // Function that get all delivery information requested by restaurant.
    #[ink(message)]
    fn get_delivery_from_restaurant(&self, restaurant_id: RestaurantId) -> Result<Vec<Delivery>, FoodOrderError>;

    // Function taht get all delivery information delivered to customer.
    #[ink(message)]
    fn get_delivery_from_customer(&self, customer_id: CustomerId) -> Result<Vec<Delivery>, FoodOrderError>;

    // Function that get all delivery information.
    #[ink(message)]
    fn get_delivery_all(&self, from: u64, to: u64) -> Result<Vec<Delivery>, FoodOrderError>;

    // Function that get all restaurant information.
    #[ink(message)]
    fn get_restaurant_all(&self, from: u64, to:u64) -> Result<Vec<Restaurant>, FoodOrderError>;

    // Function that get all courier information.
    #[ink(message)]
    fn get_courier_all(&self, from: u64, to: u64) -> Result<Vec<Courier>, FoodOrderError>;

    // Function that get all customer information.
    #[ink(message)]
    fn get_customer_all(&self, from: u64, to: u64) -> Result<Vec<Customer>, FoodOrderError>;

    // Function that get manager account
    #[ink(message)]
    fn get_owner(&self) -> AccountId;

    // Function that get fee rate
    #[ink(message)]
    fn get_fee_rate(&self) -> u32;
}
