// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;
import "./libraries/NFT.sol";
import "./libraries/Token.sol";

contract Auction2 {
    enum Phase {
        Init,
        Bidding,
        Done
    }
    address owner;

    struct auction {
        address seller;
        address buyer;
        uint256 id;
        uint256 price;
        Phase state;
    }

    auction[] auctions;

    modifier validPhase(uint256 id, Phase phase) {
        require(auctions[id].state == phase);
        _;
    }

    // modifier isSeller(){
    //     require(msg.sender == seller);
    //     _;
    // }

    Token private gold;
    NFT private item;

    constructor(address token, address nft) {
        gold = Token(token);
        item = NFT(nft);
    }

    mapping(uint256 => uint256) private AuctionNum;
    mapping(uint256 => bool) private isReg;
    uint256 counter = 0;

    function makeAuction(uint256 id, uint256 price) public {
        require(isReg[id] == false, "already registered");
        address seller = item.ownerOf(id);
        auctions.push(auction(seller, seller, id, price, Phase.Bidding));
        AuctionNum[id] = counter++;
        isReg[id] = true;
    }

    function nextState(uint256 id) public {
        uint256 num = AuctionNum[id];
        if (auctions[num].state == Phase.Done) revert();
        if (auctions[num].state == Phase.Init)
            auctions[num].state = Phase.Bidding;
        else {
            auctions[num].state = Phase.Done;
            trade(id);
        }
    }

    function Bid(
        uint256 id,
        address bidder,
        uint256 price
    ) public validPhase(id, Phase.Bidding) {
        uint256 num = AuctionNum[id];
        uint256 balance = gold.balanceOf(bidder);
        require(price < balance, "price exceeds balance");
        require(
            price < auctions[num].price,
            "need to be higher than highest price"
        );
        auctions[num].price = price;
        auctions[num].buyer = bidder;
    }

    function showPrice(uint256 id) public view returns (uint256) {
        uint256 num = AuctionNum[id];
        return auctions[num].price;
    }

    function showBuyer(uint256 id) public view returns (address) {
        uint256 num = AuctionNum[id];
        return auctions[num].buyer;
    }

    function showSeller(uint256 id) public view returns (address) {
        uint256 num = AuctionNum[id];
        return auctions[num].seller;
    }

    function trade(uint256 id) public validPhase(id, Phase.Done) {
        require(item.ownerOf(id) == showSeller(id), "seller is not owner");
        uint256 fee = (showPrice(id) * 5) / 100;
        address seller = showSeller(id);
        address buyer = showBuyer(id);
        gold.transfer(buyer, owner, fee);
        gold.transfer(buyer, seller, showPrice(id) - fee);
        item.transferFrom(seller, buyer, id);
        isReg[id] = false;
    }
}
