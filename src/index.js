import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './styles.css';
import Header from './components/Header/Header.js';
import Buy from "./components/buy/buy";
import Exchange from "./components/exchange/exchange";
import Referral from "./components/referral/referral";
import Particles from "react-particles-js";

function App() {
  return (
<div className = "x-root">   
{/* <img src={particleImg} alt = "ParticleImg" className = "particleImg" />
   */}
  <BrowserRouter>
    <Particles
        height="100vh"
        width="100%"
        params={{
          background:{
            color: "#0d0d0d"
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
      <Header />
      <Switch className='Content'>
        <Route exact path="/" component={Buy} />
        <Route exact path="/exchange" component={Exchange} />    
        <Route exact path="/referral" component={Referral} />       
      </Switch>
    </div>
  </BrowserRouter>
</div>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
