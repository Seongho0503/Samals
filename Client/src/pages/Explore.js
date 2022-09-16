import react from "react";
import CardList from "../components/CardList";
import { exploreList } from "../constants/MockupData";
import "../styles/Explore.css";
import Header from "../components/Header";
import Search from "../components/Search";
import MainLast from "../components/Main/MainLast";
const Explore = () => {
  return (
    <div id="explore">
      <Header />
      <Search />
      <div id="list-container">
        <CardList list={exploreList} />
      </div>
      <MainLast />
    </div>
  );
};

export default Explore;
