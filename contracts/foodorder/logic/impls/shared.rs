use openbrush::contracts::access_control::RoleType;

pub const COURIER: RoleType = ink::selector_id!("COURIER");
pub const CUSTOMER: RoleType = ink::selector_id!("CUSTOMER");
pub const RESTAURANT: RoleType = ink::selector_id!("RESTAURANT");
pub const MANAGER: RoleType = ink::selector_id!("MANAGER");