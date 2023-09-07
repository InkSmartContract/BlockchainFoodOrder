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
	* pickupDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	*/
	"pickupDelivery" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierServiceImpl::pickupDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
	}

	/**
	* readCourierFromId
	*
	* @param { (number | string | BN) } courierId,
	*/
	"readCourierFromId" (
		courierId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierServiceImpl::readCourierFromId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [courierId], __options);
	}

	/**
	* readCourier
	*
	*/
	"readCourier" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierServiceImpl::readCourier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* createCourier
	*
	* @param { string } courierName,
	* @param { string } courierAddress,
	* @param { string } phoneNumber,
	*/
	"createCourier" (
		courierName: string,
		courierAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierServiceImpl::createCourier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [courierName, courierAddress, phoneNumber], __options);
	}

	/**
	* readCourierAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	*/
	"readCourierAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierServiceImpl::readCourierAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
	}

	/**
	* deleteCourier
	*
	*/
	"deleteCourier" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierServiceImpl::deleteCourier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateCourier
	*
	* @param { string } courierName,
	* @param { string } courierAddress,
	* @param { string } phoneNumber,
	*/
	"updateCourier" (
		courierName: string,
		courierAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierServiceImpl::updateCourier", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [courierName, courierAddress, phoneNumber], __options);
	}

	/**
	* createCustomer
	*
	* @param { string } customerName,
	* @param { string } customerAddress,
	* @param { string } phoneNumber,
	*/
	"createCustomer" (
		customerName: string,
		customerAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::createCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [customerName, customerAddress, phoneNumber], __options);
	}

	/**
	* readCustomer
	*
	*/
	"readCustomer" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::readCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::submitOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodId, deliveryAddress], __options);
	}

	/**
	* readCustomerAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	*/
	"readCustomerAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::readCustomerAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::acceptDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
	}

	/**
	* readCustomerFromId
	*
	* @param { (number | string | BN) } customerId,
	*/
	"readCustomerFromId" (
		customerId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::readCustomerFromId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [customerId], __options);
	}

	/**
	* deleteCustomer
	*
	*/
	"deleteCustomer" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::deleteCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* updateCustomer
	*
	* @param { string } customerName,
	* @param { string } customerAddress,
	* @param { string } phoneNumber,
	*/
	"updateCustomer" (
		customerName: string,
		customerAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::updateCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [customerName, customerAddress, phoneNumber], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::changeFeeRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rate], __options);
	}

	/**
	* getFeeRate
	*
	*/
	"getFeeRate" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::getFeeRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::getDeliveryAll", (events: EventRecord) => {
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::getOrderAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
	}

	/**
	* getDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	*/
	"getDelivery" (
		deliveryId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::getDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
	}

	/**
	* getOrder
	*
	* @param { (number | string | BN) } orderId,
	*/
	"getOrder" (
		orderId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::getOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
	}

	/**
	* readRestaurantFromId
	*
	* @param { (number | string | BN) } restaurantId,
	*/
	"readRestaurantFromId" (
		restaurantId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::readRestaurantFromId", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [restaurantId], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::deliverOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::finishCook", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
	}

	/**
	* updateRestaurant
	*
	* @param { string } restaurantName,
	* @param { string } restaurantAddress,
	* @param { string } phoneNumber,
	*/
	"updateRestaurant" (
		restaurantName: string,
		restaurantAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::updateRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [restaurantName, restaurantAddress, phoneNumber], __options);
	}

	/**
	* readRestaurant
	*
	*/
	"readRestaurant" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::readRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* deleteRestaurant
	*
	*/
	"deleteRestaurant" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::deleteRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* readFood
	*
	* @param { (number | string | BN) } foodId,
	*/
	"readFood" (
		foodId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::readFood", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodId], __options);
	}

	/**
	* createRestaurant
	*
	* @param { string } restaurantName,
	* @param { string } restaurantAddress,
	* @param { string } phoneNumber,
	*/
	"createRestaurant" (
		restaurantName: string,
		restaurantAddress: string,
		phoneNumber: string,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::createRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [restaurantName, restaurantAddress, phoneNumber], __options);
	}

	/**
	* readRestaurantAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	*/
	"readRestaurantAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::readRestaurantAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
	}

	/**
	* readFoodAll
	*
	* @param { (number | string | BN) } from,
	* @param { (number | string | BN) } to,
	*/
	"readFoodAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::readFoodAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
	}

	/**
	* updateFood
	*
	* @param { (number | string | BN) } foodId,
	* @param { string } foodName,
	* @param { string } foodDescription,
	* @param { (string | number | BN) } foodPrice,
	* @param { (number | string | BN) } foodEta,
	*/
	"updateFood" (
		foodId: (number | string | BN),
		foodName: string,
		foodDescription: string,
		foodPrice: (string | number | BN),
		foodEta: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::updateFood", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodId, foodName, foodDescription, foodPrice, foodEta], __options);
	}

	/**
	* deleteFood
	*
	* @param { (number | string | BN) } foodId,
	*/
	"deleteFood" (
		foodId: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::deleteFood", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodId], __options);
	}

	/**
	* createFood
	*
	* @param { string } foodName,
	* @param { string } foodDescription,
	* @param { (string | number | BN) } foodPrice,
	* @param { (number | string | BN) } foodEta,
	*/
	"createFood" (
		foodName: string,
		foodDescription: string,
		foodPrice: (string | number | BN),
		foodEta: (number | string | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::createFood", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodName, foodDescription, foodPrice, foodEta], __options);
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
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::confirmOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId, eta], __options);
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newOwner], __options);
	}

	/**
	* owner
	*
	*/
	"owner" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::owner", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* renounceOwnership
	*
	*/
	"renounceOwnership" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setCodeHash
	*
	* @param { ArgumentTypes.Hash } newCodeHash,
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "upgradeable::setCodeHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newCodeHash], __options);
	}

}