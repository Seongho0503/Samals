import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const MainTitle =
    () => {
        let navigate =
            useNavigate();

        const goExplore =
            () => {
                navigate(
                    "/explore"
                );
            };
        const goCreate =
            () => {
                navigate(
                    "/create"
                );
            };

        return (
            <div id="hero">
                {/* <img id='hero-background' src={list[0].src}/> */}

                <Header />

                <h3 id="header-text-second">
                    {" "}
                    SAVE
                    THE
                    ANIMALS{" "}
                </h3>
                <h1 id="header-text-first">
                    {" "}
                    SAMALS
                </h1>
                <h5 id="header-subtext">
                    Start
                    your
                    NFT
                    collection
                    now
                </h5>

                <div id="hero-buttons">
                    <button
                        id="explore"
                        onClick={
                            goExplore
                        }
                    >
                        Explore
                    </button>
                    <button
                        id="create"
                        onClick={
                            goCreate
                        }
                    >
                        Create
                    </button>
                </div>
            </div>
        );
    };

export default MainTitle;
