const fs = require("fs");
const basePath = "/Users/yuhojin/Desktop/BEB_01_final2-contract";
const path = require("path");

const Token = artifacts.require("Token");
const Auction_hojin = artifacts.require("Auction");
const Character = artifacts.require("Character");

module.exports = async function (deployer) {
  await deployer.deploy(Token, "GOLD", "GD");
  const token = await Token.deployed();

  await deployer.deploy(Character, token.address);
  const character = await Character.deployed();

  fs.writeFileSync(
    path.join(basePath, "/truffle/CA/character_CA"),
    character.address
  );

  await deployer.deploy(Auction_hojin, character.address);
  const auction = await Auction_hojin.deployed();

  fs.writeFileSync(
    path.join(basePath, "/truffle/CA/auction_CA"),
    auction.address
  );
};
