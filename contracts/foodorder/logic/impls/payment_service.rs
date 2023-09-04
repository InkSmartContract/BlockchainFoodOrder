use openbrush::traits::{Storage, AccountId, Balance};

use crate::impls::data::{Data, FoodOrderError};

pub trait PaymentServiceImpl: Storage<Data> {
    /// Function to transfer native tokens to specific account
    fn transfer_to(&self, account: AccountId, amount: Balance) -> Result<(), FoodOrderError> {
        if Self::env().transfer(account, amount).is_err() {
            return Err(FoodOrderError::NotTransfered)
        }
        Ok(())
    }
}