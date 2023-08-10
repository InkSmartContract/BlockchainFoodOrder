# FoodOrder Smart Contract

This smart contract called `FoodOrder` is developed using ink! language and OpenBrush tools.

# Test

To test it's functionality, run this following command after running a node.

```
swanky contract test foodorder
```

### To run a node

```
swanky node start
```

# Using docker image

If you want to test the smart contract in docker image, run following command.

```
docker build --tag=foodorder .
docker run --name=foodorder --rm --detach foodorder
swanky contract test foodorder
```

# Deploy it to Shibuya network

```
swanky contract deploy foodorder --account deploy --gas 100000 --network shibuya
```

After successfully deployed, you can check the deployed contract on the `shibuya` blockexplorer `https://shibuya.subscan.io/`.