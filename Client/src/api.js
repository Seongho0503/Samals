import axios from "axios";

const BASE_URL = "http://j7d103.p.ssafy.io:8080/api";
//const BASE_URL = "http://j7d103.p.ssafy.io:8080/api/ipfs/list";

<<<<<<< HEAD
// 상점 :  동물 설명
export async function getDescription(animalSpecies) {
=======
export async function getDescription() {
>>>>>>> 7d8be36333d8a6d86c6fbdf8e868ad1e288afcec
  try {
    // const jwt = localStorage.getItem("jwt");
    //${BASE_URL}
    const response = await axios({
      method: "GET",
<<<<<<< HEAD
      url: `/api/shop/${animalSpecies}`,
      //   headers: { Authorization: "Bearer " + jwt },
    });
    // console.log(response);
=======
      url: `/api/shop/{animalSpecies}`,
      //   headers: { Authorization: "Bearer " + jwt },
    });

    console.log(response);
>>>>>>> 7d8be36333d8a6d86c6fbdf8e868ad1e288afcec
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

<<<<<<< HEAD
export async function getAnimalList() {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/sale/1/list`,
=======
// 기부 총액 조회
export async function getTotalDonate() {
  try {
    const response = await axios({
      method: "GET",
      url: `/api/nft/total-donate`,
>>>>>>> 7d8be36333d8a6d86c6fbdf8e868ad1e288afcec
      // headers :
    });

    return response;
  } catch {
    return "";
  }
}
