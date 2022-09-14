// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
//0x9dE8aCDbFe898E579F8B79D9141F5e595ca09E99
//0xd9145CCE52D386f254917e481eB44e9943F39138


//본체 : 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./NftSale.sol";
import "./AnimalNft.sol";
import "./MascortNft.sol";

/*
* P2P 거래 정보를 관리하는 Factory Contract
* 
* @author 
* @version 0.1
* @see None
*/

contract NftSaleManager is Ownable {
    
    // 거래 등록 관리
    struct Sale {
        address saleAddress;
        address saleOwner;
    }

    using Counters for Counters.Counter;

    event SaleCreated(address indexed newNftSaleAddress, uint256 indexed animalId);
    
    // 거래 Id
    Counters.Counter private _saleIds; 

    //Sale Contract에 대한 소유권 명시
    mapping(uint256 => Sale) private _sales;

    // 특정 동물에 따른 거래 ID 목록 => To Much인가? => Id값만 기록되기 때문에 성능에 비해 gas 효율 보통
    mapping(uint256 => uint256[]) private _salesByAnimal;

    // 특정 지갑이 생성한 거래 ID 목록 => To Much인가? => Id값만 기록되기 때문에 성능에 비해 gas 효율 보통
    mapping(address => uint256[]) private _saleIdsByWallet;

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
        ) public returns(
            uint256,
            address)
    {

        /* 유효성 검사
            1. 글 등록자가 동물 Id를 실제로 소유하는지 확인
            2. 판매 가격은 0을 넘어야 함 
        */
        // Nft-721 내부 정보 기준 소유권 판단
        require(msg.sender == AnimalNft(_animalNftAddress).ownerOf(animalId), "Animal NFT is not owned by Register");
        require(price > 0, "You must set price over 0");
        
        //거래 객체 생성
        NftSale newNftSale = new NftSale(_currencyAddress, _animalNftAddress, animalId, msg.sender, price, startedAt, endedAt);
        
        emit SaleCreated(address(newNftSale), animalId);

        //외부에서 NftSale의 주소에 대한 거래를 ERC20에서 approve 해주어야 한다.
        return (animalId, address(newNftSale));

        
    }

    //gas 오류 때문에 먼저 해당 NftSale Contract의 권한을 approve한 후 현 객체를 NftTradeManager Contract 내부에 등록한다.
    function recordSale(
        uint256 animalId,
        address nftSaleAddress
    ) public returns(uint256)
    {
        //거래 번호 증가
        _saleIds.increment();
        uint256 newNftSaleId = _saleIds.current();

        //ERC20 거래에 대한 허가는 외부에서 해주어야 한다.
        //IERC20(_currencyAddress).approve(address(nftSaleAddress), MINT_PRICE);
        
        //ERC721 계약에 의해 animalId는 현 계약서로만 거래가 가능하다.
        //AnimalNft(_animalNftAddress).approve(nftSaleAddress, animalId);

        /* Sale Struct에 값 저장
            1. 계약서 주소
            2. 작성자
        */
        Sale memory newSale = Sale(address(nftSaleAddress), msg.sender);
        _sales[newNftSaleId] = newSale; 
        _salesByAnimal[animalId].push(newNftSaleId);
        _saleIdsByWallet[msg.sender].push(newNftSaleId);

        return newNftSaleId;
    }

    /*
    * ownerOfSale
    * 해당 거래의 판매자를 반환
    *
    * @ param uint256 saleId 거래 ID
    * @ return address 거래 소유 Wallet address
    * @ exception None
    */
    function ownerOfSale(uint256 saleId) public view
    returns(address) {
        require(saleId <= _saleIds.current(), "SALE ID IS BIGGER THAN CREATED SALES NUMBER");
        return _sales[saleId].saleOwner;
    }

    /*
    * getSaleInfo
    * 해당 거래의 Contract 주소와 판매자를 반환
    *
    * @ param uint256 saleId 거래 ID
    * @ return (address, address) 거래 Contract address, Owner address
    * @ exception None
    */
    function getSaleInfo(uint256 saleId) public view
    returns(address, address) {
        require(saleId <= _saleIds.current(), "SALE ID IS BIGGER THAN CREATED SALES NUMBER");
        return (_sales[saleId].saleAddress, _sales[saleId].saleOwner);
    }

    /*
    * getCountSales
    * 현재까지 등록된 모든 거래의 개수를 반환
    *
    * @ param None
    * @ return uint256 등록된 거래 개수
    * @ exception None
    */
    function getCountSales() public view
    returns (uint256) {
        return _saleIds.current();
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
    * getSaleIdsByWallet
    * 해당 지갑의 모든 거래 목록을 반환
    * @ param address walletAddr 지갑 주소
    * @ return uint256[] 거래 ID 목록
    * @ exception None
    */
    function getSaleIdsByWallet(address walletAddr) public view returns(uint256[] memory) {
        return _saleIdsByWallet[walletAddr];
    }

    function getBalanceOf() public view returns(uint256) {
        return _currencyContract.balanceOf(msg.sender);
    }

    function getTimeNow() public view returns(uint256) {
        return block.timestamp;
    }
}
