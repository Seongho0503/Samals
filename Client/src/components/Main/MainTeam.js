import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MainTeam.css";
import { useNavigate } from "react-router-dom";
import profile from "../../assets/profile-example.png";
import Header from "../Header";

const MainTeam =
    () => {
        return (
            <div id="hero2">
                <h3 id="header-subtext-first">
                    OUR
                    TEAM
                </h3>
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

                <div class="container">
                    <div
                        class="at-grid"
                        data-column="3"
                    >
                        <div class="at-column">
                            <div class="at-user">
                                <div class="at-user__avatar">
                                    <img
                                        src={
                                            profile
                                        }
                                    />
                                </div>
                                <div class="at-user__name">
                                    Lee
                                    Chung
                                </div>
                                <div class="at-user__title">
                                    Team
                                    Leader
                                    <br />
                                    Back-End
                                </div>
                            </div>
                        </div>
                        <div class="at-column">
                            <div class="at-user">
                                <div class="at-user__avatar">
                                    <img
                                        src={
                                            profile
                                        }
                                    />
                                </div>
                                <div class="at-user__name">
                                    Marco
                                    Gomez
                                </div>
                                <div class="at-user__title">
                                    Co-Founder,
                                    Creative
                                    Director
                                </div>
                            </div>
                        </div>
                        <div class="at-column">
                            <div class="at-user">
                                <div class="at-user__avatar">
                                    <img
                                        src={
                                            profile
                                        }
                                    />
                                </div>
                                <div class="at-user__name">
                                    Brad
                                    Joe
                                </div>
                                <div class="at-user__title">
                                    Office
                                    Manager
                                </div>
                            </div>
                        </div>
                        <div class="at-column">
                            <div class="at-user">
                                <div class="at-user__avatar">
                                    <img
                                        src={
                                            profile
                                        }
                                    />
                                </div>
                                <div class="at-user__name">
                                    Mitch
                                    Petty
                                </div>
                                <div class="at-user__title">
                                    Lead
                                    Developer
                                </div>
                            </div>
                        </div>
                        <div class="at-column">
                            <div class="at-user">
                                <div class="at-user__avatar">
                                    <img
                                        src={
                                            profile
                                        }
                                    />
                                </div>
                                <div class="at-user__name">
                                    Philip
                                    Satemburgo
                                </div>
                                <div class="at-user__title">
                                    Community
                                    Manager
                                </div>
                            </div>
                        </div>
                        <div class="at-column">
                            <div class="at-user">
                                <div class="at-user__avatar">
                                    <img
                                        src={
                                            profile
                                        }
                                    />
                                </div>
                                <div class="at-user__name">
                                    George
                                    Petty
                                </div>
                                <div class="at-user__title">
                                    Lead
                                    Designer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

export default MainTeam;
