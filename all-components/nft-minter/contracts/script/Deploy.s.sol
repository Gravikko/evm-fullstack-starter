// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Script.sol";
import "../src/SimpleNFT.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        SimpleNFT nft = new SimpleNFT(msg.sender);
        console.log("Contract deployed at:", address(nft));

        vm.stopBroadcast();
    }
}
