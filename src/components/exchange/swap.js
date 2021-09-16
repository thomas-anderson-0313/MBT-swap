import React, {useEffect, useState} from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import {Radio, Grid} from '@material-ui/core';
import Web3 from 'web3';
import {web3, mbt, usdt, wbnb,routerAddress, factoryContract, exchangeContract, mbtContract, usdtContract, gasLimitHex, PairAbi, factoryAddress} from '../abi/contract1';
import { ethers } from 'ethers';


import './exchange.css';
import '../../bootstrap.min.css';
import SwapForm from "./swapForm";
import tokenAbi from '../abi/token.json'; 



export default function Spot(props) {
    const {connectFlag} = props;
    const [connectFlag1,setConnectFlag1]=useState("false");
    const [balance1,setBalance1]=useState(0);
    const [balance2,setBalance2]=useState(0);
    const [flag1, setFlag1] = useState(true);
    const [token1, setToken1] = useState("BNB");
    const [flag2, setFlag2] = useState(true);
    const [token2, setToken2] = useState("MBT");
    const [tokenAddress1, setTokenAddress1] = useState("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");
    const [tokenAddress2, setTokenAddress2] = useState("0x8d7d20bc3be644eaab3239e3a5aa9158b84912ed");
    const [amount1, setAmount1] = useState(0);
    const [amount2, setAmount2] = useState(0);
    const [loading, setLoading] = useState(false);
    const [screenWidth, setScreenWidth] = useState();
	const [signer,setSigner]=useState();
	const [userAddress,setAddress]=useState();

    const handleReverse = async () =>{
        setToken1(token2);
        setToken2(token1);
		setTokenAddress1(tokenAddress2);
		setTokenAddress2(tokenAddress1);
    } 
     
    const handleToken1 =async (e,v) =>{
        setToken1(v);
		var tokenAddress;
        if(v=="MBT")
            {
				tokenAddress=mbt;
				setTokenAddress1(mbt);
			}
        if(v=="USDT")
            {
				tokenAddress=usdt;
				setTokenAddress1(usdt);
			}
        if(v=="BNB")
		{
			tokenAddress=wbnb;
            setTokenAddress1(wbnb);
		}
        setFlag1(true);

    }
    const handleToken2 =async (e,v) =>{
        setToken2(v);
		var tokenAddress;
        if(v=="MBT")
		{
			tokenAddress=mbt;
            setTokenAddress2(mbt);
		}
        if(v=="USDT")
		{
			tokenAddress=usdt;
            setTokenAddress2(usdt);
		}
        if(v=="BNB")
		{
			tokenAddress=wbnb;
            setTokenAddress2(wbnb);
		}
        setFlag2(true);
    }


    const handleAmount1 = async (e)=>{
        setAmount1(e.target.value);
		var tokenAmount1=e.target.value;

		console.log(userAddress,token1,token2,"amount",tokenAmount1);
		//metamask must connect
		if(connectFlag&&tokenAmount1>0&&token1!=token2){
			//exchange router
			var exchangeRouter=exchangeContract.connect(signer);
			
			//token contracts
			var tokenContract1=new ethers.Contract(tokenAddress1,tokenAbi,signer);
			var tokenContract2=new ethers.Contract(tokenAddress2,tokenAbi,signer);

			// var token1Decimal = await tokenContract1.decimals();
			var token1Amountfomatted = parseFloat(tokenAmount1).toFixed(18);
			// console.log(token1Decimal,token1)
			if(token1Amountfomatted>0)
			// amount to bignumber
			{
				const BNamount1=ethers.utils.parseUnits(token1Amountfomatted.toString(),18);

				console.log(BNamount1,tokenAddress1, tokenAddress2);
				if(token1.toUpperCase()=="BNB"||token2.toUpperCase()=="BNB")
					{
						console.log("bnb swap")
						var pairData1 = await exchangeRouter.getAmountsOut(BNamount1, [tokenAddress1, tokenAddress2])
						.catch((err)=>{
							console.log(err);
							setAmount2(0);
						});

						if(pairData1!=null){
							setAmount2(ethers.utils.formatUnits(pairData1[1],18));
						}
					}
				else {
					var pairData1 = await exchangeRouter.getAmountsOut(BNamount1, [tokenAddress1, wbnb, tokenAddress2])
							.catch((err)=>{
								console.log(err);
								setAmount2(0);
							});
					console.log(pairData1[2]);	

					if(pairData1!=null){
						setAmount2(ethers.utils.formatUnits(pairData1[2],await tokenContract2));
					}
					}
				
			}
			else setAmount2(0);
		}
    }

    const handleAmount2 = async (e)=>{
        console.log(e.target.value,tokenAddress1,tokenAddress2);
        setAmount2(e.target.value);

		
		console.log(userAddress);
		var tokenAmount2=e.target.value;

		//metamask must connect
		if(connectFlag&&tokenAmount2>0&&token1!=token2){
			
			//exchange router
			var exchangeRouter=exchangeContract.connect(signer);
			
			//token contracts
			var tokenContract1=new ethers.Contract(tokenAddress1,tokenAbi,signer);
			var tokenContract2=new ethers.Contract(tokenAddress2,tokenAbi,signer);

			// var token2Decimal = await tokenContract2.decimals();
			var token2Amountfomatted = parseFloat(tokenAmount2).toFixed(18);
			if(token2Amountfomatted>0)
			{
				//amount to bignumber
				
				const BNamount=ethers.utils.parseUnits(token2Amountfomatted,await tokenContract2.decimals());
				if(token1=="BNB"||token2=="BNB")
					var pairData = await exchangeRouter.getAmountsIn(BNamount, [tokenAddress1, tokenAddress2])
					.catch((err)=>{
						console.log(err);
						setAmount1(0);
					});
				else 
					var pairData = await exchangeRouter.getAmountsIn(BNamount, [tokenAddress1, wbnb, tokenAddress2])
					.catch((err)=>{
						console.log(err);
						setAmount1(0);
					});
				if(pairData!=null){
					setAmount1(ethers.utils.formatUnits(pairData[0],18));
				}
			}
			else setAmount1(0);
		}
    }



    useEffect(()=> {
        async function getData1(){
            if(window.ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const accounts = await provider.listAccounts();
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
     
                //if metamask connected to site
                if(accounts.length!=0&&chainId==56){
                    
                 //setConnect true
                    setConnectFlag1(true);
                    
                    var signer=provider.getSigner()
				    setSigner(signer);
     
                    const UserAddress=await signer.getAddress();
                    setAddress(UserAddress);
                    setConnectFlag1(true);


                    var tokenContract1=new ethers.Contract(tokenAddress1,tokenAbi,signer);
                    var tokenContract2=new ethers.Contract(tokenAddress2,tokenAbi,signer);
                    
                    if(tokenAddress1==wbnb)
                        setBalance1((ethers.utils.formatUnits(await provider.getBalance(UserAddress))).slice(0,15));
                    else 
                        setBalance1(ethers.utils.formatUnits(await tokenContract1.balanceOf(UserAddress),18).slice(0,15));
                    
                    if(tokenAddress2==wbnb)	
                        setBalance2((ethers.utils.formatUnits(await provider.getBalance(UserAddress))).slice(0,15));
                    else	
                        setBalance2(ethers.utils.formatUnits(await tokenContract2.balanceOf(UserAddress),18).slice(0,15));
     
                }
            }
        }
        getData1();
        }
    
    )
    return (
        <div>
            <div className = "x-swapCard-container" style = {screenWidth>800?{paddingLeft:"30px", paddingRight: "30px"}:{paddingRight: "10px", paddingLeft: "10px"}}>
                <div style={{display:'flex',marginBottom:20}}>
                    <span className="x-font2">EXCHANGE</span>
                    <span className="x-font3-swap" style={{marginLeft:'auto',alignSelf:'center'}}>{connectFlag?`Metamask Connected`:`Please connect metamask`}</span>
                </div>
                <SwapForm role = "From"  handleToken = {handleToken1} flag = {flag1} setFlag = {setFlag1} token = {token1} handleAmount = {handleAmount1} balance = {balance1} amount = {amount1}/>
                <div className = "text-center">
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick = {handleReverse}>
                        <ArrowDownwardIcon style = {{color: "yellow"}}/>
                    </IconButton>
                </div>
                <SwapForm role = "To" handleToken = {handleToken2} flag = {flag2} setFlag = {setFlag2} token = {token2} handleAmount = {handleAmount2} balance = {balance2} amount = {amount2}/>
                <div style = {{height: "40px"}}></div>
                <div className = "mt-10">
                    <button className = "x-swapCard-submit-button">{loading?<img src = "/img/box.gif" />:"EXCHANGE"}</button>
                </div>
            </div>
        </div>
    );
}