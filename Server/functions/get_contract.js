import { character_abi } from "../web3/abi_total.js";
import { character_CA } from "../web3/CA_total.js";
import { web3 } from "../web3/web3.js";

export const get_contract = async (req, res) => {
  res.status(200).send({ CA: character_CA, abi: character_abi });
};
