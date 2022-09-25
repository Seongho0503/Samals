import react from "react";
import AnimalData from "../components/Minting/AnimalData";
import MintingButton from "../components/Minting/MintingButton";
import MintingModal from "../components/Minting/MintingModal";
import RatingData from "../components/Minting/RatingData";
import Footer from "../components/Footer";

import "../styles/Home.css";
import CardList from "../components/CardList";
import { hotDropsData } from "../constants/MockupData";
import MintingTitle from "../components/Minting/MintingTitle";

const Minting =
    () => {
        return (
            <div id="home">
                <MintingTitle />
                <RatingData />
                <MintingButton />
                <AnimalData />
                <MintingModal />
            </div>
        );
    };

export default Minting;
