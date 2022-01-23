const HDWalletProvider = require("truffle-hdwallet-provider");
require("dotenv").config();
module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

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
  contracts_build_directory: "../Server/abi",

  compilers: {
    solc: {
      version: "0.8.0",
      setting: {
        evmVersion: "london",
      },
    },
  },
};
