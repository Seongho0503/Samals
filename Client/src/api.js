import axios from "axios";

const BASE_URL = "http://j7d103.p.ssafy.io:8080/api";
//const BASE_URL = "http://j7d103.p.ssafy.io:8080/api/ipfs/list";

export async function getDescription() {
  try {
    // const jwt = localStorage.getItem("jwt");
    //${BASE_URL}
    const response = await axios({
      method: "GET",
      url: `/api/shop/{animalSpecies}`,
      //   headers: { Authorization: "Bearer " + jwt },
    });

    console.log(response);
    return response;
  } catch {
    return "";
  }
}

// 동물 리스트 조회
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
