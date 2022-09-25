import React, {
    useState,
    useEffect,
} from "react";
import "../../styles/MintingCard.css";
import Footer from "../Footer";

const MintingModal =
    () => {
        return (
            <div>
                <h2 class="animal-data-title">
                    남은
                    동물
                    NFT
                </h2>
                <div class="animal-card">
                    <h2>
                        674개
                    </h2>
                </div>
                {/* <Footer /> */}
            </div>
        );
    };

export default MintingModal;
