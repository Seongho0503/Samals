import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MainSub.css";
import title from "../../assets/our-story.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

// const counter = (
//     $counter,
//     max
// ) => {
//     let now = max;

//     const handle =
//         setInterval(
//             () => {
//                 $counter.innerHTML =
//                     counter &&
//                     Math.ceil(
//                         max -
//                             now
//                     );

//                 // 목표수치에 도달하면 정지
//                 if (
//                     now <
//                     1
//                 ) {
//                     clearInterval(
//                         handle
//                     );
//                 }

//                 // 증가되는 값이 계속하여 작아짐
//                 const step =
//                     now /
//                     10;

//                 // 값을 적용시키면서 다음 차례에 영향을 끼침
//                 now -=
//                     step;
//             },
//             50
//         );
// };

// window.onload =
//     () => {
//         // 카운트를 적용시킬 요소
//         const $counter =
//             document.querySelector(
//                 ".count"
//             );

//         // 목표 수치
//         const max = 129983;

//         setTimeout(
//             () =>
//                 counter(
//                     $counter,
//                     max
//                 ),
//             2000
//         );
//     };

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

                <h1 id="header-subtext-first">
                    0
                </h1>

                <h5 id="header-subtext-second">
                    Samals를
                    통해
                    기부된
                    금액은
                    위와
                    같아요{" "}
                    <br />
                    <br />
                    환경
                    파괴로
                    인한
                    동물들의
                    멸종은,
                    우리의
                    삶에도
                    많은
                    영향을
                    끼치고
                    있어요.
                    <br />
                    인간들의
                    이기심으로
                    많은
                    동물은
                    살아갈
                    곳을
                    잃어가고,
                    <br />
                    지구상에서
                    사라지고
                    있어요.
                    <br />
                    <br />
                    저희
                    팀은
                    이
                    위기를
                    해결할
                    많은
                    방법을
                    고민했습니다.
                    <br />
                    우리는
                    Save
                    the
                    animals,
                    Samals
                    프로젝트를
                    통해,{" "}
                    <br />
                    멸종
                    위기
                    동물을
                    위한
                    NFT를
                    발급하고,
                    이를
                    그
                    동물을
                    위해
                    기부하기로
                    했어요.
                    <br />
                    지금
                    멸종
                    위기
                    동물을
                    위해
                    팀
                    올청이와
                    함께해주세요!
                    <br />
                </h5>
            </div>
        );
    };

export default MainSub;
