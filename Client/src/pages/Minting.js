import react from "react";
import AnimalData from "../components/Minting/AnimalData";
import MintingButton from "../components/Minting/MintingButton";
import MintingModal from "../components/Minting/MintingModal";
import RatingData from "../components/Minting/RatingData";
import Footer from "../components/Footer";

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
  return (
    <div id='home'>
      <MintingTitle />
      <RatingData />
      <MintingButton />
      <button
        onClick={() => {
          const res = approveERC20ForMint();
          console.log("현재토큰수: ", res);
        }}
      >
        ERC20승인(가입 후 한번만)
      </button>
      <br />
      <button
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
      </button>
      <br />
      <button
        onClick={() => {
          firstSupply().then((res) => {
            console.log("첫지급: ", res);
          });
        }}
      >
        최초 지급
      </button>
      <br />
      <button
        onClick={() => {
          balanceOf().then((res) => {
            console.log("현재토큰수: ", res);
          });
        }}
      >
        현재토큰수
      </button>

      <AnimalData />
      <MintingModal />
    </div>
  );
};

export default Minting;
