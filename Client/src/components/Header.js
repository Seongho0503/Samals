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
                        Game
                    </Link>
                    <Link to="/explore">
                        Market
                    </Link>
                    <Link to="/trade">
                        Explore
                    </Link>
                    <Link to="/minting">
                        Drops
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
