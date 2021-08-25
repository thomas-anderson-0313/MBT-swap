import React, {useEffect, useState} from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import {Radio, Grid} from '@material-ui/core';
import Web3 from 'web3';
import { ethers } from 'ethers';


import './exchange.css';
import '../../bootstrap.min.css';
import SwapForm from "./swapForm";



export default function Spot() {

    const [balance,setBalance]=useState(0);
    const [balance1,setBalance1]=useState(0);
    const [balance2,setBalance2]=useState(0);
    const [flag1, setFlag1] = useState(true);
    const [token1, setToken1] = useState("BNB");
    const [flag2, setFlag2] = useState(true);
    const [token2, setToken2] = useState("MBT");
    const [tokenAddress1, setTokenAddress1] = useState("0x8d7d20bc3be644eaab3239e3a5aa9158b84912ed");
    const [tokenAddress2, setTokenAddress2] = useState("0x8d7d20bc3be644eaab3239e3a5aa9158b84912ed");
    const [amount1, setAmount1] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const [loading, setLoading] = useState(false);
    const [screenWidth, setScreenWidth] = useState();
	const [connectFlag,setConnectFlag]=useState("false");
	const [signer,setSigner]=useState();
	const [userAddress,setAddress]=useState();

    const handleReverse = async () =>{
        setToken1(token2);
        setToken2(token1);
		setTokenAddress1(tokenAddress2);
		setTokenAddress2(tokenAddress1);
    }
    
    return (
        <div>
            <div className = "x-swapCard-container" style = {screenWidth>800?{paddingLeft:"30px", paddingRight: "30px"}:{paddingRight: "10px", paddingLeft: "10px"}}>
                <div style={{display:'flex',marginBottom:20}}>
                    <span className="x-font2">Exchange</span>
                    <span className="x-font3-swap" style={{marginLeft:'auto',alignSelf:'center'}}>{connectFlag?`Metamask Connected`:`Please connect metamask`}</span>
                </div>
                <SwapForm role = "From"  flag = {flag1} setFlag = {setFlag1} token = {token1} balance = {balance1} amount = {amount1}/>
                <div className = "text-center">
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick = {handleReverse}>
                        <ArrowDownwardIcon style = {{color: "yellow"}}/>
                    </IconButton>
                </div>
                <SwapForm role = "To" flag = {flag2} setFlag = {setFlag2} token = {token2} balance = {balance2} amount = {amount2}/>
                <div style = {{height: "40px"}}></div>
                <div className = "mt-10">
                    <button className = "x-swapCard-submit-button">{loading?<img src = "/img/box.gif" />:"Exchange"}</button>
                </div>
            </div>
        </div>
    );
}