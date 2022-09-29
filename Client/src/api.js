import axios from "axios";

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
export async function getAnimalList() {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/sale/list`,
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
      // headers :
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
