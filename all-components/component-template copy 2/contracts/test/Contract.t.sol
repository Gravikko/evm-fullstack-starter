// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/Contract.sol";

contract MyContractTest is Test {
    MyContract public myContract;

    function setUp() public {
        myContract = new MyContract();
    }

    function testExample() public {
        assertTrue(true);
    }
}
