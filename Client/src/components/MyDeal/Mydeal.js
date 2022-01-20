import React, { useEffect, useState } from "react";
import "./Mydeal.scss";

import axios from "axios";
import { makeShortAddress } from "../../utils/function/function";
function Mydeal({ player }) {
  const [ItemData, SetItemData] = useState(false);
  const [buyerPrice, SetBuyerPrice] = useState(false);

  const getData = async () => {
    await axios
      .get("http://localhost:8080/SellingItem/AllSellingITem")
      .then((result) => {
        SetItemData(result.data.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const SendBuy = async (item) => {
    if (buyerPrice < item.price) {
      alert("더 많은 금액을 입력해주세요..!!");
    } else if (item.seller === player.address) {
      alert("판매자가 구매할 수는 없습니다!");
    } else if (player.Token < buyerPrice) {
      alert("그만큼의 토큰을 가지고 있지 않습니다..");
    } else {
      await axios
        .post("http://localhost:8080/SellingItem/Bid", {
          player: player.address,
          item: item,
          price: buyerPrice,
        })
        .then((result) => {
          alert(result.data.message);
          window.location.reload();
        });
    }
  };
  return (
    <div className="Deal_app">
      <div className="Deal_title">Our exchange Market</div>
      <div className="Deal_container">
        <div className="Deal_text">
          <ul className="Deal_item_title">
            <li>이미지</li>
            <li>이름</li>
            <li>정보</li>
            <li>판매자</li>
            <li>구매자</li>
            <li>가격</li>
          </ul>
          {ItemData === false ? (
            <img
              className="Loading"
              src="https://t1.daumcdn.net/cfile/tistory/233F6D505786DA870A"
              alt="loading"
            />
          ) : (
            ItemData.map((item, idx) => {
              return (
                <div className="Deal_item" key={idx}>
                  <img src={item.item.src} alt={item.item.src} />
                  <div className="deal_item_name">{item.item.name}</div>
                  <div className="deal_item_name">{item.item.pow}</div>
                  <div className="deal_item_name">
                    {makeShortAddress(item.seller)}
                  </div>
                  <div className="deal_item_name">
                    {item.buyer !== "none"
                      ? makeShortAddress(item.buyer)
                      : item.buyer}
                  </div>
                  <div className="deal_item_name">{item.price}</div>
                  <div className="deal_change">
                    <input
                      type="text"
                      placeholder="값을 입력하세요!"
                      onChange={(e) => {
                        SetBuyerPrice(e.target.value);
                      }}
                    />
                    <button onClick={() => SendBuy(item)}>구매</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Mydeal;
