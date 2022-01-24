import React, { useEffect, useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import schedule from "node-schedule";
import axios from "axios";

function NavBar({ player, user, address, openlogin, metamask_address }) {
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

    const selling_item = new schedule.RecurrenceRule();
    selling_item.second = 1;

    const charge_soldier = new schedule.RecurrenceRule();
    charge_soldier.hour = 1;

    const job = () => {
      schedule.scheduleJob(rule, async () => {
        await axios
          .get("http://localhost:8080/Map/GiveToken")
          .then((result) => {
            console.log(result.data.message);
          });
      });

      schedule.scheduleJob(selling_item, async () => {
        await axios
          .get("http://localhost:8080/SellingItem/trade")
          .then((result) => {
            console.log("거래소 훑어봄!");
          });
      });

      schedule.scheduleJob(charge_soldier, async () => {
        await axios.get("http://localhost:8080/charge");
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
    if (metamask_address) {
      window.localStorage.removeItem("meta_User");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="NavBar_app">
      <Link to="/">
        <div className="NavBar_title">
          <img src="./img/logo.png" alt="logo" />
        </div>
      </Link>

      <div className="Navbar_text">
        <ul className="NavBar_ul">
          <Link to="/MyPage" className="menu-item">
            <li>My Page</li>
          </Link>

          <Link to="/CryptoWorld" className="menu-item">
            <li>Crypto World</li>
          </Link>
          {player ? (
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
          {player ? (
            <Link to="/Deal" className="menu-item">
              <li>Deal</li>
            </Link>
          ) : (
            ""
          )}
          <Link to="/Buy" className="menu-item">
            <li>Buy</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
