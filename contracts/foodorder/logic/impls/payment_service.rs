pub use crate::{
    ensure,
    impls::types::{Data, DeliveryId, FoodOrderError, OrderId},
    traits::payment_service::*,
    transfer_from_contract_to_account,
};
use openbrush::{contracts::ownable::*, traits::Storage};

use super::types::{DeliveryResult, OrderResult};

/// Implementation of Payment Service
impl<T> PaymentService for T
where
    T: Storage<Data> + Storage<ownable::Data>,
{
    /// Function that transfer money to restaurant.
    default fn transfer_restaurant(&self, order_id: OrderId) -> OrderResult {
        let restaurant_id = self
            .data::<Data>()
            .order_data
            .get(&order_id)
            .unwrap()
            .restaurant_id;
        let restaurant_account = self
            .data::<Data>()
            .restaurants
            .get(&restaurant_id)
            .unwrap()
            .restaurant_account;
        let _price = self.data::<Data>().order_data.get(&order_id).unwrap().price;
        let courier_amount = _price / (self.data::<Data>().fee_rate as u128);
        let restaurant_amount = _price - courier_amount;

        // if T::env().transfer(restaurant_account, restaurant_amount).is_err() {
        //     return core::prelude::v1::Err(FoodOrderError::NotTransfered)
        // } else {
        //     Ok(order_id)
        // }
        transfer_from_contract_to_account!(restaurant_account, restaurant_amount);
        Ok(order_id)

    }

    /// Function that transfer money to courier.
    default fn transfer_courier(&self, delivery_id: DeliveryId) -> DeliveryResult {
        let order_id = self
            .data::<Data>()
            .delivery_data
            .get(&delivery_id)
            .unwrap()
            .order_id;
        let _price = self.data::<Data>().order_data.get(&order_id).unwrap().price;
        let courier_amount = _price / (self.data::<Data>().fee_rate as u128);
        let courier_id = self
            .data::<Data>()
            .delivery_data
            .get(&delivery_id)
            .unwrap()
            .courier_id;
        let courier_account = self
            .data::<Data>()
            .couriers
            .get(&courier_id)
            .unwrap()
            .courier_account;

        // if T::env().transfer(courier_account, courier_amount).is_err() {
        //     return core::prelude::v1::Err(FoodOrderError::NotTransfered)
        // } else {
        //     Ok(delivery_id)
        // }
        transfer_from_contract_to_account!(courier_account, courier_amount);
        Ok(delivery_id)
    }
}
