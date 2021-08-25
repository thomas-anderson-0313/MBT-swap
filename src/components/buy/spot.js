import React from 'react';
import ReactDOM from 'react-dom';
import {useEffect, useState} from 'react';
import {Radio, Grid} from '@material-ui/core';
import { ethers } from 'ethers';
import {usdtContract,atariContract,wethContract,stakeContract, pairEthAtari, pairEthUsdt, stakeAddress} from '../abi/contracts';

import './buy.css';
import '../../bootstrap.min.css';

export default function Spot() {

    const [balance,setBalance]=useState(0);
    const [balance1,setBalance1]=useState(0);
    const [balance2,setBalance2]=useState(0);
    const [connect, setConnect] = useState(false);
    const handleAmount = async (e) =>{
        setAmount(e.target.value)
    }
    const [amount, setAmount] = useState(0);
    const [payStep,setPayStep] = useState("1");
    const handlePayStep = async (e,v) =>{
        console.log(v);
        setPayStep(v);
    }
    const [returnValue, setReturnValue] = useState(0);
    const [loadingStake, setLoading] = useState(false);
    const [atariDecimals,setAtariDecimals] = useState(18);
    const [usdtDecimals, setUsdtDecimals] = useState(18);

    const handleBuy = async () =>{
        if(connect)
         if(!isNaN(returnValue)){
            setLoading(true);
            if(amount>0){
                console.log(returnValue);
                try {
                    if(connect){
                        //ether
                        if(payStep=="1"){
                            console.log("ether")
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            const signer = provider.getSigner();
                                
                        }
                        else {
                            console.log('usdt')
                            //usdt , first approve
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            const signer = provider.getSigner();
                            var UserAddress = signer.getAddress();
 
                                    
                        }
                    }
                }
                catch (err){
                    console.log(err)
                    setLoading(false);
                }
            }
            else{
                setLoading(false);
          }
         }
    }

    useEffect( async()=>{
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
 
            //if metamask connected to site
            if(accounts.length!=0&&chainId==1){
                
                //setConnect true
                setConnect(true);
                
                //get user
                var signer=provider.getSigner()
                const UserAddress=await signer.getAddress();
 
                var WethContract = wethContract.connect(signer);
                var AtariContract = atariContract.connect(signer);
                var UsdtContract = usdtContract.connect(signer);
                var StakeContract = stakeContract.connect(signer);
 
                //atari info
                var atariDecimals  = await AtariContract.decimals();
                setAtariDecimals(atariDecimals);
 
                //usdt info 
                var usdtDecimals = await UsdtContract.decimals();
                setUsdtDecimals(usdtDecimals);
 
                //stake info
                // var stakeamount =ethers.utils.formatUnits( await StakeContract.getamount(window.ethereum.selectedAddress),atariDecimals);
                // setStakeState(stakeamount);
 
                // var lock = await StakeContract.getlocktime(UserAddress);
 
                // var lockDate = new Date(); // Epoch
                // lockDate.setSeconds(lock);
                // setLockTime(lockDate.toUTCString());
 
                setBalance(ethers.utils.formatUnits(await AtariContract.balanceOf(UserAddress),atariDecimals).slice(0,15));
                
                //user balance
                    setBalance1((ethers.utils.formatUnits(await provider.getBalance(UserAddress))).slice(0,15));
                    setBalance2(ethers.utils.formatUnits(await UsdtContract.balanceOf(UserAddress),6).slice(0,15));
 
 
                //update pool data
                // console.log("update")
                // var poolEth = ethers.utils.formatUnits(await WethContract.balanceOf(pairEthAtari));
                // setPoolEth(poolEth);
 
                // var poolAtari = ethers.utils.formatUnits(await AtariContract.balanceOf(pairEthAtari),0);
                // setPoolAtari(poolAtari);
 
                // var poolEth1 =ethers.utils.formatUnits(await WethContract.balanceOf(pairEthUsdt));
                // setPoolEth1(poolEth1);
 
                // var poolUsdt =ethers.utils.formatUnits(await UsdtContract.balanceOf(pairEthUsdt),6);
                // setPoolUsdt(poolUsdt);
 
            }
        }
    },[payStep,connect])

    return (
        <div>
            <div className="buyCard">
                <Grid container spacing = {2}>
                <Grid item xs={12} sm = {1} md = {1} lg={2}></Grid>
                    <Grid item xs = {12} sm = {5} md = {5} lg={4}>
                        <div className = "y-card-form-top">
                            <div className = "x-font3_2 text-center top_section" >
                                <span>YOUR BALANCE</span>
                                <img src="/img/icon_1.png" alt="icon1"></img>
                            </div>
                            <div style={{padding:20}}>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Available BNB balance:
                                    </span>
                                    <span className = "y-card-input">{balance1}</span>
                                </div>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Available USDT balance:
                                    </span>
                                    <span className = "y-card-input">{balance2}</span>
                                </div>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Available MBT balance:
                                    </span>
                                    <span className = "y-card-input">{balance}</span>
                                </div>
                            </div>
                           
                        </div>
                    </Grid>
                    <Grid item item xs = {12} sm = {5} md = {5} lg={4}>
                        <div className = "y-card-form-top">
                            <div className = "x-font3_2 text-center top_section" >
                                <span>BUY MBT</span>
                                <img src="/img/icon_2.png"></img>
                            </div>
                            <div style={{padding:20}}>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Amount in MBT:
                                    </span>
                                    <input className = "y-card-input" style={{textAlign:'right'}} onChange = {handleAmount} value = {amount}/>
                                </div>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Payment method:
                                    </span>
                                    <div  className = 'float-right' style={{marginTop:-7}}>
                                        <span>
                                            <Radio
                                                checked={payStep=="1"}
                                                onChange={(e)=>handlePayStep(e,"1")}
                                                name="radio-button-demo"
                                                color = "primary"
                                                inputProps={{ 'aria-label': 'A' }}
                                            />
                                            <span className = "x-font4">BNB</span>
                                            <Radio
                                                checked={payStep=="2"}
                                                onChange={(e)=>handlePayStep(e,"2")}
                                                name="radio-button-demo"
                                                color = "primary"
                                                inputProps={{ 'aria-label': 'A' }}
                                            />
                                            <span className = "x-font4">USDT</span>
                                        </span>
                                
                                    </div>
                                   </div>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Amount in crypto:
                                    </span>
                                    <span className = "x-font3 float-right">
                                        {`${returnValue}`} <span style={{color:'#e31e2d'}}> {payStep=="1"?"BNB":"USDT"}</span>
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                    </Grid>
                    <Grid item xs={12} sm = {1} md = {1} lg={2}></Grid>
                </Grid>
                <div className = "mt-1 text-center">
                    <button className = "x-buyCard-submit-button" style={{padding:14, width:'30%'}} onClick = {handleBuy}>{loadingStake?<img src = "/img/box.gif" />:"BUY"}</button>
                </div>
            </div>
        </div>
    );
}