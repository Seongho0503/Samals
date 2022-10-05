import React, { useState, useEffect, createRef } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
// import { useLocation, Navigate } from "react-router";
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
// import TradeChart from "../components/NftDetail/TradeChart";
import MainLast from "../components/Main/MainLast";

import axios from "axios";
import { buy } from "../utils/event";
const NftDetail = () => {
  const isMobile = useMobile();

  const [colors, setColors] = useState([]);

  const [isLike, setIsLike] = useState(false);

  const like = () => setIsLike(!isLike);

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log("state: ", state);

  useEffect(() => {
    setColors([]);
  }, [state]);

  const isARSupport = useARStatus(state.item.src);
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
                  src={state.item.itemImgUrl}
                >
                  {" "}
                </model-viewer>
              ) : (
                <>
                  {" "}
                  <ColorExtractor getColors={getColors}>
                    <img id='detail-image' src={state.item.itemImgUrl} alt='PFP' />
                  </ColorExtractor>
                </>
              )}

              <div id='detail-info' style={{}}>
                <div id='detail-info-container'>
                  <p id='collection'> {state.item.animalClass} </p>
                  <p id='name'> {state.item.animalTitle} </p>
                  <p id='description'>{state.item.detail}</p>
                </div>

                <div id='detail-controls'>
                  {/* 상점 NFT 구매 버튼 */}
                  <Button
                    width={isMobile ? "70%" : "70%"}
                    height='50px'
                    child={
                      <div id='button-child'>
                        <FaEthereum size='28px' />
                        <p id='price'>{state.item.salePrice}</p>
                      </div>
                    }
                    onClick={async () => {
                      // 가격 적힌 버튼 클릭 시
                      const speciesAnimal = await axios({
                        url: `/api/ipfs/number/market/${state.item.animal}`,
                        method: "GET",
                      });

                      console.log("speciesAnimal: ", speciesAnimal);
                      let plz = speciesAnimal.data.ipfs_uri;
                      console.log("date:", Date.now());
                      const buyNft = await buy(
                        state.item.animal,
                        speciesAnimal.data.ipfs_seq,
                        Date.now()
                      );
                      console.log("buyNft: ", buyNft);
                      const insertResult = await axios({
                        url: "api/nft/mint",
                        method: "POST",
                        data: {
                          nftPrice: 500,
                          nftType: "market",
                          tokenId: buyNft.events.Donated.returnValues[0],
                          ipfsSeq: speciesAnimal.data.ipfs_seq,
                          walletAddress: window.ethereum.selectedAddress,
                        },
                      });
                      console.log("insertResult: ", insertResult);
                      let pollOne;
                      if (insertResult.data !== "") {
                        pollOne = await axios({
                          method: "POST",
                          url: "api/ipfs/pollOne",
                          data: {
                            ipfsSeq: speciesAnimal.data.ipfs_seq,
                          },
                        }).then(({ data }) => {
                          console.log("DB ipfs 변경 처리 성공");
                          navigate(`/mintresult`, { state: plz });
                        });
                        console.log("pollOne: ", pollOne);
                      }
                    }}
                  ></Button>
                </div>
              </div>
            </div>
          }
        />
      </div>

      {/* <AnimalDetail animalDetail={dummyList} /> */}
      <AnimalBook></AnimalBook>
      <AnimalInfo animal={state.item.animal} />
      <TradeHistory></TradeHistory>
      {/* <Test /> */}
      {/* <TradeChart></TradeChart> */}
      <MainLast />
    </div>
  );
};

export default NftDetail;
