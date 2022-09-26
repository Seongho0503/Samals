// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
//0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8
//NAME : ALLCHUNGE
//SYMBOL : ACE
// WALLETS[] : ["0xCee5c9115F38353421e63eCA7F1e1Cf6873226A6", "0x172aB7431BdBdE9E485b477bF0f434Ab7B219Bb6"]
//openzepplin 라이브러리를 활용해 ERC20 표준 계약서와 소유권 증명 형식을 불러옴
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//AceToken을 ERC20 표준을 상속해 구현
contract AceToken is ERC20, Ownable {

    mapping(address => bool) first_supply;
    /*
    * ERC20 기반 토큰
    * @param string name 토큰명 : AceToken
    * @param string symbol 토큰심볼 : ACE
    * @param address[] wallets 토큰을 배분할 지갑 주소 목록
    */
    constructor(string memory name, string memory symbol, address[] memory wallets) ERC20(name,symbol){
        // mint 1000 token
        for(uint256 i = 0; i < wallets.length; i++){
            _mint(wallets[i], 1000000);
        }
    }


    /* 
        첫 가입자에 한 해 체험을 위한 토큰을 부여하는 서비스
        mapping 값을 통해 확인 후 토큰을 배급
    */
    function firstSupply()
    public returns(bool){
        if(first_supply[msg.sender] == false){
            _mint(msg.sender, 1000);
            return true;
        }

        return false;
    }
}