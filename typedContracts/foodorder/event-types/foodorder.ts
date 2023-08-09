import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/foodorder';

export interface SubmitOrderEvent {
	orderId: number;
	foodId: number;
	restaurantId: number;
	customerId: number;
	deliveryAddress: string;
	phoneNumber: string;
}

export interface AcceptDeliveryEvent {
	deliveryId: number;
	orderId: number;
}

export interface AddFoodEvent {
	foodId: number;
	foodName: string;
	restaurantId: number;
	description: string;
	price: ReturnNumber;
	eta: number;
}

export interface UpdateFoodEvent {
	foodId: number;
	foodName: string;
	description: string;
	price: ReturnNumber;
	eta: number;
}

export interface ConfirmOrderEvent {
	orderId: number;
	eta: number;
}

export interface RequestDeliveryEvent {
	orderId: number;
	restaurantId: number;
	customerId: number;
	deliveryAddress: string;
	eta: number;
}

export interface FinishCookEvent {
	orderId: number;
}

export interface DeliverFoodEvent {
	orderId: number;
	restaurantId: number;
	customerId: number;
	courierId: number;
}

export interface PickUpDeliveryEvent {
	deliveryId: number;
	courierId: number;
}

export interface AddCourierEvent {
	courierId: number;
	courierName: string;
	courierAddress: string;
	phoneNumber: string;
}

export interface AddRestaurantEvent {
	restaurantId: number;
	restaurantName: string;
	restaurantAddress: string;
	phoneNumber: string;
}

