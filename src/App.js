import React , { useEffect , useCallback  , useState } from 'react';
import Header from './components/header/header';
// import Connected from './components/wallet/conected';
import Home from './components/home/home';
import Wallet from './components/wallet/wallet';
import './index.css'


// services
import { getCurrenciesPrice } from "./services/currencies"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'


function App() {
  const [loaded, setLoaded] = useState(false) // request status handler
  const [currencies, setCurrencies] = useState([])
  const [currentWalletData, setCurrentWalletData] = useState({})

  // Get currencies requets
  const fetchCurrencies = useCallback(async () => {
    const result = await getCurrenciesPrice()

    // parse currencies to array
    const _currencies = Object.entries(result)
    const fixedCurrencies = []
    for(let i=0 ; i < _currencies.length ; i++){
      const _currency = _currencies[i][1]
      _currency.index = i +1
      fixedCurrencies.push(_currency)

    }

    setCurrencies(fixedCurrencies)
    setLoaded(true)
  }, [])

  // Component Did Mount for fetch currencies 
  useEffect(() => {
    fetchCurrencies()
  }, [fetchCurrencies])

  // store wallet data on  top-lvl component 
  // this could be better handled with redux
  const setWalletData=(address , chainId , isConnected , balance )=>{
    const data ={
      address,
      chainId,
      isConnected,
      balance
    }
    setCurrentWalletData(data)
  }

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home loaded={loaded} currencies={currencies} />} />
        <Route path='/wallet' element={<Wallet loaded={loaded} currencies={currencies} walletData={currentWalletData} setWalletData={setWalletData}/>} />
      </Routes>
    </Router>
  );
}

export default App;
