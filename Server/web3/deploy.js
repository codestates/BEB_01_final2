import { Token_abi } from "./abi,bytecode/Token_abi.js";
import { web3 } from "./web3.js";

export const makeContract = async () => {
  const TokenContract = await web3.eth.Contract(Token_abi);
  // const CharacterContract = await
};

// sendSignedTransaction을 사용시에 hash값이 나오게 되는데
// 이떄 hash값 말고 CA값을 얻고 싶을떄
