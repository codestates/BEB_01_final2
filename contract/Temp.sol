// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;
import "./libraries/Token.sol";
import "./libraries/NFT.sol";

contract Temp is NFT("item", "ITM"){

    Token private gold;

    constructor(address token) {
        gold = Token(token);
    }
    
    function goldTotalSupply() public view returns(uint256){
        return gold.totalSupply();
    }
    
    function goldBalanceOf(address account) public view returns (uint256) {
        return gold.balanceOf(account);
    }

    function goldCheck(address account) public view returns(bool){
        return gold.check(account);
    }

    function goldMint(address to, uint256 amount) public{
        gold.mintGold(amount, to);
    }

    function goldTransfer(address from, address to, uint256 amount)public {
        gold.transfer(from, to, amount);
    }

    function goldBurn(address account, uint256 amount) public{
        gold.burn(account, amount);
    }
    function goldMintAll(address[] memory accounts){
        
    }



}