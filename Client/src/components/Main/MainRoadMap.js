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
            <h1 class='carousel-h1'>멸종 위기 등급에 따른 차등 확률</h1>
            <br />
            <br />
            <h2 class='carousel-h2'>- 10,000개 이상의 NFT 발급 및 판매</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- CR / EN / VU / LC 등급에 따른 민팅 확률</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 실 개체 수와 동일한 NFT 작품 개수</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 발급 수를 바탕으로 실시간 확률 계산</h2>
            <br />
          </SwiperSlide>
          <SwiperSlide>
            <h1 class='carousel-h1'>ACE 토큰 경제 시스템</h1>
            <br />
            <br />
            <h2 class='carousel-h2'>- ACE 토큰만의 시장 형성</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- ACE 토큰 시스템 공개</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- ACE 토큰 마이그레이션 진행</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- ACE 커뮤니티 홍보 및 활성화</h2>
            <br />
          </SwiperSlide>
          <SwiperSlide>
            <h1 class='carousel-h1'>네트워크 확장</h1>
            <br />
            <br />
            <h2 class='carousel-h2'>- 프라이빗 네트워크 홍보</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 마켓 플레이스 오픈</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 생태계 참여 기업 및 샐럽 유치</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 네트워크 참여 기업들 소각 모델 가동</h2>
            <br />
          </SwiperSlide>
          <SwiperSlide>
            <h1 class='carousel-h1'>홀더들을 위한 SAMALS만의 리워드</h1>
            <br />
            <br />
            <h2 class='carousel-h2'>- PFP 요소 별도 마련</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- ACE 토큰을 반영한 특별 NFT</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 홀더만을 위한 별도의 NFT 액자</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 홀더 혜택은 지속적으로 추가될 예정</h2>
            <br />
          </SwiperSlide>
          <SwiperSlide>
            <h1 class='carousel-h1'>SAMALS 가상사회 구축</h1>
            <br />
            <br />
            <h2 class='carousel-h2'>- 마다가스카르 아일랜드 활성화</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 방명록 및 개인 공간 확장</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 게임 생태계 확장 및 마켓 출시</h2>
            <br />
            <br />
            <h2 class='carousel-h2'>- 발급 수를 바탕으로 실시간 확률 계산</h2>
            <br />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainRoadMap;
