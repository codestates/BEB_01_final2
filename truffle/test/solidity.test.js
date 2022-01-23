const { before } = require("underscore");

const Token = artifacts.require("Token");
const Auction_hojin = artifacts.require("Auction");
const Character = artifacts.require("Character");

contract("Token", (Server, User) => {
  let contractInstance;

  beforeEach(async () => {
    contractInstance = await Token.new("GOLD", "GD");
  });

  describe("Token deployment", async () => {
    it("contract has name need to equal", async () => {
      const name = await contractInstance.name();
      assert.equal(name, "GOLD");
    });

    it("contract has symbol to equal", async () => {
      const symbol = await contractInstance.showSymbol();
      assert.equal(symbol, "GD");
    });

    it("contract's totalSupply is zero ", async () => {
      const supply = await contractInstance.totalSupply();
      assert.equal(0, supply);
    });
  });

  describe("Token mintGold", async () => {
    it("contract Minting service is not problem", async () => {
      before(async () => {
        await contractInstance.mintGold(100, User);
      });
      assert(100, contractInstance.balanceOf(User));
    });
  });
});

contract("Character", ([deployer, User]) => {
  let token;
  let contractInstance;
  describe("new Character", async () => {
    it("contract can make new Character", async () => {
      before(async () => {
        token = await Token.new("GOLD", "GD");
        contractInstance = await Character.new(token.address);
      });

      const result = await contractInstance.makeCharacter(User);
      assert.equal(User, result.logs[0].args.account);
    });
  });
  // 미완성..ㅠ
});

contract("Auction_hojin", ([deployer, User]) => {
  // 미완성
});
