import React, { useState, useEffect } from "react";
import "../../styles/Hero.css";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg-01.png";
import font from "../../assets/font-04.png";
import title from "../../assets/our-vision.png";
import Header from "../Header";

const MainTitle = () => {
  let navigate = useNavigate();

  const goExplore = () => {
    navigate("/explore");
  };
  const goCreate = () => {
    navigate("/create");
  };

  return (
    <div id='hero'>
      {/* <img id='hero-background' src={list[0].src}/> */}

      {/* <Header /> */}
      <img id='hero-background' src={bg} />
      <div id='hero-background2'>
        <img width='77%' src={font} />
        {/* <img
                        width="10%"
                        src={
                            title
                        }
                    /> */}
      </div>
      {/* <div id="hero-buttons">
                    <button
                        id="explore"
                        onClick={
                            goExplore
                        }
                    >
                        Explore
                    </button>
                    <button
                        id="create"
                        onClick={
                            goCreate
                        }
                    >
                        Create
                    </button>
                </div> */}
    </div>
  );
};

export default MainTitle;
