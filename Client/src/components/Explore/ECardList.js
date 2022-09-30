import React from "react";
import NFTCard from "../NFTCard";
import "../../styles/Explore/ECardList.css";
import { useNavigate } from "react-router-dom";

const ECardList = ({ list, type = "horizontal" }) => {
  let navigate = useNavigate();

  return (
    <div id='card-list' style={{ flexDirection: type == "horizontal" ? "row" : "column" }}>
      {list.map((item, index) => {
        console.log("ECardList: ", item);
        return (
          <NFTCard
            nftSrc={item.src}
            key={index}
            onClick={() => navigate("/detail", { state: { item: item } })}
          />
        );
      })}
    </div>
  );
};

export default ECardList;
