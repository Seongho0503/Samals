import { useEffect } from "react";
import "../styles/CardMotion.scss";
import Tiger from "../assets/card/Tiger.png";
import Toad from "../assets/card/Toad.png";
import Shark from "../assets/card/Shark.png";
import Elephant from "../assets/card/Elephant.png";
import Toco from "../assets/card/Toco.png";
import Slider from "./Slider";

const CardMotion = () => {
  useEffect(() => {
    let hero = document.getElementById("hero-slides");
    let menu = document.getElementById("menu");
    let slides = document.getElementById("slides");
    let dribbble = document.getElementById("dribbble");
    let next = ["next", "next-catch"].map((n) => document.getElementById(n));
    let prev = ["prev", "prev-catch"].map((n) => document.getElementById(n));
    let slideChildren = slides && slides.children;
    let slideCount = slideChildren && slides.children.length;
    let currentlyDemoing = false;
    let currentPage = 0;
    let slidesPerPage = () => (window.innerWidth > 1700 ? 4 : window.innerWidth > 1200 ? 3 : 2);
    let maxPageCount = () => slideCount / slidesPerPage() - 1;

    function goToPage(pageNumber = 0) {
      currentPage = Math.min(maxPageCount(), Math.max(0, pageNumber));
      // console.log(currentPage);
      hero && hero.style.setProperty("--page", currentPage);
    }

    function sleep(time) {
      return new Promise((res) => setTimeout(res, time));
    }

    function hoverSlide(index) {
      index in slideChildren && slideChildren[index].classList.add("hover");
      // index in slideChildren && slideChildren[index].classList.add("hover");
    }

    function unhoverSlide(index) {
      index in slideChildren && slideChildren[index].classList.remove("hover");
    }

    async function demo() {
      if (currentlyDemoing) {
        return;
      }
      currentlyDemoing = true;
      if (currentPage !== 0) {
        goToPage(0);
        await sleep(800);
      }
      let slides = slidesPerPage();
      let pageSeq_ = { 2: [1, 2, 1], 3: [1, 2, 1 / 3], 4: [1, 1, 0] };
      let pageSeq = pageSeq_[slides] || pageSeq_[4];
      let slideSeq_ = { 2: [2, 4, 3], 3: [3, 6, 2], 4: [3, 6, 2] };
      let slideSeq = slideSeq_[slides] || slideSeq_[2];
      await sleep(300);
      goToPage(pageSeq[0]);
      await sleep(500);
      hoverSlide(slideSeq[0]);
      await sleep(1200);
      goToPage(pageSeq[1]);
      dribbble.classList.add("hover");
      unhoverSlide(slideSeq[0]);
      await sleep(500);
      hoverSlide(slideSeq[1]);
      await sleep(1200);
      goToPage(pageSeq[2]);
      unhoverSlide(slideSeq[1]);
      await sleep(300);
      hoverSlide(slideSeq[2]);
      await sleep(1600);
      goToPage(0);
      unhoverSlide(slideSeq[2]);
      dribbble.classList.remove("hover");
      currentlyDemoing = false;
    }

    next.forEach(
      (n) => n && n.addEventListener("click", () => !currentlyDemoing && goToPage(currentPage + 1))
    );
    prev.forEach(
      (n) => n && n.addEventListener("click", () => !currentlyDemoing && goToPage(currentPage - 1))
    );
    menu && menu.addEventListener("click", demo);

    sleep(100).then(demo);

    window.addEventListener("resize", () => {
      // console.log(document.body.style.getPropertyValue('--slide-per-page'));
    });
  }, []);
  return (
    <div>
      <div id='hero-slides'>
        {/* <div id="header">
          <div id="logo"></div>
          <div id="menu">
            <div id="hamburger">
              <div className="slice"></div>
              <div className="slice"></div>
              <div className="slice"></div>
            </div>
          </div>
        </div> */}
        <div id='slides-cont'>
          <div className='button' id='next'></div>
          <div className='button' id='prev'></div>
          <div id='slides'>
            <div
              className='slide'
              style={{
                backgroundImage: "url(" + Toad + ")",
                // background: Tiger,
                // src: Tiger,
                // background:
                //   "url(https://alca.tv/static/u/ef5af971-fc46-4ee1-a589-980346478696_opt.png)",
              }}
              // style="background-image: url(https://alca.tv/static/u/ef5af971-fc46-4ee1-a589-980346478696_opt.png)"
            >
              <div className='number'>01</div>
              <div className='body'>
                <div className='location'>두꺼비, EN</div>
                <div className='headline'>날뛰는 두꺼비</div>
                <a href='https://unsplash.com/photos/EYmhcdGuYmI' target='_blank'>
                  <div className='link'>3000 달러</div>
                </a>
              </div>
            </div>
            <div
              className='slide'
              // style="background-image: url(https://alca.tv/static/u/522d6a86-0dcf-4554-8b22-7655d65a1f66_opt.png)"
              style={{
                backgroundImage: "url(" + Shark + ")",
                // background:
                //   "url(https://alca.tv/static/u/522d6a86-0dcf-4554-8b22-7655d65a1f66_opt.png)",
              }}
            >
              <div className='number'>02</div>
              <div className='body'>
                <div className='location'>백상아리, EN</div>
                <div className='headline'>화가난 백상아리</div>
                <a href='https://unsplash.com/photos/ANJHXftvvJ8' target='_blank'>
                  <div className='link'>3000 달러</div>
                </a>
              </div>
            </div>
            <div
              className='slide'
              style={{
                backgroundImage: "url(" + Elephant + ")",
                // background:
                //   "url(https://alca.tv/static/u/9b5f71cb-34a3-4fb4-a3a6-0ce9557c0acd_opt.png)",
              }}
              //   style="background-image: url(https://alca.tv/static/u/9b5f71cb-34a3-4fb4-a3a6-0ce9557c0acd_opt.png)"
              //
            >
              <div className='number'>03</div>
              <div className='body'>
                <div className='location'>아프리카 코끼리, EN </div>
                <div className='headline'>배고픈 코끼리</div>
                <a href='https://unsplash.com/photos/73aocAAt7rs' target='_blank'>
                  <div className='link'>3000 달러</div>
                </a>
              </div>
            </div>
            <div
              className='slide'
              style={{
                backgroundImage: "url(" + Toco + ")",
                // background:
                //   "url(https://alca.tv/static/u/10cfd52d-e217-41e9-bb8b-ad43384a5e63_opt.png)",
              }}
              // style="background-image: url(https://alca.tv/static/u/10cfd52d-e217-41e9-bb8b-ad43384a5e63_opt.png)"
            >
              <div className='number'>04</div>
              <div className='body'>
                <div className='location'>토코토칸, EN</div>
                <div className='headline'>졸린 토코토칸</div>
                <a href='https://unsplash.com/photos/aPDCEoW7B78' target='_blank'>
                  <div className='link'>3000 달러</div>
                </a>
              </div>
            </div>
            <div
              className='slide'
              style={{
                backgroundImage: "url(" + Tiger + ")",
                // background:
                //   "url(https://alca.tv/static/u/b9669f2a-17fc-47dc-b6b5-3f863004efa8_opt.png)",
              }}
              // style="background-image: url(https://alca.tv/static/u/b9669f2a-17fc-47dc-b6b5-3f863004efa8_opt.png)"
            >
              <div className='number'>05</div>
              <div className='body'>
                <div className='location'>호랑이, EN</div>
                <div className='headline'>용맹한 호랑이</div>
                <a href='https://unsplash.com/photos/Akz00I_GGjU' target='_blank'>
                  <div className='link'>3000 달러</div>
                </a>
              </div>
            </div>
            <div
              className='slide'
              style={{
                backgroundImage: "url(" + Toad + ")",
                // background:
                //   "url(https://alca.tv/static/u/31979576-5060-4513-aae2-b379b87e7fe6_opt.png)",
              }}

              // style="background-image: url(https://alca.tv/static/u/31979576-5060-4513-aae2-b379b87e7fe6_opt.png)"
            >
              <div className='number'>06</div>
              <div className='body'>
                <div className='location'>두꺼비, EN</div>
                <div className='headline'>날뛰는 두꺼비</div>
                <a href='https://unsplash.com/photos/pTn26knnKVw' target='_blank'>
                  <div className='link'>3000 달러</div>
                </a>
              </div>
            </div>
            <div
              className='slide'
              style={{
                backgroundImage: "url(" + Shark + ")",
                // background:
                //   "url(https://alca.tv/static/u/429b83b8-1ad4-4450-b0de-0a0c1073cf1e_opt.jpg)",
              }}

              // style="background-image: url(https://alca.tv/static/u/429b83b8-1ad4-4450-b0de-0a0c1073cf1e_opt.jpg)"
            >
              <div className='number'>07</div>
              <div className='body'>
                <div className='location'>백상아리, EN</div>
                <div className='headline'>화가난 백상아리</div>
                <a href='https://unsplash.com/photos/v63B_MUiFw8' target='_blank'>
                  <div className='link'>3000 달러</div>
                </a>
              </div>
            </div>
          </div>
          <div id='next-catch'></div>
          <div id='prev-catch'></div>
        </div>
        {/* <div id="footer">
          <a
            href="https://dribbble.com/shots/3888265-Motion-Study"
            target="_blank"
          >
            <div id="dribbble"></div>
          </a>
        </div> */}
      </div>
    </div>
  );
  //Slider();
};

export default CardMotion;
