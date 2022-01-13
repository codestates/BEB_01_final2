// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

interface TokenInterface {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address from,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 amount);
}

contract Token is TokenInterface {
    mapping(address => uint256) private _balances;
    mapping(address => bool) private _check;

    uint256 private _totalSupply;
    string private _name;
    string private _symbol;
    uint256 private _decimals;

    modifier isMint(address account) {
        require(_check[account] == true, "Address without minting");
        _;
    }

    constructor(string memory TokenName_, string memory TokenSymbol_) {
        _name = TokenName_;
        _symbol = TokenSymbol_;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view virtual returns (uint256) {
        return _balances[account];
    }

    function decimals() public view virtual returns (uint8) {
        return 0;
    }

    function name() public view virtual returns (string memory) {
        return _name;
    }

    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    function check(address account) public view returns (bool) {
        return _check[account];
    }

    function mintGold(uint256 amount, address to) public {
        require(to != address(0), "No existed address");
        require(amount > 0);
        _check[to] = true;
        _mintGold(amount, to);
    }

    function _mintGold(uint256 amount, address to) internal {
        _balances[to] += amount;
        _totalSupply += amount;
        emit Transfer(address(0), to, amount);
    }

    function mintGoldAll(address[] memory _to, uint256 amount) public {
        string[] memory _address = new string[](_to.length);
        for (uint256 i = 0; i < _address.length; i++) {
            _balances[_to[i]] += amount;
            _check[_to[i]] = true;
            _totalSupply += amount;
        }
    }

    function transfer(
        address from,
        address recipient,
        uint256 amount
    ) public virtual override isMint(from) isMint(recipient) returns (bool) {
        _transfer(from, recipient, amount);
        emit Transfer(from, recipient, amount);
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

    function _burn(address account, uint256 amount)
        internal
        virtual
        isMint(account)
    {
        require(account != address(0), "ERC20: burn from the zero address");

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    function burn(address account, uint256 amount) external {
        _burn(account, amount);
    }
}
