/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import {
  BrowserRouter as Router,Link
} from "react-router-dom";

import "./Header.css";
import { CSSTransition } from "react-transition-group";



export default function Header(props) {

  const {isSmallScreen, isNavVisible, address, handleConnect, toggleNav, selectFlag, setSelectFlag} = props;
  return (
    <header className="Header">
      <img src="img/soon.png"/>
      <Link to="/"><img src={require("../../assets/logo.png")} className="Logo" alt="logo" /></Link>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
            <div>
                  <Link to="/" className="router-link" onClick = {()=>setSelectFlag("1")} style = {selectFlag==="1"?{borderBottom: "solid 7px #26e3ff"}:null}>BUY</Link>
                  <Link to="/exchange" className="router-link" onClick = {()=>setSelectFlag("2")} style = {selectFlag==="2"?{borderBottom: "solid 7px #26e3ff"}:null}>EXCHANGE</Link>
                  <Link to="/referral" className="router-link" onClick = {()=>setSelectFlag("3")} style = {selectFlag==="3"?{borderBottom: "solid 7px #26e3ff"}:null}>INVITE FRIENDS</Link>
            </div>
            {address?(
              <span style={{color:'white',padding:'6px 24px',fontSize:'1.5em',border:'2px solid #26e3ff',borderRadius:'30px'}}>🦊 { address.slice(0,5)+ '...'+address.slice(-2) }</span>
            ):(
              <button onClick = {handleConnect}>🦊 CONNECT</button>
            )}
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <img src="./img/menu.png" alt="burgerIcon" style={{width:"80px"}}/>
      </button>
    </header>
  );
}
