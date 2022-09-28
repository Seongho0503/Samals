import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MintingRating.css";
import Collaboration from "../../assets/collaboration.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { getTotalMint } from "../../utils/event";
import { getTotalDonate } from "../../api";

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
//         const max = 983;

//         setTimeout(
//             () =>
//                 counter(
//                     $counter,
//                     max
//                 ),
//             2000
//         );
//     };

const RatingData =
    () => {
        const response =
            getTotalDonate().then(
                ({
                    data,
                }) => {
                    console.log(
                        data
                    );
                    return data;
                }
            );
        return (
            <div id="rating-data">
                <Header />
                {/* <img id='hero-background' src={list[0].src}/> */}

                <img
                    width="800px"
                    src={
                        Collaboration
                    }
                />
                <h1 id="rating-text">
                    기부
                    총액
                </h1>

                <h1 id="rating-text">
                    {
                        response
                    }
                </h1>
                <h5 id="header-subtext-second">
                    Samals는
                    동물보호단체
                    care와
                    함께
                    합니다!{" "}
                    <br />
                    <br />
                    멸종을
                    눈앞에
                    둔
                    수많은
                    야생
                    동물을
                    지키기
                    위해서{" "}
                    <br />
                    Samals는
                    NFT를
                    판매하고,
                    이를
                    care에
                    기부하기로
                    했어요.{" "}
                    <br />
                    모든
                    기부는
                    투명하게
                    블록체인
                    지갑을
                    통해
                    이루어집니다.{" "}
                    <br />
                    <br />
                    50,000
                    ACE
                    토큰을
                    기부하고,
                    Samals의
                    NFT를
                    받아보세요{" "}
                    <br />
                    모든
                    NFT는
                    랜덤하게
                    뽑기로
                    지급됩니다!{" "}
                    <br />
                    참고로
                    NFT
                    발행
                    개수는
                    동물들의
                    남은
                    개체수와
                    동일해요.{" "}
                    <br />
                    따라서,
                    개체량이
                    적은
                    EW
                    등급의
                    동물일수록,
                    희소성이
                    높습니다.{" "}
                    <br />
                    <br />
                    지금,
                    Samals와
                    함께
                    멸종
                    위기
                    동물
                    NFT
                    콜렉팅을
                    시작해보세요!{" "}
                    <br />
                </h5>
            </div>
        );
    };

export default RatingData;
