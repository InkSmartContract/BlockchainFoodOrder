/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/foodorder';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/foodorder.json';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* acceptDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	*/
	"acceptDelivery" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerService::acceptDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerService::addCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [customerName, customerAddress, phoneNumber], __options);
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
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerService::submitOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodId, deliveryAddress], __options);
	}

	/**
	* pickupDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	*/
	"pickupDelivery" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierService::pickupDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
	}

	/**
	* finishCook
	*
	* @param { (number | string | BN) } orderId,
	*/
	"finishCook" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantService::finishCook", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
	}

	/**
	* deliverOrder
	*
	* @param { (number | string | BN) } orderId,
	*/
	"deliverOrder" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantService::deliverOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantService::confirmOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId, eta], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantService::updateFood", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodId, foodName, description, price, eta], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantService::addFood", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodName, description, price, eta], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerService::addRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [restaurantAccount, restaurantName, restaurantAddress, phoneNumber], __options);
	}

	/**
	* changeFeeRate
	*
	* @param { (number | string | BN) } rate,
	*/
	"changeFeeRate" (
		rate: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerService::changeFeeRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rate], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerService::addCourier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [courierAccount, courierName, courierAddress, phoneNumber], __options);
	}

	/**
	* changeManager
	*
	* @param { ArgumentTypes.AccountId } newAccount,
	*/
	"changeManager" (
		newAccount: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerService::changeManager", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newAccount], __options);
	}

	/**
	* getOrderFromCustomer
	*
	* @param { (number | string | BN) } customerId,
	*/
	"getOrderFromCustomer" (
		customerId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getOrderFromCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [customerId], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getCustomerAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
	}

	/**
	* getEta
	*
	* @param { (number | string | BN) } orderId,
	*/
	"getEta" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getEta", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
	}

	/**
	* getOrderFromId
	*
	* @param { (number | string | BN) } orderId,
	*/
	"getOrderFromId" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getOrderFromId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
	}

	/**
	* getFoodFromRestaurant
	*
	* @param { (number | string | BN) } restaurantId,
	*/
	"getFoodFromRestaurant" (
		restaurantId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getFoodFromRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [restaurantId], __options);
	}

	/**
	* getDeliveryFromId
	*
	* @param { (number | string | BN) } deliveryId,
	*/
	"getDeliveryFromId" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getDeliveryFromId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
	}

	/**
	* getDeliveryFromRestaurant
	*
	* @param { (number | string | BN) } restaurantId,
	*/
	"getDeliveryFromRestaurant" (
		restaurantId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getDeliveryFromRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [restaurantId], __options);
	}

	/**
	* getOrderFromRestaurant
	*
	* @param { (number | string | BN) } restaurantId,
	*/
	"getOrderFromRestaurant" (
		restaurantId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getOrderFromRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [restaurantId], __options);
	}

	/**
	* getDeliveryFromCustomer
	*
	* @param { (number | string | BN) } customerId,
	*/
	"getDeliveryFromCustomer" (
		customerId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getDeliveryFromCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [customerId], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getCourierAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getRestaurantAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
	}

	/**
	* getFeeRate
	*
	*/
	"getFeeRate" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getFeeRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getOwner
	*
	*/
	"getOwner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getOwner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* getDeliveryFromCourier
	*
	* @param { (number | string | BN) } courierId,
	*/
	"getDeliveryFromCourier" (
		courierId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getDeliveryFromCourier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [courierId], __options);
	}

	/**
	* getFoodFromId
	*
	* @param { (number | string | BN) } foodId,
	*/
	"getFoodFromId" (
		foodId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getFoodFromId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodId], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getDeliveryAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getOrderAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
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
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getService::getFoodAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
	}

}