import React, {
    useState,
    useEffect,
} from "react";
import animal01 from "../../assets/minting02.png";
import animal02 from "../../assets/minting03.png";
import animal03 from "../../assets/minting04.png";
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
                            와이오밍
                            두꺼비
                        </h2>
                        <h2>
                            11개
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
                            아프리카
                            숲
                            코끼리
                        </h2>
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
                            호랑이
                        </h2>
                        <h2>
                            674개
                        </h2>
                    </div>
                </div>
            </div>
        );
    };

export default AnimalData;
