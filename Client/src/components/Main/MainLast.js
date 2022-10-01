import React, { useState, useEffect } from "react";
import "../../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg-04.png";
import font from "../../assets/font2.png";
import title from "../../assets/our-vision.png";

const MainLast = () => {
  return (
    <div id='hero'>
      {/* <img id='hero-background' src={list[0].src}/> */}
      <img id='hero-background3' src={bg} />
    </div>
  );
};

export default MainLast;
