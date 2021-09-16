import React from "react";

import "./referral.css";
import waitGif from "../../assets/wait.gif";

function Withdraw() {

    const day =new Date().getDay();
    const handleButton = ()=>{
        alert('ok, you can withdraw now');
    }
    return(
        <div className = "withdraw">
            {(day==4)?(
            <button className = "withdraw-button" onClick = {handleButton}>WITHDRAW REWARDS NOW</button>
            ):(
            <button className = "withdraw-button1" disabled = "true">
                <span style = {{marginRight:'3%'}}><img src = {waitGif} width = "7%"></img></span>
                Please Wait By Thursday</button>
            )}
        </div>
    );
}

export default Withdraw;