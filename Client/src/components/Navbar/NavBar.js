import React, { useEffect, useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import schedule from "node-schedule";
import axios from "axios";

function NavBar({ address, user, openlogin }) {
  const [time, SetTime] = useState(new Date().toLocaleTimeString());
  const [ch, SetCh] = useState(false);

  useEffect(() => {
    const setTime = () => {
      SetTime(new Date().toLocaleTimeString());
    };

    let date = new Date();
    date.setSeconds(date.getSeconds() + 1);
    schedule.scheduleJob(date, () => {
      setTime();
    });

    const rule = new schedule.RecurrenceRule();
    rule.minute = 1;

    const Bidding_Time = new schedule.RecurrenceRule();
    Bidding_Time.second = 1;

    const job = () => {
      schedule.scheduleJob(rule, async () => {
        await axios
          .get("http://localhost:8080/Map/GiveToken")
          .then((result) => {
            console.log(result.data.message);
          });
      });

      schedule.scheduleJob(Bidding_Time, async () => {
        await axios
          .get("http://localhost:8080/SellingItem/trade")
          .then((result) => {
            console.log("거래소 훑어봄!");
          });
      });
    };

    if (ch === false) {
      job();
      SetCh(true);
    }
  }, [time]);

  const deleteUser = async () => {
    if (user) {
      window.localStorage.removeItem("User");
      window.location.reload();
    }

    if (address) {
      await openlogin.logout();
      window.location.reload();
    }
  };
  // time은 단순히 시간을 계속 갱신해 주는 것
  // 그러면 내가 필요한 것은 일정시간에 토큰을 DB를 뒤져서 owner값들을 뺴오고 해당 owne에게 토큰을 전송해주는 로직이 필요
  //

  return (
    <div className="NavBar_app">
      <Link to="/">
        <div className="NavBar_title">
          <img src="./img/logo.png" alt="logo" />
        </div>
      </Link>
      {time}

      <div>
        <ul className="NavBar_ul">
          <Link to="/MyPage" className="menu-item">
            <li>My Page</li>
          </Link>

          <Link to="/CryptoWorld" className="menu-item">
            <li>Crypto World</li>
          </Link>
          {user || address ? (
            <li className="Logout" onClick={deleteUser}>
              Logout
            </li>
          ) : (
            <Link to="/Login" className="menu-item">
              <li>Login</li>
            </Link>
          )}

          <Link to="/Shop" className="menu-item">
            <li>Shop</li>
          </Link>
          {user || address ? (
            <Link to="/Deal" className="menu-item">
              <li>Deal</li>
            </Link>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
