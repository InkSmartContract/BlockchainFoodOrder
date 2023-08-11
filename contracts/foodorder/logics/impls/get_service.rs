pub use crate::{
    ensure,
    impls::types::{
        Courier, CourierId, Customer, CustomerId, Data, Delivery, DeliveryId, Food, FoodId,
        FoodOrderError, Order, OrderId, Restaurant, RestaurantId,
    },
    traits::get_service::*,
};
use core::cmp::{max, min};
use ink::prelude::vec::Vec;
use openbrush::{
    contracts::ownable::*,
    traits::{AccountId, Storage},
};

/// Implementation of Get Service
impl<T> GetService for T
where
    T: Storage<Data> + Storage<ownable::Data>,
{
    /// Function that get eta deadline using order identifier.
    default fn get_eta(&self, order_id: OrderId) -> Result<u64, FoodOrderError> {
        ensure!(
            self.data::<Data>().order_data.contains(&order_id),
            FoodOrderError::OrderNotExist
        );

        let timestamp = self
            .data::<Data>()
            .order_data
            .get(&order_id)
            .unwrap()
            .timestamp;
        let cur_timestamp = T::env().block_timestamp();
        let order_eta = self.data::<Data>().order_data.get(&order_id).unwrap().eta;
        let eta = order_eta - (cur_timestamp - timestamp);

        if eta > 0 {
            Ok(eta)
        } else {
            Ok(0)
        }
    }

    /// Function that get order information using order identifier.
    default fn get_order_from_id(&self, order_id: OrderId) -> Result<Order, FoodOrderError> {
        ensure!(
            self.data::<Data>().order_data.contains(&order_id),
            FoodOrderError::OrderNotExist
        );

        Ok(self.data::<Data>().order_data.get(&order_id).unwrap())
    }

    /// Function that get all order information placed in a restaurant.
    default fn get_order_from_restaurant(
        &self,
        restaurant_id: RestaurantId,
    ) -> Result<Vec<Order>, FoodOrderError> {
        ensure!(
            self.data::<Data>().restaurants.contains(&restaurant_id),
            FoodOrderError::RestaurantNotExist
        );

        let order_data = self
            .data::<Data>()
            .restaurant_order_data
            .get(&restaurant_id)
            .unwrap_or(Vec::new());
        let mut order_vec = Vec::new();

        for i in order_data.iter() {
            order_vec.push(self.data::<Data>().order_data.get(&i).unwrap());
        }

        Ok(order_vec)
    }

    /// Function that get all order information placed by customers.
    default fn get_order_from_customer(
        &self,
        customer_id: CustomerId,
    ) -> Result<Vec<Order>, FoodOrderError> {
        ensure!(
            self.data::<Data>().customers.contains(&customer_id),
            FoodOrderError::RestaurantNotExist
        );

        let order_data = self
            .data::<Data>()
            .customer_order_data
            .get(&customer_id)
            .unwrap_or(Vec::new());
        let mut order_vec = Vec::new();

        for i in order_data.iter() {
            order_vec.push(self.data::<Data>().order_data.get(&i).unwrap());
        }
        Ok(order_vec)
    }

    /// Function that get all orders from A to B.
    default fn get_order_all(&self, from: u64, to: u64) -> Result<Vec<Order>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);

        let mut order_vec: Vec<Order> = Vec::new();
        let mut _from = max(1, from);
        let mut _to = min(self.data::<Data>().order_id, to);

        for i in _from.._to {
            order_vec.push(self.data::<Data>().order_data.get(&i).unwrap());
        }

        Ok(order_vec)
    }

    /// Function that get food information using food identifier.
    default fn get_food_from_id(&self, food_id: FoodId) -> Result<Food, FoodOrderError> {
        ensure!(
            self.data::<Data>().food_data.contains(&food_id),
            FoodOrderError::FoodNotExist
        );
        Ok(self.data::<Data>().food_data.get(&food_id).unwrap())
    }

    /// Function that get all food information posted by the restaurant.
    default fn get_food_from_restaurant(
        &self,
        restaurant_id: RestaurantId,
    ) -> Result<Vec<Food>, FoodOrderError> {
        ensure!(
            self.data::<Data>().restaurants.contains(&restaurant_id),
            FoodOrderError::RestaurantNotExist
        );

        let food_data = self
            .data::<Data>()
            .restaurant_food_data
            .get(&restaurant_id)
            .unwrap_or(Vec::new());
        let mut food_vec = Vec::new();

        for i in food_data.iter() {
            food_vec.push(self.data::<Data>().food_data.get(&i).unwrap());
        }

        Ok(food_vec)
    }

    /// Function that get all food information from A to B.
    default fn get_food_all(&self, from: u64, to: u64) -> Result<Vec<Food>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);

        let mut food_vec: Vec<Food> = Vec::new();
        let mut _from = max(1, from);
        let mut _to = min(self.data::<Data>().food_id, to);

        for i in _from.._to {
            food_vec.push(self.data::<Data>().food_data.get(&i).unwrap());
        }

        Ok(food_vec)
    }

    /// Function that get delivery information using delivery identifier.
    default fn get_delivery_from_id(
        &self,
        delivery_id: DeliveryId,
    ) -> Result<Delivery, FoodOrderError> {
        ensure!(
            self.data::<Data>().delivery_data.contains(&delivery_id),
            FoodOrderError::DeliveryNotExist
        );

        Ok(self.data::<Data>().delivery_data.get(&delivery_id).unwrap())
    }

    /// Function that get all delivery information ordered form the forwarder.
    default fn get_delivery_from_courier(
        &self,
        courier_id: CourierId,
    ) -> Result<Vec<Delivery>, FoodOrderError> {
        ensure!(
            self.data::<Data>().couriers.contains(&courier_id),
            FoodOrderError::CourierNotExist
        );

        let delivery_data = self
            .data::<Data>()
            .courier_delivery_data
            .get(&courier_id)
            .unwrap_or(Vec::new());
        let mut delivery_vec = Vec::new();

        for i in delivery_data.iter() {
            delivery_vec.push(self.data::<Data>().delivery_data.get(&i).unwrap());
        }

        Ok(delivery_vec)
    }

    /// Function that get all delivery information requested by restaurant.
    default fn get_delivery_from_restaurant(
        &self,
        restaurant_id: RestaurantId,
    ) -> Result<Vec<Delivery>, FoodOrderError> {
        ensure!(
            self.data::<Data>().restaurants.contains(&restaurant_id),
            FoodOrderError::RestaurantNotExist
        );

        let delivery_data = self
            .data::<Data>()
            .restaurant_delivery_data
            .get(&restaurant_id)
            .unwrap_or(Vec::new());
        let mut deliver_vec = Vec::new();

        for i in delivery_data.iter() {
            deliver_vec.push(self.data::<Data>().delivery_data.get(&i).unwrap());
        }

        Ok(deliver_vec)
    }

    /// Function taht get all delivery information delivered to customer.
    default fn get_delivery_from_customer(
        &self,
        customer_id: CustomerId,
    ) -> Result<Vec<Delivery>, FoodOrderError> {
        ensure!(
            self.data::<Data>().customers.contains(&customer_id),
            FoodOrderError::CustomerNotExist
        );

        let delivery_data = self
            .data::<Data>()
            .customer_delivery_data
            .get(&customer_id)
            .unwrap_or(Vec::new());
        let mut delivery_vec = Vec::new();

        for i in delivery_data.iter() {
            delivery_vec.push(self.data::<Data>().delivery_data.get(&i).unwrap());
        }

        Ok(delivery_vec)
    }

    /// Function that get all delivery information.
    default fn get_delivery_all(
        &self,
        from: u64,
        to: u64,
    ) -> Result<Vec<Delivery>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);

        let mut delivery_vec: Vec<Delivery> = Vec::new();
        let mut _from = max(1, from);
        let mut _to = min(self.data::<Data>().delivery_id, to);

        for i in _from.._to {
            delivery_vec.push(self.data::<Data>().delivery_data.get(&i).unwrap());
        }

        Ok(delivery_vec)
    }

    /// Function that get all restaurant information.
    default fn get_restaurant_all(
        &self,
        from: u64,
        to: u64,
    ) -> Result<Vec<Restaurant>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);

        let mut restaurant_vec: Vec<Restaurant> = Vec::new();
        let mut _from = max(1, from);
        let mut _to = min(self.data::<Data>().restaurant_id, to);

        for i in _from.._to {
            restaurant_vec.push(self.data::<Data>().restaurants.get(&i).unwrap());
        }

        Ok(restaurant_vec)
    }

    /// Function that get all courier information.
    default fn get_courier_all(&self, from: u64, to: u64) -> Result<Vec<Courier>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);

        let mut courier_vec: Vec<Courier> = Vec::new();
        let mut _from = max(1, from);
        let mut _to = min(self.data::<Data>().courier_id, to);

        for i in _from.._to {
            courier_vec.push(self.data::<Data>().couriers.get(&i).unwrap());
        }

        Ok(courier_vec)
    }

    /// Function that get all customer information.
    default fn get_customer_all(
        &self,
        from: u64,
        to: u64,
    ) -> Result<Vec<Customer>, FoodOrderError> {
        ensure!(from < to, FoodOrderError::InvalidParameters);

        let mut customer_vec: Vec<Customer> = Vec::new();
        let mut _from = max(1, from);
        let mut _to = min(self.data::<Data>().customer_id, to);

        for i in _from.._to {
            customer_vec.push(self.data::<Data>().customers.get(&i).unwrap());
        }

        Ok(customer_vec)
    }

    /// Function that get manager account
    default fn get_owner(&self) -> AccountId {
        self.owner().clone()
    }

    /// Function that get fee rate
    default fn get_fee_rate(&self) -> u32 {
        self.data::<Data>().fee_rate.clone()
    }
}
