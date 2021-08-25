import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect, useState} from 'react';
import {Radio, Grid} from '@material-ui/core';
import { ethers } from 'ethers';
import {
    BrowserRouter as Route, Switch ,Link
  } from "react-router-dom";

import Spot from "./spot";
import Fiat from "./fiat"
import './buy.css';
import '../../bootstrap.min.css';


export default function Buy() {
    const [spotState,setSpotState] = useState(false);

    const handleToggle = (e)=>{
        setSpotState(e);
    }

    return (
        <div>
            <div>
            <button className="button-spot-index" onClick={()=>{handleToggle(false)}}>Buy from CRYPTO</button>
            <button className="button-fiat-index" onClick={()=>{handleToggle(true)}}>Buy from FIAT</button>
            </div>
            {spotState==false?<Spot />:<Fiat />}
        </div>
    );
}