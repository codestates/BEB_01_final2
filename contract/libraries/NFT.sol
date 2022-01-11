// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721 is IERC165 {
    function NFTbalanceOf(address owner)
        external
        view
        returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function NFTtransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function NFTapprove(address to, uint256 tokenId) external;

    function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);

    // event NFTTransfer(address indexed from, address indexed to, uint256 indexed tokenId);
    // event NFTApproval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    // event NFTApprovalForAll(address indexed owner, address indexed operator, bool approved);
}

import "./Token.sol";

contract NFT {
    string private NFT_name;
    string private NFT_symbol;

    constructor(string memory name_, string memory symbol_) {
        NFT_name = name_;
        NFT_symbol = symbol_;
    }

    function NFTname() public view returns (string memory) {
        return NFT_name;
    }

    function NFTsymbol() public view returns (string memory) {
        return NFT_symbol;
    }

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;
    uint256 NFTtotalSupply = 0;

    // 단순히 주소에 nft가 몇개 있는지 확인
    function NFTbalanceOf(address owner) public view returns (uint256) {
        require(
            owner != address(0),
            "ERC721: balance query for the zero address"
        );
        return _balances[owner];
    }

    // nft마다 고유의 번호가 있고 해당 번호에 맞게 누가 주인인지 확인
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(
            owner != address(0),
            "ERC721: owner query for nonexistent token"
        );
        return owner;
    }

    // 일단 기본적으로 NFT에 주인이 있어야함 - 민팅이 되어 있어야함
    // NFT의 주인을 확인하고 일단 NFT의 주인은 함수를 실행하는 주체여야 한다
    // 아니면 함수를 실행하는 주체와 _approve를 설정할 상대방과 isApprovedForAll관계가 있어야 한다.
    // 이후 _tokenApprovals를 통해서 NFT번호 값에 주소를 할당
    function NFTapprove(address to, uint256 tokenId) public {
        address owner = NFT.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    // 단순히 해당 NFT에 approval이 있는지를 확인
    function getApproved(uint256 tokenId) public view returns (address) {
        require(
            _exists(tokenId),
            "ERC721: approved query for nonexistent token"
        );
        return _tokenApprovals[tokenId];
    }

    // 이 부분은 계정간에 bool값을 설정해 주는 부분
    function setApprovalForAll(address operator, bool approved) public {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    // 계정간에 Approval이 성립되어 있는지를 확인
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    // 해당 NFT가 존재하는 NFT인지 확인
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function _approve(address to, uint256 tokenId) internal {
        _tokenApprovals[tokenId] = to;
        // emit Approval(ERC721.ownerOf(tokenId), to, tokenId);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        require(
            _exists(tokenId),
            "ERC721: operator query for nonexistent token"
        );
        address owner = NFT.ownerOf(tokenId);
        return (spender == owner ||
            getApproved(tokenId) == spender ||
            isApprovedForAll(owner, spender));
    }

    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        // emit ApprovalForAll(owner, operator, approved);
    }

    // 이 함수를 실행함으로써 NFT의 주인을 변경할수 있음
    // 문제는 tokenId를 통해서 어떤 NFT인지를 알려주어야함 (uint256값)
    function NFTtransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        NFT_transfer(from, to, tokenId);
    }

    function NFT_transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal {
        require(
            NFT.ownerOf(tokenId) == from,
            "ERC721: transfer from incorrect owner"
        );
        require(to != address(0), "ERC721: transfer to the zero address");
        _approve(address(0), tokenId);
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;
        // emit Transfer(from, to, tokenId);
    }

    // 해당 함수를 실행함으로써 NFT생성 완료
    function mintNFT(address _address, string memory data) public {
        uint256 newItem = getTotalNFTAmount();
        _mint(_address, newItem);
        _setTokenURI(newItem, data);
        NFTtotalSupply++;
    }

    // 이 부분은 단순히 그냥 NFT숫자 값을 계정에 연결해주는 부분
    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");
        _balances[to] += 1;
        _owners[tokenId] = to;
        // emit Transfer(address(0), to, tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function getOwnerNFT(address _address)
        public
        view
        returns (string[] memory)
    {
        string[] memory NFTList = new string[](NFTbalanceOf(_address));
        uint256 index = 0;
        for (uint256 i = 0; i < getTotalNFTAmount(); i++) {
            if (_owners[i] == _address) {
                NFTList[index] = _tokenURIs[i];
                index++;
            }
        }
        return NFTList;
    }

    function getTotalNFTAmount() public view returns (uint256) {
        return NFTtotalSupply;
    }
}
