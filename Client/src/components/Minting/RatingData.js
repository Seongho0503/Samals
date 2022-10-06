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
      {/* <img id='hero-background' src={list[0].src}/> */}

      <img width='800px' src={Collaboration} />
      <h1 id='rating-text'>기부 총액</h1>

      <h1 id='rating-text'>
        <CountUp separator=',' end={token} />
        <FaFrog size='70px' />
      </h1>
      <h5 id='header-subtext-second'>
        세이멀즈는 동물보호단체 care와 함께 합니다! <br />
        <br />
        멸종을 눈앞에 둔 수많은 야생 동물을 지키기 위해서 <br />
        세이멀즈는 NFT를 판매하고, 이를 WWF에 기부하기로 했어요. <br />
        모든 기부는 투명하게 블록체인 지갑을 통해 이루어집니다. <br />
        <br />
        500 ACE 토큰을 기부하고, 세이멀즈의 NFT를 받아보세요 <br />
        모든 NFT는 랜덤하게 뽑기로 지급됩니다! <br />
        참고로 NFT 발행 개수는 동물들의 남은 개체수와 동일해요. <br />
        따라서, 개체량이 적은 등급의 동물일수록, 희소성이 높습니다. <br />
        <br />
        지금, 세이멀즈와 함께 멸종 위기 동물 NFT 콜렉팅을 시작해보세요! <br />
      </h5>
    </div>
  );
};

export default RatingData;
