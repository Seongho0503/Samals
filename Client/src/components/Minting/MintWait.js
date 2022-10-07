import React, { useState, useEffect } from "react";
import "../../styles/MainSub.css";
import bg from "../../assets/mint-loading.gif";
import { useNavigate } from "react-router-dom";
import Header from "../Header";

const MintWait = () => {
  return (
    <div>
      {/* <img id='hero-background' src={list[0].src}/> */}
      <img width='50%' src={bg} />
    </div>
  );
};

export default MintWait;
