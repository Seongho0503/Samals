import react from "react";
import { useState, useEffect, useContext } from "react";
import AnimalData from "../components/Minting/AnimalData";
import MintingButton from "../components/Minting/MintingButton";
import MintingModal from "../components/Minting/MintingModal";
import MintSubs from "../components/Minting/MintSubs";
import RatingData from "../components/Minting/RatingData";
import Footer from "../components/Footer";
import buttonImg01 from "../assets/mint-button01.png";
import buttonImg02 from "../assets/mint-button02.png";
import buttonImg03 from "../assets/mint-button03.png";
import Button from "@mui/material/Button";
import "../styles/Home.css";
import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";
import MintingTitle from "../components/Minting/MintingTitle";
import {
  approveERC20ForMint,
  getTotalMint,
  getLimitedNumber,
  firstSupply,
  balanceOf,
} from "../utils/event";
const Minting = () => {
  const [mint, setMint] = useState();
  return (
    <div id='home'>
      {/* <MintingTitle /> */}
      <RatingData />
      <MintingButton />
      <MintSubs></MintSubs>
      <div class='mint-div'>
        <Button
          onClick={() => {
            const res = approveERC20ForMint();
            console.log("현재토큰수: ", res);
          }}
        >
          <img width='400px' src={buttonImg03} alt='erc20 승인' />
        </Button>
        <br />
        {/* <button
        onClick={() => {
          const res = getTotalMint();
          console.log("현재까지 발급된 민트 개수 조회: ", res);
        }}
      >
        현재까지 발급된 민트 개수 조회
      </button>
      <br />
      <button
        onClick={async () => {
          const res = await getLimitedNumber();
          console.log("최초 발행한 뽑기 NFT 개수 조회: ", res);
        }}
      >
        최초 발행한 뽑기 NFT 개수 조회
      </button> */}
        <br />

        <Button
          onClick={() => {
            firstSupply().then((res) => {
              console.log("첫지급: ", res);
            });
          }}
        >
          <img width='400px' src={buttonImg01} alt='코인 충전하기' />
        </Button>
        <br />
        {/* <button
          onClick={() => {
            balanceOf().then((res) => {
              console.log("현재토큰수: ", res);
              setMint(res);
            });
          }}
        >
          <img width='400px' src={buttonImg02} alt='현재 남은 토큰 수' />
        </button> */}
      </div>

      <AnimalData />
      <MintingModal />
    </div>
  );
};

export default Minting;
