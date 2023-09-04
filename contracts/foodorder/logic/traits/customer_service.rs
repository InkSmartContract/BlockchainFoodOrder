
use crate::impls::data::{CustomerId, OrderId, DeliveryId, Customer, FoodOrderError, FoodId};

#[openbrush::trait_definition]
pub trait CustomerService {
    /// Function that adds a customer
    #[ink(message)]
    fn create_customer(&mut self, customer_name: String, customer_address: String, phone_number: String) -> Result<CustomerId, FoodOrderError>;

    /// Function that gets a customer
    #[ink(message)]
    fn read_customer(&self) -> Result<Customer, FoodOrderError>;

    /// Function that gets a customer from id
    #[ink(message)]
    fn read_customer_from_id(&self, customer_id: CustomerId) -> Result<Customer, FoodOrderError>;

    /// Function that gets customers from given scope
    #[ink(message)]
    fn read_customer_all(&self, from: CustomerId, to: CustomerId) -> Result<Vec<Customer>, FoodOrderError>;

    /// Function that updates a customer
    #[ink(message)]
    fn update_customer(&mut self, customer_name: String, customer_address: String, phone_number: String) -> Result<(), FoodOrderError>;

    /// Function that deletes a customer
    #[ink(message)]
    fn delete_customer(&mut self) -> Result<(), FoodOrderError>;

    /// Function that a customer submits an order
    #[ink(message, payable)]
    fn submit_order(&mut self, food_id: FoodId, delivery_address: String) -> Result<OrderId, FoodOrderError>;

    /// Function that a customer accepts its delivery
    #[ink(message)]
    fn accept_delivery(&mut self, delivery_id: DeliveryId) -> Result<DeliveryId, FoodOrderError>;
}