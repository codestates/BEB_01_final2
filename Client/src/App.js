import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  NavBar,
  Homepage,
  MyPage,
  CryptoWorld,
  DetailWorld,
  Shop,
  Login,
  SignIn,
} from "./components/main";
import { useEffect, useState } from "react";

import OpenLogin from "@toruslabs/openlogin";
import { VERIFIER } from "./utils/function/openLogin";
import { ethers } from "ethers";

function App() {
  const [user, SetUser] = useState(
    window.localStorage.getItem("User") || false
  );
  const [openlogin, SetOpenLogin] = useState();
  const [privKey, SetPrivKey] = useState(false);
  const [address, SetAddress] = useState(false);

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

  useEffect(() => {
    onMount();
  }, []);
  return (
    <div className="App">
      <NavBar address={address} user={user} openlogin={openlogin} />

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/Shop">
          <Shop />
        </Route>
        <Route path="/Login">
          <Login
            SetUser={SetUser}
            openlogin={openlogin}
            SetPrivKey={SetPrivKey}
          />
        </Route>
        <Route path="/MyPage">
          <MyPage user={user} address={address} />
        </Route>
        <Route path="/CryptoWorld">
          <CryptoWorld />
        </Route>
        <Route path="/detail/:id">
          <DetailWorld />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
