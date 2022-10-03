import React from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import bg from "../assets/madagascar.png";
import bg2 from "../assets/bg-05.png";
import Button1 from "../components/Game/Button1";
import Button2 from "../components/Game/Button2";
import { Unity, useUnityContext } from "react-unity-webgl";
import "../styles/Game.css";
const Game = () => {
  useEffect(() => {
    if (document.querySelector(`script[src="web3/index.js"]`)) return;
    const script = document.createElement("script");
    script.src = "web3/index.js";
    script.async = true;
    document.body.appendChild(script);
  });
  const { unityProvider } = useUnityContext({
    loaderUrl: "Unity/WebGLbuild_new.loader.js",
    dataUrl: "Unity/WebGLbuild_new.data",
    frameworkUrl: "Unity/WebGLbuild_new.framework.js",
    codeUrl: "Unity/WebGLbuild_new.wasm",
  });

  return (
    <div>
      <img width='100%' src={bg} />
      <div class='game-card'>
        <Button1></Button1>
        <Button2></Button2>
      </div>
      <Unity
        unityProvider={unityProvider}
        style={{
          width: "90%",
          alignSelf: "center",
          justifySelf: "center",
          margin: 80,
          borderRadius: 50,
        }}
      />
      <img width='100%' src={bg2} />
    </div>
  );
};

export default Game;
