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
const NFTCard = ({
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
}) => {
  const [isLike, setIsLike] = useState(false);
  const [colors, setColors] = useState([]);
  // const [stars, setStar] = useState([]);

  const isARSupport = useARStatus(nftSrc);

  // useEffect(() => {
  //   console.log(isARSupport);
  // }, []);

  const like = () => setIsLike(!isLike);

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

  useEffect(() => {
    console.log({ starNo });
    // function starCount() {
    //   for (var i = 0; i < { starNo }; i++) {
    //     console.log({ starNo });
    //     stars.push(<img className='star' src={Star} alt='star' />);
    //   }
    // }
  }, []);

  const staring = () => {
    //console.log("타입" + typeof starNo);
    const stars = [];
    for (let i = 0; i < starNo; i++) {
      stars.push(<img key={i} className='star' src={Star} alt='star' />);
    }
    console.log(stars);
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
              // image={Star}
            >
              {" "}
              {/* <img
                className="star"
                // image={Star}
                style={{ backgroundImage: "url(" + Star + ")" }}
              /> */}
            </model-viewer>
          ) : (
            <>
              {/*멸종위기 등급 별*/}
              <div className='info-container'>
                {staring()}
                {/* <img className='star' src={Star} alt='star' /> */}
                {/* <img
                  className='star'
                  // image={Star}
                  src={Star}
                  //src="../assets/star.png"
                  alt='star'
                  // style={{ backgroundImage: "url(" + Star + ")" }}
                /> */}
                {/* <p className="owner"> LEJOURN.DARK.NFT</p>
                <p className="name">Alien Cry</p> */}
              </div>
              <ColorExtractor getColors={getColors}>
                {/* <img
                  className="star"
                  image={Star}
                  // style={{ backgroundImage: "url(" + Star + ")" }}
                /> */}
                <img className='nft-image' src={nftSrc} />
              </ColorExtractor>
            </>
          )}

          <div className='wrapper'>
            {/* <img
              className="star"
              image={Star}
              // style={{ backgroundImage: "url(" + Star + ")" }}
            />
            <img
              className="star"
              image={Star}
              // style={{ backgroundImage: "url(" + Star + ")" }}
            />
            <img
              className="star"
              image={Star}
              // style={{ backgroundImage: "url(" + Star + ")" }}
            /> */}
            {/* <div
              style={{
                backgroundImage: "url(" + Star + ")",
              }}
            /> */}

            <div className='info-container'>
              {/* <img
                className="star"
                style={{ backgroundImage: "url(" + Star + ")" }}
              /> */}
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
            {/* <button className="buy-now">Buy Now</button> */}
            <Button color={Colors.buttons.primary} textContent='Buy Now' onClick={onClick} />
            <div className='like-container'>
              <button className='like' onClick={like}>
                {!isLike ? (
                  <AiOutlineHeart size='30' color='white' />
                ) : (
                  <AiFillHeart
                    size='30'
                    style={{
                      stroke: `-webkit-linear-gradient(
                    to bottom,
                    #38ef7d,
                    #11998e
                  );`,
                    }}
                    color='#00f5c966'
                  />
                )}
              </button>
              <p className='like-count'>{likeCount}</p>
            </div>
          </div>
        </>
      }
    ></Card>
  );
};

export default NFTCard;
