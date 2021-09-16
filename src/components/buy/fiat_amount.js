import React, {useState} from "react";

import "./fiat.css";

export default function FiatAmount(){
    const [fiatAmount, setFiatAmount] = useState(0);
    const handleFiatAmount = async (e) =>{
        setFiatAmount(e.target.value)
    }
    var price = 6.806425265450586;
    var returnFiatValue = price * fiatAmount;
    var returnFeeValue = price * fiatAmount * 0.045;
    var returnTotalValue = price * fiatAmount * 1.045;
    return(
        <div className = "fiat-amount">
            <div className = "amount-card">
                <div className = "top-part">{returnTotalValue}</div>
                <div className = "mt-3 bottom_border">
                    <span className = "">Amount in MBT:</span>
                    <input className = "" style={{textAlign:'right'}} onChange = {handleFiatAmount} value = {fiatAmount}/>
                </div>
                <div className = "mt-3 bottom_border">
                    <span className = "">Amount in USD:</span>
                    <span className = "float-right">
                        {returnFiatValue} <span style={{color:'#26e3ff'}}> USD</span>
                    </span>
                </div>
                <div className = "mt-3 bottom_border">
                    <span className = "">Service Fee:</span>
                    <span className = "float-right">
                        {returnFeeValue} <span style={{color:'#26e3ff'}}> USD</span>
                    </span>
                </div>
                <div className = "mt-3 bottom_border">
                    <span className = "">Total in USD:</span>
                    <span className = "float-right">
                        {returnTotalValue} <span style={{color:'#26e3ff'}}> USD</span>
                    </span>
                </div>
            </div>
            <div className = "fiat-button">

            </div>
        </div>
    );
}