#![cfg_attr(not(feature = "std"), no_std)]
#![feature(min_specialization)]

#[openbrush::contract]
pub mod proxy {
    use openbrush::{
        contracts::{
            ownable::*,
            proxy::*,
        },
        modifiers,
        traits::Storage,
    };

    #[ink(storage)]
    #[derive(Default, Storage)]
    pub struct Contract {
        #[storage_field]
        proxy: proxy::Data,
        #[storage_field]
        ownable: ownable::Data,
    }

    impl Contract {
        #[ink(constructor)]
        pub fn new(forward_to: Hash) -> Self {
            let mut instance = Self::default();
            instance._init_with_forward_to(forward_to);
            instance._init_with_owner(Self::env().caller());

            instance
        }

        // Change forward address
        #[ink(message)]
        #[modifiers(only_owner)]
        pub fn change_forward_address(&mut self, forward_to: Hash) -> Result<Hash, OwnableError>{
            self._init_with_forward_to(forward_to);
            Ok(forward_to)
        }

        // Function that fallback
        #[ink(message, payable, selector = _)]
        pub fn forward(&self) {
            self._fallback()
        }
    }

    impl Ownable for Contract {}

    impl Proxy for Contract {}
}