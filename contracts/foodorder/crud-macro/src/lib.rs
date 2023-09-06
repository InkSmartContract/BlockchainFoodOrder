extern crate proc_macro;

use proc_macro::TokenStream;
use proc_macro2::{Ident, Span};
use quote::quote;
use syn::{parse_macro_input, ItemFn};

/// create_item is a procedure macro to encapsulate reusable logic otherwise repeated in separate functions such as:
/// create_customer, create_restaurant, create_courier, etc.  
/// It can also be applicable or extendable to other appropriate dApp business items
#[proc_macro_attribute]
pub fn create_item(attr: TokenStream, item: TokenStream) -> TokenStream {
    let arg_str = attr.to_string();
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;
    let stmts = &block.stmts;

    if arg_str.contains(',') || arg_str.contains(' ') {
        panic!("Only one arugmet is allowed")
    };
    
    let prefix = Ident::new(&arg_str, Span::call_site());
    let prefix_id = Ident::new(&(arg_str.to_lowercase() + "_id"), Span::call_site());
    let prefix_account = Ident::new(&(arg_str.to_lowercase() + "_account"), Span::call_site());
    let prefix_name = Ident::new(&(arg_str.to_lowercase() + "_name"), Span::call_site());
    let prefix_address = Ident::new(&(arg_str.to_lowercase() + "_address"), Span::call_site());
    let prefix_data = Ident::new(&(arg_str.to_lowercase() + "_data"), Span::call_site());
    let prefix_accounts = Ident::new(&(arg_str.to_lowercase() + "_accounts"), Span::call_site());

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            ensure!(#prefix_name.len() > 0, FoodOrderError::InvalidNameLength);
            ensure!(#prefix_address.len() > 0, FoodOrderError::InvalidAddressLength);
            ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

            let #prefix_account = Self::env().caller();

            ensure!(!self.data::<Data>().#prefix_data.contains(&#prefix_account), FoodOrderError::AlreadyExist);

            let #prefix_id = self.data::<Data>().#prefix_id;
            let item = #prefix {
                #prefix_id,
                #prefix_account,
                #prefix_name,
                #prefix_address,
                phone_number,
            };
            self.data::<Data>().#prefix_id += 1;
            self.data::<Data>().#prefix_data.insert(&#prefix_account, &item);
            self.data::<Data>().#prefix_accounts.insert(&#prefix_id, &#prefix_account);
            
            #(#stmts)*

            Ok(#prefix_id)
        }
    };

    TokenStream::from(expanded)
}

/// read_item is a procedure macro to encapsulate reusable logic otherwise repeated in separate functions such as:
/// read_customer, read_restaurant, read_courier, etc.  
/// It can also be applicable or extendable to other appropriate dApp business items
#[proc_macro_attribute]
pub fn read_item(attr: TokenStream, item: TokenStream) -> TokenStream {
    let arg_str = attr.to_string();
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;
    let stmts = &block.stmts;

    if arg_str.contains(',') || arg_str.contains(' ') {
        panic!("Only one arugmet is allowed")
    };
    
    let prefix_data = Ident::new(&(arg_str.to_lowercase() + "_data"), Span::call_site());

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            let account = Self::env().caller();
            ensure!(self.data::<Data>().#prefix_data.contains(&account), FoodOrderError::NotExist);

            #(#stmts)*
            Ok(self.data::<Data>().#prefix_data.get(&account).unwrap())
        }
    };

    TokenStream::from(expanded)
}

/// read_item_from_id is a procedure macro to encapsulate reusable logic otherwise repeated in separate functions such as:
/// read_customer_from_id, read_restaurant_from_id, read_courier_from_id, etc.  
/// It can also be applicable or extendable to other appropriate dApp business items
#[proc_macro_attribute]
pub fn read_item_from_id(attr: TokenStream, item: TokenStream) -> TokenStream {
    let arg_str = attr.to_string();
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;
    let stmts = &block.stmts;

    if arg_str.contains(',') || arg_str.contains(' ') {
        panic!("Only one arugmet is allowed")
    };
    
    let prefix_id = Ident::new(&(arg_str.to_lowercase() + "_id"), Span::call_site());
    let prefix_data = Ident::new(&(arg_str.to_lowercase() + "_data"), Span::call_site());
    let prefix_accounts = Ident::new(&(arg_str.to_lowercase() + "_accounts"), Span::call_site());

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            ensure!(self.data::<Data>().#prefix_accounts.contains(&#prefix_id), FoodOrderError::NotExist);
        
            let account = self.data::<Data>().#prefix_accounts.get(&#prefix_id).unwrap();
            
            #(#stmts)*

            Ok(self.data::<Data>().#prefix_data.get(&account).unwrap())
        }
    };

    TokenStream::from(expanded)
}

/// read_item_all is a procedure macro to encapsulate reusable logic otherwise repeated in separate functions such as:
/// read_customer_all, read_restaurant_all, read_courier_all, etc.  
/// It can also be applicable or extendable to other appropriate dApp business items
#[proc_macro_attribute]
pub fn read_item_all(attr: TokenStream, item: TokenStream) -> TokenStream {
    let arg_str = attr.to_string();
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;
    let stmts = &block.stmts;

    if arg_str.contains(',') || arg_str.contains(' ') {
        panic!("Only one arugmet is allowed")
    };
    
    let prefix = Ident::new(&arg_str, Span::call_site());
    let prefix_id = Ident::new(&(arg_str.to_lowercase() + "_id"), Span::call_site());
    let prefix_data = Ident::new(&(arg_str.to_lowercase() + "_data"), Span::call_site());
    let prefix_accounts = Ident::new(&(arg_str.to_lowercase() + "_accounts"), Span::call_site());

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            ensure!(from < to, FoodOrderError::InvalidParameters);
            ensure!(from < self.data::<Data>().#prefix_id, FoodOrderError::InvalidParameters);

            let mut list: Vec<#prefix> = Vec::new();
            let start = max(1, from);
            let end = min(self.data::<Data>().#prefix_id, to);

            for i in start..end {
                if self.data::<Data>().#prefix_accounts.contains(&i) {
                    let account = self.data::<Data>().#prefix_accounts.get(&i).unwrap();
                    list.push(self.data::<Data>().#prefix_data.get(&account).unwrap())
                }
            }

            #(#stmts)*

            Ok(list)
        }
    };

    TokenStream::from(expanded)
}

/// update_item is a procedure macro to encapsulate reusable logic otherwise repeated in separate functions such as:
/// update_customer, update_restaurant, update_courier, etc.  
/// It can also be applicable or extendable to other appropriate dApp business items
#[proc_macro_attribute]
pub fn update_item(attr: TokenStream, item: TokenStream) -> TokenStream {
    let arg_str = attr.to_string();
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;
    let stmts = &block.stmts;

    if arg_str.contains(',') || arg_str.contains(' ') {
        panic!("Only one arugmet is allowed")
    };
    
    let prefix_name = Ident::new(&(arg_str.to_lowercase() + "_name"), Span::call_site());
    let prefix_address = Ident::new(&(arg_str.to_lowercase() + "_address"), Span::call_site());
    let prefix_data = Ident::new(&(arg_str.to_lowercase() + "_data"), Span::call_site());

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            ensure!(#prefix_name.len() > 0, FoodOrderError::InvalidNameLength);
            ensure!(#prefix_address.len() > 0, FoodOrderError::InvalidAddressLength);
            ensure!(phone_number.len() > 0, FoodOrderError::InvalidPhoneNumberLength);

            let account = Self::env().caller();

            // ensure!(self.data::<Data>().#prefix_data.contains(&account), FoodOrderError::NotExist);
            
            let mut item =  self.data::<Data>().#prefix_data.get(&account).unwrap();
            item.#prefix_name = #prefix_name;
            item.#prefix_address = #prefix_address;
            item.phone_number = phone_number;

            self.data::<Data>().#prefix_data.insert(&account, &item);
            
            #(#stmts)*

            Ok(())
        }
    };

    TokenStream::from(expanded)
}

/// delete_item is a procedure macro to encapsulate reusable logic otherwise repeated in separate functions such as:
/// delete_customer, delete_restaurant, delete_courier, etc.  
/// It can also be applicable or extendable to other appropriate dApp business items
#[proc_macro_attribute]
pub fn delete_item(attr: TokenStream, item: TokenStream) -> TokenStream {
    let arg_str = attr.to_string();
    let input = parse_macro_input!(item as ItemFn);

    let ItemFn {
        attrs,
        vis,
        sig,
        block,
    } = input;
    let stmts = &block.stmts;

    if arg_str.contains(',') || arg_str.contains(' ') {
        panic!("Only one arugmet is allowed")
    };
    
    let prefix_base = Ident::new(&arg_str.to_lowercase(), Span::call_site());
    let prefix_id = Ident::new(&(arg_str.to_lowercase() + "_id"), Span::call_site());
    let prefix_account = Ident::new(&(arg_str.to_lowercase() + "_account"), Span::call_site());
    let prefix_data = Ident::new(&(arg_str.to_lowercase() + "_data"), Span::call_site());
    let prefix_accounts = Ident::new(&(arg_str.to_lowercase() + "_accounts"), Span::call_site());

    let expanded = quote! {
        #(#attrs)* #vis #sig {
            let #prefix_account = Self::env().caller();

            // ensure!(self.data::<Data>().#prefix_data.contains(&#prefix_account), FoodOrderError::NotExist);

            let #prefix_base = self.data::<Data>().#prefix_data.get(&#prefix_account).unwrap();

            self.data::<Data>().#prefix_data.remove(&#prefix_account);
            self.data::<Data>().#prefix_accounts.remove(&#prefix_base.#prefix_id);

            #(#stmts)*

            Ok(())
        }
    };

    TokenStream::from(expanded)
}

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

    let _stmts = &block.stmts;

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
