use openbrush::{traits::Storage, contracts::ownable::*};

pub use crate::{
    ensure,
    impls::data::{Courier, CourierId, Data, FoodOrderError},
};

use openbrush::modifiers;

#[openbrush::trait_definition]
pub trait ManagerServiceImpl: Storage<Data> + Storage<ownable::Data>
{
    /// Function to change fee rate of contract
    #[ink(message)]
    #[modifiers(only_owner)]
    fn change_fee_rate(&mut self, rate: u8) -> Result<(), FoodOrderError> {
        ensure!(rate > 0 && rate < 100, FoodOrderError::InvalidRate);
        self.data::<Data>().fee_rate = rate;
        Ok(())
    }
}