/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@727-ventures/typechain-types';
import { buildSubmittableExtrinsic } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/foodorder';
import type BN from 'bn.js';
import type { ApiPromise } from '@polkadot/api';



export default class Methods {
	private __nativeContract : ContractPromise;
	private __apiPromise: ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		apiPromise: ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__apiPromise = apiPromise;
	}
	/**
	 * addCustomer
	 *
	 * @param { string } customerName,
	 * @param { string } customerAddress,
	 * @param { string } phoneNumber,
	*/
	"addCustomer" (
		customerName: string,
		customerAddress: string,
		phoneNumber: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerService::addCustomer", [customerName, customerAddress, phoneNumber], __options);
	}

	/**
	 * acceptDelivery
	 *
	 * @param { (number | string | BN) } deliveryId,
	*/
	"acceptDelivery" (
		deliveryId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerService::acceptDelivery", [deliveryId], __options);
	}

	/**
	 * submitOrder
	 *
	 * @param { (number | string | BN) } foodId,
	 * @param { string } deliveryAddress,
	*/
	"submitOrder" (
		foodId: (number | string | BN),
		deliveryAddress: string,
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerService::submitOrder", [foodId, deliveryAddress], __options);
	}

	/**
	 * pickupDelivery
	 *
	 * @param { (number | string | BN) } deliveryId,
	*/
	"pickupDelivery" (
		deliveryId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierService::pickupDelivery", [deliveryId], __options);
	}

	/**
	 * updateFood
	 *
	 * @param { (number | string | BN) } foodId,
	 * @param { string } foodName,
	 * @param { string } description,
	 * @param { (string | number | BN) } price,
	 * @param { (number | string | BN) } eta,
	*/
	"updateFood" (
		foodId: (number | string | BN),
		foodName: string,
		description: string,
		price: (string | number | BN),
		eta: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantService::updateFood", [foodId, foodName, description, price, eta], __options);
	}

	/**
	 * confirmOrder
	 *
	 * @param { (number | string | BN) } orderId,
	 * @param { (number | string | BN) } eta,
	*/
	"confirmOrder" (
		orderId: (number | string | BN),
		eta: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantService::confirmOrder", [orderId, eta], __options);
	}

	/**
	 * deliverOrder
	 *
	 * @param { (number | string | BN) } orderId,
	*/
	"deliverOrder" (
		orderId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantService::deliverOrder", [orderId], __options);
	}

	/**
	 * addFood
	 *
	 * @param { string } foodName,
	 * @param { string } description,
	 * @param { (string | number | BN) } price,
	 * @param { (number | string | BN) } eta,
	*/
	"addFood" (
		foodName: string,
		description: string,
		price: (string | number | BN),
		eta: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantService::addFood", [foodName, description, price, eta], __options);
	}

	/**
	 * finishCook
	 *
	 * @param { (number | string | BN) } orderId,
	*/
	"finishCook" (
		orderId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantService::finishCook", [orderId], __options);
	}

	/**
	 * changeManager
	 *
	 * @param { ArgumentTypes.AccountId } newAccount,
	*/
	"changeManager" (
		newAccount: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerService::changeManager", [newAccount], __options);
	}

	/**
	 * changeFeeRate
	 *
	 * @param { (number | string | BN) } rate,
	*/
	"changeFeeRate" (
		rate: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerService::changeFeeRate", [rate], __options);
	}

	/**
	 * addCourier
	 *
	 * @param { ArgumentTypes.AccountId } courierAccount,
	 * @param { string } courierName,
	 * @param { string } courierAddress,
	 * @param { string } phoneNumber,
	*/
	"addCourier" (
		courierAccount: ArgumentTypes.AccountId,
		courierName: string,
		courierAddress: string,
		phoneNumber: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerService::addCourier", [courierAccount, courierName, courierAddress, phoneNumber], __options);
	}

	/**
	 * addRestaurant
	 *
	 * @param { ArgumentTypes.AccountId } restaurantAccount,
	 * @param { string } restaurantName,
	 * @param { string } restaurantAddress,
	 * @param { string } phoneNumber,
	*/
	"addRestaurant" (
		restaurantAccount: ArgumentTypes.AccountId,
		restaurantName: string,
		restaurantAddress: string,
		phoneNumber: string,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerService::addRestaurant", [restaurantAccount, restaurantName, restaurantAddress, phoneNumber], __options);
	}

	/**
	 * getOrderFromCustomer
	 *
	 * @param { (number | string | BN) } customerId,
	*/
	"getOrderFromCustomer" (
		customerId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getOrderFromCustomer", [customerId], __options);
	}

	/**
	 * getFoodFromId
	 *
	 * @param { (number | string | BN) } foodId,
	*/
	"getFoodFromId" (
		foodId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getFoodFromId", [foodId], __options);
	}

	/**
	 * getDeliveryFromCourier
	 *
	 * @param { (number | string | BN) } courierId,
	*/
	"getDeliveryFromCourier" (
		courierId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getDeliveryFromCourier", [courierId], __options);
	}

	/**
	 * getDeliveryAll
	 *
	 * @param { (number | string | BN) } from,
	 * @param { (number | string | BN) } to,
	*/
	"getDeliveryAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getDeliveryAll", [from, to], __options);
	}

	/**
	 * getDeliveryFromRestaurant
	 *
	 * @param { (number | string | BN) } restaurantId,
	*/
	"getDeliveryFromRestaurant" (
		restaurantId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getDeliveryFromRestaurant", [restaurantId], __options);
	}

	/**
	 * getRestaurantAll
	 *
	 * @param { (number | string | BN) } from,
	 * @param { (number | string | BN) } to,
	*/
	"getRestaurantAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getRestaurantAll", [from, to], __options);
	}

	/**
	 * getFeeRate
	 *
	*/
	"getFeeRate" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getFeeRate", [], __options);
	}

	/**
	 * getCourierAll
	 *
	 * @param { (number | string | BN) } from,
	 * @param { (number | string | BN) } to,
	*/
	"getCourierAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getCourierAll", [from, to], __options);
	}

	/**
	 * getOrderAll
	 *
	 * @param { (number | string | BN) } from,
	 * @param { (number | string | BN) } to,
	*/
	"getOrderAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getOrderAll", [from, to], __options);
	}

	/**
	 * getCustomerAll
	 *
	 * @param { (number | string | BN) } from,
	 * @param { (number | string | BN) } to,
	*/
	"getCustomerAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getCustomerAll", [from, to], __options);
	}

	/**
	 * getFoodAll
	 *
	 * @param { (number | string | BN) } from,
	 * @param { (number | string | BN) } to,
	*/
	"getFoodAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getFoodAll", [from, to], __options);
	}

	/**
	 * getEta
	 *
	 * @param { (number | string | BN) } orderId,
	*/
	"getEta" (
		orderId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getEta", [orderId], __options);
	}

	/**
	 * getOrderFromRestaurant
	 *
	 * @param { (number | string | BN) } restaurantId,
	*/
	"getOrderFromRestaurant" (
		restaurantId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getOrderFromRestaurant", [restaurantId], __options);
	}

	/**
	 * getDeliveryFromId
	 *
	 * @param { (number | string | BN) } deliveryId,
	*/
	"getDeliveryFromId" (
		deliveryId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getDeliveryFromId", [deliveryId], __options);
	}

	/**
	 * getDeliveryFromCustomer
	 *
	 * @param { (number | string | BN) } customerId,
	*/
	"getDeliveryFromCustomer" (
		customerId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getDeliveryFromCustomer", [customerId], __options);
	}

	/**
	 * getOrderFromId
	 *
	 * @param { (number | string | BN) } orderId,
	*/
	"getOrderFromId" (
		orderId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getOrderFromId", [orderId], __options);
	}

	/**
	 * getFoodFromRestaurant
	 *
	 * @param { (number | string | BN) } restaurantId,
	*/
	"getFoodFromRestaurant" (
		restaurantId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getFoodFromRestaurant", [restaurantId], __options);
	}

	/**
	 * getOwner
	 *
	*/
	"getOwner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "getService::getOwner", [], __options);
	}

}