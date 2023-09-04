use openbrush::traits::{Storage, Balance};
use ink::prelude::{vec::Vec, string::String};

use crate::{
    ensure,
    impls::data::{Data, RestaurantId, Restaurant, FoodOrderError, FoodId, Food, OrderId, OrderStatus, Delivery, DeliveryStatus},
    impls::payment_service::PaymentServiceImpl,
    traits::events::FoodOrderEvents,
};

use core::cmp::{max, min};

#[openbrush::trait_definition]
pub trait RestaurantServiceImpl: Storage<Data> + FoodOrderEvents + PaymentServiceImpl 
{
    /// Function to create a food
    #[ink(message)]
    fn create_food(&mut self, food_name: String, food_description: String, food_price: Balance, food_eta: u64) -> Result<FoodId, FoodOrderError> {
        let restaurant_account = Self::env().caller();

        ensure!(self.data::<Data>().restaurant_data.contains(&restaurant_account), FoodOrderError::RestaurantNotExist);

        ensure!(food_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(food_description.len() > 0, FoodOrderError::InvalidDescriptionLength);
        ensure!(food_price > 0, FoodOrderError::InvalidParameters);

        let food_id = self.data::<Data>().food_id;
        let restaurant_id = self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap().restaurant_id;

        let food = Food {
            food_id,
            food_name,
            restaurant_id,
            food_description,
            food_price,
            food_eta,
        };
        self.data::<Data>().food_id += 1;
        self.data::<Data>().food_data.insert(&food_id, &food);

        Ok(food_id)
    }

    /// Function to read a food from given id
    #[ink(message)]
    fn read_food(&self, food_id: FoodId) -> Result<Food, FoodOrderError> {
        ensure!(self.data::<Data>().food_data.contains(&food_id), FoodOrderError::FoodNotExist);
        
        Ok(self.data::<Data>().food_data.get(&food_id).unwrap())
    }

    /// Function to read foods from given scope
    #[ink(message)]
    fn read_food_all(&self, from: FoodId, to: FoodId) -> Result<Vec<Food>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);
        ensure!(from < self.data::<Data>().food_id, FoodOrderError::InvalidParameters);

        let mut food_list: Vec<Food> = Vec::new();
        let start = max(1, from);
        let end = min(self.data::<Data>().food_id, to);

        for i in start..end {
            if self.data::<Data>().food_data.contains(&i) {
                food_list.push(self.data::<Data>().food_data.get(&i).unwrap());
            }
        }

        Ok(food_list)
    }

    /// Function to update a food
    #[ink(message)]
    fn update_food(&mut self, food_id: FoodId, food_name: String, food_description: String, food_price: Balance, food_eta: u64) -> Result<(), FoodOrderError> {
        ensure!(self.data::<Data>().food_data.contains(&food_id), FoodOrderError::FoodNotExist);
        ensure!(food_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(food_description.len() > 0, FoodOrderError::InvalidDescriptionLength);
        ensure!(food_price > 0, FoodOrderError::InvalidParameters);
        ensure!(food_eta > 0, FoodOrderError::InvalidParameters);

        let mut food = self.data::<Data>().food_data.get(&food_id).unwrap();
        food.food_name = food_name;
        food.food_description = food_description;
        food.food_price = food_price;
        food.food_eta = food_eta;

        self.data::<Data>().food_data.insert(&food_id, &food);

        Ok(())
    }

    /// Function to delete a food
    #[ink(message)]
    fn delete_food(&mut self, food_id: FoodId) -> Result<(), FoodOrderError> {
        ensure!(self.data::<Data>().food_data.contains(&food_id), FoodOrderError::FoodNotExist);

        self.data::<Data>().food_data.remove(&food_id);

        Ok(())
    }

    /// Function to create a restaurant account
    #[ink(message)]
    fn create_restaurant(&mut self, restaurant_name: String, restaurant_address: String, phone_number: String) -> Result<RestaurantId, FoodOrderError> {
        ensure!(restaurant_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(restaurant_address.len() > 0, FoodOrderError::InvalidAddressLength);
        ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        let restaurant_account = Self::env().caller();

        ensure!(!self.data::<Data>().restaurant_data.contains(&restaurant_account), FoodOrderError::RestaurantAlreadyExist);

        let restaurant_id = self.data::<Data>().restaurant_id;
        let restaurant = Restaurant {
            restaurant_id,
            restaurant_account,
            restaurant_name,
            restaurant_address,
            phone_number,
        };
        self.data::<Data>().restaurant_id += 1;
        self.data::<Data>().restaurant_data.insert(&restaurant_account, &restaurant);
        self.data::<Data>().restaurant_accounts.insert(&restaurant_id, &restaurant_account);
        
        Ok(restaurant_id)
    }

    /// Function to read a restaurant infomation
    #[ink(message)]
    fn read_restaurant(&self) -> Result<Restaurant, FoodOrderError> {
        let restaurant_account = Self::env().caller();

        ensure!(self.data::<Data>().restaurant_data.contains(&restaurant_account), FoodOrderError::RestaurantNotExist);

        Ok(self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap())
    }

    /// Function to read a restaurant from given id
    #[ink(message)]
    fn read_restaurant_from_id(&self, restaurant_id: RestaurantId) -> Result<Restaurant, FoodOrderError> {
        ensure!(self.data::<Data>().restaurant_accounts.contains(&restaurant_id), FoodOrderError::RestaurantNotExist);
        
        let restaurant_account = self.data::<Data>().restaurant_accounts.get(&restaurant_id).unwrap();

        Ok(self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap())
    }

    /// Function to read restaurants from given scope
    #[ink(message)]
    fn read_restaurant_all(&self, from: RestaurantId, to: RestaurantId) -> Result<Vec<Restaurant>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);
        ensure!(from < self.data::<Data>().restaurant_id, FoodOrderError::InvalidParameters);

        let mut restaurant_list: Vec<Restaurant> = Vec::new();
        let start = max(1, from);
        let end = min(self.data::<Data>().restaurant_id, to);

        for i in start..end {
            if self.data::<Data>().restaurant_accounts.contains(&i) {
                let restaurant_account = self.data::<Data>().restaurant_accounts.get(&i).unwrap();
                restaurant_list.push(self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap())
            }
        }

        Ok(restaurant_list)
    }

    /// Function to update a restaurant
    #[ink(message)]
    fn update_restaurant(&mut self, restaurant_name: String, restaurant_address: String, phone_number: String) -> Result<(), FoodOrderError> {
        ensure!(restaurant_name.len() > 0, FoodOrderError::InvalidNameLength);
        ensure!(restaurant_address.len() > 0, FoodOrderError::InvalidAddressLength);
        ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

        let restaurant_account = Self::env().caller();

        ensure!(self.data::<Data>().restaurant_data.contains(&restaurant_account), FoodOrderError::RestaurantNotExist);
        
        let mut restaurant =  self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap();
        restaurant.restaurant_name = restaurant_name;
        restaurant.restaurant_address = restaurant_address;
        restaurant.phone_number = phone_number;

        self.data::<Data>().restaurant_data.insert(&restaurant_account, &restaurant);

        Ok(())
    }

    /// Function to delete a restaurant
    #[ink(message)]
    fn delete_restaurant(&mut self) -> Result<(), FoodOrderError> {
        let restaurant_account = Self::env().caller();

        ensure!(self.data::<Data>().restaurant_data.contains(&restaurant_account), FoodOrderError::RestaurantNotExist);

        let restaurant = self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap();

        self.data::<Data>().restaurant_data.remove(&restaurant_account);
        self.data::<Data>().restaurant_accounts.remove(&restaurant.restaurant_id);

        Ok(())
    }

    /// Function that a restaurant confirms an order
    #[ink(message)]
    fn confirm_order(&mut self, order_id: OrderId, eta: u64) -> Result<OrderId, FoodOrderError> {
        ensure!(self.data::<Data>().order_data.contains(&order_id), FoodOrderError::OrderNotExist);

        let restaurant_account = Self::env().caller();
        
        ensure!(self.data::<Data>().restaurant_data.contains(&restaurant_account), FoodOrderError::RestaurantNotExist);

        let restaurant_id = self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap().restaurant_id;

        ensure!(self.data::<Data>().order_data.get(&order_id).unwrap().restaurant_id == restaurant_id, FoodOrderError::CallerIsNotRestaurantOrder);

        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        order.status = OrderStatus::OrderConfirmed;
        order.eta = eta;
        self.data::<Data>().order_data.insert(&order_id, &order);

        self.emit_confirm_order_event(order_id, eta);

        let delivery_id = self.data::<Data>().delivery_id;
        let delivery = Delivery {
            delivery_id,
            order_id,
            restaurant_id,
            customer_id: order.customer_id,
            courier_id: 0,
            status: DeliveryStatus::Waiting
        };
        self.data::<Data>().delivery_id += 1;
        self.data::<Data>().delivery_data.insert(&delivery_id, &delivery);

        self.emit_request_delivery_event(delivery_id, order_id);

        Ok(order_id)
    }

    /// Function that a restaurant finishes cooking of an order
    #[ink(message)]
    fn finish_cook(&mut self, order_id: OrderId) -> Result<OrderId, FoodOrderError> {
        ensure!(self.data::<Data>().order_data.contains(&order_id), FoodOrderError::OrderNotExist);

        let restaurant_account = Self::env().caller();

        ensure!(self.data::<Data>().restaurant_data.contains(&restaurant_account), FoodOrderError::RestaurantNotExist);

        let restaurant_id = self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap().restaurant_id;

        ensure!(self.data::<Data>().order_data.get(&order_id).unwrap().restaurant_id == restaurant_id, FoodOrderError::CallerIsNotRestaurantOrder);

        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        order.status = OrderStatus::FoodPrepared;
        self.data::<Data>().order_data.insert(&order_id, &order);

        self.emit_finish_cook_event(order_id);

        let amount = order.price - order.price / (self.data::<Data>().fee_rate as u128);

        PaymentServiceImpl::transfer_to(self, restaurant_account, amount).expect("Err");

        Ok(order_id)        
    }

    /// Function that a restaurant delivers an order
    #[ink(message)]
    fn deliver_order(&mut self, order_id: OrderId) -> Result<OrderId, FoodOrderError> {
        ensure!(self.data::<Data>().order_data.contains(&order_id), FoodOrderError::OrderNotExist);

        let restaurant_account = Self::env().caller();

        ensure!(self.data::<Data>().restaurant_data.contains(&restaurant_account), FoodOrderError::RestaurantNotExist);

        let restaurant_id = self.data::<Data>().restaurant_data.get(&restaurant_account).unwrap().restaurant_id;

        ensure!(self.data::<Data>().order_data.get(&order_id).unwrap().restaurant_id == restaurant_id, FoodOrderError::CallerIsNotRestaurantOrder);

        let mut order = self.data::<Data>().order_data.get(&order_id).unwrap();
        order.status = OrderStatus::FoodDelivered;
        self.data::<Data>().order_data.insert(&order_id, &order);

        self.emit_deliver_food_event(order_id);

        Ok(order_id)
    }

}