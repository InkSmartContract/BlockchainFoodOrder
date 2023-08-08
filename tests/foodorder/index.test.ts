import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import FoodorderFactory from "./typedContract/constructors/foodorder";
import Foodorder from "./typedContract/contracts/foodorder";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";

use(chaiAsPromised);

// Create a new instance of contract
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
// Create a keyring instance
const keyring = new Keyring({ type: "sr25519" });

describe("foodorder test", () => {
  let foodorderFactory: FoodorderFactory;
  let api: ApiPromise;
  let deployer: KeyringPair;
  
  let contract: Foodorder;
  const initialState = true;

  before(async function setup(): Promise<void> {
    api = await ApiPromise.create({ provider: wsProvider });
    deployer = keyring.addFromUri("//Alice");

    foodorderFactory = new FoodorderFactory(api, deployer);

    contract = new Foodorder(
      (await foodorderFactory.new(initialState)).address,
      deployer,
      api
    );
  });

  after(async function tearDown() {
    await api.disconnect();
  });
});
