
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

    event Token_Transfer_All(address[] indexed account, uint256 indexed value);

    event Token_Sell(address indexed account, uint256 indexed amount, address indexed server);
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

    function showOwner() public view returns(address){
        return owner;
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
        // 단위 계산이 wei로 들어오기 때문에 나눠준다.
        uint256 tokenAmount = msg.value / 100000000000;

        gold.transfer(msg.sender, tokenAmount);

        address payable p_owner = payable(owner);
        p_owner.transfer(msg.value);

        emit TokenPurchased(msg.sender, tokenAmount, owner);
    }

    function sellTokens(uint256 value, address seller) public payable onlyowner {
        // 중앙화된 서버 객체가 실행 시켜야 한다
        // payable함수 이기 떄문에 eth를 함께 전송해 주어야 한다.
        // 값 계산은 back_end에서 이루어 지게 구성하였다.
        gold.transfer_Token_to_Ether(seller, value);
        // 단위를 eth로 전송을 할 것이기 떄문에 value에서 나눠준다.

        address payable p_owner = payable(seller);
        p_owner.transfer(msg.value);

        emit Token_Sell(msg.sender, msg.value, owner);
    }

    function NFTminting(address to, string memory URI) public onlyowner {
        NFT.mintNFT(to, URI);
    }

    function Gold_transfer(address to,uint256 amount) public onlyowner{
        gold.transfer(to, amount);
    }

    function Gold_transferfrom(address recipient, address sender, uint256 value) public {
        // auction에서 사용되는 부분
        // 사용자간에 토큰 이동을 지원
        gold.transferfrom(recipient, sender, value);
    }

    function goldmintAll(address[] memory account, uint256 amount)public onlyowner{
        for(uint256 i=0; i<account.length; i++){
            Gold_transfer(account[i], amount);
        }
        emit Token_Transfer_All(account, amount);
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
        Gold_transfer(address(gold), limitFee);

        Characters storage character = _Character[_address];
        character.limit += 300;
    }

    function IncreasePow(address _address, uint256 _value)
        public
        isOwner(_address)
        onlyowner
    {
        require(goldBalanceOf(_address) >= PowFee);
         Gold_transfer(address(gold), PowFee);

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
}

