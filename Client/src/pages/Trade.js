import react from "react";
import CardList from "../components/CardList";
import { exploreList } from "../constants/MockupData";
import "../styles/Trade.css";
import Header from "../components/Header";
import Search from "../components/Search";
import MainLast from "../components/Main/MainLast";
import AnimalSearch from "../components/AnimalSearch";
const Trade = () => {
  return (
    <div id="explore">
      <Header />
      {/* <Search /> */}
      <AnimalSearch></AnimalSearch>
      <div id="list-container">
        <CardList list={exploreList} />
      </div>
      <MainLast />
    </div>
  );
};

export default Trade;
