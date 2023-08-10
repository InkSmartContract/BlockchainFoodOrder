pub use crate::{
    ensure,
    impls::types::{
        DeliveryId, 
        CourierId,
        Data,
        FoodOrderError,
        OrderStatus,
        DeliveryStatus,
    },
    traits::courier_service::*,
};
use openbrush::{
    contracts::ownable::*,
    traits::Storage,
    modifiers, modifier_definition,
};

use super::types::{
    DeliveryResult,
};

//// Courier Event Definition
pub trait CourierServiceEvents {
    fn emit_pickup_delivery_event (
        &self,
        delivery_id: DeliveryId,
        courier_id: CourierId,
    );
}

/// Implementation of Courier Service 
impl<T> CourierService for T
where
    T: Storage<Data> + Storage<ownable::Data>,
{
    /// Courier's function.
    /// Function that pick up the delivery requested by restaurant.
    #[modifiers(is_courier_user)]
    default fn pickup_delivery(
        &mut self,
        delivery_id: DeliveryId,
    ) -> DeliveryResult {
        let courier_account = T::env().caller();
        ensure!(self.data::<Data>().delivery_data.contains(&delivery_id), FoodOrderError::DeliveryNotExist);
        ensure!(self.data::<Data>().delivery_data.get(&delivery_id).unwrap().status == DeliveryStatus::Waiting, FoodOrderError::DeliveryStatusNotWaiting);

        // Change Delivery Status from `Waiting` to `PickUp`
        let mut delivery = self.data::<Data>().delivery_data.get(&delivery_id).unwrap();
        let courier_id = self.data::<Data>().courier_account_id.get(&courier_account).unwrap();
        let status = DeliveryStatus::PickedUp;
        delivery.courier_id = courier_id;
        delivery.status = status;
        self.data::<Data>().delivery_data.insert(&delivery_id, &delivery);

        // Change Order's CourierId
        let order_id = self.data::<Data>().delivery_data.get(&delivery_id).unwrap().order_id;
        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        order.courier_id = courier_id;
        self.data::<Data>().order_data.insert(&order_id, &order);

        // Emit `PickUpDeliveryEvent`
        self.emit_pickup_delivery_event(delivery_id, courier_id);

        // Return DeliveryResult with delivery_id
        Ok(delivery_id)
    }
}

/// Courier Event Initation
impl<T> CourierServiceEvents for T
where
    T: Storage<Data>,
{
    default fn emit_pickup_delivery_event(&self, _delivery_id: DeliveryId, _courier_id: CourierId) {}
}

/// modifier to check courier user
#[modifier_definition]
pub fn is_courier_user<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Data>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<FoodOrderError>,
{
    ensure!(
        instance.data().courier_account_id.contains(&T::env().caller()),
        FoodOrderError::CallerIsNotCourier,
    );
    body(instance)
}