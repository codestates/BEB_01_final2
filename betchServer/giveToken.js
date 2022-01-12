import { TokenDB } from "./models.js";
import { web3 } from "../Server/web3/web3.js";

export const giveTokenBlockChain = async () => {
  const answer = await TokenDB.find({ check: false });
  if (answer.length > 0) {
    for (let i = 0; i < answer.length; i++) {
      let Tx = answer[i].hash;
      let idx = answer[i].id;
      await web3.eth.sendSignedTransaction(Tx, (err, hash) => {
        if (err) console.log(err);
      });
      await TokenDB.findOneAndUpdate(
        { id: idx },
        {
          check: true,
        }
      );
    }
    console.log("BlockChain토큰 지급 완료!");
  } else {
    console.log("지급할 데이터가 없음!");
  }
};
