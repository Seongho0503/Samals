//const Migrations = artifacts.require("Migrations");
const AnimalNft = artifacts.require("AnimalNft.sol");
const MascortNft = artifacts.require("MascortNft.sol");
const SSAFYToken = artifacts.require("SsafyToken.sol");
const NftTradeManager = artifacts.require("NftTradeManager.sol");

module.exports = function (deployer) {
  //.deploy({Contract 이름}, {args...생성자 초기화 객체들})
  deployer.deploy(SSAFYToken, "SSAFY Token", "SSF");
  deployer.deploy(AnimalNft, [7, 3], [2,5], ['TEST_IPFS1', 'TEST_IPFS2'], [220, 20000]);
  deployer.deploy(MascortNft, "tokokukan_uri_test", "tokokukan", "NT");
  deployer.deploy(NftTradeManager, SSAFYToken.address, AnimalNft.address);
};
