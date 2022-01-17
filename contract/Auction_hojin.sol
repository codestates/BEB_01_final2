// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;
import "./libraries/NFT.sol";
import "./libraries/Token.sol";

interface Auction_test {
    function Bid(
        uint256 price,
        address _address,
        uint256 room_number
    ) external returns (bool);

    function make_trade(
        address _owner,
        uint256 _price,
        uint256 _item
    ) external returns (bool);

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
    enum Status {
        // 게임의 상태
        start,
        delling,
        end
    }

    address private seller;
    address private buyer;

    uint256 private ID;
    uint256 private highestPrice;
    uint256 private total_Room_Number = 1;

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
        Status status;
    }

    constructor(address token, address nft) {
        gold = Token(token);
        item = NFT(nft);
        // 경매를 진행하려면 실제로 NFT가 만들어 져 있어야 한다.
    }

    // NFT : 0xBadfD494aE497b430931E1be3Fe82CFAd1e73D5F
    // Token : 0xa01C03D44F7bF135254B9D1aB4740F08d5fE3dcA

    function make_trade(
        address _owner,
        uint256 _price,
        uint256 _item
    ) public returns (bool) {
        require(item.ownerOf(_item) == _owner, "not your Item!!!");
        Room_Number[total_Room_Number] = Room({
            seller: _owner,
            buyer: address(0x0),
            price: _price,
            product: _item,
            status: Status.start
        });
        check_room[total_Room_Number] = true;
        NFT_Room_number[_item] = total_Room_Number;
        total_Room_Number++;
        emit make_trade_event(_owner, _price, _item);
        return true;
    }

    function Bid(
        uint256 price,
        address _buyer,
        uint256 Room_number
    ) public returns (bool) {
        uint256 balance = gold.balanceOf(_buyer);
        require(price < balance, "price exceeds balance");
        require(check_room[Room_number] == true, "No existed Room!!!");
        Room storage room = Room_Number[Room_number];
        require(room.price < price, "need to be higher than highest price");
        require(room.status != Status.end, "already end delling");
        room.buyer = _buyer;
        room.price = price;
        room.status = Status.delling;
        emit BidEvent(price, _buyer);
        return true;
    }

    function trade(uint256 room_number) public returns (bool) {
        require(check_room[room_number] == true, "No existed Room!!!");
        Room storage room = Room_Number[room_number];
        require(room.status == Status.delling, "Not yet delling!!");
        uint256 fee = room.price / 10;
        uint256 amount = room.price - fee;
        gold.transfer(room.buyer, room.seller, amount);
        gold.transfer(room.buyer, msg.sender, fee);
        item.transferFrom(room.seller, room.buyer, room.product);
        room.status = Status.end;
        emit trade_end(room.seller, room.buyer, room.price);
        emit trade_end_tax(room_number, fee);
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
}
