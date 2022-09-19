import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MainSub.css";
import title from "../../assets/our-story.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const MintingButton =
    () => {
        return (
            <div id="mainsub">
                <Header />
                {/* <img id='hero-background' src={list[0].src}/> */}
                <img
                    width="500px"
                    src={
                        title
                    }
                />
            </div>
        );
    };

export default MintingButton;
