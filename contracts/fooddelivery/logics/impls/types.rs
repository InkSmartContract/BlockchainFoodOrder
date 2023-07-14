use ink::prelude::{
    string::String,
    vec::Vec,
};
use openbrush::traits::Timestamp;
use openbrush::{
    contracts::ownable::OwnableError,
    storage::Mapping,
    traits::{AccountId, ZERO_ADDRESS, Balance},
};

pub type FoodId = u64;
pub type OrderId = u64;
pub type DeliveryId = u64;
pub type CustomerId = u64;
pub type RestaurantId = u64;
pub type CourierId = u64;

pub type FoodResult = Result<FoodId, FoodOrderError>;
pub type OrderResult = Result<OrderId, FoodOrderError>;
pub type DeliveryResult = Result<DeliveryId, FoodOrderError>;
pub type CustomerResult = Result<CustomerId, FoodOrderError>;
pub type RestaurantResult = Result<RestaurantId, FoodOrderError>;
pub type CourierResult = Result<CourierId, FoodOrderError>;
pub type ManagerResult = Result<String, FoodOrderError>;

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
    DeliveryAcceptted,
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub enum DeliveryStatus {
    Waiting,
    PickUp,
    Accept,
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Customer {
    pub customer_account: AccountId,
    pub customer_name: String,
    pub customer_address: String,
    pub phone_number: String,
}

impl Default for Customer {
    fn default() -> Self {
        Customer {
            customer_account: ZERO_ADDRESS.into(),
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
    pub restaurant_account: AccountId,
    pub restaurant_name: String,
    pub restaurant_address: String,
    pub phone_number: String,
}

impl Default for Restaurant {
    fn default() -> Self {
        Restaurant {
            restaurant_account: ZERO_ADDRESS.into(),
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
    pub courier_account: AccountId,
    pub courier_name: String,
    pub courier_address: String,
    pub phone_number: String,
}

impl Default for Courier {
    fn default() -> Self {
        Courier {
            courier_account: ZERO_ADDRESS.into(),
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
    pub food_name: String,
    pub restaurant_id: RestaurantId,
    pub description: String,
    pub price: Balance,
    pub eta: u64,
    pub timestamp: Timestamp,
}

impl Default for Food {
    fn default() -> Self {
        Food {
            food_name: Default::default(),
            restaurant_id: Default::default(),
            description: Default::default(),
            price: Default::default(),
            eta: Default::default(),
            timestamp: Default::default(),
        }
    }
}

#[derive(scale::Decode, scale::Encode, Debug, Clone, Eq, PartialEq)]
#[cfg_attr(
    feature = "std",
    derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
)]
pub struct Order {
    pub food_id: FoodId,
    pub restaurant_id: RestaurantId,
    pub customer_id: CustomerId,
    pub courier_id: DeliveryId,
    pub delivery_address: String,
    pub status: OrderStatus,
    pub timestamp: Timestamp,
    pub price: Balance,
    pub eta: u64,
}

impl Default for Order {
    fn default() -> Self {
        Order {
            food_id: Default::default(),
            restaurant_id: Default::default(),
            customer_id: Default::default(),
            courier_id: Default::default(),
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
    pub order_id: OrderId,
    pub restaurant_id: RestaurantId,
    pub customer_id: CustomerId,
    pub courier_id: CourierId,
    pub delivery_address: String,
    pub status: DeliveryStatus,
    pub timestamp: Timestamp,
}

impl Default for Delivery {
    fn default() -> Self {
        Delivery {
            order_id: Default::default(),
            restaurant_id: Default::default(),
            customer_id: Default::default(),
            courier_id: Default::default(),
            delivery_address: Default::default(),
            status: DeliveryStatus::Waiting,
            timestamp: Default::default(),
        }
    }
}

pub const FOODDELIVERY_STORAGE_KEY: u32 = openbrush::storage_unique_key!(Data);

#[derive(Debug)]
#[openbrush::upgradeable_storage(FOODDELIVERY_STORAGE_KEY)]

pub struct Data {
    pub fee_rate: u32,
    pub food_id: u64,
    pub order_id: u64,
    pub delivery_id: u64,
    pub customer_id: u64,
    pub restaurant_id: u64,
    pub courier_id: u64,
    pub customers: Mapping<CustomerId, Customer>,
    pub restaurants: Mapping<RestaurantId, Restaurant>,
    pub couriers: Mapping<CourierId, Courier>,
    pub food_data: Mapping<FoodId, Food>,
    pub order_data: Mapping<OrderId, Order>,
    pub delivery_data: Mapping<DeliveryId, Delivery>,
    pub restaurant_food_data: Mapping<RestaurantId, Vec<FoodId>>,
    pub restaurant_order_data: Mapping<RestaurantId, Vec<OrderId>>,
    pub customer_order_data: Mapping<CustomerId, Vec<OrderId>>,
    pub courier_delivery_data: Mapping<CourierId, Vec<DeliveryId>>,
    pub restaurant_delivery_data: Mapping<RestaurantId, Vec<DeliveryId>>,
    pub customer_delivery_data: Mapping<CustomerId, Vec<DeliveryId>>,
    pub customer_account_id: Mapping<AccountId, CustomerId>,
    pub restaurant_account_id: Mapping<AccountId, RestaurantId>,
    pub courier_account_id: Mapping<AccountId, CourierId>,
}

impl Default for Data {
    fn default() -> Self {
        Data {
            fee_rate: 10,
            food_id: 1,
            order_id: 1,
            courier_id: 1,
            customer_id: 1,
            restaurant_id: 1,
            delivery_id: 1,
            customers: Mapping::default(),
            restaurants: Mapping::default(),
            couriers: Mapping::default(),
            food_data: Mapping::default(),
            order_data: Mapping::default(),
            delivery_data: Mapping::default(),
            restaurant_food_data: Mapping::default(),
            restaurant_order_data: Mapping::default(),
            customer_order_data: Mapping::default(),
            courier_delivery_data: Mapping::default(),
            restaurant_delivery_data: Mapping::default(),
            customer_delivery_data: Mapping::default(),
            customer_account_id: Mapping::default(),
            restaurant_account_id: Mapping::default(),
            courier_account_id: Mapping::default(),
        }
    }
}


#[derive(scale::Decode, scale::Encode, PartialEq, Eq, Debug)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum FoodOrderError {
    // Caller is not a marketplace owner.
    OwnableError(OwnableError),
    CallerIsNotManager,
    CallerIsNotCustomer,
    CallerIsNotRestaurant,
    CallerIsNotCourier,
    CallerIsNotCustomerOrder,
    CallerIsNotRestaurantOrder,
    CallerIsNotRestaurantFood,
    NotSamePrice,
    CustomerAlreadyExist,
    RestaurantAlreadyExist,
    CourierAlreadyExist,
    OrderIsNotDelivered,
    OrderIsNotConfirmed,
    DeliveryIsAlreadyPickUp,
    FoodNotExist,
    OrderNotExist,
    DeliveryNotExist,
    CustomerNotExist,
    RestaurantNotExist,
    CourierNotExist,
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
