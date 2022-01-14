// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;
import "./libraries/NFT.sol";
import "./libraries/Token.sol";

contract Auction{
    
    enum Phase {Init, Bidding, Done}

    Phase public state = Phase.Init;
    address owner;
    address seller;
    address public buyer;
    uint public ID;
    uint public startPrice;
    uint public highestPrice = 0;

    modifier validPhase(Phase phase){
        require(state == phase);
        _;
    }

    modifier isSeller(){
        require(msg.sender == seller);
        _;
    }

    Token private gold;
    NFT private item;

    constructor(address token, address nft, uint itemID, uint price){
        gold = Token(token);
        item = NFT(nft);
        ID = itemID;
        seller = item.ownerOf(ID);
        startPrice = price;
        state = Phase.Bidding;
    }

    function nextState() public{
        if(state == Phase.Done) revert();
        if(state == Phase.Init)
            state = Phase.Bidding;
        else{
            state = Phase.Done;
            trade();
        }
            
    }

    function Bid(uint price) public validPhase(Phase.Bidding){
        uint balance = gold.balanceOf(msg.sender);
        require(price < balance, "price exceeds balance");
        require(price < highestPrice, "need to be higher than highest price");
        buyer = msg.sender;
    }

    function highest() public view returns(uint256){
        return highestPrice;
    }

    function showBuyer() public view returns(address){
        return buyer;
    }

    function showSeller() public view returns(address){
        return seller;
    }

    function trade() public validPhase(Phase.Done){
        require(item.ownerOf(ID) == seller, "seller is not owner");
        uint fee = highestPrice * 5 / 100;
        gold.transfer(buyer, owner, fee);
        gold.transfer(buyer, seller, highestPrice - fee);
        item.transferFrom(seller, buyer, ID);
    }
}
