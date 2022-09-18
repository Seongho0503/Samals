import react from "react";
import AnimalData from "../components/Minting/AnimalData";
import MintingButton from "../components/Minting/MintingButton";
import MintingModal from "../components/Minting/MintingModal";
import RatingData from "../components/Minting/RatingData";

import "../styles/Home.css";
import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";

const Minting =
    () => {
        return (
            <div id="home">
                <RatingData />
                <AnimalData />
                <MintingButton />
                <MintingModal />
            </div>
        );
    };

export default Minting;
