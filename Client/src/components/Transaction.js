import React from "react";

function Transaction({ data }) {
  // https://ropsten.etherscan.io/address/0xd1100aa16bdf74823d2490e394217bc130662776
  return (
    <>
      {data === false ? (
        <div className="Loading"> Loading...</div>
      ) : (
        <>
          {data.map((result, idx) => {
            return (
              <a
                href={`https://ropsten.etherscan.io/address/${result.receiver}`}
                key={idx}
                target="_blank"
              >
                <div className="transaction_list">
                  <div className="list_from">From :{result.sender}</div>
                  <div>To :{result.receiver}</div>
                  <div>Amount : {result.amount}</div>
                  <div>Message : {result.keyword}</div>

                  <img src={result.message} alt={result.message} />
                </div>
              </a>
            );
          })}
        </>
      )}
    </>
  );
}

export default Transaction;
