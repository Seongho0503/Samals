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
                <div class="card2 box">
                    <div class="content">
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
                        {" "}
                        살기위해
                        떠난
                        북극곰들
                        <br />
                        "이대로
                        가다간
                        모두
                        죽게
                        될
                        거야"
                        <br />
                        북극곰은
                        인간들의
                        이기심으로
                        인해
                        살아갈
                        곳을
                        잃어가고,
                        <br />
                        먹을
                        음식이
                        없어
                        점점
                        야위어져만
                        가고
                        있습니다.
                        <br />
                        위기를
                        느낀
                        이들은
                        좁디좁은
                        빙하
                        위에서
                        인간에게
                        도움을
                        요청하고
                        경고를
                        해왔지만
                        <br />
                        돌아오는
                        건
                        플라스틱과
                        더위
                        뿐이었고
                        <br />
                        이에
                        분노한
                        북극곰들은
                        인류와의
                        관계를
                        단절하고
                        그들만의
                        세상을
                        만들어
                        나갔습니다.
                        <br />
                        결국
                        우리
                        인류도
                        언젠간
                        위기를
                        맞이할
                        거에요.
                        <br />
                        화난
                        북극곰들처럼요!
                        <br />
                        다시는
                        이러한
                        일들이
                        일어나지
                        않게,
                        <br />
                        또
                        함께
                        상생하며
                        살아갈
                        수
                        있도록
                        화난
                        북극곰들을
                        찾아가
                        달래주세요.
                        <br />
                    </h5>
                </div>
            </div>
        );
    };

export default MainVision;
