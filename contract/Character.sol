//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./libraries/NFT.sol";
import "./libraries/Token.sol";

contract normalCharacter is NFT("TEST", "TEST_NFT"), Token("gold", "GOLD") {
    Token gold;

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
    mapping(address => Character) private _Character;

    struct Character {
        uint32 Pow;
        uint32 limit;
    }

    function makeCharacter(address _address) public returns (bool) {
        require(checkUser[_address] == false);
        checkUser[_address] = true;
        Character storage character = _Character[_address];
        character.Pow = 300;
        character.limit = 300;

        emit NewUser(_address, character.Pow, character.limit);

        return true;
    }

    function IncreaseLimit(address _address) public isOwner(_address) {
        Character storage character = _Character[_address];
        character.limit += 300;
    }

    function IncreasePow(address _address) public isOwner(_address) {
        Character storage character = _Character[_address];
        character.Pow += 300;
    }

    function getPow(address _address)
        public
        view
        isOwner(_address)
        returns (uint32)
    {
        Character storage character = _Character[_address];
        return character.Pow;
    }

    function getLimit(address _address)
        public
        view
        isOwner(_address)
        returns (uint32)
    {
        Character storage character = _Character[_address];
        return character.limit;
    }

    function getUser(address _address)
        public
        view
        isOwner(_address)
        returns (Character memory)
    {
        return _Character[_address];
    }

    function setToken(address tokenAddress) public returns (bool) {
        require(tokenAddress != address(0x0));
        gold = Token(tokenAddress);
        return true;
    }
}
