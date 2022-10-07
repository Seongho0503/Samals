import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import buttonImg from "../../assets/animal-button.png";
import modalBack from "../../assets/modal-back.jpg";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../../styles/MintingAnimation.css";

import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundImage: `url(${modalBack})`,
  borderRadius: 30,
};

const MintingButton = () => {
  const [open, setOpen] = React.useState(false);

  //"기부하고, NFT받기" 버튼 클릭 시
  const handleOpen = () => {
    let sessionAddress = JSON.parse(sessionStorage.getItem("persist:root"));

    if (sessionAddress === undefined || JSON.parse(sessionAddress.userInfo).address === "") {
      alert("지갑을 연결해주세요.");
      return;
    }

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <img id='hero-background' src={list[0].src}/> */}
      <Button
        onClick={() => {
          handleOpen();
        }}
      >
        <img width='400px' src={buttonImg} alt='기부하고, NFT받기' />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='egg-animation'>
            <Link to='/mintcard'>
              <div className='egg-animation'>
                <em></em>
              </div>
            </Link>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MintingButton;
