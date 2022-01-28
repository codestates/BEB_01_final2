

// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;

interface TokenInterface {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 amount);
}

contract Token is TokenInterface {
    mapping(address => uint256) private _balances;
    mapping(address => bool) private _check;

    uint256 private Token_totalSupply  = 100000000000000000000000;
    string private _name;
    string private _symbol;
    uint256 private _decimals;

    constructor(string memory TokenName_, string memory TokenSymbol_) {
        _name = TokenName_;
        _symbol = TokenSymbol_;
        _balances[address(this)] = Token_totalSupply;
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function transfer(
        address recipient,
        uint256 amount
    ) external virtual override returns (bool) {
        _transfer(address(this), recipient, amount);
        emit Transfer(address(this), recipient, amount);
        return true;
    }

    function transfer_Token_to_Ether(address seller, uint256 amount) external returns(bool){
        _transfer(seller, address(this), amount);

        emit Transfer(seller, address(this), amount);
        return true;
    }
    
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(
            _balances[sender] >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        _balances[sender] -= amount;
        _balances[recipient] += amount;
    }

    function transferfrom(address recipient, address sender, uint256 amount) external{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(_balances[sender] >= amount,  "ERC20: transfer amount exceeds balance");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
    }

     function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function showSymbol() public view returns (string memory) {
        return _symbol;
    }

    function totalSupply() public view override returns (uint256) {
        return Token_totalSupply;
    }

}

