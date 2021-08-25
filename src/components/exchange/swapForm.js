import React, {useState, useEffect, useRef} from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Grid} from '@material-ui/core';

function SwapForm(props){
    const {role, handleToken, flag, setFlag, token, handleAmount, balance, amount} = props;
    const refContainer = useRef(null);

    useEffect(() => {
        if (!flag) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [flag]);

      const handleClickOutside = (e) => {
        if (refContainer.current && refContainer.current.contains(e.target)) {
          // inside click
          return;
        }
        // outside click
        setFlag(true);
      };

    
    return(
        <div style={{ padding:15, backgroundColor: 'rgb(33,36,41)',   borderRadius: 25}}>
            {/* <div className = "x-font3">
                {role}
            </div> */}
            <Grid container>
                
                <Grid style={{alignSelf:'center'}} item xs = {6} sm = {4} md = {4} ref = {refContainer}>
                    <button className = "x-swapForm-dropdown" onMouseDown = {()=>setFlag(!flag)}>
                        <img src = {`/img/${token}.png`} width = "20px"/>
                        <span className = "x-swapForm-token"> {token}</span>
                        <ExpandMoreIcon />
                    </button>
                    <div className = "x-swapForm-dropdown-container" style = {flag?{display: "none"}: null}>
                        <div>
                            <button className = "x-swapForm-dropdown-item" ref = {refContainer} onClick = {(e)=>handleToken(e,"BNB")}>
                                <img src = {`/img/BNB.png`} width = "20px"/>
                                <span className = "x-swapForm-token"> BNB</span>
                            </button>
                        </div>
                        <div>
                            <button className = "x-swapForm-dropdown-item" onClick = {(e)=>handleToken(e,"MBT")}>
                                <img src = {`/img/MBT.png`} width = "20px"/>
                                <span className = "x-swapForm-token"> MBT</span>
                            </button>
                        </div>
                        <div>
                            <button className = "x-swapForm-dropdown-item" onClick = {(e)=>handleToken(e,"USDT")}>
                                <img src = {`/img/USDT.png`} width = "20px"/>
                                <span className = "x-swapForm-token"> USDT</span>
                            </button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs = {6} sm = {8} md = {8}>
                    <div className = "x-font3" style = {{color: "white", float: "right"}}>balance <span>{balance}</span></div>
                    <input type = "number" className = "x-swapForm-input" placeholder="0.00" onChange = {(e)=>handleAmount(e)} value = {amount.toString().slice(0,15)}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default SwapForm;