import {
  aceTokenContract,
  animalNftContract,
  mascortNftContract,
  nftSaleManagerContract,
} from "./web3Config";
import { web3, animalNftContractAddress, createNftSaleContract } from "./web3Config";

// 메타마스크 로그인
export function MetaMaskLogin() {
  // 메타마스크 설치확인
  if (web3.currentProvider !== null) {
    // 계정연결
    window.ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
      console.log("연결된 계정", accounts);
    });

    // 설치가 안되었다면 에러 발생
  } else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    // console.error("Please install MetaMask!");
  }
}

// 총 민트수 반환
export var totalSupply = async () => {
  const res = await aceTokenContract.methods.totalSupply().call();

  return res;
};

//첫 발금액
export var firstSupply = async () => {
  console.log("current address: ", window.ethereum.selectedAddress);
  const res = await aceTokenContract.methods
    .firstSupply()
    .send({ from: window.ethereum.selectedAddress });

  return res;
};

//첫 발금액
export var balanceOf = async () => {
  const res = await aceTokenContract.methods.balanceOf(window.ethereum.selectedAddress).call();

  return res;
};

// 민트 권한 허가 : 회원가입시 AnimalNft에 대한 거래 승인
export var approveERC20ForMint = async () => {
  const res = await aceTokenContract.methods
    .approve(animalNftContractAddress, 1000000000)
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것

  return res;
};

// 판매 결제 허가 : 구매자가 NftSale에 대한 구매 승인
export var approveERC20ForSale = async (saleNftContractAddress) => {
  const res = await aceTokenContract.methods
    .approve(saleNftContractAddress, 1000000000)
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것

  console.log(res);
};

// 판매 양도 허가 : 판매글을 올린 사람은 글이 생성된 이후 곧바로 NFT 거래 허가
export var approveERC721ForSale = async (saleNftContractAddress, animalId) => {
  const res = await animalNftContract.methods
    .approve(saleNftContractAddress, animalId)
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것

  console.log(res);
};

// 기부(민트-유료) 진행
export var donate = async (nftSeq) => {
  console.log("Date.now(): ", Date.now(), ", nftSeq: ", nftSeq);
  console.log("window.ethereum.selectedAddress: ", window.ethereum.selectedAddress);
  const res = await animalNftContract.methods
    .donate(Date.now(), nftSeq)
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것

  return res;
};

// 기부(민트-유료) 현재까지 발급된 민트 개수 조회
export var getTotalMint = async () => {
  const res = await animalNftContract.methods._getTotalMint().call();

  return res;
};

// 기부(민트-유료) 최초 발행한 뽑기 NFT 개수 조회
export var getLimitedNumber = async () => {
  const res = await animalNftContract.methods._getLimitedNumber().call();

  return res;
};

// 증정(민트-무료) 진행
export var createMascortNft = async () => {
  const res = await mascortNftContract.methods
    ._createMascortNft(Date.now())
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것

  return res;
};

// 증정(민트-무료) 확인
export var isOwner = async () => {
  const res = await mascortNftContract.methods
    ._isOwner(window.ethereum.selectedAddress) //유저 지갑 주소를 넣어줄 것
    .call(); //유저 지갑 주소를 넣어줄 것

  return res;
};
export var createSale = async (animalId, price, startedAt, endedAt) => {
  const _createSale = await nftSaleManagerContract.methods
    .createSale(animalId, price, startedAt, endedAt)
    .send({ from: window.ethereum.selectedAddress })
    .then("1", console.log); //유저 지갑 주소를 넣어줄 것
  console.log("판매 contract 주소", _createSale.events.SaleCreated.returnValues.newNftSaleAddress);
  return _createSale.events.SaleCreated.returnValues.newNftSaleAddress;
};

export var animalSaleApprove = async (newNftSaleAddress, animalId) => {
  const res1 = await animalNftContract.methods
    .approve(newNftSaleAddress, animalId)
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것
  console.log("1 : NFT 양도 허가", res1);
  return res1;
};
export var recordSale = async (animalId, newNftSaleAddress) => {
  const res2 = await nftSaleManagerContract.methods
    .recordSale(animalId, newNftSaleAddress)
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것
  console.log("2 : 게시글 등록", res2);
  return res2;
};

// 판매글 등록 및 권한 허가 : 유효성 검사할 수 있으면 해줄 것(모두 int)
export var createSaleAll = async (animalId, price, startedAt, endedAt) => {
  // 1 : 글을 등록하고 글의 주소를 받아온다.
  const _createSale = await nftSaleManagerContract.methods
    .createSale(animalId, price, startedAt, endedAt)
    .send({ from: window.ethereum.selectedAddress })
    .then("1", console.log); //유저 지갑 주소를 넣어줄 것
  console.log("판매 contract 주소", _createSale.events.SaleCreated.returnValues.newNftSaleAddress);

  // 2 : 글에 대한 NFT 양도 허가를 진행한다.
  const res1 = await animalNftContract.methods
    .approve(_createSale.events.SaleCreated.returnValues.newNftSaleAddress, animalId)
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것
  console.log("1 : NFT 양도 허가", res1);

  // 게시글 솔리디티 등록
  const res2 = await nftSaleManagerContract.methods
    .recordSale(animalId, _createSale.events.SaleCreated.returnValues.newNftSaleAddress)
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것
  console.log("2 : 게시글 등록", res2);

  return _createSale.events.SaleCreated.returnValues.newNftSaleAddress;
};

// 판매글 컨트랙트 주소를 통해 NFT 구매
export var salePurchase = async (nftSaleAddress) => {
  // 1 : ERC20 토큰 거래에 대한 양도 허가를 진행한다.
  await approveERC20ForSale(nftSaleAddress);
  // 2.
  const nftSaleContract = createNftSaleContract(nftSaleAddress);
  // 게시글 솔리디티 등록
  const res = await nftSaleContract.methods
    .purchase()
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것
  console.log(res);
  return res;
};

// 무료 증정 NFT에 대한 소유권 부여
export var getMascortNft = async () => {
  const res = await mascortNftContract.methods
    .createMascortNft()
    .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것
  console.log(res);
};

// 무료 증정 NFT 소유권 확인
export var isOwnerOfMascortNft = async () => {
  const res = await mascortNftContract.methods._isOwner(window.ethereum.selectedAddress).call(); //유저 지갑 주소를 넣어줄 것
  console.log(res);
};

export let buy = async (species, tmpAnimalNumber, donatedAt) => {
  const res = await animalNftContract.methods
    .buy(species, tmpAnimalNumber, donatedAt)
    .send({ from: window.ethereum.selectedAddress });

  return res;
};
