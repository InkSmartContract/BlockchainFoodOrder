/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@727-ventures/typechain-types';
import type { QueryReturnType } from '@727-ventures/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@727-ventures/typechain-types';
import { txSignAndSend } from '@727-ventures/typechain-types';
import type * as ArgumentTypes from '../types-arguments/foodorder';
import type * as ReturnTypes from '../types-returns/foodorder';
import type BN from 'bn.js';
//@ts-ignore
import {ReturnNumber} from '@727-ventures/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";
import DATA_TYPE_DESCRIPTIONS from '../data/foodorder.json';
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/foodorder.json';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* pickupDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	* @returns { void }
	*/
	"pickupDelivery" (
		deliveryId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "courierServiceImpl::pickupDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
	}

	/**
	* readCourierFromId
	*
	* @param { (number | string | BN) } courierId,
	* @returns { Result<Result<ReturnTypes.Courier, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCourierFromId" (
		courierId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Courier, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::readCourierFromId", [courierId], __options, (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* readCourier
	*
	* @returns { Result<Result<ReturnTypes.Courier, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCourier" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Courier, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::readCourier", [], __options, (result) => { return handleReturnType(result, getTypeDescription(13, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* createCourier
	*
	* @param { string } courierName,
	* @param { string } courierAddress,
	* @param { string } phoneNumber,
	* @returns { void }
	*/
	"createCourier" (
		courierName: string,
		courierAddress: string,
		phoneNumber: string,
		__options: GasLimit,
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
	* @returns { Result<Result<Array<ReturnTypes.Courier>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCourierAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Courier>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "courierServiceImpl::readCourierAll", [from, to], __options, (result) => { return handleReturnType(result, getTypeDescription(16, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteCourier
	*
	* @returns { void }
	*/
	"deleteCourier" (
		__options: GasLimit,
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
	* @returns { void }
	*/
	"updateCourier" (
		courierName: string,
		courierAddress: string,
		phoneNumber: string,
		__options: GasLimit,
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
	* @returns { void }
	*/
	"createCustomer" (
		customerName: string,
		customerAddress: string,
		phoneNumber: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::createCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [customerName, customerAddress, phoneNumber], __options);
	}

	/**
	* readCustomer
	*
	* @returns { Result<Result<ReturnTypes.Customer, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCustomer" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Customer, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::readCustomer", [], __options, (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* submitOrder
	*
	* @param { (number | string | BN) } foodId,
	* @param { string } deliveryAddress,
	* @returns { void }
	*/
	"submitOrder" (
		foodId: (number | string | BN),
		deliveryAddress: string,
		__options: GasLimitAndRequiredValue,
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
	* @returns { Result<Result<Array<ReturnTypes.Customer>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCustomerAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Customer>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::readCustomerAll", [from, to], __options, (result) => { return handleReturnType(result, getTypeDescription(24, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* acceptDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	* @returns { void }
	*/
	"acceptDelivery" (
		deliveryId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::acceptDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
	}

	/**
	* readCustomerFromId
	*
	* @param { (number | string | BN) } customerId,
	* @returns { Result<Result<ReturnTypes.Customer, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readCustomerFromId" (
		customerId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Customer, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "customerServiceImpl::readCustomerFromId", [customerId], __options, (result) => { return handleReturnType(result, getTypeDescription(21, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteCustomer
	*
	* @returns { void }
	*/
	"deleteCustomer" (
		__options: GasLimit,
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
	* @returns { void }
	*/
	"updateCustomer" (
		customerName: string,
		customerAddress: string,
		phoneNumber: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "customerServiceImpl::updateCustomer", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [customerName, customerAddress, phoneNumber], __options);
	}

	/**
	* changeFeeRate
	*
	* @param { (number | string | BN) } rate,
	* @returns { void }
	*/
	"changeFeeRate" (
		rate: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::changeFeeRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [rate], __options);
	}

	/**
	* getFeeRate
	*
	* @returns { void }
	*/
	"getFeeRate" (
		__options: GasLimit,
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
	* @returns { void }
	*/
	"getDeliveryAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"getOrderAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::getOrderAll", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [from, to], __options);
	}

	/**
	* getDelivery
	*
	* @param { (number | string | BN) } deliveryId,
	* @returns { void }
	*/
	"getDelivery" (
		deliveryId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::getDelivery", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [deliveryId], __options);
	}

	/**
	* getOrder
	*
	* @param { (number | string | BN) } orderId,
	* @returns { void }
	*/
	"getOrder" (
		orderId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "managerServiceImpl::getOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
	}

	/**
	* readRestaurantFromId
	*
	* @param { (number | string | BN) } restaurantId,
	* @returns { Result<Result<ReturnTypes.Restaurant, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readRestaurantFromId" (
		restaurantId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Restaurant, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readRestaurantFromId", [restaurantId], __options, (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deliverOrder
	*
	* @param { (number | string | BN) } orderId,
	* @returns { void }
	*/
	"deliverOrder" (
		orderId: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::deliverOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId], __options);
	}

	/**
	* finishCook
	*
	* @param { (number | string | BN) } orderId,
	* @returns { void }
	*/
	"finishCook" (
		orderId: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"updateRestaurant" (
		restaurantName: string,
		restaurantAddress: string,
		phoneNumber: string,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::updateRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [restaurantName, restaurantAddress, phoneNumber], __options);
	}

	/**
	* readRestaurant
	*
	* @returns { Result<Result<ReturnTypes.Restaurant, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readRestaurant" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Restaurant, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readRestaurant", [], __options, (result) => { return handleReturnType(result, getTypeDescription(43, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* deleteRestaurant
	*
	* @returns { void }
	*/
	"deleteRestaurant" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::deleteRestaurant", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* readFood
	*
	* @param { (number | string | BN) } foodId,
	* @returns { Result<Result<ReturnTypes.Food, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readFood" (
		foodId: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<ReturnTypes.Food, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readFood", [foodId], __options, (result) => { return handleReturnType(result, getTypeDescription(46, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* createRestaurant
	*
	* @param { string } restaurantName,
	* @param { string } restaurantAddress,
	* @param { string } phoneNumber,
	* @returns { void }
	*/
	"createRestaurant" (
		restaurantName: string,
		restaurantAddress: string,
		phoneNumber: string,
		__options: GasLimit,
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
	* @returns { Result<Result<Array<ReturnTypes.Restaurant>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> }
	*/
	"readRestaurantAll" (
		from: (number | string | BN),
		to: (number | string | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Restaurant>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readRestaurantAll", [from, to], __options, (result) => { return handleReturnType(result, getTypeDescription(49, DATA_TYPE_DESCRIPTIONS)); });
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
		__options: GasLimit,
	): Promise< QueryReturnType< Result<Result<Array<ReturnTypes.Food>, ReturnTypes.FoodOrderError>, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "restaurantServiceImpl::readFoodAll", [from, to], __options, (result) => { return handleReturnType(result, getTypeDescription(52, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* updateFood
	*
	* @param { (number | string | BN) } foodId,
	* @param { string } foodName,
	* @param { string } foodDescription,
	* @param { (string | number | BN) } foodPrice,
	* @param { (number | string | BN) } foodEta,
	* @returns { void }
	*/
	"updateFood" (
		foodId: (number | string | BN),
		foodName: string,
		foodDescription: string,
		foodPrice: (string | number | BN),
		foodEta: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::updateFood", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [foodId, foodName, foodDescription, foodPrice, foodEta], __options);
	}

	/**
	* deleteFood
	*
	* @param { (number | string | BN) } foodId,
	* @returns { void }
	*/
	"deleteFood" (
		foodId: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"createFood" (
		foodName: string,
		foodDescription: string,
		foodPrice: (string | number | BN),
		foodEta: (number | string | BN),
		__options: GasLimit,
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
	* @returns { void }
	*/
	"confirmOrder" (
		orderId: (number | string | BN),
		eta: (number | string | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "restaurantServiceImpl::confirmOrder", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [orderId, eta], __options);
	}

	/**
	* transferOwnership
	*
	* @param { ArgumentTypes.AccountId } newOwner,
	* @returns { void }
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::transferOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newOwner], __options);
	}

	/**
	* owner
	*
	* @returns { Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> }
	*/
	"owner" (
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnTypes.AccountId | null, ReturnTypes.LangError> > >{
		return queryOkJSON( this.__apiPromise, this.__nativeContract, this.__callerAddress, "ownable::owner", [], __options, (result) => { return handleReturnType(result, getTypeDescription(57, DATA_TYPE_DESCRIPTIONS)); });
	}

	/**
	* renounceOwnership
	*
	* @returns { void }
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "ownable::renounceOwnership", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [], __options);
	}

	/**
	* setCodeHash
	*
	* @param { ArgumentTypes.Hash } newCodeHash,
	* @returns { void }
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "upgradeable::setCodeHash", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, EVENT_DATA_TYPE_DESCRIPTIONS);
		}, [newCodeHash], __options);
	}

}