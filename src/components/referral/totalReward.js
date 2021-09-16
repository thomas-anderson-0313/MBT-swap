import React from "react";

import "./referral.css";
import '../../bootstrap.min.css';

function TotalReward() {
    return(
        <div className = "total-reward">
            <div className = "total-reward-title">
                <span>Total Rewards 💰</span>
            </div>
            <div className = "total-reward-count text-right">0
              <span style = {{marginLeft:'20px', color:'#26e3ff'}}>USDT</span>
            </div>
        </div>
    );
}

export default TotalReward;