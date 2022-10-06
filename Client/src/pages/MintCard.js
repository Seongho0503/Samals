import react, { useEffect, useRef } from "react";
import { useLocation, Navigate } from "react-router";
import "../styles/Home.css";
import MintCardData from "../components/Minting/MintWait";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectAddress } from "../redux/slice/UserInfoSlice";
import { totalSupply, donate } from "../utils/event";
import { useNavigate } from "react-router-dom";

const MintCard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const nftSeq = useRef(0);
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
      method: "GET",
      url: "/api/ipfs/number/donate",
    })
      .then(({ data }) => {
        console.log("debug: ", data);
        nftSeq.current = data.ipfs_seq;
        //랜덤 IPFS 번호 뽑기
        let plz = data.ipfs_uri;
        console.log("다음 민팅할 카드 넘버: ", nftSeq.current);

        //블록체인 저장
        donate(nftSeq.current)
          .then((res) => {
            console.log("donate return value: ", res);
            console.log("tokenId: ", res.events.Donated.returnValues[0]);

            //블록체인 저장 성공 시 해당 정보를 DB 저장
            axios({
              method: "POST",
              url: "api/nft/mint",
              data: {
                nftPrice: 500,
                nftType: "donate",
                tokenId: res.events.Donated.returnValues[0],
                ipfsSeq: nftSeq.current,
                walletAddress: window.ethereum.selectedAddress,
              },
            })
              .then(({ data }) => {
                //DB 저장 성공 MSG
                console.log("DB 저장 성공 MSG: ", data);

                axios({
                  method: "POST",
                  url: "api/ipfs/pollOne",
                  data: {
                    ipfsSeq: nftSeq.current,
                  },
                })
                  .then(({ data }) => {
                    console.log("DB ipfs 변경 처리 성공");
                    navigate(`/mintresult`, { state: plz });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.log("DB 저장 실패 MSG:", err);
              });
          })
          .catch((err) => {
            console.log("도네이트 실패 err: ", err);
          });
      })
      .catch((err) => {
        console.log("다음 민팅할 카드 넘버 실패 err: ", err);
        console.log();
      });
  }, []);

  return (
    <div>
      <MintCardData></MintCardData>
    </div>
  );
};

export default MintCard;
