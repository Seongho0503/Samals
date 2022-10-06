import { style } from "@mui/system";
import React, { useState, useEffect } from "react";
import "../../styles/MintCardData.css";
import modalBack from "../../assets/game-modal2.png";
import Footer from "../Footer";

const MintCardData = (props) => {
  const data = props.name;
  console.log(data);
  const mintcard2 = {
    margin: "auto",
    marginTop: 90,
    marginBottom: 20,
    width: 500,
    height: 500,
    borderRadius: 30,
    transform: "translate3d(0, 0, 0) rotate3d(0, 0, 0, 0) rotate(0.3deg)",
    animation: "rotate 1.5s linear",
    position: "relative",
    // backgroundImage: `url(${plz})`,
    backgroundSize: "cover",
  };

  return (
    <div>
      <img width='500px' src={data} style={mintcard2} alt='' />
      <screen />
    </div>
  );
};

export default MintCardData;
