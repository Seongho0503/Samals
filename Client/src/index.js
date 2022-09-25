import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "swiper/css/bundle";

import reportWebVitals from "./reportWebVitals";

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Create from "./pages/Create";
import Explore from "./pages/Explore";
import Minting from "./pages/Minting";
import Game from "./pages/Game";

import Trade from "./pages/Trade";
import Register from "./pages/Register";
import scrollTo from "./components/base/Footer";

//dapp
import { DAppProvider } from "@usedapp/core";
import NftDetail from "./pages/NftDetail";
import ScrollTo from "./components/base/ScrollToTop";
import ScrollToTop from "./components/base/ScrollToTop";
import Footer from "./components/base/ScrollToTop";
// import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

// function getLibrary(
//     provider
// ) {
//     const library =
//         new Web3Provider(
//             provider,
//             "any"
//         );
//     return library;
// }

{
    /* <Web3ReactProvider getLibrary={getLibrary}> */
}

// export default function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   console.log(`${pathname}`);
//   return null;
// }

ReactDOM.render(
    <BrowserRouter>
        {/* <Footer></Footer> */}
        <ScrollToTop />
        <App />
    </BrowserRouter>,

    document.getElementById(
        "root"
    )
    // document.getElementById("root").scrollTo(0, 0)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
