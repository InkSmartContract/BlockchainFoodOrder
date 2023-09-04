use crate::impls::data::FoodOrderError;

#[openbrush::trait_definition]
pub trait ManagerService {

    /// Function that change fee rate of contract
    #[ink(message)]
    fn change_fee_rate(&mut self, rate: u8) -> Result<(), FoodOrderError>;
}