const HDWalletProvider = require("truffle-hdwallet-provider");
require("dotenv").config();
module.exports = {
  networks: {
    development: {
      provider: new HDWalletProvider(
        process.env.Server_PrivateKey,
        process.env.infuraURL
      ),
      network_id: 3,
      gas: 4000000,
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },

  contracts_directory: "./contracts",
  contracts_build_directory: "./abi",

  compilers: {
    solc: {
      version: "0.8.0",
      setting: {
        evmVersion: "london",
      },
    },
  },
};
