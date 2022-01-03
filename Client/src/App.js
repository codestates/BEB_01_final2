import { useState } from "react";
import "./App.css";
import { Navbar, Welcome, Services, Transactions } from "./components/main";

function App() {
  const [Web3, SetWeb3] = useState(false);
  const [Account, SetAccount] = useState(false);

  return (
    <div className="App">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome SetWeb3={SetWeb3} SetAccount={SetAccount} Account={Account} />
      </div>
      <Services />
      <Transactions />
    </div>
  );
}

export default App;
