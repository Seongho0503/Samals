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

export async function getAnimalList() {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/sale/1/list`,
      // headers :
    });

    return response;
  } catch {
    return "";
  }
}
