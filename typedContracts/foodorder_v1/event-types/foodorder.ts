import type {ReturnNumber} from "@727-ventures/typechain-types";
import type * as ReturnTypes from '../types-returns/foodorder';

export interface SubmitOrderEvent {
	orderId: number;
	customerAccount: ReturnTypes.AccountId;
}

export interface ConfirmOrderEvent {
	orderId: number;
	eta: number;
}

export interface ReqeustDeliveryEvent {
	deliveryId: number;
	orderId: number;
}

export interface DeliverFoodEvent {
	orderId: number;
}

export interface FinishCookEvent {
	orderId: number;
}

export interface PickupDeliveryEvent {
	deliveryId: number;
	courierId: number;
}

export interface AcceptDeliveryEvent {
	deliveryId: number;
	orderId: number;
}

