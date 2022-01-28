import { TokenDB, UserDB } from "../models.js";
import { web3 } from "../web3/web3.js";

export const giveTokenDB = async (address) => {
  const temp = await UserDB.findOne({ address: address });
  if (temp !== null) {
    const change = await UserDB.findOneAndUpdate(
      {
        address: address,
      },
      {
        Token: temp.Token + 10,
      },
      { new: true }
    );
  }
};

// export const giveTokenBlockChain = async () => {
//   const answer = await TokenDB.find({ check: false });
//   console.log(answer);
//   for (let i = 0; i < answer.length; i++) {
//     let Tx = answer[i].hash;
//     let idx = answer[i].id;

//     await web3.eth.sendSignedTransaction(Tx);
//     await TokenDB.findOneAndUpdate(
//       { id: answer[i].id },
//       {
//         check: true,
//       }
//     );
//   }
//   console.log("BlockChain토큰 지급 완료!");
// };
