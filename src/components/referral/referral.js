import React from 'react';
import ReactDOM from 'react-dom';
import {Grid} from '@material-ui/core';
import { useState } from 'react';

import './referral.css';
import '../../bootstrap.min.css';

import Getlink from "./getLink";

export default function Referral() {

    const [getLinkState,setGetLinkState] = useState(false);

    const handleToggle = (e)=>{
        setGetLinkState(e);
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm = {1} md = {1} lg={1}></Grid>
                <Grid item xs = {12} sm = {3} md = {3} lg={3}>
                    <div className = "referral-menu text-center">
                            <div style={{padding:30}}>
                                <div className = "mt-3 referral-menu-x">
                                    <span className = "refer-font" onClick={()=>{handleToggle(false)}}>
                                        Get Link to refer
                                    </span>
                                </div>
                                <div className = "mt-5 referral-menu-x">
                                    <span className = "refer-font">
                                       Track your referral progress
                                    </span>
                                </div>
                                <div className = "mt-5 referral-menu-x">
                                    <span className = "refer-font">
                                        Your total rewards
                                    </span>
                                </div>
                            </div>
                    </div>
                </Grid>
                <Grid item xs = {12} sm = {7} md = {7} lg={7}>
                    {getLinkState==false?<Getlink />:<Getlink />}
                </Grid>
                <Grid item xs={12} sm = {1} md = {1} lg={1}></Grid>
            </Grid>         
        </div>
    );
}