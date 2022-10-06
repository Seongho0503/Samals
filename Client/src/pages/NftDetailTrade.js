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
import { addressTransferShort } from "../api";
import { selectAddress } from "../redux/slice/UserInfoSlice";
import { useSelector } from "react-redux";
import ReactJsAlert from "reactjs-alert";
import { MetaLoadingScreen } from "../api";

const NftDetailExplore = () => {
  // reactjs-alert 관련
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("warning");
  const [title, setTitle] = useState("구매 완료!");

  const [loading, setLoading] = useState(false);
  const [reduxAddress] = useState(useSelector(selectAddress));
  const isMobile = useMobile();
  const [balance] = useState(balanceOf());
  const [colors, setColors] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(0);
  const [detailData, setDetailData] = useState({
    saleDescription: "",
    tokenImgUrl: "",
    salePrice: "",
    animalSpecies: "",
    tokenId: "",
  });

  const onClickLikeBtn = () => {
    axios({}).then(() => {});

    let inputUrl = "api/sale/like/";
    let result = "";
    if (reduxAddress === undefined) {
      alert("좋아요를 누르려면 지갑 연결이 필요합니다.");
      return;
    }

    //만약 isLike가 True(하트 클릭 상태)일 경우
    if (isLike) result = "delete";
    // isLike가 fasle일 경우
    else result = "add";

    axios({
      url: inputUrl + result,
      method: "POST",
      data: { saleSeq: detailData.saleSeq, walletAddress: reduxAddress },
    })
      .then((res) => {
        console.log(res);
        if (res.data === "Success") {
          if (result === "add") {
            console.log("like success");
            setLikeCnt(likeCnt + 1);
          } else {
            console.log("like fail");

            setLikeCnt(likeCnt - 1);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("change isLike");
    setIsLike(!isLike);
  };

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
  };

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    setColors([]);
    let inputUrl = `/api/sale/${state.item.saleSeq}`;
    if (reduxAddress !== undefined) inputUrl += `?address=${reduxAddress}`;
    axios({ url: inputUrl, method: "GET" })
      .then(({ data }) => {
        setDetailData(data);
        setIsLike(data.likePush === "Y" ? true : false);
        setLikeCnt(data.likeCount);
        console.log("detailData: ", data);
        console.log("아이템", state.item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const isARSupport = useARStatus(state.item.itemImgUrl);

  const onSaleTradeNft = () => {
    //예외처리
    if (window.ethereum.selectedAddress === undefined) {
      setTitle("메타마스크 로그인이 필요합니다.");
      setOpen(true);
      MetaMaskLogin();
      return;
    } else if (detailData.sellerAddress === window.ethereum.selectedAddress) {
      setTitle("자신이 등록한 NFT는 구매할 수 없습니다.");
      setOpen(true);
      return;
    } else if (balance < detailData.salePrice) {
      setTitle(`보유중인 ACE가 부족합니다.
      보유 ACE: ${balance}`);
      setOpen(true);
      return;
    }
    try {
      setLoading(true);
      salePurchase(detailData.saleContractAddress)
        .then(() => {
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
              setLoading(false);
              setStatus(true);
              setTimeout(() => {
                navigate("/mypage");
              }, 3000);
            }
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (e) {
      console.log("error");
      setLoading(false);
    }
  };

  return (
    <div>
      {loading === true ? <MetaLoadingScreen text='거래승인,계약체결,결제 3개 요청!' /> : <></>}
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
                  <p id='collection'>NFT 시리즈 : {detailData.saleTitle} </p>
                  <p id='collection'>민팅 순서 : {detailData.tokenId} </p>
                  <p id='collection'>판매자 닉네임 : {detailData.sellerNickName} </p>
                  <p id='collection'>
                    판매자 주소 : {addressTransferShort(detailData.sellerAddress)}{" "}
                  </p>
                  <p id='collection'>게시글 등록일 : {detailData.saleCreatedTime} </p>
                  <p id='collection'>NFT 정보 : {detailData.saleDescription} </p>
                </div>

                <div id='detail-controls'>
                  <Button
                    width={isMobile ? "70%" : "70%"}
                    height='50px'
                    child={
                      <div id='button-child'>
                        <p id='price' style={{ cursor: "pointer" }}>
                          {detailData.salePrice}
                        </p>
                        &nbsp;
                        <span>
                          <FaFrog size='28px' />
                        </span>
                      </div>
                    }
                    onClick={onSaleTradeNft}
                  ></Button>
                  <div className='like-container'>
                    <button
                      className='like'
                      onClick={() => {
                        onClickLikeBtn();
                      }}
                    >
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
                    <p className='like-count'>{likeCnt}</p>
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
      {/* <AnimalBook animal={state.item.animalSpecies}></AnimalBook> */}
      <AnimalInfo animal={state.item.animalSpecies} />

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

export default NftDetailExplore;
