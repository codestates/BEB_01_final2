import fs from "fs";
const basePath = "/Users/yuhojin/Desktop/BEB_01_final2-contract";
import path from "path";

export const Token_CA = fs.readFileSync(
  path.join(basePath, "/Server/CA/token_CA"),
  {
    encoding: "utf-8",
  }
);

export const character_CA = fs.readFileSync(
  path.join(basePath, "/Server/CA/character_CA"),
  {
    encoding: "utf-8",
  }
);

export const auction_CA = fs.readFileSync(
  path.join(basePath, "/Server/CA/auction_CA"),
  {
    encoding: "utf-8",
  }
);
