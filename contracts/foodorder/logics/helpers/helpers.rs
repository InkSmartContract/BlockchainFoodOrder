/// Evaluate `$x:expr` and if not true return `Err($y:expr)`.
///
/// Used as `ensure!(expression_to_ensure, expression_to_return_on_false)`.
#[macro_export]
macro_rules! ensure {
    ( $x:expr, $y:expr $(,)? ) => {{
        if !$x {
            return Err($y.into())
        }
    }};
}

// #[macro_export]
// macro_rules! transfer {
//     ( $x:expr, $y:expr $(,)? ) => {{
//         if !$x {
//             return Err($y.into())
//         }
//     }};
// }

#[macro_export]
macro_rules! transfer_from_contract_to_account {
    ($account:expr, $amount:expr, $id:expr) => {
        if T::env().transfer($account, $amount).is_err() {
            return core::prelude::v1::Err(FoodOrderError::NotTransfered)
        } else {
            Ok($id)
        }
    };
}