#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[openbrush::implementation(Ownable, AccessControl, Upgradeable)]
#[openbrush::contract]
mod blockchainfoodorder {
    use openbrush::traits::Storage;

    use ink::codegen::{EmitEvent, Env};

    use logic::{
        impls::{
            data::{OrderId, DeliveryId, CourierId, Data},
            courier_service::*,
            customer_service::*,
            manager_service::*,
            payment_service::*,
            restaurant_service::*, shared::MANAGER,
        },
        traits::events::FoodOrderEvents,
    };
    
    #[ink(event)]
    pub struct SubmitOrderEvent {
        #[ink(topic)]
        order_id: OrderId,
        #[ink(topic)]
        customer_account: AccountId,
    }

    #[ink(event)]
    pub struct ConfirmOrderEvent {
        #[ink(topic)]
        order_id: OrderId,
        eta: u64,
    }

    #[ink(event)]
    pub struct ReqeustDeliveryEvent {
        #[ink(topic)]
        delivery_id: DeliveryId,
        #[ink(topic)]
        order_id: OrderId,
    }

    #[ink(event)]
    pub struct DeliverFoodEvent{
        #[ink(topic)]
        order_id: OrderId,
    }

    #[ink(event)]
    pub struct FinishCookEvent {
        #[ink(topic)]
        order_id: OrderId,
    }

    #[ink(event)]
    pub struct PickupDeliveryEvent {
        #[ink(topic)]
        delivery_id: DeliveryId,
        #[ink(topic)]
        courier_id: CourierId,
    }

    #[ink(event)]
    pub struct AcceptDeliveryEvent {
        #[ink(topic)]
        delivery_id: DeliveryId,
        #[ink(topic)]
        order_id: OrderId,
    }

    #[ink(storage)]
    #[derive(Storage, Default)]
    pub struct FoodOrder {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        access_control: access_control::Data,
        #[storage_field]
        foodorder_data: Data,
    }


    impl FoodOrder {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut instance = Self::default();

            let caller = Self::env().caller();
            ownable::Internal::_init_with_owner(&mut instance, caller);
            access_control::Internal::_init_with_admin(&mut instance, Some(caller));
            AccessControl::grant_role(&mut instance, MANAGER, Some(caller)).expect("Failed to grant role");

            instance
        }
    }

    impl CourierServiceImpl for FoodOrder {}
    impl CustomerServiceImpl for FoodOrder {}
    impl ManagerServiceImpl for FoodOrder {}
    impl PaymentServiceImpl for FoodOrder {}
    impl RestaurantServiceImpl for FoodOrder {}
    impl FoodOrderEvents for FoodOrder {
        /// Function that emits SubmitOrderEvent
        fn emit_submit_order_event(&self, order_id: OrderId, customer_account: AccountId) {
            self.env().emit_event(SubmitOrderEvent {
                order_id, customer_account,
            });
        }

        /// Function that emits ConfirmOrderEvent
        fn emit_confirm_order_event(&self, order_id: OrderId, eta: u64) {
            self.env().emit_event(ConfirmOrderEvent {
                order_id, eta,
            });
        }

        /// Function that emits ReqeustDeliveryEvent
        fn emit_request_delivery_event(&self, delivery_id: DeliveryId, order_id: OrderId) {
            self.env().emit_event(ReqeustDeliveryEvent {
                delivery_id, order_id,
            });
        }

        /// Function that emits FinishCookEvent
        fn emit_finish_cook_event(&self, order_id: OrderId) {
            self.env().emit_event(FinishCookEvent {
                order_id,
            });
        }

        /// Function that emits PickupDeliveryEvent
        fn emit_pickup_delivery_event(&self, delivery_id: DeliveryId, courier_id: CourierId) {
            self.env().emit_event(PickupDeliveryEvent {
                delivery_id, courier_id,
            });
        }

        /// Function that emits DeliverFoodEvent
        fn emit_deliver_food_event(&self, order_id: OrderId) {
            self.env().emit_event(DeliverFoodEvent {
                order_id
            });
        }

        /// Function that emits AcceptDeliveryEvent
        fn emit_accept_delivery_event(&self, delivery_id: DeliveryId, order_id: OrderId) {
            self.env().emit_event(AcceptDeliveryEvent {
                delivery_id, order_id,
            });
        }
    }
    /// Test
    #[cfg(all(test, feature = "e2e-tests"))]
    mod tests {
        #[rustfmt::skip]
        use super::*;
        #[rustfmt::skip]
        use ink_e2e::{build_message, PolkadotConfig};

        use openbrush::{
            contracts::access_control::access_control_external::AccessControl,
            traits::AccountId,
        };
    }
}