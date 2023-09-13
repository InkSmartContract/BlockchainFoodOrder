import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export type Courier = {
	courierId: (number | string | BN),
	courierAccount: AccountId,
	courierName: string,
	courierAddress: string,
	phoneNumber: string
}

export interface FoodOrderError {
	ownableError ? : OwnableError,
	callerIsNotCustomer ? : null,
	callerIsNotOrderOwner ? : null,
	callerIsNotFoodOwner ? : null,
	notSamePrice ? : null,
	callerAlreadyExist ? : null,
	callerIsNotAppropriate ? : null,
	notExist ? : null,
	invalidNameLength ? : null,
	invalidAddressLength ? : null,
	invalidPhoneNumberLength ? : null,
	invalidDescriptionLength ? : null,
	orderStatusNotDelivered ? : null,
	orderStatusNotConfirmed ? : null,
	orderStatusNotPrepared ? : null,
	deliveryStatusNotWaiting ? : null,
	deliveryStatusNotPickUp ? : null,
	notTransfered ? : null,
	invalidParameters ? : null,
	invalidRate ? : null
}

export class FoodOrderErrorBuilder {
	static OwnableError(value: OwnableError): FoodOrderError {
		return {
			ownableError: value,
		};
	}
	static CallerIsNotCustomer(): FoodOrderError {
		return {
			callerIsNotCustomer: null,
		};
	}
	static CallerIsNotOrderOwner(): FoodOrderError {
		return {
			callerIsNotOrderOwner: null,
		};
	}
	static CallerIsNotFoodOwner(): FoodOrderError {
		return {
			callerIsNotFoodOwner: null,
		};
	}
	static NotSamePrice(): FoodOrderError {
		return {
			notSamePrice: null,
		};
	}
	static CallerAlreadyExist(): FoodOrderError {
		return {
			callerAlreadyExist: null,
		};
	}
	static CallerIsNotAppropriate(): FoodOrderError {
		return {
			callerIsNotAppropriate: null,
		};
	}
	static NotExist(): FoodOrderError {
		return {
			notExist: null,
		};
	}
	static InvalidNameLength(): FoodOrderError {
		return {
			invalidNameLength: null,
		};
	}
	static InvalidAddressLength(): FoodOrderError {
		return {
			invalidAddressLength: null,
		};
	}
	static InvalidPhoneNumberLength(): FoodOrderError {
		return {
			invalidPhoneNumberLength: null,
		};
	}
	static InvalidDescriptionLength(): FoodOrderError {
		return {
			invalidDescriptionLength: null,
		};
	}
	static OrderStatusNotDelivered(): FoodOrderError {
		return {
			orderStatusNotDelivered: null,
		};
	}
	static OrderStatusNotConfirmed(): FoodOrderError {
		return {
			orderStatusNotConfirmed: null,
		};
	}
	static OrderStatusNotPrepared(): FoodOrderError {
		return {
			orderStatusNotPrepared: null,
		};
	}
	static DeliveryStatusNotWaiting(): FoodOrderError {
		return {
			deliveryStatusNotWaiting: null,
		};
	}
	static DeliveryStatusNotPickUp(): FoodOrderError {
		return {
			deliveryStatusNotPickUp: null,
		};
	}
	static NotTransfered(): FoodOrderError {
		return {
			notTransfered: null,
		};
	}
	static InvalidParameters(): FoodOrderError {
		return {
			invalidParameters: null,
		};
	}
	static InvalidRate(): FoodOrderError {
		return {
			invalidRate: null,
		};
	}
}

export enum OwnableError {
	callerIsNotOwner = 'CallerIsNotOwner',
	newOwnerIsZero = 'NewOwnerIsZero'
}

export type Customer = {
	customerId: (number | string | BN),
	customerAccount: AccountId,
	customerName: string,
	customerAddress: string,
	phoneNumber: string
}

export type Delivery = {
	deliveryId: (number | string | BN),
	orderId: (number | string | BN),
	restaurantId: (number | string | BN),
	customerId: (number | string | BN),
	courierId: (number | string | BN),
	status: DeliveryStatus
}

export enum DeliveryStatus {
	waiting = 'Waiting',
	pickedUp = 'PickedUp',
	accepted = 'Accepted'
}

export type Order = {
	orderId: (number | string | BN),
	foodId: (number | string | BN),
	restaurantId: (number | string | BN),
	customerId: (number | string | BN),
	courierId: (number | string | BN),
	deliveryId: (number | string | BN),
	deliveryAddress: string,
	status: OrderStatus,
	timestamp: (number | string | BN),
	price: (string | number | BN),
	eta: (number | string | BN)
}

export enum OrderStatus {
	orderSubmitted = 'OrderSubmitted',
	orderDeclined = 'OrderDeclined',
	orderConfirmed = 'OrderConfirmed',
	foodPrepared = 'FoodPrepared',
	foodDelivered = 'FoodDelivered',
	deliveryAccepted = 'DeliveryAccepted'
}

export type Restaurant = {
	restaurantId: (number | string | BN),
	restaurantAccount: AccountId,
	restaurantName: string,
	restaurantAddress: string,
	phoneNumber: string
}

export type Food = {
	foodId: (number | string | BN),
	foodName: string,
	restaurantId: (number | string | BN),
	foodDescription: string,
	foodPrice: (string | number | BN),
	foodEta: (number | string | BN)
}

export type Hash = string | number[]

export interface UpgradeableError {
	custom ? : string,
	setCodeHashFailed ? : null,
	ownableError ? : OwnableError,
	accessControlError ? : AccessControlError
}

export class UpgradeableErrorBuilder {
	static Custom(value: string): UpgradeableError {
		return {
			custom: value,
		};
	}
	static SetCodeHashFailed(): UpgradeableError {
		return {
			setCodeHashFailed: null,
		};
	}
	static OwnableError(value: OwnableError): UpgradeableError {
		return {
			ownableError: value,
		};
	}
	static AccessControlError(value: AccessControlError): UpgradeableError {
		return {
			accessControlError: value,
		};
	}
}

export enum AccessControlError {
	invalidCaller = 'InvalidCaller',
	missingRole = 'MissingRole',
	roleRedundant = 'RoleRedundant'
}

