extern crate proc_macro;

use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

// struct Args {
//     vars: Set<Ident>,
// }

// impl Parse for Args {
//     fn parse(input: ParseStream) -> Result<Self> {
//         let vars = Punntuated::<Ident, Token![,]>::parse_terminated(input)?;
//         Ok(Args {
//             vars: vars.into_iter().collect(),
//         })
//     }
// }

// impl Fold for Args {
//     fn fold_expr(&mut self, e: Expr) -> Expr {
//         match e {
//             Expr::Assign(e) => {
//                 if self.should_print_expr(&e.left) {
//                     self.assign_and_print(*e.left, &e.eq_token, *e.right)
//                 } else {
//                     Expr::Assign(fold::fold_expr_assign(self, e))
//                 }
//             }
//             Expr::Binary(e) if is_assign_op(e.op) => {
//                 if self.should_print_expr(&e.left) {
//                     self.assign_and_print(*e.left, &e.op, *e.right)
//                 } else {
//                     Expr::Binary(fold::fold_expr_binary(self, e))
//                 }
//             }
//             _ => fold::fold_expr(self, e),
//         }
//     }

//     fn fold_stmt(&mut self, s: Stmt) -> Stmt {
//         match s {
//             Stmt::Local(s) => {
//                 if s.init.is_some() && self.should_print_pat(&s.pat) {
//                     self.let_and_print(s)
//                 } else {
//                     Stmt::Local(fold::fold_local(self, s))
//                 }
//             }
//             _ => fold::fold_stmt(self, s),
//         }
//     }
// }

#[proc_macro_attribute]
pub fn custom_attribute(_metadata: TokenStream, _input: TokenStream) -> TokenStream {
    TokenStream::from(quote!{struct H{}})
}


/// To use this macro, you need to add the crud_item attribute to your impl block, like this:

///     #[crud_item(Food)]
///     impl<T> RestaurantService for T
///     where
///         T: Storage<Data> + Storage<ownable::Data>,
///     {}
/// The macro will then generate the implementation code for the add_food method based on the provided Food struct.

#[proc_macro_attribute]
pub fn crud_item(attr: TokenStream, item: TokenStream) -> TokenStream {
    // Parse the input tokens into a syntax tree
    let input = parse_macro_input!(item as DeriveInput);
    
    // Extract the name of the struct from the attribute
    let struct_name = attr.to_string();
    
    // Generate the implementation code
    let expanded = quote! {
        #input

        impl<T> RestaurantService for T
        where
            T: Storage<Data> + Storage<ownable::Data>,
        {
            #[modifiers(is_restaurant_user)]
            default fn add_food(
                &mut self,
                food_name: String,
                description: String,
                price: Balance,
                eta: u64,
            ) -> FoodResult {
                let restaurant_account = T::env().caller();
                ensure!(food_name.len() > 0, FoodOrderError::InvalidNameLength);
                ensure!(description.len() > 0, FoodOrderError::InvalidDescriptionLength);

                // Add a food and insert it into storage
                let restaurant_id = self.data::<Data>().restaurant_account_id.get(&restaurant_account).unwrap();
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

                // Emit `AddFoodEvent`
                self.emit_add_food_event(
                    food_id,
                    food.food_name,
                    restaurant_id,
                    food.description,
                    price,
                    eta,
                );

                // Insert it into restaurant_food_data storage
                let mut food_vec = self.data::<Data>().restaurant_food_data.get(&restaurant_id).unwrap_or(Vec::new());
                food_vec.push(food_id);
                self.data::<Data>().restaurant_food_data.insert(&restaurant_id, &food_vec);

                // Return with an added food id
                Ok(food_id)
            }

            #[modifiers(is_restaurant_user)]
            default fn update_food(
                &mut self,
                food_id: FoodId,
                food_name: String,
                description: String,
                price: Balance,
                eta: u64,
            ) -> FoodResult {
                let restaurant_account = T::env().caller();
                let restaurant_id = self.data::<Data>().restaurant_account_id.get(&restaurant_account).unwrap();
                ensure!(self.data::<Data>().food_data.contains(&food_id), FoodOrderError::FoodNotExist);
                ensure!(self.data::<Data>().food_data.get(&food_id).unwrap().restaurant_id == restaurant_id, FoodOrderError::CallerIsNotRestaurantFood);
                ensure!(food_name.len() > 0, FoodOrderError::InvalidNameLength);
                ensure!(description.len() > 0, FoodOrderError::InvalidDescriptionLength);

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

                // Emit `UpdateFoodEvent`
                self.emit_update_food_event(
                    food_id,
                    food_name.clone(),
                    description.clone(),
                    price,
                    eta,
                );

                // Return with a updated food id
                Ok(food_id)
            }

            #[modifiers(is_restaurant_user)]
            default fn delete_food(
                &mut self,
                food_id: FoodId
            ) -> FoodResult {
                let restaurant_account = T::env().caller();
                let restaurant_id = self.data::<Data>().restaurant_account_id.get(&restaurant_account).unwrap();
                ensure!(self.data::<Data>().food_data.contains(&food_id), FoodOrderError::FoodNotExist);
                ensure!(self.data::<Data>().food_data.get(&food_id).unwrap().restaurant_id == restaurant_id, FoodOrderError::CallerIsNotRestaurantFood);

                self.data::<Data>().food_data.remove(&food_id)

                // Return with a deleted food id
                Ok(food_id)
            }
        }
    };

    // Convert the expanded code back into tokens and return them
    TokenStream::from(expanded)
}