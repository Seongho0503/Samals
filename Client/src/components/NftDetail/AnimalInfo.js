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
// import { useARStatus } from "../../hooks/isARStatus";
// import { useLocation, Navigate } from "react-router";

// const AnimalInfo = () => {
// class AnimalInfo extends React.Component {
//   render() {
const AnimalInfo = ({ animal }) => {
  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    console.log("애니" + animal);
    getDescription(animal).then(({ data }) => {
      console.log("data: ", data);
      setAnimals(data);
    });
  }, []);

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
                <h2>Title</h2>

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
                <div className='timeline-img-header'>
                  <h2>Card Title</h2>
                </div>
                <div className='date'>{animals.animalClass}</div>
                <p>이미지로 대체</p>
                {/* <a className="bnt-more" href="javascript:void(0)">
                    More
                  </a> */}
              </div>
            </Roll>
          </div>

          <div className='timeline-item'>
            <LightSpeed left>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInLeft'>
                <div className='date'>{animals.animalCurrent}</div>
                <h2>Quote</h2>
                <blockquote>{animals.animalTotal}</blockquote>
              </div>
            </LightSpeed>
          </div>

          <div className='timeline-item-right'>
            <LightSpeed right>
              <div className='timeline-img'></div>

              <div className='timeline-content js--fadeInRight'>
                <h2>Title</h2>
                <div className='date'>{animals.animalHabitat}</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ipsa ratione
                  omnis alias cupiditate saepe atque totam aperiam sed nulla voluptatem recusandae
                  dolor, nostrum excepturi amet in dolores. Alias, ullam.
                </p>
                {/* <a className="bnt-more" href="javascript:void(0)">
                    More
                  </a> */}
              </div>
            </LightSpeed>
          </div>

          <div className='timeline-item'>
            <Roll left>
              <div className='timeline-img'></div>

              <div className='timeline-content timeline-card js--fadeInLeft'>
                {/* <div className='timeline-img-header'>
                  <h2>Card Title</h2>
                </div> */}
                <div className='date'>동물 설명</div>
                <p>{animals.animalDescription}</p>
                {/* <a className="bnt-more" href="javascript:void(0)">
                    More
                  </a> */}
              </div>
            </Roll>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnimalInfo;
