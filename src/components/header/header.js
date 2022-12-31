import React from "react";
import { useState, useEffect } from "react";

// styles
import "./header.scss";

// assets
import logo from "../../assets/icons/NRG.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faWallet,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

import {
  Link
} from 'react-router-dom'

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--primary-color', 'rgba(19, 17, 29, 0.932)');
      document.documentElement.style.setProperty('--secondary-color', '#ddd');
      document.documentElement.style.setProperty('--tertiary-color', '#aaa');
    } else {
      document.documentElement.style.setProperty('--primary-color', '#fff');
      document.documentElement.style.setProperty('--secondary-color', '#000');
      document.documentElement.style.setProperty('--tertiary-color', '#000');
    }
  }, [isDarkMode]);

  return (
    <nav>
      <div className="left">
        <img src={logo} alt="Logo" />
      </div>
      <div className="middle">
        <Link to='/home'>
          <FontAwesomeIcon icon={faHouse} /> Home
        </Link>
        <Link to='/wallet'>

          {" "}
          <FontAwesomeIcon icon={faWallet} /> Wallet
        </Link>
      </div>
      <div className="right">
        <button type="button" onClick={toggleDarkMode}>
          {" "}
          <FontAwesomeIcon className={!isDarkMode ? "toggle-btn" : ""} icon={isDarkMode ? faSun : faMoon} />
        </button>
      </div>
    </nav>
  );
};

export default Header;
