import React from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";
import { $, jQuery } from "jquery";
import "../styles/AnimalFillter.css";
// declare var $: $;

const CardList = ({ list, type = "horizontal" }) => {
  let navigate = useNavigate();

  // 필터링 함수
  // $(function () {
  //   $(".toggles button").click(function () {
  //     var get_id = this.id;
  //     var get_current = $(".posts ." + get_id);

  //     $(".post").not(get_current).hide(500);
  //     get_current.show(500);
  //   });

  //   $("#showall").click(function () {
  //     $(".post").show(500);
  //   });
  // });

  return (
    <div>
      <div className="toggles">
        <button id="showall">Show All</button>
        <button id="web">호랑이</button>
        <button id="ux">사자</button>
        <button id="graphic">백상아리</button>
        <button id="motion">토끼</button>
      </div>

      <div
        id="card-list"
        style={{ flexDirection: type == "horizontal" ? "row" : "column" }}
      >
        {list.map((item, index) => (
          <NFTCard
            nftSrc={item.src}
            key={index}
            onClick={() => navigate("/detail", { state: { item: item } })}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
