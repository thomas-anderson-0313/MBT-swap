import Web3 from 'web3';
import { ethers } from 'ethers';
import exchangeAbi from './exchange.json';
// import factoryAbi from './factory.json';
import tokenAbi from './token.json';
import pairAbi from './pair.json';
// import stakeAbi from './staking.json'

export const mainnet = `https://bsc-dataseed.binance.org/`;
export var web3 = new Web3(new Web3.providers.HttpProvider(mainnet));
export var provider = new ethers.providers.JsonRpcProvider(mainnet);
// export var factoryAddress = "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f";
export var routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
// export var stakeAddress = "0xAff06d0A92474b5c2cDbb0Eb00B4D41802bA823A";
export var mbt = "0x8d7d20bc3be644eaab3239e3a5aa9158b84912ed";
export var usdt = "0x55d398326f99059ff775485246999027b3197955";
export var wbnb="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
// export var usdt = "0xdac17f958d2ee523a2206206994597c13d831ec7";
// export var factoryContract =new ethers.Contract(factoryAddress,factoryAbi ,provider);
export var exchangeContract= new ethers.Contract(routerAddress,exchangeAbi,provider);
// export var stakeContract= new ethers.Contract(stakeAddress,stakeAbi,provider);
export var mbtContract= new ethers.Contract(mbt,tokenAbi,provider);
export var usdtContract = new ethers.Contract (usdt,tokenAbi,provider);
export var wbnbContract = new ethers.Contract (wbnb,tokenAbi,provider);
export const PairAbi = pairAbi;
export const TokenAbi = tokenAbi;