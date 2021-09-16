import React from 'react';
import {useState} from 'react';


import Spot from "./spot";
import Fiat from "./fiat"
import './buy.css';
import '../../bootstrap.min.css';

export default function Buy() {
    const [spotState,setSpotState] = useState(false);

    return (
        <div>
            <div>
            <button className="button-spot-index" onClick={()=>setSpotState(false)} style={spotState===true?{color:"#ffffff",border:"2px solid #26e3ff",background:"none"}:null}>Buy from CRYPTO</button>
            <button className="button-fiat-index" onClick={()=>setSpotState(true)} style={spotState===true?{color:"#000002",border:"none",backgroundColor:"#26e3ff"}:null}>Buy from FIAT</button>
            </div>
            {spotState===false?<Spot />:<Fiat />}
        </div>
    );
}