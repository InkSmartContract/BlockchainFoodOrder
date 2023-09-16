import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";

import FoodOrderFactoryV1 from "../../typedContracts/foodorder_v1/constructors/foodorder"
import FoodOrderV1 from "../../typedContracts/foodorder_v1/contracts/foodorder"

import FoodorderFactoryV2 from "../../typedContracts/foodorder/constructors/foodorder"
import FoodOrderV2 from "../../typedContracts/foodorder/contracts/foodorder"

import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
      
use(chaiAsPromised);

// Create a new instance of contract
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
// Create a keyring instance
const keyring = new Keyring({ type: "sr25519" });

describe('Upgradeable', () => {
    let api : ApiPromise;
    let deployer: KeyringPair;
    let foodorderFactory_V1: FoodOrderFactoryV1;
    let contract_V1: FoodOrderV1;
    let foodorderFactory_V2: FoodorderFactoryV2;
    let contract_V2: FoodOrderV2;

    let customer: KeyringPair;
    let restaurant: KeyringPair;

    before(async function setup(): Promise<void> {
        api = await ApiPromise.create({provider: wsProvider})

        deployer = keyring.addFromUri("//Alice");
        customer = keyring.addFromUri("//Bob");
        restaurant = keyring.addFromUri("//Charlie");
        
        foodorderFactory_V1 = new FoodOrderFactoryV1(api, deployer);
        const contractAddress = (await foodorderFactory_V1.new()).address;
        // contract_V1 = new FoodOrderV1((await foodorderFactory_V1.new()).address, deployer, api);
        contract_V1 = new FoodOrderV1(contractAddress, deployer, api);

        foodorderFactory_V2 = new FoodorderFactoryV2(api, deployer);
        await foodorderFactory_V2.new();
        contract_V2 = new FoodOrderV2(contractAddress, deployer, api);
        // contract_V2 = new FoodOrderV2((await foodorderFactory_V2.new()).address, deployer, api);
    });

    after(async function tearDown() {
        await api.disconnect();
    });

    it('Upgrade with set_code_hash', async() => {

        await contract_V1.withSigner(customer).tx.createCustomer("Bob", "BobAddress", "1234579");
        await contract_V1.withSigner(restaurant).tx.createRestaurant("Charlie", "CharlieAddress", "12345234");
        await contract_V1.withSigner(restaurant).tx.createFood("Food A", "Description A", 100, 600);
        await contract_V1.withSigner(customer).tx.submitOrder(1, "10 Main St", {value: 100});

        const codeHash = Array.from(contract_V2.abi.info.source.wasmHash);
        await contract_V1.withSigner(deployer).tx.setCodeHash(codeHash);

        let food = (await contract_V2.query.readFood(1)).value;
        expect(food.ok?.ok?.foodName).to.be.equal("Food A")
    })
    describe('Check whether the old data remains', async() => {
        it('Check the restaurant', async() => {
            let restaurantData = (await contract_V2.withSigner(restaurant).query.readRestaurant()).value;
            expect(restaurantData.ok?.ok?.restaurantName).to.be.eq("Charlie");
        });

        it('Check the customer', async() => {
            let customerData = (await contract_V2.withSigner(customer).query.readCustomer()).value;
            expect(customerData.ok?.ok?.customerName).to.be.eq("Bob");
        });

        it('Check the order', async() => {
            let order = (await contract_V2.query.getOrder(1)).value;
            expect(order.ok?.ok?.deliveryAddress).to.be.eq("10 Main St");
        });
    })
    it('Create new food', async() => {
        await contract_V2.withSigner(restaurant).tx.createFood("Food B", "Description B", 200, 600);

        let food = (await contract_V2.query.readFood(2)).value.ok?.ok;
        expect(food?.foodName).to.be.equal("Food B")
    })
    it('Submit new orders', async() => {
        await contract_V2.withSigner(customer).tx.submitOrder(2, "20 Wall St", {value:200});

        let order = (await contract_V2.query.getOrder(2)).value;
        expect(order.ok?.ok?.deliveryAddress).to.be.eq("20 Wall St");
    })
    it('Confirm an order', async() => {
        let result = await contract_V2.withSigner(restaurant).tx.confirmOrder(1, 200)
      
        const isOrderConfirmed = (events) => {
            let flag = true
            events.forEach(event => {
            if (event.name === 'DeclineOrderEvent') {
                flag = false
            }
            });
            return flag
        }

        while (isOrderConfirmed(result.events) == false) {
            result = await contract_V2.withSigner(restaurant).tx.confirmOrder(1, 200)
        }

        let allOrders = (await contract_V2.query.getOrderAll(0, 10)).value.ok
        let orderStatus = allOrders?.ok?.at(0)?.status
        let orderEta = allOrders?.ok?.at(0)?.eta         

        expect(orderStatus).to.be.equal("OrderConfirmed")
        expect(orderEta).to.be.equal(200)

        let allDeliveries = (await contract_V2.query.getDeliveryAll(0, 10)).value.ok
        let deliveryStatus = allDeliveries?.ok?.at(0)?.status
        
        expect(deliveryStatus).to.be.equal("Waiting")
    })
    it('Decline an order', async() => {
        let result = await contract_V2.withSigner(restaurant).tx.confirmOrder(2, 200)
      
        const isOrderConfirmed = (events) => {
            let flag = true
            events.forEach(event => {
            if (event.name === 'DeclineOrderEvent') {
                flag = false
            }
            });
            return flag
        }

        while (isOrderConfirmed(result.events) == true) {
            result = await contract_V2.withSigner(restaurant).tx.confirmOrder(2, 200)
        }

        let order = (await contract_V2.query.getOrder(2)).value.ok
        let orderStatus = order?.ok?.status

        expect(orderStatus).to.be.equal("OrderDeclined")
    })
})