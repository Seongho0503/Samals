import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaFrog } from "react-icons/fa";
import { useMobile } from "../hooks/isMobile";
import { useARStatus } from "../hooks/isARStatus";
import AnimalInfo from "../components/NftDetail/AnimalInfo";
import TradeHistory from "../components/NftDetail/TradeHistory";
// import TradeChart from "../components/NftDetail/TradeChart";
import MainLast from "../components/Main/MainLast";
import axios from "axios";
import { buy, balanceOf } from "../utils/event";
import ReactJsAlert from "reactjs-alert";

import { MetaLoadingScreen } from "../api";
const NftDetail = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("warning");
  const [title, setTitle] = useState("ACE 부족이 부족합니다.");
  const [crntBlnc, setCrntBlnc] = useState(0);
  const isMobile = useMobile();
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState([]);

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  const { state } = useLocation();

  useEffect(() => {
    setColors([]);
    async function inputBalance() {
      setCrntBlnc(await balanceOf());
    }
    inputBalance();
  }, [state]);

  const isARSupport = useARStatus(state.item.src);

  const buyMarketNFT = async () => {
    // 예외처리
    let a = await balanceOf();
    setCrntBlnc(a);
    if (a < 500) {
      setStatus(true);
      return;
    }

    // 가격 적힌 버튼 클릭 시
    const speciesAnimal = await axios({
      url: `/api/ipfs/number/market/${state.item.animal}`,
      method: "GET",
    });

    console.log("speciesAnimal: ", speciesAnimal);
    console.log("date:", Date.now());
    setLoading(true);
    let buyNft;
    try {
      await buy(state.item.animal, speciesAnimal.data.ipfs_seq, Date.now()).then((res) => {
        buyNft = res;
        setLoading(false);
      });
    } catch (e) {
      console.log("buy 솔리디티 error");
      setLoading(false);
    }

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
      });
      console.log("pollOne: ", pollOne);
      navigate("/mintresult", { state: pollOne.data.ipfs_uri });
    }
  };

  return (
    <div>
      {loading === true ? <MetaLoadingScreen text='상점민팅 대기중!' /> : <></>}
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
                        <span id='price' style={{ fontSize: "20px" }}>
                          {/* 띄워쓰기 */}
                          {state.item.salePrice}&nbsp;
                        </span>
                        <FaFrog size='28px' />
                      </div>
                    }
                    onClick={buyMarketNFT}
                  ></Button>
                </div>
              </div>
            </div>
          }
        />
        <ReactJsAlert
          status={status} // true or false
          type='error' // success, warning, error, info
          title={title} // title you want to display
          Close={() => this.setState({ status: false })} // callback method for hide
          autoCloseIn={3000}
          button={"확인"}
        />
      </div>

      {/* <AnimalDetail animalDetail={dummyList} /> */}
      {/* <AnimalBook></AnimalBook> */}
      <AnimalInfo animal={state.item.animal} />
      <TradeHistory></TradeHistory>
      {/* <Test /> */}
      {/* <TradeChart></TradeChart> */}
      <MainLast />
      <ReactJsAlert
        status={status} // true or false
        type={type} // success, warning, error, info
        title={title}
        Close={() => setStatus(false)}
        autoCloseIn={3000}
        button={"확인"}
      />
    </div>
  );
};

export default NftDetail;
