//const Migrations = artifacts.require("Migrations");
const AnimalNFT = artifacts.require("AnimalNFT.sol");
const SSAFYToken = artifacts.require("SsafyToken.sol");

module.exports = function (deployer) {
  //.deploy({Contract 이름}, {args...생성자 초기화 객체들})
  deployer.deploy(SSAFYToken, "SSAFY Token", "SSF");
  deployer.deploy(AnimalNFT, [7, 3], [2,5], ['TEST_IPFS1', 'TEST_IPFS2'], ['TEST_IPFS_IMAGE1', 'TEST_IPFS_IMAGE2'], [220, 20000]);
};
