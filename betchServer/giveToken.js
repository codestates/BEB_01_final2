import { TokenDB } from "./models.js";
import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.infuraURL));

export const giveTokenBlockChain = async (req, res) => {
  const answer = await TokenDB.find({ check: false });

  if (answer.length > 0) {
    console.log(" ========== BlockChain기록 시작!===========");
    for (let i = 0; i < answer.length; i++) {
      await web3.eth.sendSignedTransaction(
        answer[i].rawTransaction,
        (err, hash) => {
          if (err) console.log(err);
          else console.log(hash);
        }
      );
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
    console.log(" =========== BlockChain기록 완료 =========");
  } else {
    console.log("지급할 데이터가 없음!");
  }
};
