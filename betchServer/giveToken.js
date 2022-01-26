import { TokenDB } from "./models.js";
import Web3 from "web3";
import dotenv from "dotenv";
import { changeStatus } from "./betch.js";
import {
  Auction_abi,
  auction_CA,
  character_abi,
  character_CA,
} from "./abi,CA.js";

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.infuraURL));

const CharacterContract = async () => {
  const Contract = await new web3.eth.Contract(character_abi, character_CA);
  return Contract.methods;
};

const AuctionContract = async () => {
  const Contract = await new web3.eth.Contract(Auction_abi, auction_CA);
  return Contract.methods;
};

export const giveTokenBlockChain = async (req, res) => {
  const answer = await TokenDB.find({ check: false });

  if (answer.length > 0) {
    console.log(" ========== BlockChain기록 시작!===========");
    changeStatus();
    for (let i = 0; i < answer.length; i++) {
      if (answer[i].contract === "Character") {
        // character컨트랙트를 작동시킬시
        let tx = answer[i].tx;
        await CharacterContract().then(async (method) => {
          await web3.eth.accounts
            .signTransaction(tx, process.env.Server_PrivateKey)
            .then(async (Tx) => {
              await web3.eth.sendSignedTransaction(
                Tx.rawTransaction,
                (err, hash) => {
                  if (err) console.log(err);
                  else {
                    console.log(hash);
                  }
                }
              );
            });
        });
      } else {
        // auction컨트랙트를 작동시킬시
        let tx = answer[i].tx;
        await AuctionContract().then(async (method) => {
          await web3.eth.accounts
            .signTransaction(tx, process.env.Server_PrivateKey)
            .then(async (Tx) => {
              await web3.eth.sendSignedTransaction(
                Tx.rawTransaction,
                (err, hash) => {
                  if (err) console.log(err);
                  else {
                    console.log(hash);
                  }
                }
              );
            });
        });
      }
      await TokenDB.findOneAndUpdate(
        { _id: answer[i].id },
        {
          check: true,
        },
        {
          new: true,
        }
      );
    }
    changeStatus();
    console.log(" =========== BlockChain기록 완료 =========");
  } else {
    console.log("지급할 데이터가 없음!");
  }
};
//  Transaction was not mined within 750 seconds
