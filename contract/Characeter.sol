// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;
import "./libraries/Token.sol";
import "./libraries/NFT.sol";

contract Character is NFT("item", "ITM") {
    Token private gold;
    uint256 PowFee = 30;
    uint256 limitFee = 50;

    constructor(address token) {
        gold = Token(token);
    }

    function goldTotalSupply() public view returns (uint256) {
        return gold.totalSupply();
    }

    function goldBalanceOf(address account) public view returns (uint256) {
        return gold.balanceOf(account);
    }

    function goldCheck(address account) public view returns (bool) {
        return gold.check(account);
    }

    function goldMint(address to, uint256 amount) public {
        gold.mintGold(amount, to);
    }

    function goldTransfer(
        address from,
        address to,
        uint256 amount
    ) public {
        gold.transfer(from, to, amount);
    }

    function goldBurn(address account, uint256 amount) public {
        gold.burn(account, amount);
    }

    function mintAll(address[] memory account, uint256 amount) public {
        gold.mintGoldAll(account, amount);
    }

    modifier isOwner(address _address) {
        require(checkUser[_address] == true);
        _;
    }
    event NewUser(
        address indexed owner,
        uint256 indexed Pow,
        uint256 indexed limit
    );

    mapping(address => bool) private checkUser;
    mapping(address => Characters) private _Character;

    struct Characters {
        uint32 Pow;
        uint32 limit;
    }

    function makeCharacter(address _address) public returns (bool) {
        require(checkUser[_address] == false);
        checkUser[_address] = true;
        Characters storage character = _Character[_address];
        character.Pow = 1;
        character.limit = 300;

        emit NewUser(_address, character.Pow, character.limit);
        return true;
    }

    function IncreaseLimit(address _address) public isOwner(_address) {
        require(goldBalanceOf(_address) >= limitFee);
        goldBurn(_address, limitFee);

        Characters storage character = _Character[_address];
        character.limit += 300;
    }

    function IncreasePow(address _address, uint256 _value)
        public
        isOwner(_address)
    {
        require(goldBalanceOf(_address) >= PowFee);
        goldBurn(_address, PowFee);

        Characters storage character = _Character[_address];
        character.Pow += uint32(_value);
    }

    function getPow(address _address)
        public
        view
        isOwner(_address)
        returns (uint32)
    {
        Characters storage character = _Character[_address];
        return character.Pow;
    }

    function getLimit(address _address)
        public
        view
        isOwner(_address)
        returns (uint32)
    {
        Characters storage character = _Character[_address];
        return character.limit;
    }

    function getUser(address _address)
        public
        view
        isOwner(_address)
        returns (Characters memory)
    {
        return _Character[_address];
    }

    function getRandomNumber() internal view returns (uint256) {
        uint256 total = goldTotalSupply();
        return uint256(keccak256(abi.encodePacked(msg.sender, total))) % 100;
    }

    function getStatus() public view returns (uint256) {
        return getRandomNumber() % 10;
    }

    // 0xa241D7B42dc1B6DbC561EF98a5129D2f1155bfFe
}
