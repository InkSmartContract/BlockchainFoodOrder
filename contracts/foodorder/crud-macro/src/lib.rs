extern crate proc_macro;

use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, ItemFn};

#[proc_macro_attribute]
pub fn create_food(_attr: TokenStream, item: TokenStream) -> TokenStream {
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;
    let stmts = &block.stmts;

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            let restaurant_account = T::env().caller();
            ensure!(food_name.len() > 0, FoodOrderError::InvalidNameLength);
            ensure!(
                description.len() > 0,
                FoodOrderError::InvalidDescriptionLength
            );

            // Add a food and insert it into storage
            let restaurant_id = self
                .data::<Data>()
                .restaurant_account_id
                .get(&restaurant_account)
                .unwrap();
            let food_id = self.data::<Data>().food_id;
            self.data::<Data>().food_id += 1;
            let food = Food {
                food_name,
                restaurant_id,
                description,
                price,
                eta,
                timestamp: T::env().block_timestamp(),
            };
            self.data::<Data>().food_data.insert(&food_id, &food);

            #(#stmts)*

            // Insert it into restaurant_food_data storage
            let mut food_vec = self
                .data::<Data>()
                .restaurant_food_data
                .get(&restaurant_id)
                .unwrap_or(Vec::new());
            food_vec.push(food_id);
            self.data::<Data>()
                .restaurant_food_data
                .insert(&restaurant_id, &food_vec);

            // Return with a added food id
            Ok(food_id)
        }
    };

    TokenStream::from(expanded)
}

#[proc_macro_attribute]
pub fn update_food(_attr: TokenStream, item: TokenStream) -> TokenStream {
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;
    let stmts = &block.stmts;

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            let restaurant_account = T::env().caller();
            let restaurant_id = self
                .data::<Data>()
                .restaurant_account_id
                .get(&restaurant_account)
                .unwrap();
            ensure!(
                self.data::<Data>().food_data.contains(&food_id),
                FoodOrderError::FoodNotExist
            );
            ensure!(
                self.data::<Data>()
                    .food_data
                    .get(&food_id)
                    .unwrap()
                    .restaurant_id
                    == restaurant_id,
                FoodOrderError::CallerIsNotRestaurantFood
            );
            ensure!(food_name.len() > 0, FoodOrderError::InvalidNameLength);
            ensure!(
                description.len() > 0,
                FoodOrderError::InvalidDescriptionLength
            );

            // Update food.
            let food = Food {
                food_name: food_name.clone(),
                restaurant_id,
                description: description.clone(),
                price,
                eta,
                timestamp: T::env().block_timestamp(),
            };
            self.data::<Data>().food_data.insert(&food_id, &food);

            #(#stmts)*

            // Return with a updated food id
            Ok(food_id)
        }
    };

    TokenStream::from(expanded)
}

#[proc_macro_attribute]
pub fn delete_food(_attr: TokenStream, item: TokenStream) -> TokenStream {
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            let restaurant_account = T::env().caller();
            let restaurant_id = self.data::<Data>().restaurant_account_id.get(&restaurant_account).unwrap();
            ensure!(self.data::<Data>().food_data.contains(&food_id), FoodOrderError::FoodNotExist);
            ensure!(self.data::<Data>().food_data.get(&food_id).unwrap().restaurant_id == restaurant_id, FoodOrderError::CallerIsNotRestaurantFood);

            self.data::<Data>().food_data.remove(&food_id)

            // Return with a deleted food id
            Ok(food_id)
        }
    };

    TokenStream::from(expanded)
}
