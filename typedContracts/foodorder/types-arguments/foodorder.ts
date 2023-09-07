import type BN from 'bn.js';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface FoodOrderError {
	ownableError ? : OwnableError,
	callerIsNotFoodOwner ? : null,
	callerIsNotManager ? : null,
	callerIsNotCustomer ? : null,
	callerIsNotRestaurant ? : null,
	callerIsNotCourier ? : null,
	callerIsNotCustomerOrder ? : null,
	callerIsNotRestaurantOrder ? : null,
	callerIsNotRestaurantFood ? : null,
	notSamePrice ? : null,
	alreadyExist ? : null,
	notExist ? : null,
	orderIsNotDelivered ? : null,
	orderIsNotConfirmed ? : null,
	deliveryIsAlreadyPickUp ? : null,
	foodNotExist ? : null,
	orderNotExist ? : null,
	deliveryNotExist ? : null,
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
	static CallerIsNotFoodOwner(): FoodOrderError {
		return {
			callerIsNotFoodOwner: null,
		};
	}
	static CallerIsNotManager(): FoodOrderError {
		return {
			callerIsNotManager: null,
		};
	}
	static CallerIsNotCustomer(): FoodOrderError {
		return {
			callerIsNotCustomer: null,
		};
	}
	static CallerIsNotRestaurant(): FoodOrderError {
		return {
			callerIsNotRestaurant: null,
		};
	}
	static CallerIsNotCourier(): FoodOrderError {
		return {
			callerIsNotCourier: null,
		};
	}
	static CallerIsNotCustomerOrder(): FoodOrderError {
		return {
			callerIsNotCustomerOrder: null,
		};
	}
	static CallerIsNotRestaurantOrder(): FoodOrderError {
		return {
			callerIsNotRestaurantOrder: null,
		};
	}
	static CallerIsNotRestaurantFood(): FoodOrderError {
		return {
			callerIsNotRestaurantFood: null,
		};
	}
	static NotSamePrice(): FoodOrderError {
		return {
			notSamePrice: null,
		};
	}
	static AlreadyExist(): FoodOrderError {
		return {
			alreadyExist: null,
		};
	}
	static NotExist(): FoodOrderError {
		return {
			notExist: null,
		};
	}
	static OrderIsNotDelivered(): FoodOrderError {
		return {
			orderIsNotDelivered: null,
		};
	}
	static OrderIsNotConfirmed(): FoodOrderError {
		return {
			orderIsNotConfirmed: null,
		};
	}
	static DeliveryIsAlreadyPickUp(): FoodOrderError {
		return {
			deliveryIsAlreadyPickUp: null,
		};
	}
	static FoodNotExist(): FoodOrderError {
		return {
			foodNotExist: null,
		};
	}
	static OrderNotExist(): FoodOrderError {
		return {
			orderNotExist: null,
		};
	}
	static DeliveryNotExist(): FoodOrderError {
		return {
			deliveryNotExist: null,
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

export type Courier = {
	courierId: (number | string | BN),
	courierAccount: AccountId,
	courierName: string,
	courierAddress: string,
	phoneNumber: string
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

