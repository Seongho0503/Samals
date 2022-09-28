import react from "react";
import { useEffect } from "react";
import Header from "../components/Header";
import { Unity, useUnityContext } from "react-unity-webgl";

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
      <Unity
        unityProvider={unityProvider}
        style={{
          width: 1920,
          height: 1080,
          alignSelf: "center",
          justifySelf: "center",
          margin: 100,
          borderRadius: 50,
        }}
      />
      ;
    </div>
  );
};

export default Game;
