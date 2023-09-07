use crud_macro::{create_item, read_item, read_item_from_id, read_item_all, update_item, delete_item};
use openbrush::traits::Storage;

use ink::prelude::{vec::Vec, string::String};

use crate::{
    ensure,
    impls::data::{Data, CourierId, Courier, FoodOrderError, DeliveryId, DeliveryStatus},
    traits::events::FoodOrderEvents,
};

use openbrush::{modifiers, modifier_definition};

use core::cmp::{max, min};

#[openbrush::trait_definition]
pub trait CourierServiceImpl: Storage<Data> + FoodOrderEvents
{
    /// Function to create a courier
    /// Use create_item procedure macro for Courier
    #[ink(message)]
    #[create_item(Courier)]
    fn create_courier(&mut self, courier_name: String, courier_address: String, phone_number: String) -> Result<CourierId, FoodOrderError> {
        // **

        // Comments below are current expanded code from the create_item macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // ensure!(courier_name.len() > 0, FoodOrderError::InvalidNameLength);
        // ensure!(courier_address.len() > 0, FoodOrderError::InvalidAddressLength);
        // ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        // let courier_account = Self::env().caller();

        // ensure!(!self.data::<Data>().courier_data.contains(&courier_account), FoodOrderError::AlreadyExist);

        // let courier_id = self.data::<Data>().courier_id;
        // let courier = Courier {
        //     courier_id,
        //     courier_account,
        //     courier_name,
        //     courier_address,
        //     phone_number,
        // };
        // self.data::<Data>().courier_id += 1;
        // self.data::<Data>().courier_data.insert(&courier_account, &courier);
        // self.data::<Data>().courier_accounts.insert(&courier_id, &courier_account);
        
        // Ok(courier_id)
    }

    /// Function to get a courier
    /// Use read_item procedure macro for Courier
    #[ink(message)]
    #[read_item(Courier)]
    fn read_courier(&self) -> Result<Courier, FoodOrderError> {
        // **

        // Comments below are current expanded code from the read_item macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // let courier_account = Self::env().caller();

        // ensure!(self.data::<Data>().courier_data.contains(&courier_account), FoodOrderError::NotExist);

        // Ok(self.data::<Data>().courier_data.get(&courier_account).unwrap())

    }

    /// Function to get a courier from given id
    /// Use read_item_from_id procedure macro for Courier
    #[ink(message)]
    #[read_item_from_id(Courier)]
    fn read_courier_from_id(&self, courier_id: CourierId) -> Result<Courier, FoodOrderError> {
        // **

        // Comments below are current expanded code from the read_item_from_id macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // ensure!(self.data::<Data>().customer_accounts.contains(&courier_id), FoodOrderError::NotExist);
        
        // let courier_account = self.data::<Data>().courier_accounts.get(&courier_id).unwrap();

        // Ok(self.data::<Data>().courier_data.get(&courier_account).unwrap())
    }

    /// Function to get couriers from given scope
    /// Use read_item_all procedure macro for Courier
    #[ink(message)]
    #[read_item_all(Courier)]
    fn read_courier_all(&self, from: CourierId, to: CourierId) -> Result<Vec<Courier>, FoodOrderError> {
        // **

        // Comments below are current expanded code from the read_item_all macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // ensure!(from < to, FoodOrderError::InvalidParameters);
        // ensure!(from < self.data::<Data>().courier_id, FoodOrderError::InvalidParameters);

        // let mut courier_list: Vec<Courier> = Vec::new();
        // let start = max(1, from);
        // let end = min(self.data::<Data>().courier_id, to);

        // for i in start..end {
        //     if self.data::<Data>().courier_accounts.contains(&i) {
        //         let courier_account = self.data::<Data>().courier_accounts.get(&i).unwrap();
        //         courier_list.push(self.data::<Data>().courier_data.get(&courier_account).unwrap())
        //     }
        // }

        // Ok(courier_list)
    }

    /// Function to update a courier
    /// Use update_item procedure macro for Courier
    #[ink(message)]
    #[update_item(Courier)]
    #[modifiers(is_courier)]
    fn update_courier(&mut self, courier_name: String, courier_address: String, phone_number: String) -> Result<(), FoodOrderError> {
        // **

        // Comments below are current expanded code from the update_item macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // ensure!(courier_name.len() > 0, FoodOrderError::InvalidNameLength);
        // ensure!(courier_address.len() > 0, FoodOrderError::InvalidAddressLength);
        // ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        // let courier_account = Self::env().caller();

        // ensure!(self.data::<Data>().courier_data.contains(&courier_account), FoodOrderError::NotExist);
        
        // let mut courier =  self.data::<Data>().courier_data.get(&courier_account).unwrap();
        // courier.courier_name = courier_name;
        // courier.courier_address = courier_address;
        // courier.phone_number = phone_number;

        // self.data::<Data>().courier_data.insert(&courier_account, &courier);

        // Ok(())
    }

    /// Function to delete a courier
    /// Use delete_item procedure macro for Courier
    #[ink(message)]
    #[delete_item(Courier)]
    #[modifiers(is_courier)]
    fn delete_courier(&mut self) -> Result<(), FoodOrderError> {
        // **

        // Comments below are current expanded code from the delete_item macro 
        // included here for learning purpose. Output code changes as underlying macro changes.   

        // **

        // let courier_account = Self::env().caller();

        // ensure!(self.data::<Data>().courier_data.contains(&courier_account), FoodOrderError::NotExist);

        // let courier = self.data::<Data>().courier_data.get(&courier_account).unwrap();

        // self.data::<Data>().courier_data.remove(&courier_account);
        // self.data::<Data>().courier_accounts.remove(&courier.courier_id);

        // Ok(())
    }

    /// Function that a courier picks up food at a restaurant for delivery
    #[ink(message)]
    #[modifiers(is_courier)]
    fn pickup_delivery(&mut self, delivery_id: DeliveryId) -> Result<DeliveryId, FoodOrderError> {
        let courier_account = Self::env().caller();
        // ensure!(self.data::<Data>().courier_data.contains(&courier_account), FoodOrderError::NotExist);
        ensure!(self.data::<Data>().delivery_data.contains(&delivery_id), FoodOrderError::DeliveryNotExist);

        let mut delivery = self.data::<Data>().delivery_data.get(&delivery_id).unwrap();
        ensure!(delivery.status == DeliveryStatus::Waiting, FoodOrderError::DeliveryStatusNotWaiting);

        let courier_id = self.data::<Data>().courier_data.get(&courier_account).unwrap().courier_id;
        delivery.status = DeliveryStatus::PickedUp;
        delivery.courier_id = courier_id;
        self.data::<Data>().delivery_data.insert(&delivery_id, &delivery);

        let mut order = self.data::<Data>().order_data.get(&delivery.order_id).unwrap();
        order.courier_id = courier_id;
        self.data::<Data>().order_data.insert(&order.order_id, &order);

        self.emit_pickup_delivery_event(delivery_id, delivery.order_id);

        Ok(delivery_id)
    }
}


#[modifier_definition]
pub fn is_courier<T, F, R, E>(instance: &mut T, body: F) -> Result<R, E>
where
    T: Storage<Data>,
    F: FnOnce(&mut T) -> Result<R, E>,
    E: From<FoodOrderError>,
{
    ensure!(
        instance
            .data()
            .courier_data
            .contains(&T::env().caller()),
        FoodOrderError::NotExist,
    );
    body(instance)
}