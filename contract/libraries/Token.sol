// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface TokenInterface {
    function GoldTotalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address recipient, uint256 amount)
        external
        returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Transfer(
        address indexed spender,
        address indexed from,
        address indexed to,
        uint256 amount
    );
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 amount
    );
}

contract Token is TokenInterface {
    mapping(address => uint256) private _GoldBalances;
    mapping(address => mapping(address => uint256)) private _allowances;
    mapping(address => bool) private _check;

    uint256 private _GoldTotalSupply;
    string private _name;
    string private _symbol;

    modifier isMint(address account) {
        require(_check[account] == true, "Address without minting");
        _;
    }

    constructor(string memory TokenName_, string memory TokenSymbol_) {
        _name = TokenName_;
        _symbol = TokenSymbol_;
    }

    function GoldTotalSupply() public view returns (uint256) {
        return _GoldTotalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _GoldBalances[account];
    }

    function allowance(address owner, address spender)
        public
        view
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function check(address account) public view returns (bool) {
        return _check[account];
    }

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal returns (bool) {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
        return true;
    }

    function approve(address spender, uint256 amount)
        external
        virtual
        isMint(msg.sender)
        returns (bool)
    {
        uint256 currentAllownace = _allowances[msg.sender][spender];
        require(
            currentAllownace >= amount,
            "ERC20: Transfer amount exceeds allowance"
        );
        _approve(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external virtual override isMint(msg.sender) returns (bool) {
        _transfer(sender, recipient, amount);
        emit Transfer(msg.sender, sender, recipient, amount);
        uint256 currentAllowance = _allowances[sender][msg.sender];
        require(
            currentAllowance >= amount,
            "ERC20: transfer amount exceeds allowance"
        );
        _approve(sender, msg.sender, currentAllowance - amount);
        return true;
    }

    function mintGold(uint256 amount, address to) public {
        require(to != address(0x0), "No existed address");
        require(amount > 0);
        _check[to] = true;
        _mintGold(amount, to);
    }

    function _mintGold(uint256 amount, address to) internal {
        _GoldBalances[to] += amount;
        _GoldTotalSupply += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function burn(address account, uint256 amount) external {
        _burn(account, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        virtual
        isMint(msg.sender)
    {
        require(account != address(0), "ERC20: burn from the zero address");

        uint256 accountBalance = _GoldBalances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
        unchecked {
            _GoldBalances[account] = accountBalance - amount;
        }
        _GoldTotalSupply -= amount;

        emit Transfer(account, address(0), amount);
    }

    function transfer(address recipient, uint256 amount)
        public
        virtual
        isMint(msg.sender)
        returns (
            // 서버 계정에는 Token을 배포하지 않는다는 생각을 가지고 있어서 이부분도 필요가 없기는 합니다
            bool
        )
    {
        // 서버는 토큰을 가지고 있지 않음
        // 그러기 떄문에 msg.sender를 사용하면 서버 자체는 토큰이 없고 오로지 지급하는 용도이기 때문에
        // 오류가 발생
        // 만약 단순히 gold양을 옮기는 작업하실꺼면 address인자를 두개를 받아서 해당 값을 넣어주어야함
        _transfer(msg.sender, recipient, amount);
        emit Transfer(msg.sender, recipient, amount);
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
            _GoldBalances[sender] >= amount,
            "ERC20: transfer amount exceeds balance"
        );
        _GoldBalances[sender] -= amount;
        _GoldBalances[recipient] += amount;
    }
}
