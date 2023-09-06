# BlockchainFoodOrder Smart Contract

## Project intro

Please refer to this [Medium article](https://medium.com/@opensmartcontract/learn-ink-by-example-order-food-on-blockchain-a4024b2dee4a) about this project, use case definition, implementation and macros, security and access control, deployment and testing details. 

## Code structure

The BlockchainFoodOrder smart contract is developed in ink! language and OpenBrush tools. The smart contract code has the following directory structure: 

```bash
.
├── crud-macro                      # define macros for create/read/update/delete item
├── logic                           # define main logic for blockchain foodorder
│ ├── helpers                       # define declaretive macros
│ ├── traits                        # define traits
│ │ └── events                      # define events
│ ├── impls                         # define implementations of every service
│ │ ├── courier_service
│ │ ├── customer_service
│ │ ├── manager_service
│ │ ├── payment_service
│ │ ├── restaurant_service
│ │ ├── data
│ │ └── shared
├── src                             # define main smart contract file
```

## Dev Dependencies

```
rust: rustc 1.72.0 (5680fa18f 2023-08-23)
cargo: cargo 1.72.0 (103a7ff2e 2023-08-15)
cargo contract: cargo-contract-contract 3.2.0-unknown-x86_64-unknown-linux-gnu
swanky cli: swanky-cli 3.0.4 linux-x64
swanky node: swanky node version 1.6.0
```

## Testing the smart contract

### Run ink-E2E tests (works with swanky node version 1.6.0):

```
cargo test --features e2e-tests
```

### Run E2E, Security and Performance tests:

```
swanky contract test foodorder
```

You can see this following results if you had happy pass.

```
foodorder test
    Main Functionality
      ✔ Platform is ready
      ✔ Restaurant A is added (...ms)
      ✔ Courier A is added (...ms)
      ✔ Customer A is added (...ms)
      ✔ Food A is added (...ms)
      ✔ Order is submitted (...ms)
      ✔ Order is Confirmed (...ms)
      ✔ Food is cooked and Payment is transferred to restaurant (...ms)
      ✔ Order is Delivered (...ms)
      ✔ Delivery is accepted and Payment is sent to courier (...ms) 

    10 passing (4s)
```

### Running the node

```
swanky node start --tmp
```

## Testing with docker image

If you want to test the smart contract using docker image, please run following command.

```
docker build --tag=foodorder .                                          // build a docker image
docker image tag foodorder:latest fpleader/opensmartcontract:latest     // rename the tag
docker run -t -d --name=opensmartcontract fpleader/opensmartcontract    // make a docker container
docker ps -a                                                            // list docker containers
docker exec -it opensmartcontract bash                                  // get into the docker container's terminal 
swanky contract test foodorder                                          // test foodorder contract
```

### you can build image by pulling from docker hub
docker image is pushed to fpleader/opensmartcontract:latest 
Build the image by following command.

```
docker image pull fpleader/opensmartcontract:latest
```

# Deploy BlockchainFoodOrder smart contract to the Shibuya network 

Shiden Network is a multi-chain decentralized application layer on Kusama Network. Shibuya is the Shiden’s parachain testnet with EVM functionalities. We choose it for deployment as Shiden supports EVM, Wasm, and Layer2 solutions. 

```
swanky contract deploy foodorder --account deploy --gas 100000 --network shibuya
```

Here is the happy result.

```
✔ Initialising OK
✔ Getting WASM OK
⠸ Connecting to node2023-08-11 11:47:18        API/INIT: shibuya/105: Not decorating runtime apis without matching versions: EthereumRuntimeRPCApi/5 (4 known)
✔ Connecting to node OK
✔ Deploying OK
✔ Writing config OK
Contract deployed!
```

Once the BlockchainFoorOrder smart contract is deployed, you can check the deployed contract on the [shibuya blockexplorer](https://shibuya.subscan.io/). Here's the address of a successfully deployed contract instance on Shibuya at address: YezJmtfEtFowEBto53VCpkLGhvFXtpe88frPW1q1z7Y2jUd.


# Interact with the BlockchainFoodOrder smart contract

Before you are trying to execute a transaction, you will need to get native tokens from a [faucet](https://portal.astar.network/shibuya-testnet/assets#/star/assets). For detailed steo-by-step guide on how to deploy and interact with the smart contract, please refer to the [BlockchainFoodOrder Smart Contract Deployment and Interactions Guide](https://github.com/InkSmartContract/BlockchainFoodOrder/blob/main/BlockchainFoodOrder%20Smart%20Contract%20Deployment%20and%20Interactions%20Guide.pdf). 


# Next Steps

The project has been made open source under the Apache 2.0 license, inviting both web2 and web3 developer communities to access and contribute to it. Please refer to this [Medium article](https://medium.com/@opensmartcontract/learn-ink-by-example-order-food-on-blockchain-a4024b2dee4a) for more infomration about this example, use case definition, implementation with macros, security and access control, deployment and testing details, as well as next steps. This article will be split into three parts. The first part covers the use case and the implementation of ink! with macros. Upcoming part 2 will focus on upgradability, and part 3 will benchmark the performance, measure binary footprints, and optimize gas costs in different ink! optimization variations. 

Keep an eye out for the upcoming articles and feel free to provide feedback, suggestions, and contributions to the community!


