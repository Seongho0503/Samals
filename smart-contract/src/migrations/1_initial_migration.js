//const Migrations = artifacts.require("Migrations");
const AnimalNft = artifacts.require("AnimalNft.sol");
const SSAFYToken = artifacts.require("SsafyToken.sol");
const AnimalNftSale = artifacts.require("AnimalNftSale.sol");
const AnimalNftSaleFactory = artifacts.require("AnimalNftSaleFactory.sol");

module.exports = function (deployer) {
  //.deploy({Contract 이름}, {args...생성자 초기화 객체들})
  deployer.deploy(SSAFYToken, "SSAFY Token", "SSF");
  deployer.deploy(AnimalNFT, [7, 3], [2,5], ['TEST_IPFS1', 'TEST_IPFS2'], ['TEST_IPFS_IMAGE1', 'TEST_IPFS_IMAGE2'], [220, 20000]);
  deployer.deploy(AnimalNftSale, SSAFYToken.address, AnimalNFT.address);
  deployer.deploy(AnimalNftSaleFactory, SSAFYToken.address, AnimalNftSale.address, AnimalNFT.address)
};
