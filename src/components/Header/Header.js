/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,Link
} from "react-router-dom";

import "./Header.css";
import { CSSTransition } from "react-transition-group";



export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [pubKey, setPubKey] = useState('');
  const [selectFlag, setSelectFlag] = useState("1");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

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

  // useEffect(()=>{
  //   console.log(window.ethereum.selectedAddress)
  //   if(window.ethereum.selectedAddress!==null){
  //     setPubKey(window.ethereum.selectedAddress)
  //   }
  // })

  const handleConnect = (e) =>{
    e.preventDefault();
    if (typeof window.ethereum !== "undefined") {
        try {
          console.log("metamask is installed already, good !!!");
          window.ethereum.enable().then(async()=> {
            setPubKey(window.ethereum.selectedAddress)
          })
        }
        catch(e){
            alert("please install metamask!");
        }
  }
}


  return (
    <header className="Header">
      <Link to="/"><img src={require("../../assets/logo.png")} className="Logo" alt="logo" /></Link>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
            <div>
                  <Link to="/" className="router-link" onClick = {()=>setSelectFlag("1")} style = {selectFlag=="1"?{borderBottom: "solid 7px #26e3ff"}:null}>BUY</Link>
                  <Link to="/exchange" className="router-link" onClick = {()=>setSelectFlag("2")} style = {selectFlag=="2"?{borderBottom: "solid 7px #26e3ff"}:null}>EXCHANGE</Link>
                  <Link to="/referral" className="router-link" onClick = {()=>setSelectFlag("3")} style = {selectFlag=="3"?{borderBottom: "solid 7px #26e3ff"}:null}>INVITE FRIENDS</Link>
            </div>
          <button onClick = {handleConnect}>{window.ethereum?window.ethereum.selectedAddress!==null?`${pubKey.slice(0,6)}...`:"CONNECT":"please install!"}</button>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <img src="./img/menu.png" alt="burgerIcon" style={{width:"80px"}}/>
      </button>
    </header>
  );
}
