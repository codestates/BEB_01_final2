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

  const onMount = async () => {
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
      console.log(user);
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

  useEffect(() => {
    onMount();
    getUserData();
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
          <Buy player={player} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
