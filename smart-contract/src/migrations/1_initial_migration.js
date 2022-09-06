//const Migrations = artifacts.require("Migrations");
const AnimalNft = artifacts.require("AnimalNft.sol");
const SSAFYToken = artifacts.require("SsafyToken.sol");
const NftSale = artifacts.require("NftSale.sol");
const NftSaleTradeManager = artifacts.require("NftSaleTradeManager.sol");

module.exports = function (deployer) {
  //.deploy({Contract 이름}, {args...생성자 초기화 객체들})
  deployer.deploy(SSAFYToken, "SSAFY Token", "SSF");
  deployer.deploy(AnimalNft, [7, 3], [2,5], ['TEST_IPFS1', 'TEST_IPFS2'], ['TEST_IPFS_IMAGE1', 'TEST_IPFS_IMAGE2'], [220, 20000]);
  deployer.deploy(NftSale, SSAFYToken.address, AnimalNft.address);
  deployer.deploy(NftSaleTradeManager, SSAFYToken.address, AnimalNft.address, NftSale.address, )
};
