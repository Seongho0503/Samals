import React, {
    useState,
    useEffect,
} from "react";

import button from "../../assets/animal-button.png";
import modalBack from "../../assets/modal-back.jpg";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../../styles/MintingAnimation.css";

import Typography from "@mui/material/Typography";

const style = {
    position:
        "absolute",
    top: "50%",
    left: "50%",
    transform:
        "translate(-50%, -50%)",
    width: 800,
    height: 500,
    bgcolor:
        "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundImage: `url(${modalBack})`,
    borderRadius: 30,
};

const MintingButton =
    () => {
        const [
            open,
            setOpen,
        ] =
            React.useState(
                false
            );
        const handleOpen =
            () =>
                setOpen(
                    true
                );
        const handleClose =
            () =>
                setOpen(
                    false
                );

        return (
            <div>
                {/* <img id='hero-background' src={list[0].src}/> */}
                <Button
                    onClick={
                        handleOpen
                    }
                >
                    <img
                        width="400px"
                        src={
                            button
                        }
                    />
                </Button>
                <Modal
                    open={
                        open
                    }
                    onClose={
                        handleClose
                    }
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box
                        sx={
                            style
                        }
                    >
                        <div class="egg-animation">
                            <em></em>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    };

export default MintingButton;
