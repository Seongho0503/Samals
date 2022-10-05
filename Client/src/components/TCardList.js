import { useState, useEffect } from "react";
import NFTCard from "./NFTCard";
import "../styles/CardList.css";
import { useNavigate } from "react-router-dom";
import { $, jQuery } from "jquery";
import "../styles/AnimalFillter.css";

import leopard from "../assets/fillter/leopard.png";
import leopard2 from "../assets/fillter/leopard2.png";
import penguin1 from "../assets/fillter/penguin1.png";
import penguin2 from "../assets/fillter/penguin2.png";
import all from "../assets/fillter/all.png";
import all2 from "../assets/fillter/all2.png";
import tiger4 from "../assets/fillter/tiger4.png";
import rhino from "../assets/fillter/rhino3.png";
import elephant5 from "../assets/fillter/elephant5.png";
import toucan from "../assets/fillter/toucan.png";
import iguana2 from "../assets/fillter/iguan-col.png";
import shark3 from "../assets/fillter/shark3.png";
import toad2 from "../assets/fillter/toad2.png";
import { getAnimalList, getNftInfo, getSomeList } from "../api.js";
import { useSelector, useDispatch } from "react-redux";
import { selectAddress } from "../redux/slice/UserInfoSlice";
import empty from "../assets/empty.png";

// declare var $: $;

const TCardList = ({ list, type = "horizontal" }) => {
  const [reduxAddress] = useState(useSelector(selectAddress));
  // 동물 필터
  const [activeAnimal, setActiveAnimal] = useState("All");
  const [animal, setAnimal] = useState(list);
  //const [flagEmpty, setEmpty] = useState(false);
  let navigate = useNavigate();

  const [amlist, setAmlist] = useState([]);
  useEffect(() => {
    if (activeAnimal == "All") {
      console.log("리덕스", reduxAddress);
      getAnimalList(reduxAddress).then(({ data }) => {
        //console.log("리스트: ", data);
        //console.log(data.animalClassNo);
        setAmlist(data);
      });
    } else {
      getSomeList(activeAnimal).then((res) => {
        //console.log("해당리스트: ", res.data);
        setAmlist(res.data);
      });
    }
    // console.log("애니멀리스트" + amlist);
    // console.log("애니멀사진" + amlist[0].itemImgUrl);
    // console.log("이미지" + data[0]);
    // console.log("이미지" + data[0].itemImgUrl);
  }, [activeAnimal]);

  // const [price, setPrice] = useState([]);
  // useEffect(() => {
  //   getAnimalList().then(({ data }) => {
  //     console.log("리스트: ", data);
  //     console.log(data.animalClassNo);
  //     setAmlist(data);
  //     // console.log("애니멀리스트" + amlist);
  //     // console.log("애니멀사진" + amlist[0].itemImgUrl);
  //     // console.log("이미지" + data[0]);
  //     // console.log("이미지" + data[0].itemImgUrl);
  //   });
  // }, []);

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

  //동물 필터
  // useEffect(() => {
  //   activeAnimal === "All"
  //     ? setAnimal(list)
  //     : setAnimal(list.filter((vga) => vga.species === activeAnimal));
  // }, [activeAnimal]);

  return (
    <div>
      <div className='toggles'>
        {/* <button id="showall">Show All</button> */}
        {/* <button animalActive={activeAnimal === "tiger" ? true : false} onClick={setActiveAnimal}> */}
        <button onClick={() => setActiveAnimal("All")}>
          <img className='animal-fillter' src={all} />
          <h2 className='animal-name'> {"All"} </h2>
        </button>
        <button onClick={() => setActiveAnimal("tiger")}>
          <img className='animal-fillter' src={tiger4} />{" "}
          <h2 className='animal-name'> {"Tiger"} </h2>
        </button>
        <button onClick={() => setActiveAnimal("elephant")}>
          <img className='animal-fillter' src={elephant5} />
          <h2 className='animal-name'> {"Elephant"} </h2>
        </button>
        <button onClick={() => setActiveAnimal("frog")}>
          <img className='animal-fillter' src={toad2} />
          <h2 className='animal-name'> {"Toad"} </h2>
        </button>
        <button onClick={() => setActiveAnimal("shark")}>
          {/* {"ddd "} */}
          <img className='animal-fillter' src={shark3} />{" "}
          <h2 className='animal-name'> {"Shark"} </h2>
        </button>
        <button onClick={() => setActiveAnimal("bird")}>
          <img className='animal-fillter' src={toucan} />{" "}
          <h2 className='animal-name'> {"Toucan"} </h2>
        </button>
        <button onClick={() => setActiveAnimal("rhino")}>
          <img className='animal-fillter' src={rhino} />{" "}
          <h2 className='animal-name'> {"Rhino"} </h2>
        </button>
        <button onClick={() => setActiveAnimal("iguana")}>
          <img className='animal-fillter' src={iguana2} />
          <h2 className='animal-name'> {"Iguana"} </h2>
        </button>

        <button onClick={() => setActiveAnimal("penguin")}>
          {/* {"ddd "} */}
          <img className='animal-fillter' src={penguin1} />{" "}
          <h2 className='animal-name'> {"Penguin"} </h2>
        </button>
        <button onClick={() => setActiveAnimal("leopard")}>
          <img className='animal-fillter' src={leopard2} />{" "}
          <h2 className='animal-name'> {"Leopard"} </h2>
        </button>
      </div>

      <div id='card-list' style={{ flexDirection: type === "horizontal" ? "row" : "column" }}>
        {amlist.map((data, index) => {
          return (
            <NFTCard
              saleSeq={data.saleSeq}
              nftSrc={data.itemImgUrl}
              key={index}
              starNo={data.animalClassNo}
              price={data.salePrice}
              likeCount={data.likeCount}
              nftName={data.animalTitle}
              animalClass={data.animalClass}
              likePush={data.likePush}
              onClick={() => navigate("/detailTrade", { state: { item: data } })}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TCardList;
