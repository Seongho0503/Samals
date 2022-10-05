import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { DAppProvider } from "@usedapp/core";
import Explore from ".././pages/Explore";
import Minting from ".././pages/Minting";
import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddress,
  setAddress,
  setUserBio,
  setUserId,
  setUserPFPAddress,
} from "../redux/slice/UserInfoSlice";
import { MetaMaskLogin, approveERC20ForMint, firstSupply } from "../utils/event";
import logo from "../assets/nav_logo_clean.png";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Header = () => {
  const injected = new InjectedConnector();
  //redux의 값을 호출 후 state로 관리
  const [reduxAddress, setReduxAddress] = useState(useSelector(selectAddress));
  const { chainedId, account, active, activate, deactivate } = useWeb3React();
  const dispatch = useDispatch();

  //연결 확인
  async function handleConnect() {
    // 비활성화 전환
    if (active) {
      deactivate();
      //초기화
      dispatch(setAddress(""));
      dispatch(setUserBio(""));
      dispatch(setUserId(""));
      setReduxAddress("");
      return;
    }
    // 활성화 시
    else {
      //메타마스크 연결 확인 및 연결
      activate(injected, (error) => {
        alert("동물을 구하기 위해선 메타 마스크 연결이 필요합니다!");
        window.open("https://metamask.io/download.html");
        window.localStorage.setItem("active", JSON.stringify(active)); //user persisted data
      });
    }
  }
  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    if (account !== undefined) {
      //dispatch를 통해 redux에 저장
      dispatch(setAddress(account));
      setReduxAddress(account);
      //DB에서 해당 지갑 주소의 정보 호출
      axios({ method: "GET", url: `/api/user/${account}` })
        .then(({ data }) => {
          console.log("get res: ", data);

          // 반환 값이 없다면 ERC20 승인함수 실행 및 DB에 저장
          if (data === "") {
            // 민트 권한 허가
            approveERC20ForMint();
            // 첫 가입 이용료 1000ACE 입금
            firstSupply();
            //DB 가입 처리
            axios({
              method: "POST",
              url: `/api/user/signup`,
              data: {
                walletAddress: account,
              },
            })
              .then((res) => {
                //DB 저장 결과 반환
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
          // 반환 값이 있다면 dispatch를 통해 redux에 저장
          else {
            dispatch(setUserBio(data.user_bio));
            dispatch(setUserId(data.user_nickname));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [account]);

  const addClickEvent = () => {};
  return (
    <div id='header'>
      <Link to='/' id='logo' width='1px'>
        <img width='50px' src={logo} />
      </Link>

      <div id='link-containers'>
        <Button variant='outlined' size='medium'>
          <Link to='/game'>MADAGASCAR</Link>
        </Button>

        <Link to='/explore'>MARKET</Link>
        <Link to='/trade'>EXPLORE</Link>
        <Link to='/minting'>DONATION</Link>
        {!reduxAddress ? "" : <Link to='/mypage'>MYPAGE</Link>}
        <button id='connect-wallet' onClick={handleConnect}>
          {reduxAddress === "" ? "Connect Wallet" : `${reduxAddress}`}
        </button>
      </div>
    </div>
  );
};

export default Header;
