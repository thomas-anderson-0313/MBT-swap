import React from 'react';
import {Grid} from '@material-ui/core';
import './exchange.css';
import Swap from './swap';


class Exchange extends React.Component {
    
    render() {
        const {address} = this.props;
        return(
        <div>
            <Grid container>
                <Grid item xs={12} sm = {1} md = {1} lg={2}></Grid>
                <Grid item xs = {12} sm = {10} md = {10} lg={8}>
                    <Swap connectFlag = {address}/>
                </Grid>
                <Grid item xs={12} sm = {1} md = {1} lg={2}></Grid>
            </Grid>
        </div>
        );
    }
}

export default Exchange;