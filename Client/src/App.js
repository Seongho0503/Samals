import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./lib/connectors";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import Trade from "./pages/Trade";
import Register from "./pages/Register";
import Game from "./pages/Game";
import Minting from "./pages/Minting";
import Header from "./components/Header";
import MyPage from "./pages/MyPage";

//dapp
import { DAppProvider } from "@usedapp/core";
import NftDetail from "./pages/NftDetail";
import ScrollToTop from "./components/base/ScrollToTop";
// import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Footer from "./components/base/Footer";
import Panda from "./assets/panda.png";

function App() {
  const { pathname } = useLocation();
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태

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
    <div className="App">
      {/* <ScrollToTop /> */}
      {/* <Routes>
        <App />
      </Routes> */}
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
      <Header></Header>
      <Routes>
        <Route
          path="/"
          element={
            <DAppProvider config={{}}>
              <Home />
            </DAppProvider>
          }
        />
        <Route
          path="/create"
          element={
            <DAppProvider>
              <Create />
            </DAppProvider>
          }
        />
        <Route
          path="/explore"
          element={
            <DAppProvider config={{}}>
              <Explore />
            </DAppProvider>
          }
        />
        <Route
          path="/detail"
          element={
            <DAppProvider config={{}}>
              <NftDetail />
            </DAppProvider>
          }
        />
        <Route
          path="/minting"
          element={
            <DAppProvider config={{}}>
              <Minting />
            </DAppProvider>
          }
        />{" "}
        <Route
          path="/game"
          element={
            <DAppProvider config={{}}>
              <Game />
            </DAppProvider>
          }
        />
        <Route
          path="/trade"
          element={
            <DAppProvider config={{}}>
              <Trade />
            </DAppProvider>
          }
        />
        <Route
          path="/register"
          element={
            <DAppProvider config={{}}>
              <Register />
            </DAppProvider>
          }
        />
        <Route
          path="/mypage"
          element={
            <DAppProvider config={{}}>
              <MyPage></MyPage>
              {/* <MyPage nftList={nftList} address={address}></MyPage> */}
            </DAppProvider>
          }
        />
      </Routes>
      {/* </Router> */}

      {/* <button
        className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
        onClick={handleTop} // 버튼 클릭시 함수 호출
      >
       TOP 
        <img src={Panda} alt="panda" />
      </button> */}

      <img
        className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
        onClick={handleTop} // 버튼 클릭시 함수 호출
        src={Panda}
        alt="panda"
      />
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
