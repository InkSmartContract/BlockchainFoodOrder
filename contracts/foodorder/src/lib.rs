#![cfg_attr(not(feature = "std"), no_std, no_main)]

// #[openbrush::implementation(Ownable, AccessControl, Upgradeable)]
#[openbrush::implementation(Ownable, Upgradeable)]
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
            restaurant_service::*,
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
        foodorder_data: Data,
    }


    impl FoodOrder {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut instance = Self::default();

            let caller = Self::env().caller();
            ownable::Internal::_init_with_owner(&mut instance, caller);
            // access_control::Internal::_init_with_admin(&mut instance, Some(caller));
            // AccessControl::grant_role(&mut instance, MANAGER, Some(caller)).expect("Failed to grant role");

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
    pub mod tests {
        use super::*;
        use ink_e2e::{build_message, PolkadotConfig};
        use logic::{
            address_of,
            impls::{
                manager_service::managerserviceimpl_external::ManagerServiceImpl,
                courier_service::courierserviceimpl_external::CourierServiceImpl,
                customer_service::customerserviceimpl_external::CustomerServiceImpl,
                restaurant_service::restaurantserviceimpl_external::RestaurantServiceImpl,
                data::{Courier, Customer, Restaurant},
            },
        };
        use openbrush::{
            contracts::{
                access_control::accesscontrol_external::AccessControl,
                ownable::ownable_external::Ownable,
            },
            traits::AccountId,
        };

        type E2EResult<T> = Result<T, Box<dyn std::error::Error>>;

        #[ink_e2e::test]
        async fn new_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            let constructor = FoodOrderRef::new();
            let address = client.instantiate("foodorder", &ink_e2e::alice(), constructor, 0, None).await.expect("instantiate faild").account_id;

            // Get owner address
            let owner = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| contract.owner());
                client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
            }.return_value();

            assert_eq!(owner, Some(ink_e2e::account_id(ink_e2e::AccountKeyring::Alice)));

            // Get fee rate
            let fee_rate = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| contract.get_fee_rate());
                client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
            }
            .return_value();

            assert_eq!(fee_rate.unwrap(), 10);

            Ok(())
        }

        #[ink_e2e::test]
        async fn main_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            let constructor = FoodOrderRef::new();
            let address = client.instantiate("foodorder", &ink_e2e::alice(), constructor, 0, None).await.expect("instantiate faild").account_id;

            // Create a courier (bob is a courier)
            let create_courier_msg = build_message::<FoodOrderRef>(address.clone()).call(|contract|
                contract.create_courier("Courier A".to_string(), "Courier Address".to_string(), "123-456-789".to_string())
            );
            client.call(&ink_e2e::bob(), create_courier_msg, 0, None).await.expect("failed to create a courier");

            let courier = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| contract.read_courier());
                client.call_dry_run(&ink_e2e::bob(), &_msg, 0, None).await
            }.return_value();

            assert_eq!(courier.unwrap().courier_id, 1);

            // Create a customer (charlie is a customer)
            let create_customer_msg = build_message::<FoodOrderRef>(address.clone()).call(|contract|
                contract.create_customer("Customer A".to_string(), "Customer Address".to_string(), "645-234-123".to_string())
            );
            client.call(&ink_e2e::charlie(), create_customer_msg, 0, None).await.expect("failed to create a customer");

            let customer = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| contract.read_customer());
                client.call_dry_run(&ink_e2e::charlie(), &_msg, 0, None).await
            }.return_value();

            assert_eq!(customer.unwrap().customer_id, 1);

            // Create a restaurant (alice)
            let create_restaurant_msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| 
                contract.create_restaurant("Restaurant A".to_string(), "Restaurant Address".to_string(), "654-987-321".to_string())
            );
            client.call(&ink_e2e::alice(), create_restaurant_msg, 0, None).await.expect("failed to create a restaurant");

            let restaurant = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| contract.read_restaurant());
                client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
            }.return_value();

            assert_eq!(restaurant.unwrap().restaurant_id, 1);

            // Create a food 
            let create_food_msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| 
                contract.create_food("Food A".to_string(), "Food Description".to_string(), 1000, 600)
            );
            let result = client.call(&ink_e2e::alice(), create_food_msg, 0, None).await.expect("failed to create a food").return_value();

            let food = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| contract.read_food(1));
                client.call_dry_run(&ink_e2e::alice(), &_msg, 0, None).await
            }.return_value();

            assert_eq!(food.unwrap().food_id, result.unwrap());

            // Customer submits an order
            let subtmit_order_msg = build_message::<FoodOrderRef>(address.clone()).call(|contract|
                contract.submit_order(1, "Delivery Address".to_string())
            );
            client.call(&ink_e2e::charlie(), subtmit_order_msg, 1000, None).await.expect("failed to sumbit an order");

            let order = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract| contract.get_order(1));
                client.call_dry_run(&ink_e2e::charlie(), &_msg, 0, None).await
            }.return_value();

            assert_eq!(order.unwrap().order_id, 1);

            // Restaurant confirms the submitted order
            let confirm_order_result = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract|
                    contract.confirm_order(1, 500)
                );
                client.call(&ink_e2e::alice(), _msg, 0, None).await.expect("failed to confirm order")
            }.return_value();

            assert_eq!(confirm_order_result.unwrap(), 1);

            // Courier pick up order
            let pickup_delivery_result = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract|
                    contract.pickup_delivery(1)
                );
                client.call(&ink_e2e::bob(), _msg, 0, None).await.expect("failed to pick up delivery")
            }.return_value();

            assert_eq!(pickup_delivery_result.unwrap(), 1);

            // Restaurant finishes cook
            let finish_order_result = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract|
                    contract.finish_cook(1)
                );
                client.call(&ink_e2e::alice(), _msg, 0, None).await.expect("failed to finish cook")
            }.return_value();

            assert_eq!(finish_order_result.unwrap(), 1);

            // Restaurant delivers the order
            let deliver_order_result = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract|
                    contract.deliver_order(1)
                );
                client.call(&ink_e2e::alice(), _msg, 0, None).await.expect("failed to deliver order")
            }.return_value();

            assert_eq!(deliver_order_result.unwrap(), 1);

            // Customer accepts the delivery
            let accept_delivery_result = {
                let _msg = build_message::<FoodOrderRef>(address.clone()).call(|contract|
                    contract.accept_delivery(1)
                );
                client.call(&ink_e2e::charlie(), _msg, 0, None).await.expect("failed to accept delivery")
            }.return_value();

            assert_eq!(accept_delivery_result.unwrap(), 1);

            Ok(())
        }
    }
}