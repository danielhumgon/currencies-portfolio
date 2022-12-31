/* eslint-disable */
import React, { useState, useEffect } from "react";

// styles
import "./wallet.scss"

// assets
import logo from "../../assets/metamask.svg"
import { ethers } from 'ethers';

import Connected from "./conected";

// spinner
import PropagateLoader from 'react-spinners/PropagateLoader'

const Wallet = (props) => {
  const { walletData, setWalletData } = props
  const [isConnected, setIsConnected] = useState(walletData.isConnected)
  const [address, setAddress] = useState(walletData.address)
  const [balance, setBalance] = useState(walletData.balance)
  const [connectedChainId, setConnectedChainId] = useState(walletData.chainId)
  const [isLoaded, setIsLoaded] = useState(false)

  const chainId = "39797" // NRG chain id 

  let provider = new ethers.providers.Web3Provider(window.ethereum)

  useEffect(() => {
    setTimeout(() => {
      // validate the current metamask chain
      if (window.ethereum && window.ethereum.networkVersion === chainId) {
        setIsLoaded(true)
        if (isConnected) {
          setConnectedChainId(window.ethereum.networkVersion)
          setWalletData(address, connectedChainId, isConnected, balance)

          // ethereum event
          window.ethereum.on('accountsChanged', (accounts) => {
            setIsConnected(false)
            setConnectedChainId(null)
            setWalletData()
          });

          // ethereum event
          window.ethereum.on('chainChanged', (chainId) => {
            setIsConnected(false)
            setConnectedChainId(null)
            setWalletData()
          });
        }
      } else {
        setIsConnected(false)
        setIsLoaded(true)
      }

    }, 1000);
  }, [isConnected])

  // set network to metamask on connect 
  const changeNetwork = async () => {
    try {
      if (!window.ethereum) { throw new Error("Metamask not found!") }
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x9b75",
          rpcUrls: ["https://nodeapi.energi.network/v1/jsonrpc"],
          chainName: "Energi Mainnet",
          nativeCurrency: {
            name: "Energi",
            symbol: "NRG",
            decimals: 18
          },
          blockExplorerUrls: ["https://explorer.energi.network/"]
        }]
      })
    } catch (error) {
      console.warn('Error in changeNetwork', error)
      throw error
    }
  }
  // connect metamask wallet and get data
  const connectwalletHandler = async () => {
    try {
      if (!window.ethereum) { throw new Error("Metamask is not installed") }
      await changeNetwork()

      provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const { address, balance } = await accountChangedHandler(provider.getSigner());
      setAddress(address)
      setBalance(balance)
      setIsConnected(true)
    } catch (error) {
      console.warn('Error in connectwalletHandler', error)
    }
  }
  // change metamask acc handler 
  const accountChangedHandler = async (newAccount) => {
    try {
      const address = await newAccount.getAddress();
      const balance = await newAccount.getBalance()
      const parsedBalance = ethers.utils.formatEther(balance)

      return {
        address,
        balance: parsedBalance
      }
    } catch (error) {
      console.warn('Error in accountChangedHandler', error)
      throw error
    }

  }

  return (
    <div className="container">
      {isLoaded && <>
        {(!isConnected || connectedChainId != chainId) &&
          <>
            <img className="logo" src={logo} alt="Metamask logo" />
            <h1 className="title">METAMASK</h1>
            <button className="connect-btn" onClick={connectwalletHandler}>Connect Wallet</button>
          </>
        }
        {isConnected && connectedChainId == chainId && <Connected address={address} balance={balance} {...props} />}
      </>}
      {!isLoaded && <PropagateLoader
        color='#ffffff'
        loading={!isLoaded}
        size={5}
        cssOverride={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: '0%'
        }}
        speedMultiplier={1}
      />}
    </div>
  );
};

export default Wallet;
