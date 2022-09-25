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
                    SAMALS
                </Link>

                <div id="link-containers">
                    <Link to="/game">
                        GAME
                    </Link>
                    <Link to="/explore">
                        MARKET
                    </Link>
                    <Link to="/trade">
                        EXPLORE
                    </Link>
                    <Link to="/minting">
                        DROPS
                    </Link>

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
