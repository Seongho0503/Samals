import react, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { DAppProvider } from "@usedapp/core";
import Explore from ".././pages/Explore";

const Header = () => {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  const handleWallet = () => {
    activateBrowserWallet();
  };

  return (
    <div id="header">
      <Link to="/" id="logo">
        NFT Room
      </Link>

      <div id="link-containers">
        <a>게임</a>
        <Link to="/explore">상점</Link>
        <a>거래소</a>
        <a>기부</a>
        <a>Craft NFT</a>

        <button id="connect-wallet" onClick={handleWallet}>
          {!account ? "Connect Wallet" : account}
        </button>
      </div>
    </div>
  );
};

export default Header;
