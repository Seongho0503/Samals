// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./AnimalNftSale.sol";
import "./AnimalNftDonate.sol";

/*
* P2P 거래 정보를 관리하는 Factory Contract
* 
* @author 
* @version 0.1
* @see None
*/

contract AnimalNftSaleFactory is Ownable {
    
    // 거래 등록 관리
    struct Sale {
        address saleAddress;
        address saleOwner;
    }
    
    struct Donate {
        address donateAddress;
        address donator;
    }

    using Counters for Counters.Counter;

    event Withdrawal(address indexed to, uint256 amount);
    event SaleCreated(uint256 indexed saleId, address saleAddr, uint256 ticketId);
    
    // 거래 생성마다 1씩 증가하는 ID
    Counters.Counter private _saleIds;
    // 민트 생성마다 1씩 증가하는 ID
    Counters.Counter private _donateIds;

    // //민트 가격
    // uint constant MINT_PRICE = 300;

    //각 계약에 대한 소유권 명시
    mapping(uint256 => Sale) private _sales;

    // 특정 동물에 따른 거래 ID 목록 => To Much인가? => Id값만 기록되기 때문에 성능에 비해 gas 효율 보통
    mapping(uint256 => uint256[]) private _salesByAnimal;

    // 특정 지갑이 생성한 거래 ID 목록 => To Much인가? => Id값만 기록되기 때문에 성능에 비해 gas 효율 보통
    mapping(address => uint256[]) private _saleIdsByWallet;

    // 특정 동물에 따른 기부 ID 목록
    mapping(uint256 => Donate) private _donates;

    // 특정 지갑에 따른 기부 ID 목록
    mapping(address => uint256[]) private _donateIdsByWallet;

    // 배포 된 ERC-20 토큰 계약 주소
    address private _currencyContractAddress;
    // ERC20 객체화
    IERC20 private _currencyContract;

    // 배포 된 AnimalNftSale 계약 주소
    address private _animalNftSaleContractAddress; 
    AnimalNftSale private _animalNftSaleContract;
     
    // 배포 된 AnimalNft(ERC-721) 토큰 계약 주소
    address private _animalNftContractAddress;
    // PRIVATE 서버의 AnimalNft(ERC-721) 객체화
    AnimalNft private _animalNftContract;    
 
    
    /*
    * constructor
    * P2P 거래 정보 관리 객체를 생성
    * 
    * @ param address currencyContractAddress ERC-20 토큰 계약 주소
    * @ param address saleContractAddress AnimalNft(ERC-721) 토큰 계약 주소
    * @ return None
    * @ exception None
    */
    constructor(
        address currencyContractAddress,
        address animalNftSaleContractAddress,
        address animalNftContractAddress
    ) {
        _currencyContractAddress = currencyContractAddress;
        _animalNftSaleContractAddress = animalNftSaleContractAddress;
        _animalNftContractAddress = animalNftContractAddress;
    }

    /*
    * create
    * 새로운 P2P 거래 정보를 가진 Contract를 생성
    * @ param uint256 animalId 동물 ID
    * @ param address seller 판매자 지갑 주소
    * @ param uint256 price 판매 가격
    * @ param uint256 startedAt 판매 시작 시간
    * @ param uint256 endedAt 판매 종료 시간
    * @ return None
    */
    function create(
            uint256 animalId,
            uint256 price,
            uint256 startedAt,
            uint256 endedAt
        ) public {

        /* 유효성 검사
            1. 글 등록자가 동물 Id를 실제로 소유하는지 확인
            2. 판매 가격은 0을 넘어야 함 
        */
        require(msg.sender == AnimalNft(_animalNftContractAddress)._getOwner(animalId), "Animal NFT is not owned by Register");
        require(price > 0, "You must set price over 0");
        
        //거래 번호 증가
        _saleIds.increment();
        uint256 newAnimalNftSaleId = _saleIds.current();

        //거래 객체 생성
        AnimalNftSale newAnimalNftSale = new AnimalNftSale(_currencyContractAddress, _animalNftContractAddress, animalId, msg.sender, price, startedAt, endedAt);

        //ERC721 계약에 의해 animalId는 현 계약서로만 거래가 가능하다.
        AnimalNft(_animalNftContractAddress).approve(address(newAnimalNftSale), animalId);

        /* Sale Struct에 값 저장
            1. 계약서 주소
            2. 작성자
        */
        Sale memory newSale = Sale(address(newAnimalNftSale), msg.sender);
        _sales[_saleIds.current()] = newSale; 
        _salesByAnimal[animalId].push(newAnimalNftSaleId);
        _saleIdsByWallet[msg.sender].push(newAnimalNftSaleId);

        //emit SaleCreated(newAnimalNftSaleId, address(newAnimalNftSale), animalId);
    }

    /*
    * donate
    * Donate를 위한 메서드
    * @ param none
    * @ return animalId
    */
    function donate(
            uint256 mintedAt
    ) public returns (uint256){

        //거래 객체 생성
        AnimalNftDonate newAnimalNftDonate = new AnimalNftDonate(_currencyContractAddress, _animalNftContractAddress, msg.sender, mintedAt);
        uint256 newAnimalId = newAnimalNftDonate.donate();
        /* Donate Struct에 값 저장
            1. 계약서 주소
            2. 작성자
        */

        // 완료되면 기부 번호 증가
        _donateIds.increment();
        uint256 newAnimalNftDonateId = _donateIds.current();

        Donate memory newDonate = Donate(address(newAnimalNftDonate), msg.sender);
        _donates[_donateIds.current()] = newDonate; 
        _donateIdsByWallet[msg.sender].push(newAnimalNftDonateId);

        //emit DonateCreated(newAnimalNftDonateId, address(newAnimalNftDonate), newAnimalNftDonateId);

        return newAnimalId;
    }

    /*
    * withdrawRoyalty
    * 현재까지 모인 거래 수수료를 관리자에게 송금
    *
    * @ param None
    * @ return None
    * @ exception msg.sender(요청자)가 관리자 주소이어야 함
    */
    function withdrawRoyalty() public payable onlyOwner {
        uint256 contractBalance = IERC20(_currencyContractAddress).balanceOf(address(this));
        IERC20(_currencyContractAddress).transfer(owner(), contractBalance);
        emit Withdrawal(owner(), contractBalance);
    }

    /*
    * ownerOf
    * 해당 거래의 판매자를 반환
    *
    * @ param uint256 saleId 거래 ID
    * @ return address 거래 소유 Wallet address
    * @ exception None
    */
    function ownerOf(uint256 saleId) public view returns(address) {
        return _sales[saleId].saleOwner;
    }

    /*
    * getSale
    * 해당 거래의 Contract 주소를 반환
    *
    * @ param uint256 saleId 거래 ID
    * @ return address 거래 Contract address
    * @ exception None
    */
    function getSaleAddress(uint256 saleId) public view returns(address) {
        return _sales[saleId].saleAddress;
    }

    /*
    * getCount
    * 현재까지 등록된 모든 거래의 개수를 반환
    *
    * @ param None
    * @ return uint256 등록된 거래 개수
    * @ exception None
    */
    function getCount() public view returns (uint256) {
        return _saleIds.current();
    }

    /*
    * getSaleOfAnimal
    * 해당 동물 ID로 지금까지의 saleId를 반환
    * @ param uint256 animalId 동물 ID
    * @ return uint256[] 거래 ID 목록
    * @ exception None
    */
    function getSaleOfAnimal(uint256 animalId) public view returns(uint256[] memory) {
        return _salesByAnimal[animalId];
    }

    /*
    * getSaleIdsByWallet
    * 해당 지갑의 모든 거래 목록을 반환
    * @ param address walletAddr 지갑 주소
    * @ return uint256[] 거래 ID 목록
    * @ exception None
    */
    function getSaleIdsByWallet(address walletAddr) public view returns(uint256[] memory) {
        return _saleIdsByWallet[walletAddr];
    }

}