import React from "react";
import NFTCard from "../NFTCard";
import "../../styles/Explore/ECardList.css";
import { useNavigate } from "react-router-dom";

const ECardList = ({ list, type = "horizontal" }) => {
  let navigate = useNavigate();

  return (
    <div id='card-list' style={{ flexDirection: type === "horizontal" ? "row" : "column" }}>
      {list.map((data, index) => {
        return (
          <NFTCard
            saleSeq={data.saleSeq}
            nftSrc={data.itemImgUrl}
            key={index}
            starNo={data.animalClassNo}
            price={data.salePrice}
            nftName={data.animalTitle}
            animalClass={data.animalClass}
            onClick={() => navigate("/detail", { state: { item: data } })}
          />
        );
      })}
    </div>
  );
};

export default ECardList;
