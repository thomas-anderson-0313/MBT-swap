import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./referral.css";
import clipFunnel from '../../assets/clip-funnel.svg';
import copyClip from '../../assets/copy-clip.svg';

export default function GetLink(props) {
    const {address} = props;
    const [isCopied, setIsCopied] = useState(false);

    console.log(address);
    console.log(window.location.origin);
    return(
        <div className = "get-link">
            <div className = "get-link-title">Get your referral link</div>
            {address?(
                <a href = {`${window.location.origin}/?referrer=${address}`} target = "_blank">
                    <div className = "git-link-url">
                        {`${window.location.origin}/?referrer=${address}`}
                    <span style = {{marginLeft:'10px'}}><img src = {clipFunnel}></img></span>
                    </div>
                </a>
            ):(
                <div></div>
            )}
            <CopyToClipboard text = {`${window.location.origin}/?referrer=${address}`}>
            {address?(
            <button className = "get-link-button" onClick={() => {
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 1000);
          }}>
                <span><img src = {copyClip} style = {{marginRight:'10px'}}></img></span>
                <span>{isCopied ? "COPIED TO CLIPBOARD" : "COPY REFERRAL URL"}</span>
            </button>
            ):(
                <button className = "get-link-button1" disabled = "true" style = {{opacity:'0.1'}}>
                        <span><img src = {copyClip} style = {{marginRight:'10px'}}></img></span>
                        <span>{isCopied ? "COPIED TO CLIPBOARD" : "COPY REFERRAL URL"}</span>
                    </button>
            )}
            </CopyToClipboard>
        </div>
    );
}
