import type BN from 'bn.js';
import type {ReturnNumber} from '@727-ventures/typechain-types';

export type AccountId = string | number[]

export enum LangError {
	couldNotReadInput = 'CouldNotReadInput'
}

export interface FoodOrderError {
	ownableError ? : OwnableError,
	callerIsNotManager ? : null,
	callerIsNotCustomer ? : null,
	callerIsNotRestaurant ? : null,
	callerIsNotCourier ? : null,
	callerIsNotCustomerOrder ? : null,
	callerIsNotRestaurantOrder ? : null,
	callerIsNotRestaurantFood ? : null,
	notSamePrice ? : null,
	customerAlreadyExist ? : null,
	restaurantAlreadyExist ? : null,
	courierAlreadyExist ? : null,
	orderIsNotDelivered ? : null,
	orderIsNotConfirmed ? : null,
	deliveryIsAlreadyPickUp ? : null,
	foodNotExist ? : null,
	orderNotExist ? : null,
	deliveryNotExist ? : null,
	customerNotExist ? : null,
	restaurantNotExist ? : null,
	courierNotExist ? : null,
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
	static CustomerAlreadyExist(): FoodOrderError {
		return {
			customerAlreadyExist: null,
		};
	}
	static RestaurantAlreadyExist(): FoodOrderError {
		return {
			restaurantAlreadyExist: null,
		};
	}
	static CourierAlreadyExist(): FoodOrderError {
		return {
			courierAlreadyExist: null,
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
	static CustomerNotExist(): FoodOrderError {
		return {
			customerNotExist: null,
		};
	}
	static RestaurantNotExist(): FoodOrderError {
		return {
			restaurantNotExist: null,
		};
	}
	static CourierNotExist(): FoodOrderError {
		return {
			courierNotExist: null,
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

export type Delivery = {
	orderId: number,
	restaurantId: number,
	customerId: number,
	courierId: number,
	deliveryAddress: string,
	status: DeliveryStatus,
	timestamp: number
}

export enum DeliveryStatus {
	waiting = 'Waiting',
	pickedUp = 'PickedUp',
	accepted = 'Accepted'
}

export type Restaurant = {
	restaurantAccount: AccountId,
	restaurantName: string,
	restaurantAddress: string,
	phoneNumber: string
}

export type Order = {
	foodId: number,
	restaurantId: number,
	customerId: number,
	courierId: number,
	deliveryAddress: string,
	status: OrderStatus,
	timestamp: number,
	price: ReturnNumber,
	eta: number
}

export enum OrderStatus {
	orderSubmitted = 'OrderSubmitted',
	orderConfirmed = 'OrderConfirmed',
	foodPrepared = 'FoodPrepared',
	foodDelivered = 'FoodDelivered',
	deliveryAcceptted = 'DeliveryAcceptted'
}

export type Food = {
	foodName: string,
	restaurantId: number,
	description: string,
	price: ReturnNumber,
	eta: number,
	timestamp: number
}

export type Courier = {
	courierAccount: AccountId,
	courierName: string,
	courierAddress: string,
	phoneNumber: string
}

export type Customer = {
	customerAccount: AccountId,
	customerName: string,
	customerAddress: string,
	phoneNumber: string
}

