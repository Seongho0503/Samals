import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "../../styles/MintingCard.css";
import bg2 from "../../assets/bg-05.png";
import buttonImg from "../../assets/animal-button.png";
import Button from "@mui/material/Button";
import Home from "../../pages/MintCard";
import Footer from "../Footer";

const MintingModal = () => {
  return (
    <div>
      <img width='100%' src={bg2} />
    </div>
  );
};

export default MintingModal;
