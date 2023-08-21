#![cfg_attr(not(feature = "std"), no_std, no_main)]
#![feature(min_specialization)]

#[openbrush::contract]
mod blockchainfoodorder {
    use ink::codegen::EmitEvent;
    use ink::codegen::Env;
    use ink::prelude::string::String;
    use logic::{
        impls::{
            courier_service::CourierServiceEvents, customer_service::CustomerServiceEvents,
            manager_service::ManagerServiceEvents, restaurant_service::RestaurantServiceEvents,
            types::Data, types::*,
        },
        traits::{
            courier_service::*, customer_service::*, get_service::*, manager_service::*,
            restaurant_service::*,
        },
    };
    use openbrush::{contracts::ownable::*, traits::Storage};

    /// data declaration
    #[ink(storage)]
    #[derive(Storage, Default)]
    pub struct FoodOrder {
        #[storage_field]
        ownable: ownable::Data,
        #[storage_field]
        food_delivery_data: Data,
    }

    impl CustomerService for FoodOrder {}
    impl CourierService for FoodOrder {}
    impl RestaurantService for FoodOrder {}
    impl ManagerService for FoodOrder {}
    impl GetService for FoodOrder {}

    /// Event when a customer orders food.
    #[ink(event)]
    pub struct SubmitOrderEvent {
        order_id: OrderId,
        food_id: FoodId,
        restaurant_id: RestaurantId,
        customer_id: CustomerId,
        delivery_address: String,
        phone_number: String,
    }

    /// Event when a customer confirms delivery.
    #[ink(event)]
    pub struct AcceptDeliveryEvent {
        delivery_id: DeliveryId,
        order_id: OrderId,
    }

    /// Event when a restaurant adds food.
    #[ink(event)]
    pub struct AddFoodEvent {
        food_id: FoodId,
        food_name: String,
        restaurant_id: RestaurantId,
        description: String,
        price: Balance,
        eta: u64,
    }

    /// Event when a restaurant updates food information.
    #[ink(event)]
    pub struct UpdateFoodEvent {
        food_id: FoodId,
        food_name: String,
        description: String,
        price: Balance,
        eta: u64,
    }

    /// Event when a restaurant confirms order repuested customer.
    #[ink(event)]
    pub struct ConfirmOrderEvent {
        order_id: OrderId,
        eta: u64,
    }

    /// Event when a restaurant requests the delivery.
    #[ink(event)]
    pub struct RequestDeliveryEvent {
        order_id: OrderId,
        restaurant_id: RestaurantId,
        customer_id: CustomerId,
        delivery_address: String,
        eta: u64,
    }

    /// Event when a restaurant finishes cooking.
    #[ink(event)]
    pub struct FinishCookEvent {
        order_id: OrderId,
    }

    /// Event when a restaurant deliver food.
    #[ink(event)]
    pub struct DeliverFoodEvent {
        order_id: OrderId,
        restaurant_id: RestaurantId,
        customer_id: CustomerId,
        courier_id: CourierId,
    }

    /// Event when a courier picks up the delivery.
    #[ink(event)]
    pub struct PickUpDeliveryEvent {
        delivery_id: DeliveryId,
        courier_id: CourierId,
    }

    /// Event when a manager add new courier.
    #[ink(event)]
    pub struct AddCourierEvent {
        courier_id: CourierId,
        courier_name: String,
        courier_address: String,
        phone_number: String,
    }

    /// Event when a manager add new restaurant.
    #[ink(event)]
    pub struct AddRestaurantEvent {
        restaurant_id: RestaurantId,
        restaurant_name: String,
        restaurant_address: String,
        phone_number: String,
    }

    /// data initialization
    impl FoodOrder {
        #[ink(constructor)]
        pub fn new() -> Self {
            let mut instance = Self::default();
            instance._init_with_owner(Self::env().caller());
            instance
        }
    }

    /// Implementation of Events caused by customer
    impl CustomerServiceEvents for FoodOrder {
        fn emit_submit_order_event(
            &self,
            order_id: OrderId,
            food_id: FoodId,
            restaurant_id: RestaurantId,
            customer_id: CustomerId,
            delivery_address: String,
            phone_number: String,
        ) {
            self.env().emit_event(SubmitOrderEvent {
                order_id,
                food_id,
                restaurant_id,
                customer_id,
                delivery_address,
                phone_number,
            });
        }

        fn emit_accept_delivery_event(&self, delivery_id: DeliveryId, order_id: OrderId) {
            self.env().emit_event(AcceptDeliveryEvent {
                delivery_id,
                order_id,
            })
        }
    }

    /// Implementation of Events caused by courier
    impl CourierServiceEvents for FoodOrder {
        fn emit_pickup_delivery_event(&self, delivery_id: DeliveryId, courier_id: CourierId) {
            self.env().emit_event(PickUpDeliveryEvent {
                delivery_id,
                courier_id,
            })
        }
    }

    /// Implementation of Events caused by restaurant
    impl RestaurantServiceEvents for FoodOrder {
        fn emit_add_food_event(
            &self,
            food_id: FoodId,
            food_name: String,
            restaurant_id: RestaurantId,
            description: String,
            price: Balance,
            eta: u64,
        ) {
            self.env().emit_event(AddFoodEvent {
                food_id,
                food_name,
                restaurant_id,
                description,
                price,
                eta,
            })
        }

        fn emit_update_food_event(
            &self,
            food_id: FoodId,
            food_name: String,
            description: String,
            price: Balance,
            eta: u64,
        ) {
            self.env().emit_event(UpdateFoodEvent {
                food_id,
                food_name,
                description,
                price,
                eta,
            })
        }

        fn emit_confirm_order_event(&self, order_id: OrderId, eta: u64) {
            self.env().emit_event(ConfirmOrderEvent { order_id, eta })
        }

        fn emit_request_delivery_event(
            &self,
            order_id: OrderId,
            restaurant_id: RestaurantId,
            customer_id: CustomerId,
            delivery_address: String,
            eta: u64,
        ) {
            self.env().emit_event(RequestDeliveryEvent {
                order_id,
                restaurant_id,
                customer_id,
                delivery_address,
                eta,
            })
        }

        fn emit_finish_cook_event(&self, order_id: OrderId) {
            self.env().emit_event(FinishCookEvent { order_id })
        }

        fn emit_deliver_food_event(
            &self,
            order_id: OrderId,
            restaurant_id: RestaurantId,
            customer_id: CustomerId,
            courier_id: CourierId,
        ) {
            self.env().emit_event(DeliverFoodEvent {
                order_id,
                restaurant_id,
                customer_id,
                courier_id,
            })
        }
    }

    /// Implementation of Events caused by manager
    impl ManagerServiceEvents for FoodOrder {
        fn emit_add_courier_event(
            &self,
            courier_id: CourierId,
            courier_name: String,
            courier_address: String,
            phone_number: String,
        ) {
            self.env().emit_event(AddCourierEvent {
                courier_id,
                courier_name,
                courier_address,
                phone_number,
            })
        }

        fn emit_add_restaurant_event(
            &self,
            restaurant_id: RestaurantId,
            restaurant_name: String,
            restaurant_address: String,
            phone_number: String,
        ) {
            self.env().emit_event(AddRestaurantEvent {
                restaurant_id,
                restaurant_name,
                restaurant_address,
                phone_number,
            })
        }
    }

    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        use ink_e2e::build_message;
        use logic::impls::types::{Courier, Customer, Restaurant};
        use logic::traits::courier_service::courierservice_external::CourierService;
        use logic::traits::customer_service::customerservice_external::CustomerService;
        use logic::traits::get_service::getservice_external::GetService;
        use logic::traits::manager_service::managerservice_external::ManagerService;
        use logic::traits::restaurant_service::restaurantservice_external::RestaurantService;
        use openbrush::traits::{AccountId, ZERO_ADDRESS};

        use super::*;
        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        #[ink_e2e::test]
        async fn new_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            /// given
            let constructor = FoodOrderRef::new();
            let contract_acc_id = client
                .instantiate("inksmartcontract", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("failed to instantiate")
                .account_id;

            /// when
            let get_owner = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|_fooddelivery| _fooddelivery.get_owner());
            let get_owner_res = client
                .call_dry_run(&ink_e2e::alice(), &get_owner, 0, None)
                .await;

            /// check owner
            assert_eq!(
                get_owner_res.return_value(),
                ink_e2e::account_id(ink_e2e::AccountKeyring::Alice)
            );
            Ok(())
        }

        #[ink_e2e::test]
        async fn change_manager_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            /// given
            let constructor = FoodOrderRef::new();
            let contract_acc_id = client
                .instantiate("inksmartcontract", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("failed to instantiate")
                .account_id;

            let account = ZERO_ADDRESS.into();

            /// change manager_account
            let change_manager = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.change_manager(account));

            let _change_manager = client
                .call(&ink_e2e::alice(), change_manager, 0, None)
                .await
                .expect("calling change_manager failed");

            /// get the owner
            let get_owner = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.get_owner());

            let get_owner_result = client
                .call_dry_run(&ink_e2e::alice(), &get_owner, 0, None)
                .await;

            /// check manager change successfully
            assert_eq!(get_owner_result.return_value(), account);

            Ok(())
        }

        #[ink_e2e::test]
        async fn change_fee_rate_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            /// given
            let constructor = FoodOrderRef::new();
            let contract_acc_id = client
                .instantiate(
                    "inksmartcontract",
                    &ink_e2e::alice(),
                    constructor,
                    1000,
                    None,
                )
                .await
                .expect("failed to instantiate")
                .account_id;

            let rate = 20;

            /// change fee rate
            let change_fee_rate = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.change_fee_rate(rate));

            let _change_fee_rate = client
                .call(&ink_e2e::alice(), change_fee_rate, 0, None)
                .await
                .expect("calling change_fee_rate failed");

            /// get the fee rate
            let get_fee_rate = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.get_fee_rate());

            let get_fee_rate_result = client
                .call_dry_run(&ink_e2e::alice(), &get_fee_rate, 0, None)
                .await;

            /// check fee rate change successfully
            assert_eq!(get_fee_rate_result.return_value(), rate,);

            Ok(())
        }

        #[ink_e2e::test]
        async fn main_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            /// given
            let constructor = FoodOrderRef::new();
            let contract_acc_id = client
                .instantiate(
                    "inksmartcontract",
                    &ink_e2e::alice(),
                    constructor,
                    1000,
                    None,
                )
                .await
                .expect("failed to instantiate")
                .account_id;

            /// given restaurant information
            let alice = ink_e2e::alice::<ink_e2e::PolkadotConfig>();
            let alice_account_id_32 = alice.account_id();
            let restaurant_account = AccountId::try_from(alice_account_id_32.as_ref()).unwrap();
            let restaurant_name = String::from("restaurant one");
            let restaurant_address = String::from("restaurant address");
            let phone_number = String::from("123456789");

            /// Add restaurant
            let add_restaurant =
                build_message::<FoodOrderRef>(contract_acc_id.clone()).call(|foodorder| {
                    foodorder.add_restaurant(
                        restaurant_account,
                        restaurant_name.clone(),
                        restaurant_address.clone(),
                        phone_number.clone(),
                    )
                });

            let add_restaurant = client
                .call(&ink_e2e::alice(), add_restaurant, 0, None)
                .await
                .expect("calling add_restaurant failed");

            /// check event message
            let contract_emitted_event = add_restaurant
                .events
                .iter()
                .find(|event| {
                    event
                        .as_ref()
                        .expect("Expect Event")
                        .event_metadata()
                        .event()
                        == "ContractEmitted"
                })
                .expect("Expect ContractEmitted event")
                .unwrap();

            /// Decode the expected event type
            let event = contract_emitted_event.field_bytes();
            let decoded_event = <AddRestaurantEvent as scale::Decode>::decode(&mut &event[34..])
                .expect("Invalid data");

            let AddRestaurantEvent {
                restaurant_id,
                restaurant_name,
                restaurant_address,
                phone_number,
            } = decoded_event;

            /// assert with expected value
            assert_eq!(restaurant_id, 1);

            /// get the restaurant
            let get_restaurant_all = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.get_restaurant_all(1, 2));

            let get_restaurant_all_result = client
                .call_dry_run(&ink_e2e::alice(), &get_restaurant_all, 0, None)
                .await;

            /// check restaurant add seccessfully
            assert_eq!(
                get_restaurant_all_result.return_value().unwrap(),
                vec![Restaurant {
                    restaurant_account,
                    restaurant_name,
                    restaurant_address,
                    phone_number,
                }]
            );

            /// given courier information
            let bob = ink_e2e::bob::<ink_e2e::PolkadotConfig>();
            let bob_account_id_32 = bob.account_id();
            let courier_account = AccountId::try_from(bob_account_id_32.as_ref()).unwrap();
            let courier_name = String::from("courier one");
            let courier_address = String::from("courier address");
            let phone_number = String::from("123456789");

            /// Add courier
            let add_courier =
                build_message::<FoodOrderRef>(contract_acc_id.clone()).call(|foodorder| {
                    foodorder.add_courier(
                        courier_account,
                        courier_name.clone(),
                        courier_address.clone(),
                        phone_number.clone(),
                    )
                });

            let add_courier = client
                .call(&ink_e2e::alice(), add_courier, 0, None)
                .await
                .expect("calling add_courier failed");

            /// check event message
            let contract_emitted_event = add_courier
                .events
                .iter()
                .find(|event| {
                    event
                        .as_ref()
                        .expect("Expect Event")
                        .event_metadata()
                        .event()
                        == "ContractEmitted"
                })
                .expect("Expect ContractEmitted event")
                .unwrap();

            /// Decode the expected event type
            let event = contract_emitted_event.field_bytes();
            let decoded_event = <AddCourierEvent as scale::Decode>::decode(&mut &event[34..])
                .expect("Invalid data");

            let AddCourierEvent {
                courier_id,
                courier_name,
                courier_address,
                phone_number,
            } = decoded_event;

            /// assert with expected value
            assert_eq!(courier_id, 1);

            /// get the courier
            let get_courier_all = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.get_courier_all(1, 2));

            let get_courier_all_result = client
                .call_dry_run(&ink_e2e::alice(), &get_courier_all, 0, None)
                .await;

            /// check courier add seccessfully
            assert_eq!(
                get_courier_all_result.return_value().unwrap(),
                vec![Courier {
                    courier_account,
                    courier_name,
                    courier_address,
                    phone_number,
                }]
            );

            /// given food information
            let food_name = String::from("food one");
            let description = String::from("food description");
            let price = 1000;
            let eta = 100;

            /// Add Food
            let add_food =
                build_message::<FoodOrderRef>(contract_acc_id.clone()).call(|foodorder| {
                    foodorder.add_food(food_name.clone(), description.clone(), price, eta)
                });

            let _add_food = client
                .call(&ink_e2e::alice(), add_food, 0, None)
                .await
                .expect("calling add_food failed");

            /// get the food
            let get_food = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.get_food_all(1, 2));

            let get_food_result = client
                .call_dry_run(&ink_e2e::alice(), &get_food, 0, None)
                .await;

            /// check food add successfully
            let food = get_food_result.return_value().unwrap()[0].clone();
            assert_eq!(food_name, food.food_name);
            assert_eq!(1, food.restaurant_id);
            assert_eq!(description, food.description);
            assert_eq!(price, food.price);
            assert_eq!(eta, food.eta);

            /// given customer information
            let charlie = ink_e2e::charlie::<ink_e2e::PolkadotConfig>();
            let charlie_account_id_32 = charlie.account_id();
            let customer_account = AccountId::try_from(charlie_account_id_32.as_ref()).unwrap();
            let customer_name = String::from("customer one");
            let customer_address = String::from("customer address");
            let phone_number = String::from("phone number");

            /// Add customer
            let add_customer =
                build_message::<FoodOrderRef>(contract_acc_id.clone()).call(|foodorder| {
                    foodorder.add_customer(
                        customer_name.clone(),
                        customer_address.clone(),
                        phone_number.clone(),
                    )
                });

            let _add_customer = client
                .call(&ink_e2e::charlie(), add_customer, 0, None)
                .await
                .expect("calling add_customer failed");

            ///get the customer
            let get_customer = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.get_customer_all(1, 2));

            let get_customer_result = client
                .call_dry_run(&ink_e2e::alice(), &get_customer, 0, None)
                .await;

            /// check customer add successfully
            assert_eq!(
                get_customer_result.return_value().unwrap(),
                vec![Customer {
                    customer_account,
                    customer_name,
                    customer_address,
                    phone_number,
                }]
            );

            /// give order information
            let food_id = 1;
            let delivery_address = String::from("delivery address");

            /// submit order
            let submit_order = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.submit_order(food_id, delivery_address.clone()));

            let _submit_order = client
                .call(&ink_e2e::charlie(), submit_order, 1000, None)
                .await;

            /// get the order
            let get_order = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.get_order_all(1, 2));

            let get_order_result = client
                .call_dry_run(&ink_e2e::charlie(), &get_order, 0, None)
                .await;

            /// check order submit successfully
            let order = get_order_result.return_value().unwrap()[0].clone();
            assert_eq!(food_id, order.food_id);
            assert_eq!(1, order.restaurant_id);
            assert_eq!(1, order.customer_id);
            assert_eq!(0, order.courier_id);
            assert_eq!(delivery_address, order.delivery_address);
            assert_eq!(OrderStatus::OrderSubmitted, order.status);

            /// given update food information
            let food_id = 1;
            let food_name = String::from("food update");
            let description = String::from("food update descriptioin");
            let price = 1000;
            let eta = 1000;

            /// update Food
            let update_food =
                build_message::<FoodOrderRef>(contract_acc_id.clone()).call(|foodorder| {
                    foodorder.update_food(
                        food_id,
                        food_name.clone(),
                        description.clone(),
                        price,
                        eta,
                    )
                });

            let _update_food = client
                .call(&ink_e2e::alice(), update_food, 0, None)
                .await
                .expect("calling update_food failed");

            /// get the food
            let get_food_result = client
                .call_dry_run(&ink_e2e::alice(), &get_food, 0, None)
                .await;

            /// check food add successfully
            let food = get_food_result.return_value().unwrap()[0].clone();
            assert_eq!(food_name, food.food_name);
            assert_eq!(1, food.restaurant_id);
            assert_eq!(description, food.description);
            assert_eq!(price, food.price);
            assert_eq!(eta, food.eta);

            /// given confirm order information
            let order_id = 1;
            let eta = 1000;

            /// confirm order
            let confirm_order = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.confirm_order(order_id, eta));

            let _confirm_order = client
                .call(&ink_e2e::alice(), confirm_order, 0, None)
                .await
                .expect("calling confirm_order failed");

            /// get the order
            let get_order_result = client
                .call_dry_run(&ink_e2e::alice(), &get_order, 0, None)
                .await;

            /// check confirm order successfully
            let order = get_order_result.return_value().unwrap()[0].clone();
            assert_eq!(OrderStatus::OrderConfirmed, order.status);

            /// get the delivery
            let get_delivery = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.get_delivery_all(1, 2));

            let get_delivery_result = client
                .call_dry_run(&ink_e2e::alice(), &get_delivery, 0, None)
                .await;

            /// chech request delivery successfully
            let delivery = get_delivery_result.return_value().unwrap()[0].clone();
            assert_eq!(order_id, delivery.order_id);
            assert_eq!(1, delivery.restaurant_id);
            assert_eq!(1, delivery.customer_id);
            assert_eq!(0, delivery.courier_id);
            assert_eq!(String::from("delivery address"), delivery.delivery_address);
            assert_eq!(DeliveryStatus::Waiting, delivery.status);

            /// given finish cook information
            let order_id = 1;

            let finish_cook = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|fooddelivery| foodorder.finish_cook(order_id));

            let _finish_cook = client
                .call(&ink_e2e::alice(), finish_cook, 0, None)
                .await
                .expect("calling finish_cook failed");

            /// get the order
            let get_order_result = client
                .call_dry_run(&ink_e2e::alice(), &get_order, 0, None)
                .await;

            /// check finish cook successfully
            let order = get_order_result.return_value().unwrap()[0].clone();
            assert_eq!(OrderStatus::FoodPrepared, order.status);

            /// given pickup delivery information
            let delivery_id = 1;

            let pickup_delivery = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.pickup_delivery(delivery_id));

            let _pickup_deliver = client
                .call(&ink_e2e::bob(), pickup_delivery, 0, None)
                .await
                .expect("calling pickup_delivery failed");

            /// get the delivery    
            let get_delivery_result = client
                .call_dry_run(&ink_e2e::bob(), &get_delivery, 0, None)
                .await;

            /// get the order
            let get_order_result = client
                .call_dry_run(&ink_e2e::bob(), &get_order, 0, None)
                .await;

            /// chech pickup delivery successfully
            let delivery = get_delivery_result.return_value().unwrap()[0].clone();
            assert_eq!(DeliveryStatus::PickedUp, delivery.status);
            let order = get_order_result.return_value().unwrap()[0].clone();
            assert_eq!(1, order.courier_id);

            /// given deliver order information
            let order_id = 1;

            let deliver_order = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.deliver_order(order_id));

            let _deliver_order = client
                .call(&ink_e2e::alice(), deliver_order, 0, None)
                .await
                .expect("calling deliver_order failed");

            /// get the order
            let get_order_result = client
                .call_dry_run(&ink_e2e::alice(), &get_order, 0, None)
                .await;

            /// check deliver order successfully
            let order = get_order_result.return_value().unwrap()[0].clone();
            assert_eq!(OrderStatus::FoodDelivered, order.status);

            /// given accept delivery
            let delivery_id = 1;

            let accept_delivery = build_message::<FoodOrderRef>(contract_acc_id.clone())
                .call(|foodorder| foodorder.accept_delivery(delivery_id));

            let _accept_delivery = client
                .call(&ink_e2e::charlie(), accept_delivery, 0, None)
                .await
                .expect("calling accept_delivery failed");

            /// get the order
            let get_order_result = client
                .call_dry_run(&ink_e2e::charlie(), &get_order, 0, None)
                .await;

            /// get the delivery
            let get_delivery_result = client
                .call_dry_run(&ink_e2e::bob(), &get_delivery, 0, None)
                .await;

            /// check accept delivery successfully
            let order = get_order_result.return_value().unwrap()[0].clone();
            assert_eq!(OrderStatus::DeliveryAccepted, order.status);
            let delivery = get_delivery_result.return_value().unwrap()[0].clone();
            assert_eq!(DeliveryStatus::Accepted, delivery.status);

            Ok(())
        }
    }
}
