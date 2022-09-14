// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
//0x9dE8aCDbFe898E579F8B79D9141F5e595ca09E99
//openzepplin 라이브러리를 활용해 ERC20 표준 계약서와 소유권 증명 형식을 불러옴
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//AceToken을 ERC20 표준을 상속해 구현
contract AceToken is ERC20, Ownable {

    //ERC20 생성자 그대로 사용: name = AceToken, symbol = ACE
    constructor(string memory name, string memory symbol, address[] memory wallets) ERC20(name,symbol){
        // mint 1000 token
        for(uint256 i = 0; i < wallets.length; i++){
            _mint(wallets[i], 100000*10**uint(decimals()));
        }
    }
}