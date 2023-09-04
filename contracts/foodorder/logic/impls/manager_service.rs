use openbrush::traits::Storage;

pub use crate::{
    ensure,
    impls::data::{Courier, CourierId, Data, FoodOrderError},
};

#[openbrush::trait_definition]
pub trait ManagerServiceImpl: Storage<Data> 
{
    /// Function to change fee rate of contract
    #[ink(message)]
    fn change_fee_rate(&mut self, rate: u8) -> Result<(), FoodOrderError> {
        ensure!(rate > 0 && rate < 100, FoodOrderError::InvalidRate);
        self.data::<Data>().fee_rate = rate;
        Ok(())
    }
}