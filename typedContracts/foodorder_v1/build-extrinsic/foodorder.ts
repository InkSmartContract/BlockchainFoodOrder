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
	 * pickupDelivery
	 *
	 * @param { (number | string | BN) } deliveryId,
	*/
	"pickupDelivery" (
		deliveryId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::pickupDelivery", [deliveryId], __options);
	}

	/**
	 * readCourierFromId
	 *
	 * @param { (number | string | BN) } courierId,
	*/
	"readCourierFromId" (
		courierId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::readCourierFromId", [courierId], __options);
	}

	/**
	 * readCourier
	 *
	*/
	"readCourier" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::readCourier", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::createCourier", [courierName, courierAddress, phoneNumber], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::readCourierAll", [from, to], __options);
	}

	/**
	 * deleteCourier
	 *
	*/
	"deleteCourier" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::deleteCourier", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::updateCourier", [courierName, courierAddress, phoneNumber], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::createCustomer", [customerName, customerAddress, phoneNumber], __options);
	}

	/**
	 * readCustomer
	 *
	*/
	"readCustomer" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::readCustomer", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::submitOrder", [foodId, deliveryAddress], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::readCustomerAll", [from, to], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::acceptDelivery", [deliveryId], __options);
	}

	/**
	 * readCustomerFromId
	 *
	 * @param { (number | string | BN) } customerId,
	*/
	"readCustomerFromId" (
		customerId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::readCustomerFromId", [customerId], __options);
	}

	/**
	 * deleteCustomer
	 *
	*/
	"deleteCustomer" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::deleteCustomer", [], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::updateCustomer", [customerName, customerAddress, phoneNumber], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerServiceImpl::changeFeeRate", [rate], __options);
	}

	/**
	 * getFeeRate
	 *
	*/
	"getFeeRate" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerServiceImpl::getFeeRate", [], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerServiceImpl::getDeliveryAll", [from, to], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerServiceImpl::getOrderAll", [from, to], __options);
	}

	/**
	 * getDelivery
	 *
	 * @param { (number | string | BN) } deliveryId,
	*/
	"getDelivery" (
		deliveryId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerServiceImpl::getDelivery", [deliveryId], __options);
	}

	/**
	 * getOrder
	 *
	 * @param { (number | string | BN) } orderId,
	*/
	"getOrder" (
		orderId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "managerServiceImpl::getOrder", [orderId], __options);
	}

	/**
	 * readRestaurantFromId
	 *
	 * @param { (number | string | BN) } restaurantId,
	*/
	"readRestaurantFromId" (
		restaurantId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::readRestaurantFromId", [restaurantId], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::deliverOrder", [orderId], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::finishCook", [orderId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::updateRestaurant", [restaurantName, restaurantAddress, phoneNumber], __options);
	}

	/**
	 * readRestaurant
	 *
	*/
	"readRestaurant" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::readRestaurant", [], __options);
	}

	/**
	 * deleteRestaurant
	 *
	*/
	"deleteRestaurant" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::deleteRestaurant", [], __options);
	}

	/**
	 * readFood
	 *
	 * @param { (number | string | BN) } foodId,
	*/
	"readFood" (
		foodId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::readFood", [foodId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::createRestaurant", [restaurantName, restaurantAddress, phoneNumber], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::readRestaurantAll", [from, to], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::readFoodAll", [from, to], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::updateFood", [foodId, foodName, foodDescription, foodPrice, foodEta], __options);
	}

	/**
	 * deleteFood
	 *
	 * @param { (number | string | BN) } foodId,
	*/
	"deleteFood" (
		foodId: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::deleteFood", [foodId], __options);
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
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::createFood", [foodName, foodDescription, foodPrice, foodEta], __options);
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
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::confirmOrder", [orderId, eta], __options);
	}

	/**
	 * transferOwnership
	 *
	 * @param { ArgumentTypes.AccountId } newOwner,
	*/
	"transferOwnership" (
		newOwner: ArgumentTypes.AccountId,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::transferOwnership", [newOwner], __options);
	}

	/**
	 * owner
	 *
	*/
	"owner" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::owner", [], __options);
	}

	/**
	 * renounceOwnership
	 *
	*/
	"renounceOwnership" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "ownable::renounceOwnership", [], __options);
	}

	/**
	 * setCodeHash
	 *
	 * @param { ArgumentTypes.Hash } newCodeHash,
	*/
	"setCodeHash" (
		newCodeHash: ArgumentTypes.Hash,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "upgradeable::setCodeHash", [newCodeHash], __options);
	}

}