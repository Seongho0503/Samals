import react, {
    useContext,
} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import {
    useEthers,
    useEtherBalance,
} from "@usedapp/core";
import { DAppProvider } from "@usedapp/core";
import Explore from ".././pages/Explore";
import Minting from ".././pages/Minting";

const Header =
    () => {
        const {
            activateBrowserWallet,
            account,
        } =
            useEthers();
        const etherBalance =
            useEtherBalance(
                account
            );

        const handleWallet =
            () => {
                activateBrowserWallet();
            };

        return (
            <div id="header">
                <Link
                    to="/"
                    id="logo"
                >
                    NFT
                    Room
                </Link>

                <div id="link-containers">
                    <Link to="/game">
                        게임
                    </Link>
                    <Link to="/explore">
                        상점
                    </Link>
                    <a>
                        거래소
                    </a>
                    <Link to="/minting">
                        기부
                    </Link>
                    <a>
                        Craft
                        NFT
                    </a>

                    <button
                        id="connect-wallet"
                        onClick={
                            handleWallet
                        }
                    >
                        {!account
                            ? "Connect Wallet"
                            : account}
                    </button>
                </div>
            </div>
        );
    };

export default Header;
