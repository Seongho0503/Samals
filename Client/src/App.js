import logo from "./logo.svg";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./lib/connectors";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Trade from "./pages/Trade";
import Register from "./pages/Register2";
import Game from "./pages/Game";
import Minting from "./pages/Minting";
import MintCard from "./pages/MintCard";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";
import MintResult from "./pages/MintResult";
import Guide from "./pages/Guide";
import Create from "./components/trade/Create";

//dapp

import NftDetail from "./pages/NftDetail";
import NftMDetail from "./pages/NftMDetail";
import NftDetailTrade from "./pages/NftDetailTrade";
import ScrollToTop from "./components/base/ScrollToTop";
import Footer from "./components/base/Footer";
import Panda from "./assets/panda.png";
import UserPage from "./pages/UserPage";

function App() {
  const { pathname } = useLocation();
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

  const [message, setMessage] = useState("");

  const responseHandler = ({ data }) => {
    setMessage(data);
    return data;
  };

  const errorHandler = ({ message }) => {
    setMessage(message);
    return message;
  };

  const onNonCorsHeaderHandler = () => {
    axios.get("http://localhost:8080/not-cors").then(responseHandler).catch(errorHandler);
  };

  const onCorsHeaderHandler = () => {
    axios.get("http://localhost:8080/cors").then(responseHandler);
  };

  const onNonProxyHandler = () => {
    axios.get("/not-proxy").then(responseHandler).catch(errorHandler);
  };

  const onProxyHandler = () => {
    axios.get("/proxy").then(responseHandler);
  };
  const handleFollow = () => {
    //  window.addEventListener('scroll', () => setScrollY(window.pageYOffset));
    setScrollY(window.pageYOffset);
    if (ScrollY > 300) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // nft 리스트 마이페이지
  const [nftList, setNftList] = useState([]);
  const [address, setAddress] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className='App'>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/detail' element={<NftDetail />} />
        <Route path='/minting' element={<Minting />} />
        <Route path='/game' element={<Game />} />
        <Route path='/trade' element={<Trade />} />
        <Route path='/detailTrade' element={<NftDetailTrade />} />
        <Route path='/mintcard' element={<MintCard />} />
        <Route path='/register' element={<Register />} />

        <Route path='/mintresult' element={<MintResult />} />
        <Route path='/guide' element={<Guide />} />
        <Route
          path='/mypage'
          element={
            <UserPage></UserPage>
            // {/* <MyPage nftList={nftList} address={address}></MyPage> */}
          }
        />
      </Routes>
      <img
        className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
        onClick={handleTop} // 버튼 클릭시 함수 호출
        src={Panda}
        alt='panda'
      />
      {/* <ScrollToTop /> */}
      {/* <div>
        <button type="button" onClick={handdleConnect}>
          {active ? "disconnect" : "connect"}
          {active ? (
            "connect"
          ) : (
            <div>
              <p>Account: {account}</p>
              <p>ChainId: {chainedId}</p>
            </div>
          )}
        </button>
      </div> */}
      {/* <div className="app-wrap"> */}
      {/* <Router>
        {" "} */}
      {/* <Footer></Footer> */}

      {/* </Router> */}

      {/* <button
        className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
        onClick={handleTop} // 버튼 클릭시 함수 호출
      >
       TOP 
        <img src={Panda} alt="panda" />
      </button> */}

      {/* </div> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
