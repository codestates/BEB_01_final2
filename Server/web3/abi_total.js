import fs from "fs";
const basePath = "/Users/yuhojin/Desktop/BEB_01_final2-contract";
import path from "path";

const character_json = fs.readFileSync(
  path.join(basePath, "/truffle/abi/Character.json"),
  {
    encoding: "utf-8",
  }
);

const Auction_json = fs.readFileSync(
  path.join(basePath, "/truffle/abi/Auction.json"),
  {
    encoding: "utf-8",
  }
);

export const character_abi = JSON.parse(character_json).abi;

export const Auction_abi = JSON.parse(Auction_json).abi;
