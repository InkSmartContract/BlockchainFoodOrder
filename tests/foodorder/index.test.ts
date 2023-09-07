import { expect, use } from "chai";
import chaiAsPromised from "chai-as-promised";
import FoodorderFactory from "../../typedContracts/foodorder/constructors/foodorder"
import FoodOrder from "../../typedContracts/foodorder/contracts/foodorder"
import { ApiPromise, WsProvider, Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";
      
use(chaiAsPromised);

// Create a new instance of contract
const wsProvider = new WsProvider("ws://127.0.0.1:9944");
// Create a keyring instance
const keyring = new Keyring({ type: "sr25519" });

describe("foodorder test", () => {
  let foodorderfactory: FoodorderFactory;
  let api: ApiPromise;
  let deployer: KeyringPair;
  let restaurantAccount: KeyringPair;
  let courierAccount: KeyringPair;
  let customerAccount: KeyringPair;

  let contract: FoodOrder;

  let feeRate = 10;

  before(async function setup(): Promise<void> {
    api = await ApiPromise.create({ provider: wsProvider });
    deployer = keyring.addFromUri("//Alice");
    restaurantAccount = keyring.addFromUri("//Bob");
    courierAccount = keyring.addFromUri("//Charlie");
    customerAccount = deployer;

    foodorderfactory = new FoodorderFactory(api, deployer);

    contract = new FoodOrder(
      (await foodorderfactory.new()).address,
      deployer,
      api
    );

  });

  after(async function tearDown() {
    await api.disconnect();
  });

  describe("Main Functionality", () => {
    it("Platform is ready", async() => {
      expect((await contract.query.getFeeRate()).value.ok?.ok).to.equal(feeRate)
    });
    it("Restaurant A is added", async() => {
      await contract.withSigner(restaurantAccount).tx.createRestaurant("Restaurant A", "Restaurant A Address", "123456789")

      let allRestaurants = (await contract.query.readRestaurantAll(0, 10)).value.ok
      let restaurantName = allRestaurants?.ok?.at(0)?.restaurantName

      expect(restaurantName).to.be.equal("Restaurant A")
    });
    it("Courier A is added", async() => {
      await contract.withSigner(courierAccount).tx.createCourier("Courier A", "Curier A Address", "456123789")

      let allCouriers = (await contract.query.readCourierAll(0, 10)).value.ok
      let courierName = allCouriers?.ok?.at(0)?.courierName

      expect(courierName).to.be.equal("Courier A")
    })
    it("Customer A is added", async() => {
      await contract.withSigner(customerAccount).tx.createCustomer("Customer A", "Customer A Address", "789456123")

      let allCustomers = (await contract.query.readCustomerAll(0, 10)).value.ok
      let customerName = allCustomers?.ok?.at(0)?.customerName

      expect(customerName).to.be.equal("Customer A")
    })
    it("Food A is added", async() => {
      await contract.withSigner(restaurantAccount).tx.createFood("Food A", "Delicious Food", 1000000, 100)

      let allFoods = (await contract.query.readFoodAll(0, 10)).value.ok
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
    it("Food is cooked and Payment is transferred to restaurant", async() => {
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
      
      expect(deliveryStatus).to.be.equal("PickedUp")
    })
    it("Delivery is accepted and Payment is sent to courier", async() => {
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

      expect(deliveryStatus).to.be.equal("Accepted")
    })
  });
});
