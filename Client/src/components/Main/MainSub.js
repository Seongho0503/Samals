import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MainSub.css";
import title from "../../assets/our-story.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const counter = (
    $counter,
    max
) => {
    let now = max;

    const handle =
        setInterval(
            () => {
                $counter.innerHTML =
                    Math.ceil(
                        max -
                            now
                    );

                // 목표수치에 도달하면 정지
                if (
                    now <
                    1
                ) {
                    clearInterval(
                        handle
                    );
                }

                // 증가되는 값이 계속하여 작아짐
                const step =
                    now /
                    10;

                // 값을 적용시키면서 다음 차례에 영향을 끼침
                now -=
                    step;
            },
            50
        );
};

window.onload =
    () => {
        // 카운트를 적용시킬 요소
        const $counter =
            document.querySelector(
                ".count"
            );

        // 목표 수치
        const max = 830190;

        setTimeout(
            () =>
                counter(
                    $counter,
                    max
                ),
            2000
        );
    };

const MainSub =
    () => {
        return (
            <div id="mainsub">
                {/* <img id='hero-background' src={list[0].src}/> */}
                <img
                    width="500px"
                    src={
                        title
                    }
                />

                <h1
                    class="count"
                    id="header-subtext-first"
                >
                    0
                </h1>

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
        );
    };

export default MainSub;
