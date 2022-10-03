import React from "react";
import { useEffect } from "react";
import Header from "../../components/Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import bg from "../../assets/donate.png";
import buttonImg from "../../assets/game-button02.png";
import Modal from "@mui/material/Modal";
import modalBack from "../../assets/game-background.jpg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Unity, useUnityContext } from "react-unity-webgl";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  backgroundImage: `url(${modalBack})`,
  borderRadius: 15,
};

const Button2 = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen}>
        <img width='400px' src={buttonImg} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <h1>이용방법 컨텐츠 작성</h1>
        </Box>
      </Modal>
    </div>
  );
};

export default Button2;
