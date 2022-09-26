import react from "react";
import CardList from "../components/Explore/ECardList";
import { exploreList } from "../constants/ExploreDatay";
import "../styles/Explore/Explore.css";
import Header from "../components/Header";
import Search from "../components/Search";
import MainLast from "../components/Main/MainLast";
import Market from "../assets/market.png";
const Explore = () => {
  return (
    <div id="explore">
      {/* <Header /> */}
      <img className="market-img" src={Market}></img>
      <div id="list-container">
        <CardList list={exploreList} />
      </div>
      <MainLast />
    </div>
  );
};

export default Explore;
