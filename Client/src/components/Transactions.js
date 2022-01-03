import React from "react";
import "./Transactions.scss";

import Transaction from "./Transaction";
function Transactions({ data }) {
  return (
    <div className="Transaction_App">
      <div className="Transaction_title">Latest Transactions</div>
      <div className="Transaction_lists">
        <Transaction data={data} />
      </div>
    </div>
  );
}

export default Transactions;
