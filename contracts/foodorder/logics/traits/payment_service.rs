use crate::impls::{
    types::{
        OrderId,
        OrderResult,
        DeliveryResult,
    },
};

/// Payment Service Definition
#[openbrush::trait_definition]
pub trait PaymentService {
    fn transfer_restaurant(
        &self,
        order_id: OrderId,
    ) -> OrderResult;

    fn transfer_courier(
        &self,
        delivery_id: OrderId,
    ) -> DeliveryResult;
}