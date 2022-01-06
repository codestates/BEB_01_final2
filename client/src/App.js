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
} from "./components/main";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/Shop">
          <Shop />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>

        <Route path="/MyPage">
          <MyPage />
        </Route>
        <Route path="/CryptoWorld">
          <CryptoWorld />
        </Route>
        <Route path="/detail/:id">
          <DetailWorld />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
