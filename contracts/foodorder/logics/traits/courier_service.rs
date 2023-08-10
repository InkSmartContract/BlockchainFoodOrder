use crate::impls::{
    types::{
        DeliveryId, 
        DeliveryResult, 
    },
};

/// Courier Service Definition
#[openbrush::trait_definition]
pub trait CourierService {
    #[ink(message)]
    fn pickup_delivery(
        &mut self,
        delivery_id: DeliveryId,
    ) -> DeliveryResult;
}
