import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './styles.css';
import Header from './components/Header/Header.js';
import Buy from "./components/buy/buy";
import Exchange from "./components/exchange/exchange";
import Referral from "./components/referral/referral";


function App() {
  return (
<div>     
  <BrowserRouter>
    <div className='App'>
      <Header />
      <Switch className='Content'>
        <Route exact path="/" component={Buy} />
        <Route exact path="/exchange" component={Exchange} />    
        <Route exact path="/referral" component={Referral} />       
      </Switch>
      
    </div>
  </BrowserRouter>
  <div className="star">
  <div id='stars'></div>
  <div id='stars2'></div>
  <div id='stars3'></div>
  </div>
</div>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
