use openbrush::{traits::Storage, contracts::ownable::*};
use ink::prelude::vec::Vec;

pub use crate::{
    ensure,
    impls::data::{Courier, CourierId, Order, OrderId, Delivery, DeliveryId, Data, FoodOrderError},
};

use openbrush::modifiers;
use core::cmp::{max, min};

#[openbrush::trait_definition]
pub trait ManagerServiceImpl: Storage<Data> + OwnableImpl
{
    /// Function to change fee rate of contract
    #[ink(message)]
    #[modifiers(only_owner)]
    fn change_fee_rate(&mut self, rate: u8) -> Result<(), FoodOrderError> {
        ensure!(rate > 0 && rate < 100, FoodOrderError::InvalidRate);
        self.data::<Data>().fee_rate = rate;
        Ok(())
    }

    #[ink(message)]
    fn get_fee_rate(&mut self) -> Result<u8, FoodOrderError> {
        Ok(self.data::<Data>().fee_rate)
    }

    #[ink(message)]
    fn get_order(&mut self, order_id: OrderId) -> Result<Order, FoodOrderError> {
        ensure!(self.data::<Data>().order_data.contains(&order_id), FoodOrderError::NotExist);

        Ok(self.data::<Data>().order_data.get(&order_id).unwrap())
    }

    #[ink(message)]
    fn get_order_all(&mut self, from: OrderId, to: OrderId) -> Result<Vec<Order>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);
        ensure!(from < self.data::<Data>().order_id, FoodOrderError::InvalidParameters);

        let mut order_list: Vec<Order> = Vec::new();
        let start = max(1, from);
        let end = min(self.data::<Data>().order_id, to);

        for i in start..end {
            if self.data::<Data>().order_data.contains(&i) {
                order_list.push(self.data::<Data>().order_data.get(&i).unwrap());
            }
        }

        Ok(order_list)
    }

    #[ink(message)]
    fn get_delivery(&mut self, delivery_id: DeliveryId) -> Result<Delivery, FoodOrderError> {
        ensure!(self.data::<Data>().delivery_data.contains(&delivery_id), FoodOrderError::NotExist);

        Ok(self.data::<Data>().delivery_data.get(&delivery_id).unwrap())
    }

    #[ink(message)]
    fn get_delivery_all(&mut self, from: DeliveryId, to: DeliveryId) -> Result<Vec<Delivery>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);
        ensure!(from < self.data::<Data>().delivery_id, FoodOrderError::InvalidParameters);

        let mut delivery_list: Vec<Delivery> = Vec::new();
        let start = max(1, from);
        let end = min(self.data::<Data>().delivery_id, to);

        for i in start..end {
            if self.data::<Data>().delivery_data.contains(&i) {
                delivery_list.push(self.data::<Data>().delivery_data.get(&i).unwrap());
            }
        }

        Ok(delivery_list)
    }
}