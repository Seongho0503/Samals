import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MainRoadMap.css";
import title from "../../assets/our-roadmap.png";
import { useNavigate } from "react-router-dom";
import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper";

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
                    <Swiper
                        effect={
                            "cards"
                        }
                        grabCursor={
                            true
                        }
                        modules={[
                            EffectCards,
                        ]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            Slide
                            1
                        </SwiperSlide>
                        <SwiperSlide>
                            Slide
                            2
                        </SwiperSlide>
                        <SwiperSlide>
                            Slide
                            3
                        </SwiperSlide>
                        <SwiperSlide>
                            Slide
                            4
                        </SwiperSlide>
                        <SwiperSlide>
                            Slide
                            5
                        </SwiperSlide>
                        <SwiperSlide>
                            Slide
                            6
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        );
    };

export default MainRoadMap;
