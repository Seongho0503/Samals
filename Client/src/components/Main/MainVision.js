import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MainVision.css";
import title from "../../assets/our-vision.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const MainVision =
    () => {
        return (
            <div
                id="hero"
                class="box-container"
            >
                <div class="card2">
                    <div class="content2">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div>
                    <img
                        width="500px"
                        src={
                            title
                        }
                    />

                    <h5 id="header-subtext-second">
                        Samals
                        프로젝트는
                        멸종위기
                        동물을
                        컨셉으로
                        하고
                        있습니다.
                        <br />
                        지구
                        상의
                        다양한
                        생물
                        종
                        중
                        인간의
                        이기심으로
                        인해
                        <br />
                        수많은
                        동물들이
                        점점
                        사라지고
                        있습니다.
                        <br />
                        우리는
                        이
                        문제를
                        해결하려고
                        합니다!
                        <br />
                        <br />
                        올청이
                        팀은
                        Samals
                        프로젝트로,
                        멸종
                        위기
                        동물에
                        대한
                        심각성을
                        알리고
                        <br />
                        NFT
                        제작
                        및
                        판매를
                        통해
                        프로젝트
                        수익을
                        기부합니다.
                        <br />
                        이
                        프로젝트가
                        멸종
                        위기
                        동물
                        문제를
                        해결하는데
                        도움이
                        되길
                        바랍니다.
                        <br />
                    </h5>
                </div>
            </div>
        );
    };

export default MainVision;
