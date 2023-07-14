import type * as EventTypes from '../event-types/fooddelivery';
import type {ContractPromise} from "@polkadot/api-contract";
import type {ApiPromise} from "@polkadot/api";
import EVENT_DATA_TYPE_DESCRIPTIONS from '../event-data/fooddelivery.json';
import {getEventTypeDescription} from "../shared/utils";
import {handleEventReturn} from "@727-ventures/typechain-types";

export default class EventsClass {
	private __nativeContract : ContractPromise;
	private __api : ApiPromise;

	constructor(
		nativeContract : ContractPromise,
		api : ApiPromise,
	) {
		this.__nativeContract = nativeContract;
		this.__api = api;
	}

	public subscribeOnSubmitOrderEventEvent(callback : (event : EventTypes.SubmitOrderEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('SubmitOrderEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.SubmitOrderEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'SubmitOrderEvent');
	}

	public subscribeOnAcceptDeliveryEventEvent(callback : (event : EventTypes.AcceptDeliveryEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AcceptDeliveryEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AcceptDeliveryEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AcceptDeliveryEvent');
	}

	public subscribeOnAddFoodEventEvent(callback : (event : EventTypes.AddFoodEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AddFoodEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AddFoodEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AddFoodEvent');
	}

	public subscribeOnUpdateFoodEventEvent(callback : (event : EventTypes.UpdateFoodEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('UpdateFoodEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.UpdateFoodEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'UpdateFoodEvent');
	}

	public subscribeOnConfirmOrderEventEvent(callback : (event : EventTypes.ConfirmOrderEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('ConfirmOrderEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.ConfirmOrderEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'ConfirmOrderEvent');
	}

	public subscribeOnRequestDeliveryEventEvent(callback : (event : EventTypes.RequestDeliveryEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('RequestDeliveryEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.RequestDeliveryEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'RequestDeliveryEvent');
	}

	public subscribeOnFinishCookEventEvent(callback : (event : EventTypes.FinishCookEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('FinishCookEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.FinishCookEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'FinishCookEvent');
	}

	public subscribeOnDeliverFoodEventEvent(callback : (event : EventTypes.DeliverFoodEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('DeliverFoodEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.DeliverFoodEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'DeliverFoodEvent');
	}

	public subscribeOnPickUpDeliveryEventEvent(callback : (event : EventTypes.PickUpDeliveryEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('PickUpDeliveryEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.PickUpDeliveryEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'PickUpDeliveryEvent');
	}

	public subscribeOnAddCourierEventEvent(callback : (event : EventTypes.AddCourierEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AddCourierEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AddCourierEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AddCourierEvent');
	}

	public subscribeOnAddRestaurantEventEvent(callback : (event : EventTypes.AddRestaurantEvent) => void) {
		const callbackWrapper = (args: any[], event: any) => {
			const _event: Record < string, any > = {};

			for (let i = 0; i < args.length; i++) {
				_event[event.args[i]!.name] = args[i]!.toJSON();
			}

			callback(handleEventReturn(_event, getEventTypeDescription('AddRestaurantEvent', EVENT_DATA_TYPE_DESCRIPTIONS)) as EventTypes.AddRestaurantEvent);
		};

		return this.__subscribeOnEvent(callbackWrapper, (eventName : string) => eventName == 'AddRestaurantEvent');
	}


	private __subscribeOnEvent(
		callback : (args: any[], event: any) => void,
		filter : (eventName: string) => boolean = () => true
	) {
		// @ts-ignore
		return this.__api.query.system.events((events) => {
			events.forEach((record: any) => {
				const { event } = record;

				if (event.method == 'ContractEmitted') {
					const [address, data] = record.event.data;

					if (address.toString() === this.__nativeContract.address.toString()) {
						const {args, event} = this.__nativeContract.abi.decodeEvent(data);

						if (filter(event.identifier.toString()))
							callback(args, event);
					}
				}
			});
		});
	}

}