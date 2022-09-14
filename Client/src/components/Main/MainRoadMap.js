import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MainRoadMap.css";
import title from "../../assets/our-roadmap.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import $ from "jquery";

var carousel = $(
        ".carousel"
    ),
    currdeg = 0;

$(".next").on(
    "click",
    { d: "n" },
    rotate
);
$(".prev").on(
    "click",
    { d: "p" },
    rotate
);
function rotate(e) {
    if (
        e.data.d ==
        "n"
    ) {
        currdeg =
            currdeg -
            60;
    }
    if (
        e.data.d ==
        "p"
    ) {
        currdeg =
            currdeg +
            60;
    }
    carousel.css({
        "-webkit-transform":
            "rotateY(" +
            currdeg +
            "deg)",
        "-moz-transform":
            "rotateY(" +
            currdeg +
            "deg)",
        "-o-transform":
            "rotateY(" +
            currdeg +
            "deg)",
        transform:
            "rotateY(" +
            currdeg +
            "deg)",
    });
}

const MainRoadMap =
    () => {
        return (
            <div id="hero2">
                <img
                    width="30%"
                    src={
                        title
                    }
                />
                <br />
                <div class="roadmap">
                    <div class="container22">
                        <div class="carousel">
                            <div class="item123 a">
                                멸종위기동물
                                <br />
                                -컨텐츠컨텐츠
                            </div>
                            <div class="item123 b">
                                환경보호
                            </div>
                            <div class="item123 c">
                                SSAFY
                                토큰
                            </div>
                            <div class="item123 d">
                                가상세계
                            </div>
                            <div class="item123 e">
                                유니티
                                게임
                            </div>
                            <div class="item123 f">
                                NFT
                                커뮤니티
                            </div>
                        </div>
                    </div>
                    <div class="next">
                        Next
                    </div>
                    <div class="prev">
                        Prev
                    </div>
                </div>
            </div>
        );
    };

export default MainRoadMap;
