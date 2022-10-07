import React, { useState, useEffect } from "react";
import "../../styles/MintingRating.css";
import Collaboration from "../../assets/collaboration.png";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { getTotalMint } from "../../utils/event";
import { getTotalDonate } from "../../api";
import CountUp from "react-countup";
import { FaFrog } from "react-icons/fa";

const RatingData = () => {
  const [response, setResponse] = useState();
  const [token, setToken] = useState(0);
  useEffect(() => {
    getTotalDonate()
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .then((res) => {
        setToken(res);
      });
  }, []);
  return (
    <div id='rating-data'>
      <Header />
      {/* <img id='hero-background' src={list[0].src}/> */}{" "}
      <img width='800px' src={Collaboration} />
      <div id='mint-rating-data'>
        <h1 id='rating-text'>기부 총액</h1>
        <h1 id='rating-text'>
          <CountUp separator=',' end={token} />
          <FaFrog size='70px' />
        </h1>
      </div>
    </div>
  );
};

export default RatingData;
