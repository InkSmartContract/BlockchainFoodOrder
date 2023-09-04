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
	 * deleteCourier
	 *
	*/
	"deleteCourier" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::deleteCourier", [], __options);
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
	 * readCourier
	 *
	*/
	"readCourier" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "courierServiceImpl::readCourier", [], __options);
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
	 * deleteCustomer
	 *
	*/
	"deleteCustomer" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::deleteCustomer", [], __options);
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
	 * readCustomer
	 *
	*/
	"readCustomer" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "customerServiceImpl::readCustomer", [], __options);
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
	 * deleteRestaurant
	 *
	*/
	"deleteRestaurant" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::deleteRestaurant", [], __options);
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
	 * readRestaurant
	 *
	*/
	"readRestaurant" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "restaurantServiceImpl::readRestaurant", [], __options);
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
	 * grantRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"grantRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::grantRole", [role, account], __options);
	}

	/**
	 * revokeRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"revokeRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::revokeRole", [role, account], __options);
	}

	/**
	 * renounceRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } account,
	*/
	"renounceRole" (
		role: (number | string | BN),
		account: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::renounceRole", [role, account], __options);
	}

	/**
	 * hasRole
	 *
	 * @param { (number | string | BN) } role,
	 * @param { ArgumentTypes.AccountId | null } address,
	*/
	"hasRole" (
		role: (number | string | BN),
		address: ArgumentTypes.AccountId | null,
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::hasRole", [role, address], __options);
	}

	/**
	 * getRoleAdmin
	 *
	 * @param { (number | string | BN) } role,
	*/
	"getRoleAdmin" (
		role: (number | string | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__apiPromise, this.__nativeContract, "accessControl::getRoleAdmin", [role], __options);
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