import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Card from "../components/base/Card";
import "../styles/NFTDetail.css";
import { ColorExtractor } from "react-color-extractor";
import Button from "../components/base/Button";
import { FaFrog } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useMobile } from "../hooks/isMobile";
import { useARStatus } from "../hooks/isARStatus";
import AnimalInfo from "../components/NftDetail/AnimalInfo";
import AnimalBook from "../components/NftDetail/AnimalBook";
import TradeHistory from "../components/NftDetail/TradeHistory";
import MainLast from "../components/Main/MainLast";
import axios from "axios";
import { salePurchase, balanceOf, MetaMaskLogin } from "../utils/event";
const NftDetailExplore = () => {
  const isMobile = useMobile();
  const [balance] = useState(balanceOf());
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
  const onSaleTradeNft = () => {
    //예외처리
    if (window.ethereum.selectedAddress === undefined) {
      alert("구매하기 위해선 메타마스크 로그인이 필요합니다.");
      MetaMaskLogin();
      return;
    } else if (detailData.sellerAddress === window.ethereum.selectedAddress) {
      alert("자신이 등록한 NFT는 판매할 수 없습니다.");
      return;
    } else if (balance < detailData.salePrice) {
      alert("현재 보유중인 ACE 토큰이 부족합니다.");
      return;
    }

    salePurchase(detailData.saleContractAddress).then(() => {
      axios({
        method: "PUT",
        url: "api/sale/complete",
        data: {
          buyerAddress: window.ethereum.selectedAddress,
          saleSeq: detailData.saleSeq,
        },
      }).then((res) => {
        console.log(res);
        if (res !== "") {
          alert("NFT 구매 완료, my페이지로 이동");
          navigate("/mypage");
        }
      });
    });
  };
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
                        <pre id='price'>
                          {detailData.salePrice} <FaFrog size='28px' />
                        </pre>
                      </div>
                    }
                    onClick={onSaleTradeNft}
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
