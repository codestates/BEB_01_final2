import { useState } from "react";
import "./App.css";
import { Navbar, Welcome, Services, Transactions } from "./components/main";
function App() {
  const [web3, SetWeb3] = useState(false);
  const [Account, SetAccount] = useState(false);
  const [data, SetData] = useState(false);

  return (
    <div className="App">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome
          SetWeb3={SetWeb3}
          SetAccount={SetAccount}
          Account={Account}
          web3={web3}
          SetData={SetData}
        />
      </div>
      <Services />
      <Transactions data={data} />
    </div>
  );
}

export default App;
