import { useState, useEffect } from "react";
import "../App.css";
import CardList from "../components/CardList";
import { exploreList } from "../constants/MockupData";
import "../styles/Trade.css";
import Header from "../components/Header";
import Search from "../components/Search";
import MainLast from "../components/Main/MainLast";
import AnimalSearch from "../components/AnimalSearch";
import CardMotion from "../components/CardMotion";
import TradeSelect from "../components/TradeSelect";

// import TradeSlider from "../components/TradeSlider";
// import AnimalFiller from "../components/AnimalFillter";
const Trade = () => {
  // const [scrollY, setScrollY] = useState(0);
  // const [scrollToggle, setScrollToggle] = useState(false);
  // useEffect(() => {
  //   window.addEventListener("scroll", () => setScrollY(window.pageYOffset));
  //   console.log(scrollY);
  //   if (scrollY > 100) {
  //     setScrollToggle(true);
  //   } else if (scrollY < 100) {
  //     setScrollToggle(false);
  //   }
  // });
  return (
    <div id="explore">
      <Header />
      {/* <TradeSlider></TradeSlider> */}
      {/* <Search /> */}
      <CardMotion></CardMotion>
      <AnimalSearch></AnimalSearch>
      <TradeSelect></TradeSelect>

      {/* <AnimalFiller></AnimalFiller> */}
      <div id="list-container">
        <CardList list={exploreList} />
      </div>
      <MainLast />
    </div>
  );
};

export default Trade;
