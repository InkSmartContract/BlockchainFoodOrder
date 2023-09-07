use ink::prelude::string::String;
use openbrush::traits::Timestamp;
use openbrush::{storage::Mapping, contracts::ownable::OwnableError, traits::{AccountId, Balance}};

pub type FoodId = u64;
pub type OrderId = u64;
pub type DeliveryId = u64;
pub type CustomerId = u64;
pub type CourierId = u64;
pub type RestaurantId = u64;

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub enum OrderStatus {
    OrderSubmitted,
    OrderConfirmed,
    FoodPrepared,
    FoodDelivered,
    DeliveryAccepted,
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub enum DeliveryStatus {
    Waiting,
    PickedUp,
    Accepted,
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Customer {
    pub customer_id: CustomerId,
    pub customer_account: AccountId,
    pub customer_name: String,
    pub customer_address: String,
    pub phone_number: String,
}

impl Default for Customer {
    fn default() -> Self {
        Customer {
            customer_id: 0,
            customer_account: [0u8; 32].into(),
            customer_name: Default::default(),
            customer_address: Default::default(),
            phone_number: Default::default(),
        }
    }
}


#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Restaurant {
    pub restaurant_id: RestaurantId,
    pub restaurant_account: AccountId,
    pub restaurant_name: String,
    pub restaurant_address: String,
    pub phone_number: String,
}

impl Default for Restaurant {
    fn default() -> Self {
        Restaurant {
            restaurant_id: 0,
            restaurant_account: [0u8; 32].into(),
            restaurant_name: Default::default(),
            restaurant_address: Default::default(),
            phone_number: Default::default(),
        }
    }
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Courier {
    pub courier_id: CourierId,
    pub courier_account: AccountId,
    pub courier_name: String,
    pub courier_address: String,
    pub phone_number: String,
}

impl Default for Courier {
    fn default() -> Self {
        Courier {
            courier_id: 0,
            courier_account: [0u8; 32].into(),
            courier_name: Default::default(),
            courier_address: Default::default(),
            phone_number: Default::default(),
        }
    }
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Food {
    pub food_id: FoodId,
    pub food_name: String,
    pub restaurant_id: RestaurantId,
    pub food_description: String,
    pub food_price: Balance,
    pub food_eta: u64,
}

impl Default for Food {
    fn default() -> Self {
        Food {
            food_id: 0,
            food_name: Default::default(),
            restaurant_id: 0,
            food_description: Default::default(),
            food_price: Default::default(),
            food_eta: Default::default(),
        }
    }
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Order {
    pub order_id: OrderId,
    pub food_id: FoodId,
    pub restaurant_id: RestaurantId,
    pub customer_id: CustomerId,
    pub courier_id: CourierId,
    pub delivery_id: DeliveryId,
    pub delivery_address: String,
    pub status: OrderStatus,
    pub timestamp: Timestamp,
    pub price: Balance,
    pub eta: u64,
}

impl Default for Order {
    fn default() -> Self {
        Order {
            order_id: 0,
            food_id: 0,
            restaurant_id: 0,
            customer_id: 0,
            courier_id: 0,
            delivery_id: 0,
            delivery_address: Default::default(),
            status: OrderStatus::OrderSubmitted,
            timestamp: Default::default(),
            price: Default::default(),
            eta: Default::default(),
        }
    }
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Delivery {
    pub delivery_id: DeliveryId,
    pub order_id: OrderId,
    pub restaurant_id: RestaurantId,
    pub customer_id: CustomerId,
    pub courier_id: CourierId,
    pub status: DeliveryStatus,
}

impl Default for Delivery {
    fn default() -> Self {
        Delivery {
            delivery_id: 0,
            order_id: 0,
            restaurant_id: 0,
            customer_id: 0,
            courier_id: 0,
            status: DeliveryStatus::Waiting,
        }
    }
}

#[derive(Debug)]
#[openbrush::storage_item]
pub struct Data {
    pub food_id: FoodId,
    pub food_data: Mapping<FoodId, Food>,

    pub customer_id: CustomerId, 
    pub customer_data: Mapping<AccountId, Customer>,
    pub customer_accounts: Mapping<CustomerId, AccountId>,

    pub restaurant_id: RestaurantId,
    pub restaurant_data: Mapping<AccountId, Restaurant>,
    pub restaurant_accounts: Mapping<RestaurantId, AccountId>,

    pub courier_id: CourierId,
    pub courier_data: Mapping<AccountId, Courier>,
    pub courier_accounts: Mapping<CourierId, AccountId>,

    pub order_id: OrderId,
    pub order_data: Mapping<OrderId, Order>,

    pub delivery_id: DeliveryId,
    pub delivery_data: Mapping<DeliveryId, Delivery>,

    pub fee_rate: u8,
}

/// Please notice that for all Mapping<Id, Vec<>> data types defined here, 
/// there's a risk that ink! Packed layout gets large enough such as a growing Vec, 
/// it will break the contract. This is because for encoding and decoding storage items, 
/// there is a buffer with only limited capacity (16KB default config) available. 
/// This means any contract trying to decode more than that will trap! 
/// If you are unsure about the potential size, consider using an ink! Mapping, 
/// which can store an arbitrary number of elements. 
///
/// Notice also that ink::prelude::vec::Vec's are always loaded in their entirety. 
/// This is because all elements of the ink::prelude::vec::Vec live under a single storage key. 
/// Wrapping the ink::prelude::vec::Vec inside Lazy has no influence on its inner layout. 
///
/// While using a Packed layout will keep the contracts overall code size smaller, it can cause 
/// unnecessarily high gas costs. Depending on the usage pattern, consider the practice of breaking up 
/// large or complex storage layouts into reasonably sized distinct storage cells, and weigh 
/// trade-offs among gas costs, contract size, performance and code complexity.  
/// For more details, please refer to ink! docs: 
/// ink! storage layout: https://use.ink/datastructures/storage-layout/
/// ink! Mapping:  https://use.ink/datastructures/mapping

impl Default for Data {
    fn default() -> Self {
        Data {
            food_id: 1,
            food_data: Mapping::default(),

            customer_id: 1,
            customer_data: Mapping::default(),
            customer_accounts: Mapping::default(),

            restaurant_id: 1,
            restaurant_data: Mapping::default(),
            restaurant_accounts: Mapping::default(),

            courier_id: 1,
            courier_data: Mapping::default(),
            courier_accounts: Mapping::default(),

            order_id: 1,
            order_data: Mapping::default(),

            delivery_id: 1,
            delivery_data: Mapping::default(),

            fee_rate: 10,
        }
    }
}

#[derive(scale::Decode, scale::Encode, PartialEq, Eq, Debug)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum FoodOrderError {
    // Caller is not a marketplace owner.
    // AccessControlError(AccessControlError),
    OwnableError(OwnableError),
    CallerIsNotFoodOwner,
    CallerIsNotManager,
    CallerIsNotCustomer,
    CallerIsNotRestaurant,
    CallerIsNotCourier,
    CallerIsNotCustomerOrder,
    CallerIsNotRestaurantOrder,
    CallerIsNotRestaurantFood,
    NotSamePrice,
    AlreadyExist,
    NotExist,
    OrderIsNotDelivered,
    OrderIsNotConfirmed,
    DeliveryIsAlreadyPickUp,
    FoodNotExist,
    OrderNotExist,
    DeliveryNotExist,
    InvalidNameLength,
    InvalidAddressLength,
    InvalidPhoneNumberLength,
    InvalidDescriptionLength,
    OrderStatusNotDelivered,
    OrderStatusNotConfirmed,
    OrderStatusNotPrepared,
    DeliveryStatusNotWaiting,
    DeliveryStatusNotPickUp,
    NotTransfered,
    InvalidParameters,
    InvalidRate,
}

impl From<OwnableError> for FoodOrderError {
    fn from(error: OwnableError) -> Self {
        FoodOrderError::OwnableError(error)
    }
}

// impl From<AccessControlError> for FoodOrderError {
//     fn from(error: AccessControlError) -> Self {
//         FoodOrderError::AccessControlError(error)
//     }
// }