import * as React from "react";
import "../../styles/NftDetail/AnimalBook.scss";

import { $, jQuery } from "jquery";
import dictionary from "../../assets/dictionary.png";
import Wobble from "react-reveal/Wobble";
import { getDescription } from "../../api.js";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import BookImage from "./BookImage.js";
// import dynamic from "next/dynamic";
import { Suspense } from "react";
import { keyframes } from "@emotion/react";

// const preLoad = keyframes`
//   ${(props) => {
//     Array.from(4).map((index) => {
//       `
//         #{${index * 10}%} {
//             // background-image: nth(${props.imgs}, ($i + 1));
//             background-image: ${props.imgs[index]});
//           }
//       `;
//     });
//   }}

//   100% {
//     display: none;
//   }
// `;

const preLoad = keyframes`
  ${(props) => createPreload(props.imgs)}
  100% {
    display: none;
  }
`;

const imgLoad = styled.div`
  font-family: "Indie Flower", cursive;
  background-color: #eee;
  color: #555;
  text-align: center;
  padding: 4em 0;
  position: fixed;

  animation: ${(props) => preLoad(props.imgs)} 1s steps(1);
  width: 1px;
  height: 1px;
`;

const createPreload = (imgs) => {
  let styles = "";
  for (let i = 0; i < 4; i += 1) {
    styles += `
      #{${i * 10}%} {
        // background-image: nth(${imgs}, ($i + 1));
        background-image: ${imgs[i]});
      }
    `;
  }

  styles += `
    100% {
      display: none;
    }
  `;

  return css`
    ${styles}
  `;
};

// const createKeyframes = () => {
//   let styles = "";
//   styles += `
//     background-color: black;
//     @keyframes preLoad {
//       @for $i from 0 through 4 {
//         #{$i * 20%} {
//           background-image: nth(${imgs}, ($i + 1));
//         }
//       }
//       100% {
//         display: none;
//       }
//     }

//     @keyframes nextPage {
//         @for $i from 0 through 4 {
//           #{$i * 20%} {
//             background-image: nth(${imgs}, ($i + 1));
//           }
//         }
//       }

// @keyframes nextFlip1 {
//   @for $i from 0 through 4 {
//     #{$i * 20%} {
//       background-image: nth(${imgs}, ($i + 1));
//       background-position: -178px -2px;
//       transform: rotateY(0deg);
//     }
//     #{10+($i * 20%)} {
//       // background-image: nth(${imgs}, ($i + 2));
//       background-position: -210px -2px;
//       transform: rotateY(180deg);
//     }
//   }
// }

// @for $i from 2 through 6 {
//   @keyframes nextFlip#{$i} {
//     @for $j from 0 through 4 {
//       #{$j * 20%} {
//         background-image: nth(${imgs}, ($j + 1));
//         background-position: #{-148 + (($i - 2) * 30)}px -2px;
//         transform: rotateY(0deg);
//       }
//       #{((10 + ($j * 20)) + (($i - 1) * 0.5%))} {
//         background-image: nth(${imgs}, ($j + 2));
//         background-position: #{-238 - (($i - 2) * 30)}px -2px;
//         transform: rotateY(180deg);
//       }
//     }
//   }
// }

// @keyframes nextFlip7 {
//   @for $i from 0 through 4 {
//     #{$i * 20%} {
//       background-image: nth(${imgs}, ($i + 1));
//       background-position: -2px -2px;
//       transform: rotateY(0deg);
//     }
//     #{13+($i * 20%)} {
//       background-image: nth(${imgs}, ($i + 2));
//       background-position: -388px -2px;
//       transform: rotateY(180deg);
//     }
//   }
// }

//   `;
//   // for (let i = 0; i < 4; i += 1) {
//   //   styles += `
//   //     #{${i * 10}%} {
//   //       // background-image: nth(${imgs}, ($i + 1));
//   //       background-image: ${imgs[i]});
//   //     }
//   //   `;
//   // }

//   // styles += `
//   //   100% {
//   //     display: none;
//   //   }
//   // `;

//   return css`
//     ${styles}
//   `;
// };

// // const createKeyframes = (imgs) =>
// const KeyFrameComponent = styled.div`
//   ${createKeyframes((props) => props.imgs)}
// `;

// const BookImage = styled.div`
//   ${imgs}: url("https://cdn.newspenguin.com/news/photo/202110/5634_19658_3146.jpg");
//   background-image: nth(${imgs}, ($i + 1));
// `;
//   ${imgs}: url("https://cdn.newspenguin.com/news/photo/202110/5634_19658_3146.jpg"),
//     url("https://cdn.newspenguin.com/news/photo/202110/5634_19658_3146.jpg"),
//     url("https://image.ytn.co.kr/general/jpg/2020/0706/202007061415011609_d.jpg"),
//     url("https://cdn.newspenguin.com/news/photo/202110/5634_19658_3146.jpg"),
//     url("https://w.namu.la/s/77d598cc999a66a027ff8605ae171e53f12d6efd4976b0085d07db67019bdf6b5fd653704c6ff26d30d237f1b1ff7d7929b5f097a03cad8544c2dc7339f91374bc04430aedcd5f157195554fd8d641ff864823370635abd70c021a5dfdbbb784"),
//     url("http://newsteacher.chosun.com/site/data/img_dir/2017/11/08/2017110800380_0.jpg"); //#1

// const AnimalBook = () => {
// class AnimalBook extends React.Component {
const AnimalBook = ({ animal }) => {
  const [animals, setAnimals] = useState([]);
  const [imgs, setImgs] = useState([]);
  // const DynamicComponent = dynamic(
  //   (data) => import("../../styles/NftDetail/AnimalBook_" + `${data.animalSpecies}` + ".scss"),
  //   {
  //     suspense: true,
  //   }
  // );

  useEffect(() => {
    getDescription(animal).then(({ data }) => {
      console.log("사전2: ", data);
      setAnimals(data);
      // dynamic(data);
      // ("../../styles/NftDetail/AnimalBook_{data.animalSpecies}.scss");
      console.log(`체크`, data.img1);
      console.log(`체크`, data.img2);
      console.log(data);
      setImgs([data.img1, data.img2, data]);
    });
  }, []);

  const createKeyframes = () => {
    console.log(imgs);
    let styles = "";
    styles += `
    .animalcontainer {
      position: relative; //relative 변경
      // width: 420px; // Q 왜 ? LEFT ??
      // border: #fff solid 2px;
      border-radius: 4px;
      height: 420px;
      text-align: center;
      padding-top: 300px;
      padding: 100px 0;
    }
    
    .title {
      position: absolute;
      color: #00fc28;
      top: 45px;
      left: 0;
      width: 100%;
      font-size: 3em;
      font-weight: normal;
    
      line-height: 0;
    }
    
    .credit {
      position: absolute;
      top: 100%;
      left: 0;
      font-size: 0.9em;
      text-align: center;
    }
    
    .book {
      position: relative;
      perspective: 630px;
      perspective-origin: center 50px;
      transform: scale(1.2);
      filter: drop-shadow(0px 10px 5px rgba(0, 0, 0, 0.25));
      margin-top: -400px;
    }
    
    .page {
      width: 210px;
      height: 300px;
      background-color: #bbb;
      position: absolute;
      top: 0px;
      right: 50%;
      transform-origin: 100% 100%;
      border: solid $borderColor 2px;
      background-size: 420px 300px;
      background-position: center;
      transform-style: preserve-3d;
    
      &:nth-child(1) {
        transform: rotateX($bookAngle) rotateY(3deg);
      }
      &:nth-child(2) {
        transform: rotateX($bookAngle) rotateY(4.5deg);
      }
      &:nth-child(3) {
        transform: rotateX($bookAngle) rotateY(6deg);
        animation: nextPage $speed * 5 infinite $speed * -4.8 steps(1);
        background-size: 420px 300px;
        background-position: -2px -2px;
      }
    
      &:nth-child(4) {
        transform: rotateX($bookAngle) rotateY(177deg);
      }
      &:nth-child(5) {
        transform: rotateX($bookAngle) rotateY(175.5deg);
      }
      &:nth-child(6) {
        transform: rotateX($bookAngle) rotateY(174deg);
        // overflow: auto; //hidden
    
        // 넘겨진 페이지
        &::after {
          content: "";
          width: 210px;
          height: 300px;
          position: absolute;
          top: 0px;
          right: 0%;
          transform-origin: center;
          transform: rotateY(180deg);
          animation: nextPage $speed * 5 $speed * -4 infinite steps(1);
          background-size: 420px 300px;
          background-position: 100% -2px;
        }
      }
    
      @keyframes nextPage {
        @for $i from 0 through 4 {
          #{$i * 20%} {
            background-image: nth(${imgs}, ($i + 1));
          }
        }
      }
    }
    
    .gap {
      width: 10px;
      height: 300px;
      background: none;
      transform: rotateX($bookAngle);
      transform-origin: bottom;
      position: absolute;
      top: 0px;
      left: calc(50% - 5px);
    
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 50%);
        background-color: $borderColor;
        width: 10px;
        height: 5px;
        border-radius: 50%;
      }
    }
    
    .pages,
    .flips {
      transform-style: preserve-3d;
    }
    
    .flip {
      width: 32px;
      height: 300px;
      position: absolute;
      top: 0px;
      transform-origin: 100% 100%;
      right: 100%;
      border: solid $borderColor;
      border-width: 2px 0px;
      perspective: 4200px;
      perspective-origin: center;
      transform-style: preserve-3d;
      background-size: 420px 300px;
    
      &::after {
        content: "";
        position: absolute;
        top: 0px;
        right: 0%;
        width: 100%;
        height: 100%;
        transform-origin: center;
        background-size: 420px 300px;
      }
    
      &.flip1 {
        right: 50%;
        animation: flip1 $speed infinite ease-in-out;
        border-width: 2px 2px 2px 0;
    
        &::after {
          animation: nextFlip1 $speed * 5 $speed * -4 infinite steps(1);
        }
      }
    
      &:not(.flip1) {
        right: calc(100% - 2px);
        top: -2px;
        transform-origin: right;
        animation: flip2 $speed ease-in-out infinite;
      }
    
      @for $i from 2 through 7 {
        &.flip#{$i}::after {
          animation: nextFlip#{$i} $speed * 5 $speed * -4 infinite steps(1);
        }
      }
    
      &.flip7 {
        width: 30px;
        border-width: 2px 0px 2px 2px;
        &::after {
          animation: nextFlip7 $speed * 5 $speed * -4 infinite steps(1);
        }
      }
    
      @keyframes flip1 {
        0%,
        20% {
          transform: rotateX($bookAngle) rotateY(6deg);
        }
        80%,
        100% {
          transform: rotateX($bookAngle) rotateY(174deg);
        }
      }
    
      @keyframes flip2 {
        0%,
        20% {
          transform: rotateY(0deg) translateY(0px);
        }
        50% {
          transform: rotateY(-15deg) translateY(0px);
        }
      }
    }
    
    @keyframes nextFlip1 {
      @for $i from 0 through 4 {
        #{$i * 20%} {
          // background-image: nth(${imgs}, ($i + 1));
          background-position: -178px -2px;
          transform: rotateY(0deg);
        }
        #{10+($i * 20%)} {
          // background-image: nth(${imgs}, ($i + 2));
          background-position: -210px -2px;
          transform: rotateY(180deg);
        }
      }
    }
    
    @for $i from 2 through 6 {
      @keyframes nextFlip#{$i} {
        @for $j from 0 through 4 {
          #{$j * 20%} {
            // background-image: nth(${imgs}, ($j + 1));
            background-position: #{-148 + (($i - 2) * 30)}px -2px;
            transform: rotateY(0deg);
          }
          #{((10 + ($j * 20)) + (($i - 1) * 0.5%))} {
            // background-image: nth(${imgs}, ($j + 2));
            background-position: #{-238 - (($i - 2) * 30)}px -2px;
            transform: rotateY(180deg);
          }
        }
      }
    }
    
    @keyframes nextFlip7 {
      @for $i from 0 through 4 {
        #{$i * 20%} {
          // background-image: nth(${imgs}, ($i + 1));
          background-position: -2px -2px;
          transform: rotateY(0deg);
        }
        #{13+($i * 20%)} {
          // background-image: nth(${imgs}, ($i + 2));
          background-position: -388px -2px;
          transform: rotateY(180deg);
        }
      }
    }
    
    .twitterLink {
      position: fixed;
      bottom: 0.5em;
      right: 0.5em;
      & img {
        width: 2em;
        filter: grayscale(100%);
        transition: filter 0.25s;
        &:hover {
          filter: grayscale(0%);
        }
      }
    }
    

  `;
    // for (let i = 0; i < 4; i += 1) {
    //   styles += `
    //     #{${i * 10}%} {
    //       // background-image: nth(${imgs}, ($i + 1));
    //       background-image: ${imgs[i]});
    //     }
    //   `;
    // }

    // styles += `
    //   100% {
    //     display: none;
    //   }
    // `;

    return css`
      ${styles}
    `;
  };

  // const createKeyframes = (imgs) =>
  const KeyFrameComponent = styled.div`
    ${createKeyframes((props) => props.imgs)}
  `;

  // console.log(imgs, "imgs");
  // render() {
  return (
    <KeyFrameComponent imgs={imgs}>
      <div className='imgLoader'></div>
      {/* <imgLoad images={imgs} /> */}
      <Wobble>
        <img className='subTitle' src={dictionary} />
      </Wobble>
      <div className='book'>
        <div className='gap'></div>
        <div className='pages'>
          <div className='page'></div>
          <div className='page'></div>
          <div className='page'></div>
          <div className='page'></div>
          <div className='page'></div>
          <div className='page'></div>
        </div>
        <div className='flips'>
          <div className='flip flip1'>
            <div className='flip flip2'>
              <div className='flip flip3'>
                <div className='flip flip4'>
                  <div className='flip flip5'>
                    <div className='flip flip6'>
                      <div className='flip flip7'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KeyFrameComponent>
  );
};

export default AnimalBook;
