import { ethers } from 'ethers';
import tokenAbi from './token.json';
import pairAbi from './pair.json';

export const mainnet = `https://bsc-dataseed.binance.org/`;
export var provider = new ethers.providers.JsonRpcProvider(mainnet);
// export var stakeAddress = "0x1afEBF01f5eE7195c7044939E20e2FAC6A60b18f";
export var mbt = "0x8d7d20bc3be644eaab3239e3a5aa9158b84912ed";
export var wbnb="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export var usdt = "0x55d398326f99059ff775485246999027b3197955";
// export var pairEthAtari = "0xc4d9102e36c5063b98010A03C1F7C8bD44c32A00";
export var pairBnbUsdt = "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE";
// export var pairEthUsdt = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852";

export var mbtContract= new ethers.Contract(mbt,tokenAbi,provider);
export var usdtContract = new ethers.Contract (usdt,tokenAbi,provider);
export var wbnbContract = new ethers.Contract (wbnb,tokenAbi,provider);
export const PairAbi = pairAbi;
export const TokenAbi = tokenAbi;

