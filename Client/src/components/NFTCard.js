import React, { useEffect, useState } from "react";
import "../styles/NFTCard.css";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ColorExtractor } from "react-color-extractor";
import Card from "./base/Card";
import Button from "./base/Button";
import { Colors } from "../constants/Colors";
import Star from "../assets/star.png";
import { ModelViewerElement } from "@google/model-viewer";
import { useARStatus } from "../hooks/isARStatus";
import { getAnimalClass } from "../api";
import { useSelector, useDispatch } from "react-redux";
import { selectAddress } from "../redux/slice/UserInfoSlice";
import axios from "axios";
const NFTCard = ({
  saleSeq,
  username,
  nftName,
  price,
  nftSrc,
  likeCount,
  gradient,
  onClick,
  image,
  species,
  animalClass,
  starNo,
  animalSpecies,
  likePush,
}) => {
  const dispatch = useDispatch();
  const [reduxAddress, setReduxAddress] = useState(useSelector(selectAddress));
  const [isLike, setIsLike] = useState(likePush === "Y" ? true : false);
  const [colors, setColors] = useState([]);
  const [stateLikeCount, setStateLikeCount] = useState(likeCount);
  const isARSupport = useARStatus(nftSrc);

  const Like = () => {
    let sessionAddress = JSON.parse(sessionStorage.getItem("persist:root"));

    if (sessionAddress === undefined || JSON.parse(sessionAddress.userInfo).address === "") {
      alert("지갑을 연결해주세요. 모달 창 및 문구 변경 필요");
      return;
    }

    sessionAddress = JSON.parse(sessionAddress.userInfo).address;
    console.log("current Address: ", sessionAddress);

    //만약 isLike가 True(하트 클릭 상태)일 경우
    if (isLike) {
      axios({
        url: "api/sale/like/delete",
        method: "POST",
        data: { saleSeq: saleSeq, walletAddress: sessionAddress },
      })
        .then((res) => {
          console.log(res);
          if (res.data === "Success") {
            setStateLikeCount(stateLikeCount - 1);
            alert("좋아요 취소 성공");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        url: "api/sale/like/add",
        method: "POST",
        data: { saleSeq: saleSeq, walletAddress: sessionAddress },
      })
        .then((res) => {
          console.log(res);
          if (res.data === "Success") {
            setStateLikeCount(stateLikeCount + 1);
            alert("좋아요 성공");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setIsLike(!isLike);
  };

  const getColors = (colors) => {
    setColors((c) => [...c, ...colors]);
    //console.log(colors);
  };

  // useEffect(() => {
  //   getAnimalClass(animalClass).then((res) => {
  //     console.log("동물클래스" + animalClass);
  //     console.log(res);
  //     setStar("star" + res);
  //   });
  // }, []);

  const staring = () => {
    //console.log("타입" + typeof starNo);
    const stars = [];
    for (let i = 0; i < starNo; i++) {
      stars.push(<img key={i} className='star' src={Star} alt='star' />);
    }
    // console.log(stars);
    return stars;
  };

  // useEffect(() => {
  //   function staring() {
  //     const stars = [];
  //     for (let i = 1; i < { starNo }; i++) {
  //       stars.push(<img className='star' src={Star} alt='star' />);
  //     }
  //     // return stars;
  //   }
  // }, []);
  return (
    <Card
      blurColor={colors[0]}
      child={
        <>
          {isARSupport ? (
            <model-viewer
              ar-scale='auto'
              ar
              ar-modes='webxr scene-viewer quick-look'
              id='reveal'
              loading='eager'
              camera-controls
              auto-rotate
              src={nftSrc}
            ></model-viewer>
          ) : (
            <>
              {/*멸종위기 등급 별*/}
              <div className='info-container'>{staring()}</div>
              <ColorExtractor getColors={getColors}>
                <img className='nft-image' src={nftSrc} />
              </ColorExtractor>
            </>
          )}

          <div className='wrapper'>
            <div className='info-container'>
              <p className='owner'> 멸종위기등급 : {animalClass}</p>
              <p className='name'>{nftName}</p>
            </div>

            <div className='price-container'>
              <p className='price-label'>Price</p>
              <p className='price'>
                {" "}
                <FaEthereum /> {price}
              </p>
            </div>
          </div>
          <div className='buttons'>
            {/* Buy now 버튼 */}
            <Button color={Colors.buttons.primary} textContent='Buy Now' onClick={onClick} />
            <div className='like-container'>
              {/* 하트 버튼 클릭 */}
              <button
                className='like'
                onClick={() => {
                  Like();
                }}
              >
                {!isLike ? (
                  // 좋아요 상태 아닐 시
                  <AiOutlineHeart size='30' color='white' />
                ) : (
                  // 좋아요 상태 일 시
                  <AiFillHeart
                    size='30'
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
              <p className='like-count'>{stateLikeCount}</p>
            </div>
          </div>
        </>
      }
    ></Card>
  );
};

export default NFTCard;
