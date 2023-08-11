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
	* addCustomer
	*
	* @param { string } customerName,
	* @param { string } customerAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"addCustomer" (
		customerName: string,
		customerAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerService::addCustomer", [customerName, customerAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerService::acceptDelivery", [deliveryId], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerService::submitOrder", [foodId, deliveryAddress], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierService::pickupDelivery", [deliveryId], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateFood
	*
	* @param { (number | string | BN) } foodId,
	* @param { string } foodName,
	* @param { string } description,
	* @param { (string | number | BN) } price,
	* @param { (number | string | BN) } eta,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"updateFood" (
		foodId: (number | string | BN),
		foodName: string,
		description: string,
		price: (string | number | BN),
		eta: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantService::updateFood", [foodId, foodName, description, price, eta], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantService::confirmOrder", [orderId, eta], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantService::deliverOrder", [orderId], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addFood
	*
	* @param { string } foodName,
	* @param { string } description,
	* @param { (string | number | BN) } price,
	* @param { (number | string | BN) } eta,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"addFood" (
		foodName: string,
		description: string,
		price: (string | number | BN),
		eta: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantService::addFood", [foodName, description, price, eta], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantService::finishCook", [orderId], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changeManager
	*
	* @param { ArgumentTypes.AccountId } newAccount,
	* @returns { Result<Result<string, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"changeManager" (
		newAccount: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<string, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerService::changeManager", [newAccount], __options , (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* changeFeeRate
	*
	* @param { (number | string | BN) } rate,
	* @returns { Result<Result<string, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"changeFeeRate" (
		rate: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<string, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerService::changeFeeRate", [rate], __options , (result) => { return handleReturnType(result, getTypeDescription(15, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addCourier
	*
	* @param { ArgumentTypes.AccountId } courierAccount,
	* @param { string } courierName,
	* @param { string } courierAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"addCourier" (
		courierAccount: ArgumentTypes.AccountId,
		courierName: string,
		courierAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerService::addCourier", [courierAccount, courierName, courierAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* addRestaurant
	*
	* @param { ArgumentTypes.AccountId } restaurantAccount,
	* @param { string } restaurantName,
	* @param { string } restaurantAddress,
	* @param { string } phoneNumber,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"addRestaurant" (
		restaurantAccount: ArgumentTypes.AccountId,
		restaurantName: string,
		restaurantAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "managerService::addRestaurant", [restaurantAccount, restaurantName, restaurantAddress, phoneNumber], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOrderFromCustomer
	*
	* @param { (number | string | BN) } customerId,
	* @returns { Result<Result<Array<ReturnTypes.Order>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getOrderFromCustomer" (
		customerId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Order>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getOrderFromCustomer", [customerId], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getFoodFromId
	*
	* @param { (number | string | BN) } foodId,
	* @returns { Result<Result<ReturnTypes.Food, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getFoodFromId" (
		foodId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Food, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getFoodFromId", [foodId], __options , (result) => { return handleReturnType(result, getTypeDescription(22, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getDeliveryFromCourier
	*
	* @param { (number | string | BN) } courierId,
	* @returns { Result<Result<Array<ReturnTypes.Delivery>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getDeliveryFromCourier" (
		courierId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Delivery>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getDeliveryFromCourier", [courierId], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getDeliveryAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getDeliveryFromRestaurant
	*
	* @param { (number | string | BN) } restaurantId,
	* @returns { Result<Result<Array<ReturnTypes.Delivery>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getDeliveryFromRestaurant" (
		restaurantId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Delivery>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getDeliveryFromRestaurant", [restaurantId], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getRestaurantAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Restaurant>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getRestaurantAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Restaurant>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getRestaurantAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(30, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getFeeRate
	*
	* @returns { Result<number, ReturnTypes.LangError> }
	*/
	"getFeeRate" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<number, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getFeeRate", [], __options , (result) => { return handleReturnType(result, getTypeDescription(34, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getCourierAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Courier>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getCourierAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Courier>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getCourierAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(35, DATA_TYPE_DESCRIPTIONS)); });
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
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getOrderAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getCustomerAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Customer>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getCustomerAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Customer>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getCustomerAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(39, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getFoodAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	* @returns { Result<Result<Array<ReturnTypes.Food>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getFoodAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Food>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getFoodAll", [from, to], __options , (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getEta
	*
	* @param { (number | string | BN) } orderId,
	* @returns { Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getEta" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<number, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getEta", [orderId], __options , (result) => { return handleReturnType(result, getTypeDescription(11, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOrderFromRestaurant
	*
	* @param { (number | string | BN) } restaurantId,
	* @returns { Result<Result<Array<ReturnTypes.Order>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getOrderFromRestaurant" (
		restaurantId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Order>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getOrderFromRestaurant", [restaurantId], __options , (result) => { return handleReturnType(result, getTypeDescription(17, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getDeliveryFromId
	*
	* @param { (number | string | BN) } deliveryId,
	* @returns { Result<Result<ReturnTypes.Delivery, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getDeliveryFromId" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Delivery, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getDeliveryFromId", [deliveryId], __options , (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getDeliveryFromCustomer
	*
	* @param { (number | string | BN) } customerId,
	* @returns { Result<Result<Array<ReturnTypes.Delivery>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getDeliveryFromCustomer" (
		customerId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Delivery>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getDeliveryFromCustomer", [customerId], __options , (result) => { return handleReturnType(result, getTypeDescription(25, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOrderFromId
	*
	* @param { (number | string | BN) } orderId,
	* @returns { Result<Result<ReturnTypes.Order, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getOrderFromId" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Order, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getOrderFromId", [orderId], __options , (result) => { return handleReturnType(result, getTypeDescription(48, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getFoodFromRestaurant
	*
	* @param { (number | string | BN) } restaurantId,
	* @returns { Result<Result<Array<ReturnTypes.Food>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"getFoodFromRestaurant" (
		restaurantId: (number | string | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Food>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getFoodFromRestaurant", [restaurantId], __options , (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* getOwner
	*
	* @returns { Result<ReturnTypes.AccountId, ReturnTypes.LangError> }
	*/
	"getOwner" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "getService::getOwner", [], __options , (result) => { return handleReturnType(result, getTypeDescription(50, DATA_TYPE_DESCRIPTIONS)); });
	}

}