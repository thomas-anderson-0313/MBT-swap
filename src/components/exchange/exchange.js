import React from 'react';
import ReactDOM from 'react-dom';
import {Grid} from '@material-ui/core';
import './exchange.css';
import Swap from './swap';


class Exchange extends React.Component {
    render() {
        return(
        <div>
            <Grid container>
                <Grid item xs={12} sm = {1} md = {1} lg={3}></Grid>
                <Grid item xs = {12} sm = {10} md = {10} lg={6}>
                    <Swap />
                </Grid>
                <Grid item xs={12} sm = {1} md = {1} lg={3}></Grid>
            </Grid>
        </div>
        );
    }
}

export default Exchange;