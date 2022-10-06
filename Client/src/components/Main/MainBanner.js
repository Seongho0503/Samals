import React, { useState, useEffect } from "react";
import "../../styles/MainToken.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/banner02.png";
import font from "../../assets/font2.png";
import title from "../../assets/how-to-use.png";

const MainBanner = () => {
  return (
    <div id='hero3' className='box-container'>
      <div>
        <img width='600px' src={title} />

        <h5 id='header-subtext-second'>
          세이멀즈 방문이 처음이신가요?
          <br />
          네트워크 연결 방법부터, 토큰 발급 과정까지!
          <br />
          이용 가이드를 확인하고 간편하게 시작해보세요!
        </h5>
      </div>
      <div className='autonft2'>
        <a
          target='_blank'
          width='300px'
          href='https://www.notion.so/SAMALS-c268b327cd4048f794bd359333d82196'
        >
          <img width='100%' src={bg} />
        </a>
      </div>
    </div>
  );
};

export default MainBanner;
