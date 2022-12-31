import React, { useState } from 'react'

// styles
import "./home.scss";


// Components

import CurrencyData from "./currencyData"
// spinner
import PropagateLoader from 'react-spinners/PropagateLoader'
import { useEffect } from "react";

function Home(props) {
  const { loaded, currencies } = props
  const [sortedCurrencies, setSortedCurrencies] = useState(currencies)

  // order currencies by index
  const orderByNumber = () => {
    setSortedCurrencies([])
    let sorted = sortedCurrencies

    if (sorted[0].index > sorted[1].index) {
      sorted = currencies.sort((a, b) => { return a.index - b.index })

    } else {
      sorted = currencies.sort((a, b) => { return b.index - a.index })

    }
    setTimeout(() => {
      setSortedCurrencies(sorted)
    }, 100);
  }
  // order currencies by price
  const orderByPrice = () => {
    setSortedCurrencies([])
    let sorted = sortedCurrencies
    if (sorted[0].last_price > sorted[1].last_price) {
      sorted = currencies.sort((a, b) => { return a.last_price - b.last_price })

    } else {
      sorted = currencies.sort((a, b) => { return b.last_price - a.last_price })
    }
    setTimeout(() => {
      setSortedCurrencies(sorted)
    }, 100);

  }
  // order currencies by symbol
  const orderBySymbol = () => {
    setSortedCurrencies([])
    let sorted = sortedCurrencies
    if (sorted[0].symbol > sorted[1].symbol) {
      sorted = currencies.sort((a, b) => {
        if (a.symbol < b.symbol) {
          return -1;
        }
        if (a.symbol > b.symbol) {
          return 1;
        }
        return 0;
      })
    } else {
      sorted = currencies.sort((a, b) => {
        if (a.symbol < b.symbol) {
          return 1;
        }
        if (a.symbol > b.symbol) {
          return -1;
        }
        return 0;
      })
    }
    setTimeout(() => {
      setSortedCurrencies(sorted)
    }, 100);

  }
  return (
    <>
      {loaded && (<section className="market-summary">

        <>
          <h1>Cryptocurrencies</h1>
          <div className="table-items">
            <span onClick={orderByNumber}>#</span>
            <span onClick={orderBySymbol}>Coins</span>
            <span onClick={orderByPrice}>Price</span>
          </div>
          {sortedCurrencies.map((value, i) => {
            return <CurrencyData key={`currency-${i}`} data={value} />
          })}
        </>

      </section>)}
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
    </>
  );
}

export default Home;
