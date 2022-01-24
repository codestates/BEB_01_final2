// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;
import "./libraries/Token.sol";
import "./libraries/NFT.sol";

interface char {
    event NewUser(
        address indexed owner,
        uint256 indexed Pow,
        uint256 indexed limit
    );
    event TokenPurchased(
        address indexed account,
        uint256 indexed amount,
        address indexed server
    );
}

contract onlyOwner {
    address public owner;
    mapping(address => bool) public checkUser;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyowner() {
        require(msg.sender == owner, "Not Owner!!");
        _;
    }
    modifier isOwner(address _address) {
        require(checkUser[_address] == true);
        _;
    }
}

contract Character is NFT("item", "ITM"), char, onlyOwner {
    mapping(address => Characters) private _Character;
    Token public gold;
    uint256 PowFee = 30;
    uint256 limitFee = 50;

    struct Characters {
        uint32 Pow;
        uint32 limit;
    }

    constructor(address token) {
        gold = Token(token);
    }

    function buyTokens() public payable {
        require(msg.sender != address(0x0), "No Existed address");

        uint256 tokenAmount = msg.value / 100000000000;

        gold.mintGold(tokenAmount, msg.sender);

        address payable p_owner = payable(owner);
        p_owner.transfer(msg.value);

        emit TokenPurchased(msg.sender, tokenAmount, owner);
    }

    function goldMint(address to, uint256 amount) public onlyowner {
        gold.mintGold(amount, to);
    }

    function NFTminting(address to, string memory URI) public onlyowner {
        NFT.mintNFT(to, URI);
    }

    function goldTransfer(
        address from,
        address to,
        uint256 amount
    ) public {
        gold.transfer(from, to, amount);
    }

    function goldBurn(address account, uint256 amount) public onlyowner {
        gold.burn(account, amount);
    }

    function goldmintAll(address[] memory account, uint256 amount)
        public
        onlyowner
    {
        gold.mintGoldAll(account, amount);
    }

    function makeCharacter(address _address) public onlyowner returns (bool) {
        require(checkUser[_address] == false);
        checkUser[_address] = true;
        Characters storage character = _Character[_address];
        character.Pow = 1;
        character.limit = 300;

        emit NewUser(_address, character.Pow, character.limit);
        return true;
    }

    function IncreaseLimit(address _address)
        public
        isOwner(_address)
        onlyowner
    {
        require(goldBalanceOf(_address) >= limitFee);
        goldBurn(_address, limitFee);

        Characters storage character = _Character[_address];
        character.limit += 300;
    }

    function IncreasePow(address _address, uint256 _value)
        public
        isOwner(_address)
        onlyowner
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

    function goldTotalSupply() public view returns (uint256) {
        return gold.totalSupply();
    }

    function goldBalanceOf(address account) public view returns (uint256) {
        return gold.balanceOf(account);
    }

    function goldCheck(address account) public view returns (bool) {
        return gold.check(account);
    }

    function show_character_owner() public view returns (address) {
        return owner;
    }
}
