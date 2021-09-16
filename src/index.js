import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './styles.css';
import Header from './components/Header/Header.js';
import Buy from "./components/buy/buy";
import Exchange from "./components/exchange/exchange";
import Referral from "./components/referral/referral";
import Particles from "react-particles-js";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

function App() {

  const [address, setAddress] = useState('');
  const [selectFlag, setSelectFlag] = useState("1");
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    const {ethereum} = window;
		if(ethereum && window.sessionStorage.getItem("connect")){
			handleConnect();
		}
    
    
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);


  const handleConnect =async () =>{
    const {ethereum} = window
    if (ethereum) {
      const chainId =await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId == 56){
        ethereum.request({ method: 'eth_requestAccounts' }).then(accs=>{
          if (accs && accs.length) {
            setAddress(accs[0])
            window.sessionStorage.setItem("connect", "1")
          }
        })}
      else{
        alert("please select smart chain network !!!");
      }
    } 
    else {
       alert('🦊 first, install metamask');
    }
  }



  return (
    <Elements stripe={stripePromise} style = {{color:'#ffff!important'}}>
<div className = "x-root">
  <BrowserRouter>
    <Particles
        height="100%"
        width="100%"
        params={{
          background:{
            color: "#0d0d0d",
            width: "100vh" 
          },
          particles: {
            color: {
              value: "#8b89ff"
            },
            line_linked: {
              color: {
                value: "#8b89ff"
              }
            },
            number: {
              value: 80
            },
            size: {
              value: 3
            }
          }
        }}
        style = {{
          position: "absolute"
        }}
    />
    <div className='App' style={{ position: "absolute" }}>
      <Header handleConnect = {handleConnect} address = {address} isNavVisible = {isNavVisible} isSmallScreen = {isSmallScreen} toggleNav = {toggleNav} selectFlag = {selectFlag} setSelectFlag = {setSelectFlag}/>
      <Switch className='Content'>
        <Route exact path="/" component={Buy} />
        <Route exact path="/exchange" component={()=><Exchange address = {address}/>} />    
        <Route exact path="/referral" component={()=><Referral address = {address}/>} />       
      </Switch>
    </div>
  </BrowserRouter>
</div>
</Elements>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
