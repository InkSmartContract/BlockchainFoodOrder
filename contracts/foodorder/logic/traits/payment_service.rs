use openbrush::traits::{AccountId, Balance};
use crate::impls::data::FoodOrderError;

#[openbrush::trait_definition]
pub trait PaymentService {
    /// Function that transfers native tokens to specific account
    fn transfer_to(&self, account: AccountId, amount: Balance) -> Result<(), FoodOrderError>;
}