import react, { useEffect } from "react";

import "../styles/Home.css";
import MintCardData from "../components/Minting/MintCardData";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectAddress } from "../redux/slice/UserInfoSlice";
import { totalSupply, donate } from "../utils/event";
const MintCard = () => {
  //백 솔 백
  console.log("MintCard.js");
  useEffect(() => {
    // console.log(totalSupply());
    let sessionAddress = JSON.parse(sessionStorage.getItem("persist:root"));

    if (sessionAddress === undefined || JSON.parse(sessionAddress.userInfo).address === "") {
      alert("지갑을 연결해주세요. 모달 창 및 문구 변경 필요");
      return;
    }
    sessionAddress = JSON.parse(sessionAddress.userInfo).address;
    console.log("MintCard sessionAddres: ", sessionAddress);

    //랜덤하게 뽑을 카드를 백엔드에서 선택
    axios({
      method: "POST",
      url: "/api/nft/mint",
      data: {
        nftPrice: 0,
        nftType: "string",
        tokenId: 0,
        walletAddress: sessionAddress,
      },
    })
      .then(({ data }) => {
        console.log("", data);
        donate(data.ntfSeq)
          .then((res) => {
            console.log("after donate: ", res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>{/* <MintCardData></MintCardData> */}</div>;
};

export default MintCard;
