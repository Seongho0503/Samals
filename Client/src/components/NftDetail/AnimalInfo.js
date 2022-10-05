import React, { Component } from "react";
// import ScrollReveal from "scrollreveal";
import "../../styles/NftDetail/AnimalInfo.scss";
// import * from "react-reveal";
import { $, data, jQuery } from "jquery";
// import { render } from "@testing-library/react";
import LightSpeed from "react-reveal/LightSpeed";
import Roll from "react-reveal/Roll";
import { getDescription } from "../../api.js";
import { useState, useEffect } from "react";
import sign from "../../assets/sign/EW.png";
// import { useARStatus } from "../../hooks/isARStatus";
// import { useLocation, Navigate } from "react-router";

// const AnimalInfo = () => {
// class AnimalInfo extends React.Component {
//   render() {
const AnimalInfo = ({ animal }) => {
  const [animals, setAnimals] = useState({ animalNameKr: "", animalNameEn: "", animalClass: "" });
  useEffect(() => {
    console.log("애니멀 출력: " + animal);
    getDescription(animal).then(({ data }) => {
      console.log("동물정보: ", data);
      setAnimals(data);
    });
  }, []);
  console.log("animal : ", animal);
  return (
    <div>
      <header>
        <div className='container text-center'>
          <h1>NFT 멸종위기동물 세부정보</h1>
          <p>Save animals</p>
        </div>
      </header>

      <section className='timeline'>
        <div className='container'>
          <div className='timeline-item'>
            <Roll left>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInLeft'>
                <div className='date'>{animals.animalNameKr}</div>
                <div className='AnimalName'>
                  <p className='content'>{animals.animalNameEn}</p>
                </div>
                {/* <a className="bnt-more" href="javascript:void(0)">
                  More
                </a> */}
              </div>
            </Roll>
          </div>

          <div className='timeline-item-right'>
            <Roll right>
              <div className='timeline-img'></div>

              <div className='timeline-content timeline-card js--fadeInRight'>
                <div className='timeline-img-header'></div>
                <div className='date'>{animals.animalClass}</div>
                <img className='date' src={animals.img4}></img>
              </div>
            </Roll>
          </div>

          <div className='timeline-item'>
            <LightSpeed left>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInLeft'>
                <div className='date'>현재 남은 개체 수</div>
                {/* <div className='date'>{animals.animalCurrent}</div> */}
                <blockquote>{animals.animalTotal}마리</blockquote>
              </div>
            </LightSpeed>
          </div>

          <div className='timeline-item-right'>
            <LightSpeed right>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInRight'>
                <div className='date'>{animals.animalHabitat}</div>

                <img className='date' src={animals.img2} />
              </div>
            </LightSpeed>
          </div>

          <div className='timeline-item'>
            <Roll left>
              <div className='timeline-img'></div>

              <div className='timeline-content timeline-card js--fadeInLeft'>
                <div className='date'>동물 설명</div>
                <p>{animals.animalDescription}</p>
              </div>
            </Roll>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimalInfo;
