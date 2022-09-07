import React, {
    useState,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import paperimg from "../../assets/paperimg.png";
import nftexample from "../../assets/nftexample.jpg";

const MainNFT =
    () => {
        return (
            <div id="hero">
                <h3 id="header-subtext-first">
                    OUR
                    NFT
                </h3>
                <img
                    src={
                        paperimg
                    }
                />
                <img
                    width="340"
                    height="340"
                    src={
                        nftexample
                    }
                />
                <h1 id="">
                    {" "}
                    SAMALS
                </h1>
                <h5 id="">
                    Start
                    your
                    NFT
                    collection
                    now
                </h5>
            </div>
        );
    };

export default MainNFT;
