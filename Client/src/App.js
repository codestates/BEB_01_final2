import "./App.css";
import { Route, Switch } from "react-router-dom";
import {
  NavBar,
  Homepage,
  MyPage,
  CryptoWorld,
  DetailWorld,
  Shop,
  Login,
  SignIn,
  ItemList,
  Popup,
  Mydeal,
  Buy,
} from "./components/main";
import { useEffect, useState } from "react";

import OpenLogin from "@toruslabs/openlogin";
import { VERIFIER } from "./utils/function/openLogin";
import { ethers } from "ethers";
import axios from "axios";
import Web3 from "web3";

function App() {
  const [user, SetUser] = useState(window.localStorage.getItem("User"));
  const [openlogin, SetOpenLogin] = useState();
  const [privKey, SetPrivKey] = useState(false);
  const [address, SetAddress] = useState(false);
  const [player, SetPlayer] = useState(false);
  const [NFTData, SetNFTData] = useState(false);
  const [metamask_address, SetMetamask_address] = useState(
    window.localStorage.getItem("meta_User") || false
  );
  const [contract, SetContract] = useState(false);
  const [CA, SetCA] = useState(false);

  const open_logoin = async () => {
    const openlogin = new OpenLogin({
      clientId: VERIFIER.clientId,
      network: "testnet",
    });
    SetOpenLogin(openlogin);

    await openlogin.init();
    SetPrivKey(openlogin.privKey);

    try {
      const wallet = await new ethers.Wallet(
        openlogin.privKey,
        ethers.getDefaultProvider()
      );
      const address = await wallet.getAddress();
      SetAddress(address);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = async () => {
    if (user !== null) {
      await axios
        .get("http://localhost:8080/vefiry", {
          headers: {
            Authorization: "Bearer" + user,
          },
        })
        .then((result) => {
          SetPlayer(result.data);
        });
    }
    if (address !== false) {
      await axios
        .post("http://localhost:8080/vefiry_google", {
          address: address,
        })
        .then((result) => {
          SetPlayer(result.data.data);
        });
    }
    if (metamask_address !== false) {
      await axios
        .post("http://localhost:8080/vefiry_google", {
          address: metamask_address,
        })
        .then((result) => {
          SetPlayer(result.data.data);
        });
    }
  };

  const get_contract = async () => {
    await axios
      .get("http://localhost:8080/get_contract")
      .then(async (contract) => {
        const web3 = await new Web3(window.ethereum);
        SetCA(contract.data.CA);
        const Contract = await new web3.eth.Contract(
          contract.data.abi,
          contract.data.CA
        );
        SetContract(Contract);
      });
  };

  useEffect(() => {
    open_logoin();
    getUserData();
    get_contract();
  }, [address]);

  return (
    <div className="App">
      <NavBar
        address={address}
        user={user}
        player={player}
        openlogin={openlogin}
        metamask_address={metamask_address}
      />

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/Shop">
          <Shop player={player} />
        </Route>

        <Route path="/Popup">
          <Popup />
        </Route>

        <Route path="/Login">
          <Login
            SetUser={SetUser}
            openlogin={openlogin}
            SetPrivKey={SetPrivKey}
            SetMetamask_address={SetMetamask_address}
          />
        </Route>
        <Route path="/MyPage">
          <MyPage player={player} SetNFTData={SetNFTData} NFTData={NFTData} />
        </Route>
        <Route path="/CryptoWorld">
          <CryptoWorld />
        </Route>
        <Route path="/detail/:id">
          <DetailWorld player={player} />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/ItemList">
          <ItemList />
        </Route>
        <Route path="/Deal">
          <Mydeal player={player} />
        </Route>
        <Route path="/Buy">
          <Buy player={player} contract={contract} CA={CA} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
