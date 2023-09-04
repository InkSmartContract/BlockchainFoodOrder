use crate::impls::data::{DeliveryId, CourierId, Courier, FoodOrderError};

#[openbrush::trait_definition]
pub trait CourierService {

    /// Function that adds a courier
    #[ink(message)]
    fn create_courier(&mut self, courier_name: String, courier_address: String, phone_number: String) -> Result<CourierId, FoodOrderError>;

    /// Function that gets a courier
    #[ink(message)]
    fn read_courier(&self) -> Result<Courier, FoodOrderError>;

    /// Function that gets a courier from given id
    #[ink(message)]
    fn read_courier_from_id(&self, courier_id: CourierId) -> Result<Courier, FoodOrderError>;

    /// Function that gets couriers from given scope
    #[ink(message)]
    fn read_courier_all(&self, from: CourierId, to: CourierId) -> Result<Vec<Courier>, FoodOrderError>;

    /// Function that updates a courier
    #[ink(message)]
    fn update_courier(&mut self, courier_name: String, courier_address: String, phone_number: String) -> Result<(), FoodOrderError>;

    /// Function that deletes a courier
    #[ink(message)]
    fn delete_courier(&mut self) -> Result<(), FoodOrderError>;

    /// Function that a courier picks up food at a restaurant for delivery
    #[ink(message)]
    fn pickup_delivery(&mut self, delivery_id: DeliveryId) -> Result<DeliveryId, FoodOrderError>;
}