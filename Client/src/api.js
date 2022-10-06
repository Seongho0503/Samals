import { width } from "@mui/system";
import axios from "axios";
import { env } from "process";
import loading2 from "./assets/loading02.gif";
import loading3 from "./assets/loading03.gif";
import loading4 from "./assets/loading04.gif";
import arrow from "./assets/arrow.png";
const BASE_URL = "http://j7d103.p.ssafy.io:8080/api";
//const BASE_URL = "http://j7d103.p.ssafy.io:8080/api/ipfs/list";

// 상점 :  동물 설명
export async function getDescription(animalSpecies) {
  try {
    // const jwt = localStorage.getItem("jwt");
    //${BASE_URL}
    const response = await axios({
      method: "GET",
      url: `/api/shop/${animalSpecies}`,
      //   headers: { Authorization: "Bearer " + jwt },
    });
    // console.log(response);
    return response;
  } catch {
    return "";
  }
}

export async function getAnimalData() {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/animal/list`,
      // headers :
    });

    return response;
  } catch {
    return "";
  }
}

// 거래소 거래 nft 리스트
export async function getAnimalList(myAddress) {
  let inputUrl = "";
  if (myAddress === "" || myAddress === undefined) {
    inputUrl = "/api/sale/list";
  } else {
    inputUrl = `/api/sale/list?address=${myAddress}`;
  }
  try {
    const response = await axios({
      method: "GET",
      url: inputUrl,
    });
    return response;
  } catch {
    return "";
  }
}

// 기부 총액 조회
export async function getTotalDonate() {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/nft/total-donate`,
    });

    return response;
  } catch {
    return "";
  }
}

// 동물 등급으로 조회 (필터)
export async function getAnimalClass(animalClass) {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/shop/${animalClass}`,
    });
    return response;
  } catch {
    return "";
  }
}

// nft 정보 조회 (tokenid로 조회)
export async function getNftInfo(tokenId) {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/nft/${tokenId}`,
    });
    return response;
  } catch {
    return "";
  }
}

// 동물 리스트 조회
export async function getSomeList(animalSpecies) {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/sale/list/${animalSpecies}`,
    });
    return response;
  } catch {
    return "";
  }
}

export const addressTransferShort = (address) => {
  if (typeof address !== "string") return false;
  return address.slice(0, 4) + "..." + address.slice(12, 16);
};

export const LoadingScreen = () => {
  return (
    <div>
      <div
        style={{
          zIndex: "10",
          position: "fixed",
          width: "100%",
          height: "100%",
          opacity: "0.5",
          backgroundColor: "black",
        }}
      ></div>
      <img
        src={arrow}
        style={{
          zIndex: "999",
          position: "fixed",
          width: "50px",
          top: "5%",
          left: "80%",
          transform: "translate(-50%, 0)",
        }}
        alt='arrow'
      />
      <img
        src={loading2}
        alt='loadingBird'
        style={{
          zIndex: "11",
          width: "400px",
          top: "30%",
          left: "50%",

          position: "fixed",
          transform: "translate(-50%, 0)",
        }}
      />
    </div>
    // 빈투명 검은 화면
    // 로딩 이미지
  );
};

export const MetaLoadingScreen = ({ text }) => {
  console.log(text);
  return (
    <div>
      <div
        style={{
          zIndex: "10",
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          opacity: "0.5",
          backgroundColor: "black",
        }}
      ></div>
      <p
        style={{
          fontFamily: "김포평화",
          border: "3px",
          lineHeight: "1.4",
          padding: "30px",
          fontSize: "40px",
          color: "#FFFFFF",
          marginTop: "20px",
          zIndex: "11",
          position: "fixed",
          right: "15%",
          top: "6%",
        }}
      >
        MetaMask
        <br />
        {text}
      </p>
      <img
        src={arrow}
        style={{
          zIndex: "999",
          position: "fixed",
          width: "100px",
          right: "120px",
          top: "25px",
          transform: "translate(-50%, 0)",
        }}
        alt='arrow'
      />
      <img
        src={loading4}
        alt='loadingBird'
        style={{
          zIndex: "11",
          width: "400px",
          top: "30%",
          left: "50%",
          position: "fixed",
          transform: "translate(-50%, 0)",
        }}
      />
    </div>
    // 빈투명 검은 화면
    // 로딩 이미지
  );
};

export const MadaLoadingScreen = ({ text }) => {
  console.log(text);
  return (
    <div>
      <div
        style={{
          zIndex: "10",
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          opacity: "0.5",
          backgroundColor: "black",
        }}
      ></div>
      <p
        style={{
          fontFamily: "김포평화",
          border: "3px",
          lineHeight: "1.4",
          padding: "30px",
          fontSize: "40px",
          color: "#FFFFFF",
          marginTop: "20px",
          zIndex: "11",
          position: "fixed",
          left: "50%",
          transform: "translate(-50%, 0)",
          top: "60%",
        }}
      >
        {text}%
      </p>
      <img
        src={loading2}
        alt='loadingBird'
        style={{
          zIndex: "11",
          width: "400px",
          top: "30%",
          left: "50%",
          position: "fixed",
          transform: "translate(-50%, 0)",
        }}
      />
    </div>
    // 빈투명 검은 화면
    // 로딩 이미지
  );
};

// 오름차순
export async function getAsceList() {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/sale/list/asc`,
    });
    return response;
  } catch {
    return "";
  }
}

// 내림차순
export async function getDescList() {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/sale/list/desc`,
    });
    return response;
  } catch {
    return "";
  }
}
