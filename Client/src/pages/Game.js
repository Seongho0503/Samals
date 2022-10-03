import React from "react";
import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import bg from "../assets/madagascar.png";
import bg2 from "../assets/bg-05.png";
import Button1 from "../components/Game/Button1";
import Button2 from "../components/Game/Button2";
import { Unity, useUnityContext } from "react-unity-webgl";
import { ProgressBar } from "react-loader-spinner";

import "../styles/Game.css";
const Game = () => {
  const [loadingInProgress, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { unityProvider, sendMessage, isLoaded, addEventListener, removeEventListener, unload } =
    useUnityContext({
      loaderUrl: "Unity/WebGLbuild_new.loader.js",
      dataUrl: "Unity/WebGLbuild_new.data",
      frameworkUrl: "Unity/WebGLbuild_new.framework.js",
      codeUrl: "Unity/WebGLbuild_new.wasm",
    });
    
  useEffect(() => {
    if (document.querySelector(`script[src="web3/index.js"]`)) return;
    const script = document.createElement("script");
    script.src = "web3/index.js";
    script.async = true;
    document.body.appendChild(script);
  });
  

  const handleAuth = useCallback(() => {
    setIsAuth(true);
  }, []);

  useEffect(() => {
    addEventListener("Auth", handleAuth);
    return () => {
      removeEventListener("Auth", handleAuth);
    };
  }, [addEventListener, removeEventListener, handleAuth]);
  useEffect(() => {
    setUserName();
  }, [isAuth]);

  function setUserName() {
    sendMessage("UIManager", "setUserName", "Hello");
  }
  return (
    <div>
      <img width='100%' src={bg} />
      <div class='game-card'>
        <Button1></Button1>
        <Button2></Button2>
      </div>
      {loadingInProgress ? (
        <ProgressBar
          height='80'
          width='80'
          ariaLabel='progress-bar-loading'
          wrapperStyle={{}}
          wrapperClass='progress-bar-wrapper'
          borderColor='#F4442E'
          barColor='#51E5FF'
        />
      ) : (
        <Unity
          unityProvider={unityProvider}
          style={{
            width: "90%",
            alignSelf: "center",
            justifySelf: "center",
            margin: 80,
            borderRadius: 50,
          }}
        ></Unity>
      )}
      <img width='100%' src={bg2} />
    </div>
  );
};

export default Game;
