import react from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import buttonImg from "../assets/home-button.png";
import buttonImg2 from "../assets/mypage-button.png";
import { useLocation } from "react-router";
import MintCardData from "../components/Minting/MintCardData";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Minting = () => {
  const location = useLocation();
  const mintCard = location.state;
  let navigate = useNavigate();
  return (
    <div id='home'>
      <MintCardData name={mintCard}></MintCardData>
      <button onClick={() => navigate("/")}>
        <img width='400px' src={buttonImg} alt='기부하고, NFT받기' />
      </button>
      <button onClick={() => navigate("/mypage")}>
        <img width='400px' src={buttonImg2} alt='기부하고, NFT받기' />
      </button>
      {/* </img> */}
    </div>
  );
};

export default Minting;
