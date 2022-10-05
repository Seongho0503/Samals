import React, { useState, useEffect } from "react";
import "../../styles/MainRoadMap.css";
import title from "../../assets/our-roadmap.png";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper";

const MainRoadMap = () => {
  return (
    <div id='hero2'>
      <img width='500px' src={title} />
      <br />
      <div className='roadmap'>
        <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className='mySwiper'>
          <SwiperSlide>
            <h2>멸종 위기 등급에 따른 차등 확률</h2>
            <br />
          </SwiperSlide>
          <SwiperSlide>
            <h2>'아틀란티스 아일랜드' 활성화</h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2>NFT 커뮤니티 확장</h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2>홀더들을 위한 SAMALS만의 리워드</h2>
          </SwiperSlide>
          <SwiperSlide>
            <h2>SAMALS 가상사회 구축</h2>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainRoadMap;
