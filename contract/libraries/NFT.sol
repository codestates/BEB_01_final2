// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.10;

import "./ERC165.sol";
import "./Strings.sol";

interface IERC721 is IERC165 {
    function NFTbalanceOf(address owner)
        external
        view
        returns (uint256 balance);

    function ownerOf(uint256 tokenId) external view returns (address owner);

    function nftTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function nftApprove(address to, uint256 tokenId) external returns (bool);

    function getApproved(uint256 tokenId)
        external
        view
        returns (address operator);

    function setApprovalForAll(address operator, bool _approved) external;

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);

    event nftTransfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );
    event nftApproval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );
    event nftApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );
}

interface IERC721Metadata is IERC721 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function tokenURI(uint256 tokenId) external view returns (string memory);
}

contract NFT is IERC721, IERC721Metadata, ERC165 {
    using Strings for uint256;

    string private _name;
    string private _symbol;
    uint256 private _nftId = 0;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => string) private _tokenURIs;

    uint256 private _TotalNFTAmount = 0;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function mintNFT(address to, string memory URI) external returns (uint256) {
        _nftId++;
        _TotalNFTAmount++;
        uint256 newId = _nftId;
        _mint(to, newId);
        _setTokenURI(newId, URI);

        return newId;
    }

    function _mint(address to, uint256 tokenId) internal virtual {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _balances[to] += 1;
        _owners[tokenId] = to;

        emit nftTransfer(address(0), to, tokenId);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721URIStorage: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function _exists(uint256 tokenId) internal view virtual returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function getNFT_Address(address _address)
        public
        view
        returns (string[] memory)
    {
        string[] memory NFTList = new string[](NFTbalanceOf(_address));
        uint256 idx = 0;
        for (uint256 i = 1; i < getTotalNFTAmount() + 1; i++) {
            if (ownerOf(i) == _address) {
                NFTList[idx] = _tokenURIs[i];
                idx++;
            }
        }
        return NFTList;
    }

    function getTotalNFTAmount() public view returns (uint256) {
        return _TotalNFTAmount;
    }

    function nftTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        require(
            _isApprovedOrOwner(from, tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );

        _nftTransfer(from, to, tokenId);
    }

    function _isApprovedOrOwner(address spender, uint256 tokenId)
        internal
        view
        virtual
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

    function _nftTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual {
        require(
            NFT.ownerOf(tokenId) == from,
            "ERC721: transfer from incorrect owner"
        );
        require(to != address(0), "ERC721: transfer to the zero address");

        _approve(address(0), tokenId);

        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;

        emit nftTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC165, IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IERC721).interfaceId ||
            interfaceId == type(IERC721Metadata).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function NFTbalanceOf(address owner)
        public
        view
        virtual
        override
        returns (uint256)
    {
        require(
            owner != address(0),
            "ERC721: balance query for the zero address"
        );
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        address owner = _owners[tokenId];
        require(
            owner != address(0),
            "ERC721: owner query for nonexistent token"
        );
        return owner;
    }

    function name() external view virtual override returns (string memory) {
        return _name;
    }

    function symbol() external view virtual override returns (string memory) {
        return _symbol;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    function getApproved(uint256 tokenId)
        public
        view
        virtual
        override
        returns (address)
    {
        require(
            _exists(tokenId),
            "ERC721: approved query for nonexistent token"
        );
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved)
        public
        virtual
        override
    {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    function isApprovedForAll(address owner, address operator)
        public
        view
        virtual
        override
        returns (bool)
    {
        return _operatorApprovals[owner][operator];
    }

    function nftApprove(address to, uint256 tokenId)
        external
        virtual
        override
        returns (bool)
    {
        address owner = NFT.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _approve(to, tokenId);
        return true;
    }

    function _baseURI() internal view virtual returns (string memory) {
        return "";
    }

    function _approve(address to, uint256 tokenId) internal virtual {
        _tokenApprovals[tokenId] = to;
        emit nftApproval(NFT.ownerOf(tokenId), to, tokenId);
    }

    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    ) internal virtual {
        require(owner != operator, "ERC721: approve to caller");
        _operatorApprovals[owner][operator] = approved;
        emit nftApprovalForAll(owner, operator, approved);
    }

    function _burn(uint256 tokenId) internal virtual {
        address owner = NFT.ownerOf(tokenId);

        _approve(address(0), tokenId);

        _balances[owner] -= 1;
        delete _owners[tokenId];

        emit nftTransfer(owner, address(0), tokenId);
    }
}
