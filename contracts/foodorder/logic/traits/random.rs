
pub trait RandService {
    fn create_randnumber(&self, subject: u128) -> u128;
}