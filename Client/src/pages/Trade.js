import { useState, useEffect } from "react";
import "../App.css";
import TCardList from "../components/TCardList";
import { exploreList } from "../constants/MockupData";
import "../styles/Trade.css";
import Header from "../components/Header";
import Search from "../components/Search";
import MainLast from "../components/Main/MainLast";
import AnimalSearch from "../components/AnimalSearch";
import CardMotion from "../components/CardMotion";
import TradeSelect from "../components/TradeSelect";

const Trade = () => {
  return (
    <div id='explore'>
      <Header />
      <CardMotion></CardMotion>
      <AnimalSearch></AnimalSearch>
      <TradeSelect></TradeSelect>

      {/* <AnimalFiller></AnimalFiller> */}
      <div id='list-container'>
        <TCardList list={exploreList} />
      </div>
      <MainLast />
    </div>
  );
};

export default Trade;
