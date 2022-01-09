// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

interface TokenInterface {
    function GoldTotalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address spender, address recipient, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Transfer(address indexed spender, address indexed from, address indexed to, uint256 amount);
    event NFTtransfer(address indexed from, address indexed to, uint256 id);
    event Approval(address indexed owner, address indexed spender, uint256 oldAmount, uint256 amount);
}

contract Token is TokenInterface {
    mapping (address => uint256) private _GoldBalances;
    mapping (address => uint256) private _NFTbalances;
    mapping (address => mapping (address => uint256)) public _allowances;
    mapping (uint256 => address) public _owner;
    mapping(uint256 => string) private _tokenURIs;

    uint256 public _GoldTotalSupply;
    uint256 public _NftTotalSupply;
    uint256 public _NFTid;
    string public _name;
    string public _symbol;
    string public _NFTname;
    string public _NFTsymbol = "DES";
    
    function _mintGold(uint256 amount) private {
        _GoldBalances[msg.sender] += amount;
        _GoldTotalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    function mintGold(uint amount) public{
        setName("gold");
        setSymbol("GOLD");
        _mintGold(amount);
    }

    function mintNFT(address to, string memory TokenURI) public{
        setName("item");
        setSymbol("ITEM");
        _mintNFT(to, TokenURI);
    }

    function _mintNFT(address to, string memory TokenURI) private{
        _NFTid++;
        _owner[_NFTid] = to;
        _NftTotalSupply++;
        _NFTbalances[to]++;
        _tokenURIs[_NFTid] = TokenURI;
        emit NFTtransfer(address(0), to, _NFTid);
    }
    
    function setName(string memory name) private {
         _name = name;
    }
    
    function setSymbol(string memory symbol) private {
         _symbol = symbol;
    }
    
    
    function GoldTotalSupply() external view virtual override returns (uint256) {
        return _GoldTotalSupply;
    }
    
    function balanceOf(address account) external view virtual override returns (uint256) {
        return _GoldBalances[account];
    }
    
    function transfer(address recipient, uint amount) public virtual override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }
    
    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint amount) external virtual override returns (bool) {
        uint256 currentAllownace = _allowances[msg.sender][spender];
        require(currentAllownace >= amount, "ERC20: Transfer amount exceeds allowance");
        _approve(msg.sender, spender, currentAllownace, amount);
        return true;
    }
    
    function transferFrom(address sender, address recipient, uint256 amount) external virtual override returns (bool) {
        _transfer(sender, recipient, amount);
        emit Transfer(msg.sender, sender, recipient, amount);
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, msg.sender, currentAllowance, currentAllowance - amount);
        return true;
    }
    
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        uint256 senderBalance = _GoldBalances[sender];
        require(senderBalance >= amount, "ERC20: transfer amount exceeds balance");
        _GoldBalances[sender] = senderBalance - amount;
        _GoldBalances[recipient] += amount;
    }
    
    function _approve(address owner, address spender, uint256 currentAmount, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        require(currentAmount == _allowances[owner][spender], "ERC20: invalid currentAmount");
        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, currentAmount, amount);
    }
}
