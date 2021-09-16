import React from 'react';
import {useEffect, useState} from 'react';
import {Radio, Grid} from '@material-ui/core';
import { ethers } from 'ethers';
import {usdtContract,mbtContract,wbnbContract, pairBnbUsdt} from '../abi/contracts';

import './buy.css';
import '../../bootstrap.min.css';

export default function Spot() {

    // const [step, setStep] = useState("1");
    // const [stepValue, setStepValue] = useState("0");
    const [amount, setAmount] = useState(0);
    const [connect, setConnect] = useState(false);
    const [returnValue, setReturnValue] = useState(0);
    const [balance,setBalance]=useState(0);
    const [balance1,setBalance1]=useState(0);
    const [balance2,setBalance2]=useState(0);

    const [payStep,setPayStep] = useState("1");

    const [poolBnb,setPoolBnb] = useState(0);
    const [poolUsdt,setPoolUsdt] = useState(0);

    const handlePayStep = async (e,v) =>{
        console.log(v);
        setPayStep(v);
    }

    const handleAmount = async (e) =>{
        setAmount(e.target.value)
    }

    var price = 6.806425265450586;
    const handleBuy = async () =>{
        if(connect)
         if(!isNaN(returnValue)){
            // setLoading(true);
            if(amount>0){
                console.log(returnValue);
                try {
                    if(connect){
                        //ether
                        if(payStep=="1"){
                            console.log("BNB")
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            const signer = provider.getSigner();
                                
                        }
                        else {
                            console.log('USDT')
                            //usdt , first approve
                            const provider = new ethers.providers.Web3Provider(window.ethereum);
                            const signer = provider.getSigner();
                            var UserAddress = signer.getAddress();
 
                                    
                        }
                    }
                }
                catch (err){
                    console.log(err)
                    // setLoading(false);
                }
            }
            else{
                // setLoading(false);
          }
         }
    }

    // const handleBuy = async () =>{
    //     if(connect)
    //      if(!isNaN(returnValue)){
    //         setLoading(true);
    //         if(amount>0){
    //             console.log(returnValue);
    //             try {
    //                 if(connect){
    //                     //ether
    //                     if(payStep=="1"){
    //                         console.log("ether")
    //                         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //                         const signer = provider.getSigner();
    //                         var StakeContract = stakeContract.connect(signer)
                            
    //                         var tx;
                            
    //                         if(stepValue==5)
    //                             tx = await StakeContract.buy({value:ethers.utils.parseUnits(returnValue.toString().slice(0,15))})
    //                             .catch((err)=>{
    //                                 console.log(err)
    //                                 setLoading(false);
    //                             });
    //                         else
    //                             tx= await StakeContract.buyforstakingwithexactEHTforToken(stepValue,{value:ethers.utils.parseUnits(returnValue.toString().slice(0,15))})
    //                             .catch((err)=>{
                                    
    //                                 console.log(err)
    //                                 setLoading(false);
    //                             });
 
 
    //                         if(tx!=null){
    //                             await  provider.waitForTransaction(tx.hash)
    //                             .catch((err)=>{
    //                                 setLoading(false);
    //                             });
    //                             setLoading(false);  
    //                             window.location.reload();
    //                         }
                                
    //                     }
    //                     else {
    //                         console.log('usdt')
    //                         //usdt , first approve
    //                         const provider = new ethers.providers.Web3Provider(window.ethereum);
    //                         const signer = provider.getSigner();
    //                         var UserAddress = signer.getAddress();
 
    //                         var UsdtContract = usdtContract.connect(signer);
    //                         var allowance =await UsdtContract.allowance(UserAddress,stakeAddress);
 
    //                         var buyamount = returnValue;
 
    //                         //check allowance balance
    //                         if(ethers.utils.formatUnits(allowance,6) == 0){
    //                              var tx= await UsdtContract.approve(stakeAddress,ethers.utils.parseUnits(Number(buyamount).toFixed(6).toString(),6))
    //                              .catch((err)=>{
    //                                  console.log(err);
    //                                  setLoading(false);
    //                              });;
     
    //                              if(tx!=null){
    //                                  await  provider.waitForTransaction(tx.hash)
    //                                  .catch((err)=>{
    //                                      setLoading(false);
    //                                  });
    //                              }
    //                         }
    //                         else if(ethers.utils.formatUnits(allowance,6)<returnValue){
    //                             console.log(buyamount);
    //                              buyamount = ethers.utils.formatUnits(allowance,6);
                                 
    //                             console.log("use allowance balance",buyamount);
    //                         }
    //                         else {
    //                          console.log("use balance",buyamount);
    //                         }
 
 
    //                         var StakeContract = stakeContract.connect(signer);
    //                         if(stepValue!=5)
    //                              tx= await StakeContract.buyforstakingwithexactUsdtforToken(ethers.utils.parseUnits(Number(buyamount).toFixed(6).toString(),6),stepValue)
    //                              .catch((err)=>{
    //                                  console.log(Number(buyamount).toFixed(6).toString(),err);
    //                                  setLoading(false);
    //                              });
    //                          else 
    //                              tx= await StakeContract.buyforUsdt(ethers.utils.parseUnits(Number(buyamount).toFixed(6).toString(),6))
    //                              .catch((err)=>{
    //                                  console.log(Number(buyamount).toFixed(6),err);
    //                                  setLoading(false);
    //                              });
 
    //                         if(tx!=null){
    //                             await  provider.waitForTransaction(tx.hash)
    //                             .catch((err)=>{
    //                                 setLoading(false);
    //                             });
    //                             setLoading(false);
    //                             window.location.reload();   
    //                         }        
    //                     }
    //                 }
    //             }
    //             catch (err){
    //                 console.log(err)
    //                 setLoading(false);
    //             }
    //         }
    //         else{
    //             setLoading(false);
    //       }
    //      }
    // }

    useEffect(()=> {

        async function getData(){
            if(window.ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.listAccounts();
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
     
                //if metamask connected to site
                if(accounts.length!=0&&chainId==56){
                    
                 //setConnect true
                    setConnect(true);
                    
                    //get user
                    var signer=provider.getSigner()
                    const UserAddress=await signer.getAddress();
     
                 //    var WethContract = wethContract.connect(signer);
                    var MbtContract = mbtContract.connect(signer);
                    var UsdtContract = usdtContract.connect(signer);
                    var WbnbContract = wbnbContract.connect(signer);
     
                    setBalance(ethers.utils.formatUnits(await MbtContract.balanceOf(UserAddress),18).slice(0,15));
                    setBalance1((ethers.utils.formatUnits(await provider.getBalance(UserAddress))).slice(0,15));
                    setBalance2(ethers.utils.formatUnits(await UsdtContract.balanceOf(UserAddress),18).slice(0,15));
     
     
                    //update pool data
                    console.log("update")
                    var poolBnb = ethers.utils.formatUnits(await WbnbContract.balanceOf(pairBnbUsdt),18);
                    setPoolBnb(poolBnb);
     
                    var poolUsdt =ethers.utils.formatUnits(await UsdtContract.balanceOf(pairBnbUsdt),18);
                    setPoolUsdt(poolUsdt);
     
                }
            }
        }
        getData();
    },[payStep,connect]
    )
 
    const getAmoutIn=(amountout,reverseIn,reversOut)=>{
        console.log(poolBnb,poolUsdt);
        if(amountout<0|| amountout>=Number(reversOut) )
            {
             console.log("reversOut",amountout,reversOut);
                return String("too much");
             }
        else {
            var amountIn =amountout/(reversOut-amountout)*reverseIn;
            return amountIn;
        };
    }
    useEffect( ()=>{ async function getAmount(){
        if(amount>0){
            if(payStep=="1"){
                console.log("www",amount,"www",poolBnb,"www",poolUsdt)
                var amountIn1 = amount*price;
                var amountIn = getAmoutIn(amountIn1,poolBnb,poolUsdt);
                console.log(amountIn)
                setReturnValue(amountIn.toFixed(6));
            }
            else {
                //USDT
                
                var amountIn = amount*price;
                
                console.log(amountIn)
                
                setReturnValue(amountIn.toFixed(6));
            }
        }
    }
    getAmount();
    })
    

    return (
        <div>
            <div className="buyCard">
                <Grid container style={{ gap: 15 }}>
                    <Grid item xs={12} sm = {1} md = {1} lg={2}></Grid>
                    <Grid item xs = {12} sm = {5} md = {5} lg={4}>
                        <div className = "y-card-form-top">
                            <div className = "x-font3_2 text-center top_section" >
                                <span>YOUR BALANCE</span>
                                {/* <img src="/img/icon_1.png" alt="icon1"></img> */}
                            </div>
                            <div style={{padding:20}}>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Available BNB Balance:
                                    </span>
                                    <span className = "y-card-input">{balance1}</span>
                                </div>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Available USDT Balance:
                                    </span>
                                    <span className = "y-card-input">{balance2}</span>
                                </div>
                                <div className = "mt-3 bottom_border">
                                    <span className = "x-font3_1">
                                        Available MBT Balance:
                                    </span>
                                    <span className = "y-card-input">{balance}</span>
                                </div>
                            </div>
                           
                        </div>
                    </Grid>
                    <Grid item xs = {12} sm = {5} md = {5} lg={4}>
                        <div className = "y-card-form-top">
                            <div className = "x-font3_2 text-center top_section" >
                                <span>BUY MBT</span>
                                {/* <img src="/img/icon_2.png"></img> */}
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
                                                inputProps={{ 'aria-label': 'A' }}
                                                style={{color: "#26E3FF"}}
                                            />
                                            <span className = "x-font4">BNB</span>
                                            <Radio
                                                checked={payStep=="2"}
                                                onChange={(e)=>handlePayStep(e,"2")}
                                                name="radio-button-demo"
                                                style={{color: "#26E3FF"}}
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
                                        {`${returnValue}`} <span style={{color:'#26e3ff'}}> {payStep=="1"?"BNB":"USDT"}</span>
                                    </span>
                                </div>
                            </div>
                            
                        </div>
                    </Grid>
                    <Grid item xs={12} sm = {1} md = {1} lg={2}></Grid>
                </Grid>
                <div className = "mt-1 text-center">
                    <button className = "x-buyCard-submit-button" onClick = {handleBuy}>{<img src = "/img/loading.gif" />?"BUY NOW":null}</button>
                </div>
            </div>
        </div>
    );
}