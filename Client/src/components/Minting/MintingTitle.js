import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MainSub.css";
import bg from "../../assets/bg-04.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const MintingTitle =
    () => {
        return (
            <div>
                {/* <img id='hero-background' src={list[0].src}/> */}
                <img
                    width="100%"
                    src={
                        bg
                    }
                />
            </div>
        );
    };

export default MintingTitle;
