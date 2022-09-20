import React, {
    useState,
    useEffect,
} from "react";
import animal01 from "../../assets/profile-1.png";
import animal02 from "../../assets/profile-2.png";
import animal03 from "../../assets/profile-3.png";
import "../../styles/MintingCard.css";
import bg from "../../assets/bg-04.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const AnimalData =
    () => {
        return (
            <div>
                <h2 class="animal-data-title">
                    현재
                    이
                    만큼의
                    NFT가
                    남아있어요!
                </h2>
                <div class="animal-card">
                    <div class="animal-card-detail">
                        <img
                            class="animal-card-img"
                            src={
                                animal01
                            }
                        />
                        <h2>
                            82개
                        </h2>
                    </div>
                    <div class="animal-card-detail">
                        <img
                            class="animal-card-img"
                            src={
                                animal02
                            }
                        />
                        <h2>
                            132개
                        </h2>
                    </div>
                    <div class="animal-card-detail">
                        <img
                            class="animal-card-img"
                            src={
                                animal03
                            }
                        />
                        <h2>
                            674개
                        </h2>
                    </div>
                </div>
            </div>
        );
    };

export default AnimalData;
