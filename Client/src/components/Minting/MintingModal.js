import React, {
    useState,
    useEffect,
} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

import "../../styles/MintingCard.css";
import buttonImg from "../../assets/animal-button.png";
import Button from "@mui/material/Button";
import Home from "../../pages/MintCard";
import Footer from "../Footer";

const MintingModal =
    () => {
        return (
            <div>
                <h2 class="animal-data-title">
                    남은
                    동물
                    NFT
                </h2>
                <div class="animal-card">
                    <h2>
                        674개
                    </h2>
                </div>
                {/* <Footer /> */}
                <Link to="/mintcard">
                    <img
                        width="400px"
                        src={
                            buttonImg
                        }
                    />
                </Link>
            </div>
        );
    };

export default MintingModal;
