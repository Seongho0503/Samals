import React, {
    useState,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const MainToken =
    () => {
        return (
            <div id="hero">
                <h3 id="header-subtext-first">
                    OUR
                    TOKEN
                </h3>
                <h1 id="">
                    {" "}
                    SAMALS
                </h1>
                <h5 id="header-subtext-first">
                    싸피
                    토큰
                    설명
                </h5>
            </div>
        );
    };

export default MainToken;
