import React, { useEffect, useState } from "react";

// styles
import "./conected.scss";

// assets
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// spinner
import PropagateLoader from 'react-spinners/PropagateLoader'

import {
  faCopy,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import energi from "../../assets/icons/NRG.svg";
import mtm from "../../assets/metamask.svg";

const Connected = (props) => {
  const { loaded , address, balance, currencies } = props
  const [USDBalance, setUSDBalance] = useState(null)

  const originalAddr = address;

  // parse address 
  const getShortAddr = () => {
    try {
      const shortenedAddr =
        originalAddr.substring(0, 7) +
        "..." +
        originalAddr.substring(originalAddr.length - 7);
        return shortenedAddr
    } catch (error) {
      return originalAddr
    }
  }

  // navigate to explorer in a new tab
  const goToExplorer = () => {
    window.open(`https://explorer.energi.network/address/${address}/transactions`, "_blank")
  }
  // copy addr to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  }

  // handle USD balance
  useEffect(() => {
    if (currencies && Array.isArray(currencies) && currencies.length) {
      const currency = currencies.find((val) => { return val.symbol === "WNRG" })
      const floatPrice = parseFloat(currency.last_price)
      const _balance = (floatPrice * balance).toFixed(2)
      setUSDBalance(_balance)
    }
    // eslint-disable-next-line
  }, [currencies, balance])

  return (
    <div className="container">
      <div className="header">
        <div className="network">
          <img className="network-logo" src={energi} alt="energi logo" />
          <span className="network-text">Energi Network</span>
        </div>
        <div>
          <span className="status">Conected</span>
        </div>
      </div>
      <div className="sub-header">
        <div className="address">
          <img className="metamask-logo" src={mtm} alt="energi logo" />
          <span className="address-text">{getShortAddr()}</span>
        </div>
        <div className="icons-section">
          <FontAwesomeIcon className="icon" icon={faCopy} onClick={copyToClipboard} />
          <FontAwesomeIcon className="icon" icon={faArrowUpRightFromSquare} onClick={goToExplorer} />
        </div>
      </div>
      <div className="amount-section">
        <h4>Total balance</h4>
        <div className="amount-qty">
          <img className="amount-logo" src={energi} alt="energi logo" />
          <span className="amount-text">{balance}</span>
        </div>
        {loaded && USDBalance && <span className="amount-text">${USDBalance}</span>}
        {!loaded &&
        <PropagateLoader
          color='#ffffff'
          loading={!loaded}
          size={5}
          cssOverride={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: '20%'
          }}
          speedMultiplier={1}
        />}
      </div>
    </div>
  );
};

export default Connected;
