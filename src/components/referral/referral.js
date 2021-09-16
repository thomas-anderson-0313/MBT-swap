import React from 'react';
import {Grid} from '@material-ui/core';
import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';

import './referral.css';
import '../../bootstrap.min.css';
import referIcon from '../../assets/refer.svg';

import GetLink from "./getLink";
import TotalReward from "./totalReward";
import Withdraw from "./withdraw";
import TotalRefer from "./totalReferral";

export default function Referral(props) {
    const {address} = props;
    return (
        <div style = {{marginTop:'2%'}}>
            <Grid container style={{ gap: 35 }}>
                <Grid item xs={12} sm = {12} md = {1} lg={1}></Grid>
                <Grid item xs = {12} sm = {12} md = {4} lg={4}>
                    <div className = "referral-left text-center">
                        <div className = "refer-title">REFER friends and get REWARDs
                            <span style = {{marginLeft:'16px'}}><img src = {referIcon}></img></span>
                        </div>
                        <div className = "refer-statement">Share the referral link below to invite your friends and 💰 EARN 10% of your friends' exchange amount weekly-every THURSDAY.</div>
                    </div>
                    <div className = "calendar-style"><Calendar /></div>
                </Grid>
                <Grid item xs = {12} sm = {12} md = {6} lg={6}>
                    <GetLink address = {address} />
                    <Grid container style = {{marginTop:'3%'}}>
                        <Grid item xs={12} sm = {12} md = {6} lg={6}><TotalRefer /></Grid>
                        <Grid item xs={12} sm = {12} md = {6} lg={6}><TotalReward /></Grid>
                    </Grid>
                    <Withdraw />
                </Grid>
                <Grid item xs={12} sm = {12} md = {1} lg={1}></Grid>
            </Grid>         
        </div>
    );
}