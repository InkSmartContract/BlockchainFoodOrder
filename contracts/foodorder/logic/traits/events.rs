use crate::impls::data::{OrderId, DeliveryId, CourierId};
use openbrush::traits::AccountId;

pub trait FoodOrderEvents {
    /// Function that emits SubmitOrderEvent
    fn emit_submit_order_event(&self, order_id: OrderId, customer_account: AccountId);

    /// Function that emits ConfirmOrderEvent
    fn emit_confirm_order_event(&self, order_id: OrderId, eta: u64);

    /// Function that emits ReqeustDeliveryEvent
    fn emit_request_delivery_event(&self, delivery_id: DeliveryId, order_id: OrderId);

    /// Function that emits FinishCookEvent
    fn emit_finish_cook_event(&self, order_id: OrderId);

    /// Function that emits PickupDeliveryEvent
    fn emit_pickup_delivery_event(&self, delivery_id: DeliveryId, courier_id: CourierId);

    /// Function that emits DeliverFoodEvent
    fn emit_deliver_food_event(&self, order_id: OrderId);

    /// Function that emits AcceptDeliveryEvent
    fn emit_accept_delivery_event(&self, delivery_id: DeliveryId, order_id: OrderId);
}