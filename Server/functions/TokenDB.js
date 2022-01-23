import { nonce, plusnonce } from "../app.js";
import { TokenDB } from "../models.js";

export const deposit_TokenDB = async (Tx, address) => {
  console.log(nonce);
  const makeTokenDB = await new TokenDB({
    To_Array: address,
    messageHash: Tx.messageHash,
    v: Tx.v,
    r: Tx.r,
    s: Tx.s,
    rawTransaction: Tx.rawTransaction,
    transactionHash: Tx.transactionHash,
  });
  makeTokenDB.save();
  plusnonce();
};

export const deposit_TokenDB_No_address = async (Tx) => {
  console.log(nonce);
  const makeTokenDB = await new TokenDB({
    messageHash: Tx.messageHash,
    v: Tx.v,
    r: Tx.r,
    s: Tx.s,
    rawTransaction: Tx.rawTransaction,
    transactionHash: Tx.transactionHash,
  });
  makeTokenDB.save();
  plusnonce();
};
