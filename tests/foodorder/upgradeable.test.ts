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

    before(async function setup(): Promise<void> {
        api = await ApiPromise.create({provider: wsProvider})

        deployer = keyring.addFromUri("//Alice");
        
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

        const customer = keyring.addFromUri("//Bob");
        const restaurant = keyring.addFromUri("//Charlie");

        await contract_V1.withSigner(customer).tx.createCustomer("Bob", "BobAddress", "1234579");
        await contract_V1.withSigner(restaurant).tx.createRestaurant("Charlie", "CharlieAddress", "12345234");
        await contract_V1.withSigner(restaurant).tx.createFood("Food A", "Description A", 100, 600);

        const codeHash = Array.from(contract_V2.abi.info.source.wasmHash);
        await contract_V1.withSigner(deployer).tx.setCodeHash(codeHash);

        let food = (await contract_V2.query.readFood(1)).value.ok?.ok;
        expect(food?.foodName).to.be.equal("Food A")

        await contract_V2.withSigner(restaurant).tx.createFood("Food B", "Description B", 150, 300);
        let foods = (await contract_V2.query.readFoodAll(0, 10)).value.ok;
        expect(foods?.ok?.length).to.be.equal(2);
    })
})