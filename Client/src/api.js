import axios from "axios";

const BASE_URL = "http://j7d103.p.ssafy.io/api";
//const BASE_URL = "http://j7d103.p.ssafy.io:8080/api/ipfs/list";

export async function getDescription() {
  try {
    // const jwt = localStorage.getItem("jwt");

    const response = await axios({
      method: "GET",
      url: `${BASE_URL}/shop/{animalSpecies}`,
      //   headers: { Authorization: "Bearer " + jwt },
    });

    console.log(response.data);
    return response;
  } catch {
    return "";
  }
}
