import react from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import buttonImg from "../assets/animal-button.png";
import { useLocation } from "react-router";
import MintCardData from "../components/Minting/MintCardData";

import "../styles/Home.css";

const Minting = () => {
  const location = useLocation();
  const mintCard = location.state;

  return (
    <div id='home'>
      <MintCardData name={mintCard}></MintCardData>
      <button>
        <Link to='/'>홈으로 가기</Link>
      </button>
      {/* </img> */}
    </div>
  );
};

export default Minting;
