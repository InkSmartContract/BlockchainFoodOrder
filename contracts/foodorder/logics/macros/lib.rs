// #![cfg_attr(not(feature = "std"), no_std)]
// #![feature(min_specialization)]

// extern crate proc_macro;
// extern crate quote;
// extern crate syn;

// #[warn(unused_imports)]

// use proc_macro::TokenStream;
// use quote::quote;
// use syn::{parse_macro_input, Data, DeriveInput, Fields};

// #[proc_macro]
// pub fn add_foods(input: TokenStream) -> TokenStream {
//     // Parse the input tokens into a syntax tree
//     let input = parse_macro_input!(input as DeriveInput);

//     // Extract the struct name
//     let struct_name = &input.ident;

//     // Extract the fields of the struct
//     let fields = if let Data::Struct(ref data) = input.data {
//         if let Fields::Named(ref fields) = data.fields {
//             fields.named.iter()
//         } else {
//             panic!("Expected named fields in the struct");
//         }
//     } else {
//         panic!("Expected a struct");
//     };

//     // Generate code for adding multiple foods
//     let mut generated_code = quote! {};

//     for (index, field) in fields.enumerate() {
//         let field_name = field.ident.as_ref().unwrap();
//         let field_type = &field.ty;

//         generated_code.extend(quote! {
//             let #field_name = #field_name.into_iter().map(|food| {
//                 let food_id = self.data::<Data>().food_id;
//                 self.data::<Data>().food_id += 1;
//                 let food = Food {
//                     food_name: food.food_name,
//                     restaurant_id: food.restaurant_id,
//                     description: food.description,
//                     price: food.price,
//                     eta: food.eta,
//                     timestamp: T::env().block_timestamp(),
//                 };
//                 self.data::<Data>().food_data.insert(&food_id, &food);
//                 food_id
//             }).collect::<Vec<_>>();

//             let mut food_vec = self.data::<Data>().restaurant_food_data
//                 .get(&restaurant_id)
//                 .unwrap_or(Vec::new());

//             food_vec.extend(#field_name.iter());

//             self.data::<Data>().restaurant_food_data.insert(&restaurant_id, &food_vec);
//         });
//     }

//     // Return the generated code as a token stream
//     let output = quote! {
//         impl #struct_name {
//             #[modifiers(is_restaurant_user)]
//             fn add_foods(&mut self, #(#fields),*) -> FoodResult {
//                 let restaurant_account = T::env().caller();

//                 #generated_code

//                 // Emit `AddFoodEvent` for each added food

//                 Ok(())
//             }
//         }
//     };

//     output.into()
// }

// extern crate proc_macro;

// use proc_macro::TokenStream;

// #[proc_macro]
// pub fn add_foods(input: TokenStream) -> TokenStream {
    
// }