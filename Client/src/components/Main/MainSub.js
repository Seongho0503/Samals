import React, { useState, useEffect } from "react";
import "../../styles/MainSub.css";
import title from "../../assets/our-story.png";

import { getTotalDonate } from "../../api";
import CountUp from "react-countup";
import { FaFrog } from "react-icons/fa";
const MainSub = () => {
  const [token, setToken] = useState(0);
  useEffect(() => {
    getTotalDonate()
      .then(({ data }) => {
        console.log(data);
        return data;
      })
      .then((res) => {
        const ex1 = res?.toString() || "";
        console.log("ex1: ", ex1);
        // ex1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        setToken(res);
      });
  }, []);

  return (
    <div id='mainsub'>
      {/* <img id='hero-background' src={list[0].src}/> */}
      <img width='500px' src={title} />
      <h1 id='header-subtext-first2'>
        <CountUp separator=',' end={token} />

        <FaFrog size='70px' style={{ top: "10px" }} />
      </h1>
      <h5 id='header-subtext-second'>
        세이멀즈를 통해 기부된 금액은 위와 같아요 <br />
        <br />
        환경 파괴로 인한 동물들의 멸종은, 우리의 삶에도 많은 영향을 끼치고 있어요.
        <br />
        인간들의 이기심으로 많은 동물은 살아갈 곳을 잃어가고,
        <br />
        지구상에서 사라지고 있어요.
        <br />
        <br />
        저희 팀은 이 위기를 해결할 많은 방법을 고민했습니다.
        <br />
        우리는 SAve the aniMALS, SAMALS 프로젝트를 통해, <br />
        멸종 위기 동물을 위한 NFT를 발급하고, 이를 그 동물을 위해 기부하기로 했어요.
        <br />
        지금 멸종 위기 동물을 위해 팀 올청이와 함께해주세요!
        <br />
      </h5>
    </div>
  );
};

export default MainSub;
