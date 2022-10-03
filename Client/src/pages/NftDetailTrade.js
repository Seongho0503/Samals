import React, { useState, useEffect, createRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation, Navigate } from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaEthereum } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { hotDropsData } from "../constants/MockupData";
import NFTCard from "../components/NFTCard";
import { useARStatus } from "../hooks/isARStatus";
import AnimalDetail from "../components/AnimalDetail";
import AnimalInfo from "../components/NftDetail/AnimalInfo";
import AnimalBook from "../components/NftDetail/AnimalBook";
import TradeHistory from "../components/NftDetail/TradeHistory";
import TradeChart from "../components/NftDetail/TradeChart";
import MainLast from "../components/Main/MainLast";
import axios from "axios";

const NftDetailExplore = () => {
  const isMobile = useMobile();

  const [colors, setColors] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [detailData, setDetailData] = useState({
    saleDescription: "",
    tokenImgUrl: "",
    salePrice: "",
    animalSpecies: "",
    tokenId: "",
  });

  const like = () => setIsLike(!isLike);

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state: ", state);

  useEffect(() => {
    setColors([]);

    axios({ url: `/api/sale/${state.item.saleSeq}`, method: "GET" })
      .then(({ data }) => {
        setDetailData(data);
        console.log(data);
        console.log("아이템", state.item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isARSupport = useARStatus(state.item.itemImgUrl);
  // const isARSupport = false;
  //!! aciklama karakter sayisi sinirlanmali.
  //!! scroll sorununa cozum bulunmali.

  // animal Detail의 dummy 데이터
  // const dummyList = [
  //   {
  //     nameKo: "토코투칸",
  //     gradeEn: "EW",
  //     gradeNo: 5,
  //     count: 354,
  //     detail:
  //       "중앙아메리카와 남아메리카의 열대 우림 지역에 서식하며, 오색조류와 혈연관계가 있다.왕부리새의 부리는 크지만, 무겁지 않다. 단단한 열매를 쪼아먹거나 나무 기둥에 구멍을 뚫어 둥지를 만들 때 유용하게 쓰인다. 또한 부리로 열을 발산하거나 억제하는 식으로 체온을 조절할 수 있다.",
  //   },
  // ];
  return (
    <div>
      <Header />
      <div id='nft-detail-card-wrapper'>
        <Card
          width={isMobile ? "100%" : "65vw"}
          height={isMobile ? "700px" : "60vh"}
          blurColor={colors[0]}
          child={
            //Detail Content
            <div id='detail-content'>
              {isARSupport ? (
                <model-viewer
                  ar-scale='auto'
                  ar
                  ar-modes='webxr scene-viewer quick-look'
                  id='arDetail'
                  loading='eager'
                  camera-controlsk
                  auto-rotate
                  src={detailData.tokenImgUrl}
                >
                  {" "}
                </model-viewer>
              ) : (
                <>
                  {" "}
                  <ColorExtractor getColors={getColors}>
                    <img id='detail-image' src={detailData.tokenImgUrl} alt='NFT_PFP' />
                  </ColorExtractor>
                </>
              )}

              <div id='detail-info' style={{}}>
                <div id='detail-info-container'>
                  <p id='collection'> {detailData.saleTitle} </p>
                  <p id='name'> </p>
                  <p id='description'> {detailData.saleDescription} </p>
                </div>

                <div id='detail-controls'>
                  <Button
                    width={isMobile ? "70%" : "70%"}
                    height='50px'
                    child={
                      <div id='button-child'>
                        <FaEthereum size='28px' />
                        <p id='price'>{detailData.salePrice}</p>
                      </div>
                    }
                  ></Button>
                  <div className='like-container'>
                    <button className='like' onClick={like}>
                      {!isLike ? (
                        <AiOutlineHeart size='45' color='white' />
                      ) : (
                        <AiFillHeart
                          size='45'
                          style={{
                            stroke: `-webkit-linear-gradient(
                    to bottom,
                    #38ef7d,
                    #11998e
                  )`,
                          }}
                          color='#00f5c966'
                        />
                      )}
                    </button>
                    <p className='like-count'>{state.item.likeCount}</p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
      <TradeHistory sale={state.item.saleSeq}></TradeHistory>
      {/* <TradeChart></TradeChart> */}
      {/* <AnimalDetail animalDetail={dummyList} /> */}
      <AnimalBook animal={state.item.animalSpecies}></AnimalBook>
      <AnimalInfo animal={state.item.animalSpecies} />

      {/* <Test /> */}
      {/* <TradeChart></TradeChart> */}
      <MainLast />
    </div>
  );
};

export default NftDetailExplore;
