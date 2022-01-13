// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;
import "./libraries/NFT.sol";
import "./libraries/Token.sol";

contract Auction{

    struct Bid{
        bytes32 id;
        uint deposit;
    }
    
    enum Phase {Init, Bidding, Open, Done}
    
    mapping(address => Bid) bid;
    mapping(address => uint) Return;

    Phase public state = Phase.Init;
    address owner;
    address public buyer;
    uint public startPrice;
    uint public highestPrice = 0;

    modifier validPhase(Phase phase){
        require(state == phase);
        _;
    }

    modifier isOwner(){
        require(msg.sender == owner);
        _;
    }

    Token private gold;
    NFT private item;

    constructor(address token, address nft, uint itemID, uint price){
        gold = Token(token);
        item = NFT(nft);
        owner = item.ownerOf(itemID);
        startPrice = price;
        state = Phase.Bidding;
    }

    function nextState() public isOwner{
        if(state == Phase.Done) revert();
        if(state == Phase.Init)
            state = Phase.Bidding;
        else if(state == Phase.Bidding)
            state = Phase.Open;
        else
            state = Phase.Done;
    }
    


}
