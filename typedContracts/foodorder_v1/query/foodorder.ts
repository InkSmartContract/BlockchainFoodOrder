/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/foodorder';
import type * as ReturnTypes from '../types-returns/foodorder';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
import DATA_TYPE_DESCRIPTIONS from '../data/foodorder.json';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		nativeApi : ApiPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
		this.__apiPromise = nativeApi;
	}

	/**
	* pickupDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"pickupDelivery" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::pickupDelivery", [deliveryId], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readCourierFromId
	*
	* @param { (number | string | BN) } courierId,
	* @returns { Result<Result<ReturnTypes.Courier, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCourierFromId" (
		courierId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Courier, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::readCourierFromId", [courierId], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readCourier
	*
	* @returns { Result<Result<ReturnTypes.Courier, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCourier" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Courier, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::readCourier", [], __options , (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* createCourier
	*
	* @param { string } courierName,
	* @param { string } courierAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"createCourier" (
		courierName: string,
		courierAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::createCourier", [courierName, courierAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readCourierAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Courier>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCourierAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Courier>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::readCourierAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(16, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteCourier
	*
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"deleteCourier" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::deleteCourier", [], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateCourier
	*
	* @param { string } courierName,
	* @param { string } courierAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"updateCourier" (
		courierName: string,
		courierAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::updateCourier", [courierName, courierAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* createCustomer
	*
	* @param { string } customerName,
	* @param { string } customerAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"createCustomer" (
		customerName: string,
		customerAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::createCustomer", [customerName, customerAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readCustomer
	*
	* @returns { Result<Result<ReturnTypes.Customer, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCustomer" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Customer, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::readCustomer", [], __options , (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* submitOrder
	*
	* @param { (number | string | BN) } foodId,
	* @param { string } deliveryAddress,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"submitOrder" (
		foodId: (number | string | BN),
		deliveryAddress: string,
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::submitOrder", [foodId, deliveryAddress], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readCustomerAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Customer>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCustomerAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Customer>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::readCustomerAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* acceptDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"acceptDelivery" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::acceptDelivery", [deliveryId], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readCustomerFromId
	*
	* @param { (number | string | BN) } customerId,
	* @returns { Result<Result<ReturnTypes.Customer, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCustomerFromId" (
		customerId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Customer, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::readCustomerFromId", [customerId], __options , (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteCustomer
	*
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"deleteCustomer" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::deleteCustomer", [], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateCustomer
	*
	* @param { string } customerName,
	* @param { string } customerAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"updateCustomer" (
		customerName: string,
		customerAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::updateCustomer", [customerName, customerAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changeFeeRate
	*
	* @param { (number | string | BN) } rate,
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"changeFeeRate" (
		rate: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerServiceImpl::changeFeeRate", [rate], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getFeeRate
	*
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getFeeRate" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerServiceImpl::getFeeRate", [], __options , (result) => { return handleReturnType(result, getTypeDescription(27, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getDeliveryAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Delivery>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getDeliveryAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Delivery>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerServiceImpl::getDeliveryAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(29, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOrderAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Order>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getOrderAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Order>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerServiceImpl::getOrderAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	* @returns { Result<Result<ReturnTypes.Delivery, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getDelivery" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Delivery, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerServiceImpl::getDelivery", [deliveryId], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOrder
	*
	* @param { (number | string | BN) } orderId,
	* @returns { Result<Result<ReturnTypes.Order, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getOrder" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Order, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerServiceImpl::getOrder", [orderId], __options , (result) => { return handleReturnType(result, getTypeDescription(41, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readRestaurantFromId
	*
	* @param { (number | string | BN) } restaurantId,
	* @returns { Result<Result<ReturnTypes.Restaurant, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readRestaurantFromId" (
		restaurantId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Restaurant, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readRestaurantFromId", [restaurantId], __options , (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deliverOrder
	*
	* @param { (number | string | BN) } orderId,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"deliverOrder" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::deliverOrder", [orderId], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* finishCook
	*
	* @param { (number | string | BN) } orderId,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"finishCook" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::finishCook", [orderId], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateRestaurant
	*
	* @param { string } restaurantName,
	* @param { string } restaurantAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"updateRestaurant" (
		restaurantName: string,
		restaurantAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::updateRestaurant", [restaurantName, restaurantAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readRestaurant
	*
	* @returns { Result<Result<ReturnTypes.Restaurant, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readRestaurant" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Restaurant, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readRestaurant", [], __options , (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteRestaurant
	*
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"deleteRestaurant" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::deleteRestaurant", [], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readFood
	*
	* @param { (number | string | BN) } foodId,
	* @returns { Result<Result<ReturnTypes.Food, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readFood" (
		foodId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Food, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readFood", [foodId], __options , (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* createRestaurant
	*
	* @param { string } restaurantName,
	* @param { string } restaurantAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"createRestaurant" (
		restaurantName: string,
		restaurantAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::createRestaurant", [restaurantName, restaurantAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readRestaurantAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Restaurant>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readRestaurantAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Restaurant>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readRestaurantAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readFoodAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Food>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readFoodAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Food>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readFoodAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(52, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateFood
	*
	* @param { (number | string | BN) } foodId,
	* @param { string } foodName,
	* @param { string } foodDescription,
	* @param { (string | number | BN) } foodPrice,
	* @param { (number | string | BN) } foodEta,
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"updateFood" (
		foodId: (number | string | BN),
		foodName: string,
		foodDescription: string,
		foodPrice: (string | number | BN),
		foodEta: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::updateFood", [foodId, foodName, foodDescription, foodPrice, foodEta], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteFood
	*
	* @param { (number | string | BN) } foodId,
	* @returns { Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"deleteFood" (
		foodId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::deleteFood", [foodId], __options , (result) => { return handleReturnType(result, getTypeDescription(19, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* createFood
	*
	* @param { string } foodName,
	* @param { string } foodDescription,
	* @param { (string | number | BN) } foodPrice,
	* @param { (number | string | BN) } foodEta,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"createFood" (
		foodName: string,
		foodDescription: string,
		foodPrice: (string | number | BN),
		foodEta: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::createFood", [foodName, foodDescription, foodPrice, foodEta], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* confirmOrder
	*
	* @param { (number | string | BN) } orderId,
	* @param { (number | string | BN) } eta,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"confirmOrder" (
		orderId: (number | string | BN),
		eta: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::confirmOrder", [orderId, eta], __options , (result) => { return handleReturnType(result, getTypeDescription(9, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::transferOwnership", [newOwner], __options , (result) => { return handleReturnType(result, getTypeDescription(55, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"owner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(57, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceOwnership
	*
	* @returns { Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> }
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.OwnableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::renounceOwnership", [], __options , (result) => { return handleReturnType(result, getTypeDescription(55, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* setCodeHash
	*
	* @param { ArgumentTypes.Hash } newCodeHash,
	* @returns { Result<Result<null, ReturnTypes.UpgradeableError>, ReturnTypes.LangError> }
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<null, ReturnTypes.UpgradeableError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "upgradeable::setCodeHash", [newCodeHash], __options , (result) => { return handleReturnType(result, getTypeDescription(60, DATA_TYPE_DESCRIPTIONS)); });
	}

}