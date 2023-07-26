import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import FooddeliveryFactory from "../../typedContracts/fooddelivery/constructors/fooddelivery";
import Fooddelivery from "../../typedContracts/fooddelivery/contracts/fooddelivery";
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
      
use(chaiAsPromised);

// Create a new instance of contract
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
// Create a keyring instance
const keyring = new Keyring({ type: "sr25519" });

describe("fooddelivery test", () => {
  let fooddeliveryFactory: FooddeliveryFactory;
  let api: ApiPromise;
  let deployer: KeyringPair;
  let restaurantAccount: KeyringPair;
  let courierAccount: KeyringPair;
  let customerAccount: KeyringPair;

  let contract: Fooddelivery;

  let feeRate = 10;

  before(async function setup(): Promise<void> {
    api = await ApiPromise.create({ provider: wsProvider });
    deployer = keyring.addFromUri("//Alice");
    restaurantAccount = keyring.addFromUri("//Bob");
    courierAccount = keyring.addFromUri("//Charlie");
    customerAccount = deployer;

    fooddeliveryFactory = new FooddeliveryFactory(api, deployer);

    contract = new Fooddelivery(
      (await fooddeliveryFactory.new()).address,
      deployer,
      api
    );

  });

  after(async function tearDown() {
    await api.disconnect();
  });

  describe("Contructor", () => {
    it("Platform is ready", async() => {
      expect((await contract.query.getFeeRate()).value.ok).to.equal(feeRate);
    });
    it("Restaurant A is added", async() => {
      await contract.withSigner(deployer).tx.addRestaurant(restaurantAccount.address, "Restaurant A", "Restaurant A Address", "123456789");

      let allRestaurants = (await contract.query.getRestaurantAll(0, 10)).value.ok
      let restaurantAccountAddress = allRestaurants?.ok?.at(0)?.restaurantAccount;

      expect(restaurantAccountAddress).to.be.equal(restaurantAccount.address);
    });
    it("Courier A is added", async() => {
      await contract.withSigner(deployer).tx.addCourier(courierAccount.address, "Courier A", "Curier A Address", "456123789")

      let allCouriers = (await contract.query.getCourierAll(0, 10)).value.ok
      let courierAccountAddress = allCouriers?.ok?.at(0)?.courierAccount

      expect(courierAccountAddress).to.be.equal(courierAccount.address)
    })
    it("Customer A is added", async() => {
      await contract.withSigner(customerAccount).tx.addCustomer("Customer A", "Customer A Address", "789456123")

      let allCustomers = (await contract.query.getCustomerAll(0, 10)).value.ok
      let customerAccountAddress = allCustomers?.ok?.at(0)?.customerAccount

      expect(customerAccountAddress).to.be.equal(customerAccount.address)
    })
    it("Food A is added", async() => {
      await contract.withSigner(restaurantAccount).tx.addFood("Food A", "Delicious Food", 1000000, 100)

      let allFoods = (await contract.query.getFoodAll(0, 10)).value.ok
      let foodName = allFoods?.ok?.at(0)?.foodName

      expect(foodName).to.be.equal("Food A")
    })
    it("Order is submitted", async() => {
      let balance = await api.query.system.account(contract.address)
      let freeBalance = balance['data']['free']

      await contract.withSigner(customerAccount).tx.submitOrder(1, "Delivery Address A",  {value: 1000000})

      let balanceAfterSubmitOrder = await api.query.system.account(contract.address)
      let freeBalanceAfter = balanceAfterSubmitOrder['data']['free']

      // console.log("freeBalance: ", freeBalance.toString(), "freeBalanceAfer: ", freeBalanceAfter.toString(), "result: ", freeBalanceAfter - freeBalance)
      expect(freeBalanceAfter - freeBalance).to.be.equal(1000000)

      let allOrders = (await contract.query.getOrderAll(0, 10)).value.ok
      let orderDeliveryAddress = allOrders?.ok?.at(0)?.deliveryAddress

      expect(orderDeliveryAddress).to.be.equal("Delivery Address A")
    })
    it("Order is Confirmed", async() => {
      await contract.withSigner(restaurantAccount).tx.confirmOrder(1, 200)

      let allOrders = (await contract.query.getOrderAll(0, 10)).value.ok
      let orderStatus = allOrders?.ok?.at(0)?.status
      let orderEta = allOrders?.ok?.at(0)?.eta

      expect(orderStatus).to.be.equal("OrderConfirmed")
      expect(orderEta).to.be.equal(200)

      let allDeliveries = (await contract.query.getDeliveryAll(0, 10)).value.ok
      let deliveryStatus = allDeliveries?.ok?.at(0)?.status
      
      expect(deliveryStatus).to.be.equal("Waiting")
    })
    it("Food is cooked", async() => {
      let balance = await api.query.system.account(contract.address)
      let freeBalance = balance['data']['free']
      
      await contract.withSigner(restaurantAccount).tx.finishCook(1)

      let balanceAfterSubmitOrder = await api.query.system.account(contract.address)
      let freeBalanceAfter = balanceAfterSubmitOrder['data']['free']

      // console.log("freeBalance: ", freeBalance.toString(), "freeBalanceAfer: ", freeBalanceAfter.toString(), "result: ", freeBalanceAfter - freeBalance)
      expect(freeBalance - freeBalanceAfter).to.be.equal(1000000 * (100 - feeRate) / 100)

      let allOrders = (await contract.query.getOrderAll(0, 10)).value.ok
      let orderStatus = allOrders?.ok?.at(0)?.status

      expect(orderStatus).to.be.equal("FoodPrepared")
    })
    it("Order is Delivered", async() => {
      // await contract.withSigner(restaurantAccount).tx.deliverOrder(1)

      // let allOrders = (await contract.query.getOrderAll(0, 10)).value.ok
      // let orderStatus = allOrders?.ok?.at(0)?.status

      // expect(orderStatus).to.be.equal("FoodDelivered")

      await contract.withSigner(courierAccount).tx.pickupDelivery(1)

      let allDeliveries = (await contract.query.getDeliveryAll(0, 10)).value.ok
      let deliveryStatus = allDeliveries?.ok?.at(0)?.status
      
      expect(deliveryStatus).to.be.equal("PickUp")
    })
    it("Delivery is accepted", async() => {
      let balance = await api.query.system.account(contract.address)
      let freeBalance = balance['data']['free']
      
      await contract.withSigner(restaurantAccount).tx.deliverOrder(1)

      let allOrders = (await contract.query.getOrderAll(0, 10)).value.ok
      let orderStatus = allOrders?.ok?.at(0)?.status

      expect(orderStatus).to.be.equal("FoodDelivered")

      await contract.withSigner(customerAccount).tx.acceptDelivery(1)

      let balanceAfterSubmitOrder = await api.query.system.account(contract.address)
      let freeBalanceAfter = balanceAfterSubmitOrder['data']['free']

      // console.log("freeBalance: ", freeBalance.toString(), "freeBalanceAfer: ", freeBalanceAfter.toString(), "result: ", freeBalanceAfter - freeBalance)
      expect(freeBalance - freeBalanceAfter).to.be.equal(1000000 * feeRate / 100)

      let allDeliveries = (await contract.query.getDeliveryAll(0, 10)).value.ok
      let deliveryStatus = allDeliveries?.ok?.at(0)?.status

      expect(deliveryStatus).to.be.equal("Accept")
    })
  });
});
