// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;
import "./libraries/NFT.sol";
import "./libraries/Token.sol";

interface Auction_test {
    function Bid(
        uint256 price,
        address _address,
        uint256 room_number
    ) external returns (bool);

    function make_trade(uint256 _price, uint256 _item) external returns (bool);

    event BidEvent(uint256 indexed price, address indexed _address);
    event make_trade_event(
        address indexed _owner,
        uint256 indexed _price,
        uint256 indexed _item
    );
    event trade_end(
        address indexed _owner,
        address indexed _buyer,
        uint256 indexed _price
    );
    event trade_end_tax(uint256 indexed _number, uint256 indexed tax);
}

contract Auction is Auction_test {
    address private seller;
    address private buyer;

    uint256 private ID;
    uint256 private highestPrice;

    // 거래가 이루어지는 방을 의미
    mapping(uint256 => Room) private Room_Number;
    // 존재하는 방 인지를 확인
    mapping(uint256 => bool) private check_room;
    // 들어오는 nft의 번호에 해당하는 room_number를 반환
    mapping(uint256 => uint256) private NFT_Room_number;

    Token private gold;
    NFT private item;

    struct Room {
        address seller;
        address buyer;
        uint256 price;
        uint256 product;
    }

    constructor(address token, address nft) {
        gold = Token(token);
        item = NFT(nft);
        // 경매를 진행하려면 실제로 NFT가 만들어 져 있어야 한다.
    }

    // NFT : 0x0032CBe48F72230A41DFE0143E03B2bf7CdfD569
    // Token : 0x1DB0364Cf880eA18dBc2DD1B26961e32980bFacD

    function make_trade(uint256 _price, uint256 _item)
        public
        override
        returns (bool)
    {
        require(item.ownerOf(_item) != address(0x0), "not your Item!!!");
        Room_Number[_item] = Room({
            seller: item.ownerOf(_item),
            buyer: address(0x0),
            price: _price,
            product: _item
        });
        check_room[_item] = true;
        emit make_trade_event(item.ownerOf(_item), _price, _item);
        return true;
    }

    function Bid(
        uint256 price,
        address _buyer,
        uint256 Room_number
    ) public override returns (bool) {
        uint256 balance = gold.balanceOf(_buyer);
        require(price < balance, "price exceeds balance");
        require(check_room[Room_number] == true, "No existed Room!!!");
        Room storage room = Room_Number[Room_number];
        require(room.price < price, "need to be higher than highest price");
        room.buyer = _buyer;
        room.price = price;
        emit BidEvent(price, _buyer);
        return true;
    }

    function test(address _add) public view returns (uint256) {
        return gold.balanceOf(_add);
    }

    function trade(uint256 room_number) public returns (bool) {
        require(check_room[room_number] == true, "No existed Room!!!");
        Room storage room = Room_Number[room_number];
        uint256 fee = room.price / 10;
        uint256 amount = room.price - fee;
        gold.transfer(room.buyer, room.seller, amount);
        gold.transfer(room.buyer, msg.sender, fee);
        item.transferFrom(room.seller, room.buyer, room.product);
        emit trade_end(room.seller, room.buyer, room.price);
        emit trade_end_tax(room_number, fee);
        return true;
    }

    function tradeOff(uint256 room_number) public returns (bool) {
        check_room[room_number] = false;
        return true;
    }

    function showRoom(uint256 room_number) public view returns (Room memory) {
        require(check_room[room_number] == true, "No existed Room!!!");
        return Room_Number[room_number];
    }

    function highest(uint256 room_number) public view returns (uint256) {
        require(check_room[room_number] == true, "No existed Room!!!");
        Room memory room = Room_Number[room_number];
        return room.price;
    }

    function showBuyer(uint256 room_number) public view returns (address) {
        require(check_room[room_number] == true, "No existed Room!!!");
        Room memory room = Room_Number[room_number];
        return room.buyer;
    }

    function showSeller(uint256 room_number) public view returns (address) {
        require(check_room[room_number] == true, "No existed Room!!!");
        Room memory room = Room_Number[room_number];
        return room.seller;
    }

    function showNFT(uint256 token_id) public view returns (address) {
        return item.ownerOf(token_id);
    }
}
