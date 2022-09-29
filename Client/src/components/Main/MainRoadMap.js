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
      <img width='30%' src={title} />
      <br />
      <div className='roadmap'>
        <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className='mySwiper'>
          <SwiperSlide>ACE 토큰 경제 시스템</SwiperSlide>
          <SwiperSlide>'아틀란티스 아일랜드' 활성화</SwiperSlide>
          <SwiperSlide>NFT 커뮤니티 확장</SwiperSlide>
          <SwiperSlide>홀더들을 위한 SAMALS만의 리워드</SwiperSlide>
          <SwiperSlide>SAMALS 가상사회 구축</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainRoadMap;
