import "./App.css";
import { Route, Switch } from "react-router-dom";
import { Navbar, Homepage, SignIn, Mypage } from "./components/main";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/MyPage">
          <Mypage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
