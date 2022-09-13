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
            <div id="hero">
                <img
                    width="30%"
                    src={
                        title
                    }
                />

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
                <div class="roadmap">
                    <div class="container22">
                        <div class="carousel">
                            <div class="item123 a">
                                A
                            </div>
                            <div class="item123 b">
                                B
                            </div>
                            <div class="item123 c">
                                C
                            </div>
                            <div class="item123 d">
                                D
                            </div>
                            <div class="item123 e">
                                E
                            </div>
                            <div class="item123 f">
                                F
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
