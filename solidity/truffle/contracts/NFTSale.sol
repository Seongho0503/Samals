pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AnimalNFT.sol";
import "./SsafyToken.sol";
/*
* 거래내역을 저장하는 Contracts
* 
*
*/

contract NFTSale {
    using Counters for Counters.Counter;

    event TransactionCreated(uint256 indexed transactionId, address transactionAddress);
    
    //거래내역 보관
    struct TransactionHistory {
        address from; //판매자
        address to; //구매자
        uint256 price; //가격(단위 wei 또는 SSF)
        uint256 date; //UNIX TIME STAMP 기반 시간 기록
    }

    // 거래 ID
    Counters.Counter private _transactionId;
    
    //거래 기록(struct): 거래 일시/가격을 기록하기 위해 객체로 내부에 데이터 저장
    mapping(uint256 => TransactionHistory[]) private _transactionHistories;
    
    //PRIVATE 서버의 Contract - ERC20
    IERC20 private _originalContract;

    // PRIVATE 서버의 ERC-20 토큰 계약 주소
    address private _originalContractAddress;
    // PRIVATE 서버의 MyTicket(ERC-721) 토큰 계약 주소
    address private _animalNFTContractAddress;    
    
    uint256 private constant MINIMUM = 5;
    /*
    * constructor
    * 거래내역 관리 객체를 생성
    * @dev address currencyContractAddress ERC-20 토큰 계약 주소
    * @dev address ticketContractAddress MyTicket(ERC-721) 토큰 계약 주소
    */
    constructor(address originalContractAddress, address animalNFTContractAddress) {
        _originalContractAddress = originalContractAddress;
        _animalNFTContractAddress = animalNFTContractAddress;
        _originalContract = IERC20(originalContractAddress);
    }

    /*
    * transfer
    * 거래 메서드
    * from, to, amount 값에 따라 분기
    */
    function _transfer(
            address from,
            address to,
            uint256 amount,
            uint256 tokenId
        ) public {
        
        //유효성 검사
        require(_originalContract.balanceOf(msg.sender) > 0 && amount > 0, "amount should be more than 0");
        require(from != address(0) || to != address(0), "Both address cannot be address(0)");

        //받는 사람만 존재하는 경우
        if(from == address(0) && to != address(0) && to == msg.sender)
        {   
            require(_originalContract.balanceOf(msg.sender) > MINIMUM, "LESS THAN MINIMUM AMOUNT");
            _originalContract.transferFrom(address(this), msg.sender, MINIMUM); //지갑에서 토큰 거래
            AnimalNFT(_animalNFTContractAddress)._createAnimalNFT(); //내부에서 msg.sender로 등록
            _transactionId.increment();
            _transactionHistories.push(new TransactionHistory(_originalContractAddress, to, MINIMUM, now)); //거래 기록 등록
        }
        else //둘 다 존재하는 경우
        {  
            require(_originalContract.balanceOf(to) > amount, "LESS THAN MINIMUM AMOUNT");
            _originalContract.transferFrom(from, to, amount); //지갑에서 토큰 거래
            AnimalNFT(_animalNFTContractAddress)._setOwner(tokenId, to);
            _transactionHistories[tokenId].push(new TransactionHistory(from, to, MINIMUM, now)); //거래 기록 등록
        }

        
        }
        
}