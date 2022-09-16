import React, { Component } from "react";
// import ScrollReveal from "scrollreveal";
import "../../styles/NftDetail/AnimalInfo.scss";
// import * from "react-reveal";
import { $, jQuery } from "jquery";
// import { render } from "@testing-library/react";
import LightSpeed from "react-reveal/LightSpeed";
import Roll from "react-reveal/Roll";

//   componentDidMount() {
//     $(function () {
//       window.sr = ScrollReveal();
//       // window.$ = window.jQuery = require("jquery");

//       if ($(window).width() < 768) {
//         if ($(".timeline-content").hasClass("js--fadeInLeft")) {
//           $(".timeline-content")
//             .removeClass("js--fadeInLeft")
//             .addClass("js--fadeInRight");
//         }

//         window.sr.reveal(".js--fadeInRight", {
//           origin: "right",
//           distance: "300px",
//           easing: "ease-in-out",
//           duration: 800,
//         });
//       } else {
//         window.sr.reveal(".js--fadeInLeft", {
//           origin: "left",
//           distance: "300px",
//           easing: "ease-in-out",
//           duration: 800,
//         });

//         window.sr.reveal(".js--fadeInRight", {
//           origin: "right",
//           distance: "300px",
//           easing: "ease-in-out",
//           duration: 800,
//         });
//       }

//       window.sr.reveal(".js--fadeInLeft", {
//         origin: "left",
//         distance: "300px",
//         easing: "ease-in-out",
//         duration: 800,
//       });

//       window.sr.reveal(".js--fadeInRight", {
//         origin: "right",
//         distance: "300px",
//         easing: "ease-in-out",
//         duration: 800,
//       });
//     });
//   }

// const AnimalInfo = () => {
class AnimalInfo extends React.Component {
  render() {
    return (
      <div>
        <header>
          <div className="container text-center">
            <h1>NFT 멸종위기동물 세부정보</h1>
            <p>Save animals</p>
          </div>
        </header>

        <section className="timeline">
          <div className="container">
            <div className="timeline-item">
              <Roll left>
                <div className="timeline-img"></div>

                <div className="timeline-content js--fadeInLeft">
                  <h2>Title</h2>

                  <div className="date">이름명</div>
                  <div className="AnimalName">
                    <p className="content">
                      토코투칸(영어: Toco Toucan, 학명: Ramphastos toco)
                    </p>
                  </div>
                  {/* <a className="bnt-more" href="javascript:void(0)">
                  More
                </a> */}
                </div>
              </Roll>
            </div>

            <div className="timeline-item-right">
              <Roll right>
                <div className="timeline-img"></div>

                <div className="timeline-content timeline-card js--fadeInRight">
                  <div className="timeline-img-header">
                    <h2>Card Title</h2>
                  </div>
                  <div className="date">멸종위기등급</div>
                  <p>이미지로 대체</p>
                  {/* <a className="bnt-more" href="javascript:void(0)">
                    More
                  </a> */}
                </div>
              </Roll>
            </div>

            <div className="timeline-item">
              <LightSpeed left>
                <div className="timeline-img"></div>

                <div className="timeline-content js--fadeInLeft">
                  <div className="date">남은 개체 수</div>
                  <h2>Quote</h2>
                  <blockquote>23</blockquote>
                </div>
              </LightSpeed>
            </div>

            <div className="timeline-item-right">
              <LightSpeed right>
                <div className="timeline-img"></div>

                <div className="timeline-content js--fadeInRight">
                  <h2>Title</h2>
                  <div className="date">서식지</div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Maxime ipsa ratione omnis alias cupiditate saepe atque totam
                    aperiam sed nulla voluptatem recusandae dolor, nostrum
                    excepturi amet in dolores. Alias, ullam.
                  </p>
                  {/* <a className="bnt-more" href="javascript:void(0)">
                    More
                  </a> */}
                </div>
              </LightSpeed>
            </div>

            <div className="timeline-item">
              <Roll left>
                <div className="timeline-img"></div>

                <div className="timeline-content timeline-card js--fadeInLeft">
                  <div className="timeline-img-header">
                    <h2>Card Title</h2>
                  </div>
                  <div className="date">동물 설명</div>
                  <p>
                    중앙아메리카와 남아메리카의 열대 우림 지역에 서식하며,
                    오색조류와 혈연관계가 있다. 왕부리새의 부리는 크지만, 무겁지
                    않다. 단단한 열매를 쪼아먹거나 나무 기둥에 구멍을 뚫어
                    둥지를 만들 때 유용하게 쓰인다. 또한 부리로 열을 발산하거나
                    억제하는 식으로 체온을 조절할 수 있다. 토코왕부리새[2]와
                    무지개왕부리새가 가장 잘 알려져 있으며, TV동물농장에 등장한
                    적이 있다. 코뿔새와 비슷하지만, 코뿔새는 삼전지족에다
                    부분적으로 발가락이 붙어 있고, 큰부리새는 대지족이다. 사는
                    지역도 중앙, 남아메리카에 사는 왕부리새와는 달리, 코뿔새는
                    동남아시아에 산다.
                  </p>
                  {/* <a className="bnt-more" href="javascript:void(0)">
                    More
                  </a> */}
                </div>
              </Roll>
            </div>

            {/* <div className="timeline-item">
              <div className="timeline-img"></div>

              <div className="timeline-content timeline-card js--fadeInRight">
                <div className="timeline-img-header">
                  <h2>Card Title</h2>
                </div>
                <div className="date">30 JULY 2016</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                  ipsa ratione omnis alias cupiditate saepe atque totam aperiam
                  sed nulla voluptatem recusandae dolor, nostrum excepturi amet in
                  dolores. Alias, ullam.
                </p>
                <a className="bnt-more" href="javascript:void(0)">
                  More
                </a>
              </div>
            </div> */}

            {/* <div className="timeline-item">
              <div className="timeline-img"></div>

              <div className="timeline-content js--fadeInLeft">
                <div className="date">5 AUG 2016</div>
                <h2>Quote</h2>
                <blockquote>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
                  explicabo debitis omnis dolor iste fugit totam quasi inventore!
                </blockquote>
              </div>
            </div> */}

            {/* <div className="timeline-item">
              <div className="timeline-img"></div>

              <div className="timeline-content timeline-card js--fadeInRight">
                <div className="timeline-img-header">
                  <h2>Card Title</h2>
                </div>
                <div className="date">19 AUG 2016</div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                  ipsa ratione omnis alias cupiditate saepe atque totam aperiam
                  sed nulla voluptatem recusandae dolor, nostrum excepturi amet in
                  dolores. Alias, ullam.
                </p>
                <a className="bnt-more" href="javascript:void(0)">
                  More
                </a>
              </div>
            </div> */}

            {/* <div className="timeline-item">
              <div className="timeline-img"></div>

              <div className="timeline-content js--fadeInLeft">
                <div className="date">1 SEP 2016</div>
                <h2>Title</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
                  ipsa ratione omnis alias cupiditate saepe atque totam aperiam
                  sed nulla voluptatem recusandae dolor, nostrum excepturi amet in
                  dolores. Alias, ullam.
                </p>
                <a className="bnt-more" href="javascript:void(0)">
                  More
                </a>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    );
  }
}

// prop가 undefined로 내려왔을 때(전달 받았을 때) props의 기본 값을 설정 가능
// AnimalDetail.defaultProps = {
//   animalDetail: [],
// };

// $(function () {
//   window.sr = ScrollReveal();

//   if ($(window).width() < 768) {
//     if ($(".timeline-content").hasclassName("js--fadeInLeft")) {
//       $(".timeline-content")
//         .removeclassName("js--fadeInLeft")
//         .addclassName("js--fadeInRight");
//     }

//     sr.reveal(".js--fadeInRight", {
//       origin: "right",
//       distance: "300px",
//       easing: "ease-in-out",
//       duration: 800,
//     });
//   } else {
//     sr.reveal(".js--fadeInLeft", {
//       origin: "left",
//       distance: "300px",
//       easing: "ease-in-out",
//       duration: 800,
//     });

//     sr.reveal(".js--fadeInRight", {
//       origin: "right",
//       distance: "300px",
//       easing: "ease-in-out",
//       duration: 800,
//     });
//   }

//   sr.reveal(".js--fadeInLeft", {
//     origin: "left",
//     distance: "300px",
//     easing: "ease-in-out",
//     duration: 800,
//   });

//   sr.reveal(".js--fadeInRight", {
//     origin: "right",
//     distance: "300px",
//     easing: "ease-in-out",
//     duration: 800,
//   });
// });

export default AnimalInfo;
