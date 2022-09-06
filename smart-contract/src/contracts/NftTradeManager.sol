// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./NftSale.sol";
import "./NftDonate.sol";
import "./NftFree.sol";
import "./AnimalNft.sol";

/*
* P2P 거래 정보를 관리하는 Factory Contract
* 
* @author 
* @version 0.1
* @see None
*/

contract NftTradeManager is Ownable {
    
    // 거래 등록 관리
    struct Sale {
        address saleAddress;
        address saleOwner;
    }
    
    // 기부 등록 관리
    struct Donate {
        address donateAddress;
        address donator;
    }

    // 증정 내역 관리
    struct Free {
        address freeAddress;
        address minter;
    }

    using Counters for Counters.Counter;

    event SaleCreated(uint256 indexed saleId, address saleAddr, uint256 ticketId);
    event Withdrawal(address indexed to, uint256 amount);
    
    // 거래 Id
    Counters.Counter private _saleIds; 
    // 기부 Id
    Counters.Counter private _donateIds;
    // 무료 Id
    Counters.Counter private _freeIds;
    

    // //민트 가격
    // uint constant MINT_PRICE = 300;

    //Sale Contract에 대한 소유권 명시
    mapping(uint256 => Sale) private _sales;

    // 특정 동물에 따른 거래 ID 목록 => To Much인가? => Id값만 기록되기 때문에 성능에 비해 gas 효율 보통
    mapping(uint256 => uint256[]) private _salesByAnimal;

    // 특정 지갑이 생성한 거래 ID 목록 => To Much인가? => Id값만 기록되기 때문에 성능에 비해 gas 효율 보통
    mapping(address => uint256[]) private _saleIdsByWallet;

    // 특정 동물에 따른 기부 ID 목록
    mapping(uint256 => Donate) private _donates;

    // 특정 동물에 따른 기부 ID 목록
    mapping(uint256 => uint256[]) private _donatesByAnimal;

    // 특정 지갑에 따른 기부 ID 목록
    mapping(address => uint256[]) private _donateIdsByWallet;

    // 토코쿠칸 소유에 따른 증정내역 ID 목록
    mapping(uint256 => Free) private _frees;

    // 배포 된 ERC-20 토큰 계약 주소
    address private _currencyAddress;
    // ERC20 객체화
    IERC20 private _currencyContract;

    // 배포 된 AnimalNft(ERC-721) 토큰 계약 주소
    address private _animalNftAddress;
    // PRIVATE 서버의 AnimalNft(ERC-721) 객체화
    AnimalNft private _animalNftContract; 
 
    
    /*
    * constructor
    * P2P 거래 정보 관리 객체를 생성
    * 
    * @ param address currencyAddress ERC-20 토큰 계약 주소
    * @ param address animalNftAddress AnimalNft(ERC-721) 토큰 계약 주소
    * @ param address nftSaleAddress NftSale 계약 주소
    * @ return None
    * @ exception None
    */
    constructor(
        address currencyAddress,
        address animalNftAddress
    ){
        _currencyAddress = currencyAddress;
        _animalNftAddress = animalNftAddress;

        _currencyContract = IERC20(_currencyAddress);
        _animalNftContract = AnimalNft(_animalNftAddress);
    }


    /*
    * createSale
    * 새로운 P2P 거래 정보를 가진 Contract를 생성
    * @ param uint256 animalId 동물 ID
    * @ param address seller 판매자 지갑 주소
    * @ param uint256 price 판매 가격
    * @ param uint256 startedAt 판매 시작 시간
    * @ param uint256 endedAt 판매 종료 시간
    * @ return None
    */
    function createSale(
            uint256 animalId,
            uint256 price,
            uint256 startedAt,
            uint256 endedAt 
        ) public {

        /* 유효성 검사
            1. 글 등록자가 동물 Id를 실제로 소유하는지 확인
            2. 판매 가격은 0을 넘어야 함 
        */
        require(msg.sender == AnimalNft(_animalNftAddress)._getOwner(animalId), "Animal NFT is not owned by Register");
        require(price > 0, "You must set price over 0");
        
        //거래 번호 증가
        _saleIds.increment();
        uint256 newNftSaleId = _saleIds.current();

        //거래 객체 생성
        NftSale newNftSale = new NftSale(_currencyAddress, _animalNftAddress, animalId, msg.sender, price, startedAt, endedAt);

        //ERC721 계약에 의해 animalId는 현 계약서로만 거래가 가능하다.
        AnimalNft(_animalNftAddress).approve(address(newNftSale), animalId);

        /* Sale Struct에 값 저장
            1. 계약서 주소
            2. 작성자
        */
        Sale memory newSale = Sale(address(newNftSale), msg.sender);
        _sales[newNftSaleId] = newSale; 
        _salesByAnimal[animalId].push(newNftSaleId);
        _saleIdsByWallet[msg.sender].push(newNftSaleId);

        emit SaleCreated(newNftSaleId, address(newNftSale), animalId);
    }

    /*
    * donate
    * Donate를 위한 메서드
    * @ param none
    * @ return animalId
    */
    function createDonate(
            uint256 mintedAt
    ) public returns (uint256){

        //거래 객체 생성
        NftDonate newAnimalNftDonate = new NftDonate(_currencyAddress, _animalNftAddress, msg.sender, mintedAt);
        uint256 newAnimalId = newAnimalNftDonate.donate();
        
        /* Donate Struct에 값 저장
            1. 계약서 주소
            2. 작성자
        */
        Donate memory newDonate = Donate(address(newAnimalNftDonate), msg.sender);

        // 완료되면 기부 번호 증가
        _donateIds.increment();
        uint256 newDonateId = _donateIds.current();

        _donates[newDonateId] = newDonate;
        _donatesByAnimal[newAnimalId].push(newDonateId);
        _donateIdsByWallet[msg.sender].push(newAnimalId);

        //emit DonateCreated(newAnimalNftDonateId, address(newAnimalNftDonate), newAnimalNftDonateId);

        return newAnimalId;
    }

    /*
    * free
    * 최초 가입자에게 토코쿠칸 마스코트 소유권 배분을 위한 함수
    * @ param uint256 mintedAt UNIX TIMESTAMP 기반 시간 : DB와 기록시간을 맞추기 위함
    * @ return animalId
    */
    function createFree(
            uint256 mintedAt
    ) public returns (uint256){

        //거래 객체 생성
        NftFree newNftFree = new NftFree(_currencyAddress, _animalNftAddress, msg.sender, mintedAt);
        uint256 newNftFreeId = newNftFree.free();
        /* Free Struct에 값 저장
            1. 계약서 주소
            2. 민트한 지갑주소
        */

        // 완료되면 증정 번호 증가
        _freeIds.increment();
        uint256 newFreeId = _freeIds.current();

        Free memory newFree = Free(address(newNftFree), msg.sender);
        _frees[newFreeId] = newFree; 

        //emit DonateCreated(newAnimalNftDonateId, address(newAnimalNftDonate), newAnimalNftDonateId);

        return newNftFreeId;
    }

    /*
    * ownerOfSale
    * 해당 거래의 판매자를 반환
    *
    * @ param uint256 saleId 거래 ID
    * @ return address 거래 소유 Wallet address
    * @ exception None
    */
    function ownerOfSale(uint256 saleId) public view returns(address) {
        return _sales[saleId].saleOwner;
    }

    /*
    * ownerOfDonate
    * 해당 NFT의 민트자를 반환
    *
    * @ param uint256 donateId 기부 ID
    * @ return address 최초 기부한 Wallet address
    * @ exception None
    */
    function ownerOfDonate(uint256 donateId) public view returns(address) {
        return _donates[donateId].donator;
    }

    /*
    * getSaleAddress
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
    * getDonateAddress
    * 해당 기부의 Contract 주소를 반환
    *
    * @ param uint256 donateId 기부 ID
    * @ return address 기부 Contract address
    * @ exception None
    */
    function getDonateAddress(uint256 donateId) public view returns(address) {
        return _donates[donateId].donateAddress;
    }

    /*
    * getCountSales
    * 현재까지 등록된 모든 거래의 개수를 반환
    *
    * @ param None
    * @ return uint256 등록된 거래 개수
    * @ exception None
    */
    function getCountSales() public view returns (uint256) {
        return _saleIds.current();
    }

    /*
    * getCountDonates
    * 현재까지 등록된 모든 기부의 개수를 반환
    *
    * @ param None
    * @ return uint256 등록된 기부 개수
    * @ exception None
    */
    function getCountDonates() public view returns (uint256) {
        return _donateIds.current();
    }

    /*
    * getCountFrees
    * 현재까지 등록된 모든 증정의 개수를 반환
    *
    * @ param None
    * @ return uint256 등록된 증정 개수
    * @ exception None
    */
    function getCountFrees() public view returns (uint256) {
        return _freeIds.current();
    }

    /*
    * getSalesOfAnimal
    * 해당 동물 ID로 지금까지의 saleId를 반환
    * @ param uint256 animalId 동물 ID
    * @ return uint256[] 거래 ID 목록
    * @ exception None
    */
    function getSalesOfAnimal(uint256 animalId) public view returns(uint256[] memory) {
        return _salesByAnimal[animalId];
    }

    /*
    * getDonatesOfAnimal
    * 해당 동물 ID로 지금까지의 donateId를 반환
    * @ param uint256 animalId 동물 ID
    * @ return uint256[] 기부 ID 목록
    * @ exception None
    */
    function getDonatesOfAnimal(uint256 animalId) public view returns(uint256[] memory) {
        return _donatesByAnimal[animalId];
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

    /*
    * getDonateIdsByWallet
    * 해당 지갑의 모든 기부 목록을 반환
    * @ param address walletAddr 지갑 주소
    * @ return uint256[] 거래 ID 목록
    * @ exception None
    */
    function getDonateIdsByWallet(address walletAddr) public view returns(uint256[] memory) {
        return _donateIdsByWallet[walletAddr];
    }
}
