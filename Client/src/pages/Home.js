import react from "react";
import MainTitle from "../components/Main/MainTitle";
import MainSub from "../components/Main/MainSub";
import MainVision from "../components/Main/MainVision";
import MainNFT from "../components/Main/MainNFT";
import MainToken from "../components/Main/MainToken";
import MainRoadMap from "../components/Main/MainRoadMap";
import MainTeam from "../components/Main/MainTeam";
import MainLast from "../components/Main/MainLast";

import "../styles/Home.css";
import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";

import { LoadingScreen } from "../api";
const Home = () => {
  return (
    <div id='home' style={{ cursor: "default" }}>
      <MainTitle list={hotDropsData} />
      <MainSub />
      <MainNFT />
      <MainVision />
      <MainToken />
      <MainRoadMap />
      <MainTeam />
      <MainLast />
      {/* <p id="card-list-header-text">
                {" "}
                Hot
                Drops{" "}
            </p>
            <div id="list-container">
                <CardList
                    list={ 
                        hotDropsData
                    }
                />
            </div> */}
    </div>
  );
};

export default Home;
