// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

interface TokenInterface {
    function GoldTotalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Transfer(address indexed spender, address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);
}

contract Token is TokenInterface {
    mapping(address => uint256) private _GoldBalances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) private _check;

    uint256 private _GoldTotalSupply;
    string private _name = "gold";
    string private _symbol = "GOLD";

    modifier isMint(address account){
        require(_check[account] == true, "Address without minting");
        _;
    }
    constructor(string memory TokenName_, string memory TokenSymbol_){
        _name = TokenName_;
        _symbol = TokenSymbol_;
    }

    function GoldTotalSupply() public view returns (uint256) {
        return _GoldTotalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _GoldBalances[account];
    }

    function allowance(address owner, address spender)public view returns (uint256)
    {
        return _allowances[owner][spender];
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function check(address account) public view returns(bool){
        return _check[account];
    }

    function mintGold(uint256 amount, address to)public {
        require(to != address(0), "No existed address");
        require(amount > 0);
        _check[to] = true;
        _mintGold(amount, to);
    }

    function _mintGold(uint256 amount, address to) internal {
        _GoldBalances[to] += amount;
        _GoldTotalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function transfer(address recipient, uint amount) public virtual override isMint(msg.sender) returns (bool) {
        _transfer(msg.sender, recipient, amount);
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    

    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        //uint256 senderBalance = _GoldBalances[sender];
        require(
            _GoldBalances[sender] >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        // 일단 goldBalances를 갱신해 준다.
        _GoldBalances[sender] -= amount;
        _GoldBalances[recipient] += amount;
        // 그후 _allowances값도 똑같이 갱신해 준다.
        // _allowances[sender][checkCA] -= amount;
        // _allowances[recipient][checkCA] += amount;
    }

  

    function _approve(address owner, address spender, uint256 amount) internal  returns (bool){
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
        return true;
    }

     function approve(address spender, uint amount) external virtual isMint(msg.sender) isMint(msg.sender) returns (bool) {
        uint256 currentAllownace = _allowances[msg.sender][spender];
        require(currentAllownace >= amount, "ERC20: Transfer amount exceeds allowance");
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external virtual override isMint(msg.sender)
    returns (bool) {
        _transfer(sender, recipient, amount);
        emit Transfer(msg.sender, sender, recipient, amount);
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance - amount);
        return true;
    }

    function _burn(address account, uint256 amount) internal virtual isMint(msg.sender){
        require(account != address(0), "ERC20: burn from the zero address");

        uint256 accountBalance = _GoldBalances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _GoldBalances[account] = accountBalance - amount;
        }
        _GoldTotalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    function burn(address account, uint256 amount) external{
        _burn(account, amount);
    }
   
}
