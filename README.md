# FoodOrder Smart Contract

This smart contract called`FoodOrder`is developed using ink! language and OpenBrush tools. Please refer to this [article](https://medium.com/@opensmartcontract/learn-ink-by-example-order-food-on-blockchain-a4024b2dee4a) about this project, use case definition, implementation and macros, security and access control, deployment and testing details. 

## Code structure
`FoodOrder` smart contract ink code consists of the following directories: 

- logic
    ##### The main smart contract logic implementing the FoodOrder use case
- src
    ##### The main `lib.rs` file exists in here 
- crud-macro
    ##### Here you can see the macros implemented into the smart contract
- proxy
    ##### This smart contract is for smart contract upgrades
    
# Test the smart contract

To test e2e functionality

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

### To run a node

```
swanky node start
```

# Deploy it to Shibuya network 

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
Contract address: Yn1dHJTbKuMhA6rLLsRXQtDu4mSFGC6xtvDTueNz1axJ5Dz
```

After successfully deployed, you can check the deployed contract on the `shibuya` blockexplorer `https://shibuya.subscan.io/`.

![/main/bin/deploy_to_shibuya.png](https://github.com/InkSmartContract/foodorder-smartcontract/blob/main/bin/deploy_to_shibuya.png)

For steo by step guide on how to deploy and interact with the smart contract, please refer to [this document](https://github.com/InkSmartContract/foodorder-smartcontract/blob/main/ink!%20Smart%20Contract%20Deployment%20and%20Interactions.pdf) with screenshots.

# Using docker image

If you want to test the smart contract in docker image, run following command.

```
docker build --tag=foodorder .                                          // build a docker image
docker image tag foodorder:latest fpleader/opensmartcontract:latest     // rename the tag
docker run -t -d --name=opensmartcontract fpleader/opensmartcontract    // make a docker container
docker ps -a                                                            // list docker containers
docker exec -it opensmartcontract bash                                  // get into the docker container's terminal 
swanky contract test foodorder                                          // test foodorder contract
```

## you can build image by pulling from docker hub
docker image is pushed to fpleader/opensmartcontract:latest 
Build the image by following command.

```
docker image pull fpleader/opensmartcontract:latest
```

Please refer to this [article](https://medium.com/@opensmartcontract/learn-ink-by-example-order-food-on-blockchain-a4024b2dee4a) for more infomration about this example, use case definition, implementation with macros, security and access control, deployment and testing details, as well as next steps. You are more than welcome to contribute to this open source project!
