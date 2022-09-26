import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { DAppProvider } from "@usedapp/core";
import Explore from ".././pages/Explore";
import Minting from ".././pages/Minting";
import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";

const Header = () => {
  //   const { activateBrowserWallet, account } = useEthers();
  //   const etherBalance = useEtherBalance(account);

  // 지갑 연결
  const [web3, setWeb3] = useState();
  const [account, setAccount] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [caver, setCaver] = useState();
  const [myToken, setMyToken] = useState([]);
  const [walletType, setWalletType] = useState("");
  const [totalToken, setTotalToken] = useState([]);
  const injected = new InjectedConnector();
  let accounts;
  // 1-메타마스크 지갑연결
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const web = new Web3(window.ethereum);
        setWeb3(web);
        console.log("지갑연결시도");
      } catch (err) {
        console.log(err);
      }
    }
    // if (typeof klaytn !== "undefined") {
    //   try {
    //     const caver = new Caver(klaytn);
    //     setCaver(caver);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }, []);

  // 로그인 우회 처리
  //   useEffect(() => {
  //     if (!isLogin) {
  //       setMyToken([]);
  //       setTotalToken([]);
  //       if (document.location.href !== "http://localhost:3000/") {
  //         document.location.href = "/";
  //       }
  //     }
  //   }, [isLogin]);

  const connectWallet = async () => {
    accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
        //method: "ethereum.enable()",
      })
      .catch((err) => {
        console.log(err.code);
      });
    setAccount(accounts[0]);
    setWalletType("eth");
    console.log(accounts);
  };
  // 1-종료

  // const handleWallet = () => {
  //   activateBrowserWallet();
  // };

  return (
    <div id="header">
      <Link to="/" id="logo">
        SAMALS
      </Link>

      <div id="link-containers">
        <Link to="/game">GAME</Link>
        <Link to="/explore">MARKET</Link>
        <Link to="/trade">EXPLORE</Link>
        <Link to="/minting">DROPS</Link>
        <Link to="/mypage">MYPAGE</Link>

        <button id="connect-wallet" onClick={connectWallet}>
          {!account ? "Connect Wallet" : account}
        </button>
      </div>
    </div>
  );
};

export default Header;
