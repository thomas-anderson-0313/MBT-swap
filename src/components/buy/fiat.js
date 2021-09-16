import React from 'react';
// import ReactDOM from 'react-dom';
import {useEffect, useState} from 'react';
import {Radio, Grid, responsiveFontSizes} from '@material-ui/core';
import { PayPalButton } from "react-paypal-button-v2";

import './buy.css';
import '../../bootstrap.min.css';
import Stripe from './stripe';
import stripeImg from '../../assets/stripe.svg';
import paypalImg from '../../assets/paypal.svg';
import FiatAmount from './fiat_amount';

export default function Fiat() {
    const[payOption, setPayOption] = useState('1');

    const handlePayOption = async (e,v) =>{
        console.log(v);
        setPayOption(v);
    }

    
    return(
    <Grid container>
        <Grid item xs = {12} sm = {12} md = {1} lg = {1}></Grid>
        <Grid item xs = {12} sm = {12} md = {4} lg = {4}>
            <div className = "fiat-left">
                <FiatAmount />
            </div>
        </Grid>
        <Grid item xs = {12} sm = {12} md = {1} lg = {1}></Grid>
        <Grid item xs = {12} sm = {12} md = {5} lg = {5}>
            <div className = "fiat-right">
                <div className = "stripe-selection">
                    <Radio
                        checked={payOption=="1"}
                        onChange={(e)=>handlePayOption(e,"1")}
                        name="radio-button-demo"
                        style={{color: "#26E3FF"}}
                        inputProps={{ 'aria-label': 'A' }}
                    />
                    <span className = "x-font4">Credit & Debit Cards</span>
                    <span><img src = {stripeImg} style = {{marginLeft:'2%'}} /></span>
                    <Stripe payOption = {payOption} />
                </div>
                <div className = "paypal-selection">
                    <div>
                        <Radio
                            checked={payOption=="2"}
                            onChange={(e)=>handlePayOption(e,"2")}
                            name="radio-button-demo"
                            style={{color: "#26E3FF"}}
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <span><img src = {paypalImg} style = {{marginLeft:'2%'}} /></span>
                    </div>
                    <div className={(payOption=="1")?"hidden":" "}>
                        <PayPalButton
                            style={{ layout: "horizontal", color: "blue", shape: "pill", label: "pay", height: 40}}
                            amount="20"
                            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                            onSuccess={(details, data) => {
                            alert("Transaction completed by " + details.payer.name.given_name);

                            // OPTIONAL: Call your server to save the transaction
                            return fetch("/paypal-transaction-complete", {
                                method: "post",
                                body: JSON.stringify({
                                orderId: data.orderID
                                })
                            });
                            }}
                            options={{
                            clientId:
                            "AdeBL3toV6kL90Y_UvJAQc4EslJ63qLg4vGenRRMPN8M8vev_cepS9UNjaMB7hKyEqfNdn3JnIXP0cMV"
                            }}
                        />
                    </div>
                </div>
            </div>
        </Grid>
        <Grid item xs = {12} sm = {12} md = {1} lg = {1}></Grid>
    </Grid>
    );
}