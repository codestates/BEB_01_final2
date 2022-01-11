// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;
import "./libraries/Token.sol";
import "./libraries/NFT.sol";

contract Temp is Token("gold", "GOLD"), NFT("item", "ITM") {
    constructor() {}

    function name() public view override(Token, NFT) returns (string memory) {
        return Token.name();
    }

    function symbol() public view override(Token, NFT) returns (string memory) {
        return Token.symbol();
    }

    function NFTname() public view returns (string memory) {
        return super.name();
    }

    function NFTsymbol() public view returns (string memory) {
        return super.symbol();
    }
}
