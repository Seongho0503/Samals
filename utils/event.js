import { aceTokenContract, animalNftContract, mascortNftContract, nftSaleManagerContract } from "./web3Config";
import { animalNftContractAddress } from "./web3Config";

//메타마스크 로그인
//const web3 = new Web3(window.ethereum);

export function MetaMaskLogin() {
    
    //메타마스크 설치확인
    if (typeof web3 !== 'undefined') {
        console.log('Ethereum successfully detected!')
        
        //계정연결
        window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(accounts => {
          console.log("연결된 계정", accounts);
        });
      
    //설치가 안되었다면 에러 발생
      } else {
        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error('Please install MetaMask!');
      }

};

export var totalSupply = async () => {
    const res = await aceTokenContract.methods
    .totalSupply().call();

    return res;
}

// 민트 권한 허가 : 회원가입시 AnimalNft에 대한 거래 승인
export var approveERC20ForMint = async () => {
  const res = await aceTokenContract.methods
  .approve(animalNftContractAddress, 1000000000)
  .send({from : "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6"}); //유저 지갑 주소를 넣어줄 것

  return res;
}

// 판매 결제 허가 : 구매자가 NftSale에 대한 구매 승인
export var approveERC20ForSale = async (saleNftContractAddress) => {
  const res = await aceTokenContract.methods
  .approve(saleNftContractAddress, 1000000000)
  .send({from : "0xCee5c9115F38353421e63eCA7F1e1Cf6873226A6"}); //유저 지갑 주소를 넣어줄 것
 
  console.log(res);
}


// 판매 양도 허가 : 판매글을 올린 사람은 글이 생성된 이후 곧바로 NFT 거래 허가
export var approveERC721ForSale = async (saleNftContractAddress, animalId) => {
  const res = await animalNftContract.methods
  .approve(saleNftContractAddress, animalId)
  .send({from : "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6"}); //유저 지갑 주소를 넣어줄 것
 
  console.log(res);
}


// 기부(민트-유료) 진행
export var donate = async () => {
  const res = await animalNftContract.methods
  .donate(Date.now())
  .send({from : "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6"}); //유저 지갑 주소를 넣어줄 것
 
  return res;
}

// 기부(민트-유료) 총 개수 조회
export var getTotalMint = async () => {
  const res = await animalNftContract.methods
  ._getLimitedNumber()
  .call();
 
  return res;
}

// 증정(민트-무료) 진행
export var createMascortNft = async () => {
  const res = await mascortNftContract.methods
  ._createMascortNft(Date.now())
  .send({from : "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6"}); //유저 지갑 주소를 넣어줄 것
 
  return res;
}

// 증정(민트-무료) 확인
export var isOwner = async () => {
  const res = await mascortNftContract.methods
  ._isOwner("0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6") //유저 지갑 주소를 넣어줄 것
  .call(); //유저 지갑 주소를 넣어줄 것
 
  return res;
}

// 판매글 등록 및 권한 허가 : 유효성 검사할 수 있으면 해줄 것(모두 int)
// 일단 오류 : NftSale address 리턴값이 안 온다.
export var createSale = async (animalId, price, startedAt, endedAt) => {
  const res = await nftSaleManagerContract.methods
  .createSale(animalId, price, startedAt, endedAt) //유저 지갑 주소를 넣어줄 것
  .send({from : "0xCee5c9115F38353421e63eCA7F1e1Cf6873226A6"}).then(console.log); //유저 지갑 주소를 넣어줄 것
  //console.log(res);
}