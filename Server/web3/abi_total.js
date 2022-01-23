import fs from "fs";
const basePath = "/Users/yuhojin/Desktop/BEB_01_final2-contract";
import path from "path";

const Token_json = fs.readFileSync(
  path.join(basePath, "/Server/abi/Token.json"),
  {
    encoding: "utf-8",
  }
);

const character_json = fs.readFileSync(
  path.join(basePath, "/Server/abi/Character.json"),
  {
    encoding: "utf-8",
  }
);

const Auction_json = fs.readFileSync(
  path.join(basePath, "/Server/abi/Auction.json"),
  {
    encoding: "utf-8",
  }
);

export const Token_abi = JSON.parse(Token_json).abi;

export const character_abi = JSON.parse(character_json).abi;

export const Auction_abi = JSON.parse(Auction_json).abi;
