pub use crate::{
    ensure,
    impls::types::{
        RestaurantId, 
        CourierId, 
        Restaurant, 
        Courier,
        Data,
        FoodOrderError,
    },
    traits::manager_service::*,
};
use ink::prelude::string::{ToString, String};
use openbrush::{
    contracts::ownable::*,
    traits::{AccountId, Storage},
    modifiers,
};

use super::types::{
    RestaurantResult,
    CourierResult,
    ManagerResult,
};

// Manager Events Definition
pub trait ManagerServiceEvents {
    fn emit_add_courier_event (
        &self,
        courier_id: CourierId,
        courier_name: String,
        courier_address: String,
        phone_number: String,
    );

    fn emit_add_restaurant_event (
        &self,
        restaurant_id: RestaurantId,
        restaurant_name: String,
        restaurant_address: String,
        phone_number: String,
    );
}

// Implementation of Manager Service 
impl<T> ManagerService for T
where
    T: Storage<Data> + Storage<ownable::Data>,
{
    // Manager's function.
    // Function that add new restaurant.
    // #[modifiers(only_owner)]
    default fn add_restaurant(
        &mut self,
        restaurant_account: AccountId,
        restaurant_name: String,
        restaurant_address: String,
        phone_number: String,
    ) -> RestaurantResult {
        ensure!(!self.data::<Data>().restaurant_account_id.contains(&restaurant_account), FoodOrderError::RestaurantAlreadyExist);
        ensure!(restaurant_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(restaurant_address.len() > 0, FoodOrderError::InvalidAddressLength);
        ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        // Add a restaurant account and insert it into storage
        let restaurant_id = self.data::<Data>().restaurant_id;
        self.data::<Data>().restaurant_id += 1;
        let restaurant = Restaurant {
            restaurant_account: restaurant_account.clone(),
            restaurant_name: restaurant_name.clone(),
            restaurant_address: restaurant_address.clone(),
            phone_number: phone_number.clone(),
        };
        self.data::<Data>().restaurants.insert(&restaurant_id, &restaurant);
        self.data::<Data>().restaurant_account_id.insert(&restaurant_account, &restaurant_id);

        // Emit `AddRestaurantEvent`
        self.emit_add_restaurant_event(
            restaurant_id,
            restaurant_name,
            restaurant_address,
            phone_number,
        );

        // Return with a created restaurant id.
        Ok(restaurant_id)
    }
    
    // Manager's function.
    // Function that add new Courier.
    // #[modifiers(only_owner)]
    default fn add_courier(
        &mut self,
        courier_account: AccountId,
        courier_name: String,
        courier_address: String,
        phone_number: String,
    ) -> CourierResult {
        ensure!(!self.data::<Data>().courier_account_id.contains(&courier_account), FoodOrderError::CourierAlreadyExist);
        ensure!(courier_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(courier_address.len() > 0, FoodOrderError::InvalidAddressLength);
        ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        // Add a courier account and insert it into storage
        let courier_id = self.data::<Data>().courier_id;
        self.data::<Data>().courier_id += 1;
        let courier = Courier {
            courier_account,
            courier_name: courier_name.clone(),
            courier_address: courier_address.clone(),
            phone_number: phone_number.clone(),
        };
        self.data::<Data>().couriers.insert(&courier_id, &courier);
        self.data::<Data>().courier_account_id.insert(&courier_account, &courier_id);

        // Emit `AddCourierEvent`
        self.emit_add_courier_event(
            courier_id,
            courier_name,
            courier_address,
            phone_number,
        );

        // Return with a created courier id.
        Ok(courier_id)
    }

    // Manager's function.
    // Function that change manager's account.
    #[modifiers(only_owner)]
    default fn change_manager(
        &mut self,
        new_account: AccountId,
    ) -> ManagerResult {
        self._init_with_owner(new_account);

        Ok("Change Manager".to_string())
    }

    // Manager's function.
    // Function that change payment rate.
    #[modifiers(only_owner)]
    default fn change_fee_rate(
        &mut self,
        rate: u32,
    ) -> ManagerResult {
        ensure!(rate > 0 && rate < 100, FoodOrderError::InvalidRate);
        
        self.data::<Data>().fee_rate = rate;

        Ok("Change Fee Rate".to_string())
    }
}

// Manager Event Initation
impl<T> ManagerServiceEvents for T
where
    T: Storage<Data>,
{
    default fn emit_add_courier_event(
        &self, 
        _courier_id: CourierId,
        _courier_name: String,
        _courier_address: String,
        _phone_number: String,
    ) {}

    default fn emit_add_restaurant_event(
        &self,
        _restaurant_id: RestaurantId,
        _restaurant_name: String,
        _restaurant_address: String,
        _phone_number: String,
    ) {}
}