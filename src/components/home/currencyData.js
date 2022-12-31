import React, { useState, useEffect } from 'react'

function CurrencyData(props) {
  const { data } = props
  const { name, symbol, last_price , index } = data

  const [img, setImg] = useState(null)
  // handle coins img
  useEffect(() => {
    try {
      if (img) return
      const _img = require(`../../assets/icons/${symbol}.svg`)
      setImg(_img)
    } catch (error) {
      // here we put a default on currency img error
      // setImg("default img url")
      console.warn(`${symbol} logo not found!`)
    }
  }, [symbol, img])
  return (
    <div className="market-summary-item">
      <div className="coin-spot">{index }.</div>
      <div>
        {img && <img
          className="coin-logo"
          src={img}
          alt={`${symbol}-logo`}
        />}
      </div>
      <div className="market-summary-item-name">{name}</div>
      <div>{symbol}</div>
      <div className="market-summary-item-price">{parseFloat(last_price).toFixed(2)}</div>
    </div>
  );
}

export default CurrencyData;
