# FoodOrder Smart Contract

This smart contract called `FoodOrder` is developed using ink! language and OpenBrush tools.

## Structure
`FoodOrder` contract consists of 4 parts

- crud-macro
    ##### Here you can see the macros implemented into the smart contract
- logic
    ##### Here you can see the main logic of the smart contract
- proxy
    ##### This smart contract is for upgradability
- src
    ##### The main `lib.rs` file exists in here 

# Test the smart contract

To test it's functionality, run this following command after running a node.

```
swanky contract test foodorder
```

You can see this following results if you had happy pass.

```
foodorder test
    Contructor
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

Make sure that you have to run a local node before deploying it to Shibuya network.

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
Contract address: ZkedUUC36pznjiVPUtDDnijU3jQokAmxxSnpr3DnegGM893
```

After successfully deployed, you can check the deployed contract on the `shibuya` blockexplorer `https://shibuya.subscan.io/`.

![/main/bin/deploy_to_shibuya.png](https://github.com/InkSmartContract/foodorder-smartcontract/blob/main/bin/deploy_to_shibuya.png)


# Using docker image

If you want to test the smart contract in docker image, run following command.

```
docker build --tag=foodorder .                              // build a docker image
docker run -t -d --name=opensmartcontract foodorder         // make a docker container
docker ps -a                                                // list docker containers
docker exec -it opensmartcontract bash                      // get into the docker container's terminal 
swanky contract test foodorder                              // test foodorder contract
```

## you can build image from tarball
```
cat dockerimage.tar | docker import - foodorder:latest
```
