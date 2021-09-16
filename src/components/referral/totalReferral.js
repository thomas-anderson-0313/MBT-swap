import React from "react";

import "./referral.css";
import referIcon from '../../assets/refer.svg';

function TotalRefer() {
    return(
        <div className = "total-referral">
            <div className = "total-referral-title">Total Referrals</div>
            <div className = "total-referral-count">0
              <span style = {{marginLeft:'20px'}}><img src = {referIcon} width = "6%"></img></span>
            </div>
        </div>
    );
}

export default TotalRefer;