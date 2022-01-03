import React from "react";
import "./Transactions.scss";
import { shortenAddress } from "../utils/funtcion";
function Transactions() {
  return (
    <div className="Transaction_App">
      <div className="Transaction_title">Latest Transactions</div>
      <div className="Transaction_lists">
        <div className="transaction_list">
          <div className="list_from">
            From :
            {shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>
            To :{shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>Amount : 0001Ekd</div>
          <div>
            Message : hsdlkfslfksdklfsdfklsdflskddfkfllskdflksfsdklflksdflksfi!
          </div>
          <img src="./img/test.gif" alt="GRAYSCALE" />
        </div>
        <div className="transaction_list">
          <div className="list_from">
            From :
            {shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>
            To :{shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>Amount : 0001Ekd</div>
          <div>
            Message : hsdlkfslfksdklfsdfklsdflskddfkfllskdflksfsdklflksdflksfi!
          </div>
          <img src="./img/test.gif" alt="GRAYSCALE" />
        </div>
        <div className="transaction_list">
          <div className="list_from">
            From :
            {shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>
            To :{shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>Amount : 0001Ekd</div>
          <div>
            Message : hsdlkfslfksdklfsdfklsdflskddfkfllskdflksfsdklflksdflksfi!
          </div>
          <img src="./img/test2.gif" alt="GRAYSCALE" />
        </div>
        <div className="transaction_list">
          <div className="list_from">
            From :
            {shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>
            To :{shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>Amount : 0001Ekd</div>
          <div>
            Message : hsdlkfslfksdklfsdfklsdflskddfkfllskdflksfsdklflksdflksfi!
          </div>
          <img src="./img/test2.gif" alt="GRAYSCALE" />
        </div>
        <div className="transaction_list">
          <div className="list_from">
            From :
            {shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>
            To :{shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>Amount : 0001Ekd</div>
          <div>
            Message : hsdlkfslfksdklfsdfklsdflskddfkfllskdflksfsdklflksdflksfi!
          </div>
          <img src="./img/test2.gif" alt="GRAYSCALE" />
        </div>
        <div className="transaction_list">
          <div className="list_from">
            From :
            {shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>
            To :{shortenAddress(["0xaea07e179dfc59dd118005a4a56768a51ad8f48b"])}
          </div>
          <div>Amount : 0001Ekd</div>
          <div>
            Message : hsdlkfslfksdklfsdfklsdflskddfkfllskdflksfsdklflksdflksfi!
          </div>
          <img src="./img/test2.gif" alt="GRAYSCALE" />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
