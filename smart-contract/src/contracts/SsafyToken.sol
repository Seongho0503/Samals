// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//openzepplin 라이브러리를 활용해 ERC20 표준 계약서와 소유권 증명 형식을 불러옴
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//SsafyToken을 ERC20 표준을 상속해 구현
contract SsafyToken is ERC20, Ownable{

    //ERC20 생성자 그대로 사용: name = SsafyToken, symbol = SSF
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}
    
    //mint 이행
    function mint(uint256 amount) public onlyOwner{
        _mint(_msgSender(), amount);
    }
    
    function forceToTransfer(address from, address to, uint256 amount) public onlyOwner{
        _transfer(from, to, amount);
    }
}