import "./App.css";
import { Route, Switch } from "react-router-dom";
import { NavBar, Homepage, SignIn, MyPage } from "./components/main";

// import SingIn from './components/SignIn/SignIn';
// import MyPage from './components/MyPage';




function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route path="/SignIn">
          <SignIn />
        </Route>

        <Route path="/MyPage">
          <MyPage />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
