use crate::impls::types::{DeliveryId, DeliveryResult};

/// Courier Service Definition
#[openbrush::trait_definition]
pub trait CourierService {
    /// Function that a courier picks up food at a restaurant for delivery
    #[ink(message)]
    fn pickup_delivery(&mut self, delivery_id: DeliveryId) -> DeliveryResult;
}
