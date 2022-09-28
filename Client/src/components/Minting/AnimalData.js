import React, {
    useState,
    useEffect,
} from "react";
import animal01 from "../../assets/minting02.png";
import animal02 from "../../assets/minting03.png";
import animal03 from "../../assets/minting04.png";
import animal04 from "../../assets/card/Shark.png";
import animal05 from "../../assets/card/chita.png";
import animal06 from "../../assets/card/coco.png";
import animal07 from "../../assets/card/lizard2.png";
import animal08 from "../../assets/card/penguin.png";

import "../../styles/MintingCard.css";
import bg from "../../assets/bg-04.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { getAnimalData } from "../../api";

const AnimalData =
    () => {
        const response =
            getAnimalData().then(
                ({
                    data,
                }) => {
                    console.log(
                        data[0]
                            .animalNameKr
                    );
                    const toad =
                        data[2]
                            .animalNameKr;
                    const a =
                        data[3]
                            .animalNameKr;
                    const b =
                        data[5]
                            .animalNameKr;
                    const c =
                        data[6]
                            .animalNameKr;
                    return;
                }
            );
        console.log(
            response
        );
        // const toad =
        //     response.animalNameKr;
        // console.log(
        //     toad
        // );
        return (
            <div class="animal-nft">
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
                            개
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
                            개
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
                            개
                        </h2>
                    </div>
                    <div class="animal-card-detail">
                        <img
                            class="animal-card-img"
                            src={
                                animal04
                            }
                        />
                        <h2>
                            백상아리
                        </h2>
                        <h2>
                            개
                        </h2>
                    </div>
                    <div class="animal-card-detail">
                        <img
                            class="animal-card-img"
                            src={
                                animal05
                            }
                        />
                        <h2>
                            아무르표범
                        </h2>
                        <h2>
                            개
                        </h2>
                    </div>
                    <div class="animal-card-detail">
                        <img
                            class="animal-card-img"
                            src={
                                animal06
                            }
                        />
                        <h2>
                            큰뿔코뿔소
                        </h2>
                        <h2>
                            개
                        </h2>
                    </div>
                    <div class="animal-card-detail">
                        <img
                            class="animal-card-img"
                            src={
                                animal07
                            }
                        />
                        <h2>
                            바다
                            이구아나
                        </h2>
                        <h2>
                            개
                        </h2>
                    </div>
                    <div class="animal-card-detail">
                        <img
                            class="animal-card-img"
                            src={
                                animal08
                            }
                        />
                        <h2>
                            남부
                            바위뛰기
                            펭귄
                        </h2>
                        <h2>
                            개
                        </h2>
                    </div>
                </div>
            </div>
        );
    };

export default AnimalData;
