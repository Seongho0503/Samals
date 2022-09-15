// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./AnimalNft.sol";
/*
* 거래 정보를 저장하는 Contracts
* 거래 등록마다 생성되므로 객체로 활용
* @author
* @version
*/

contract NftSale is Ownable {
    using SafeMath for uint256;

    event Purchase(uint256 indexed animalId, address seller, address buyer);
    event Closed(uint256 indexed animalId);
    
    /*
        거래내역 정보 저장
    */
    //판매하는 동물 ID
    uint256 private _animalId;
    //판매글을 올린 사람
    address private _seller; 
    //가격(단위 wei 또는 SSF)
    uint256 private _price;
    //UNIX TIME STAMP 기반 시간 기록
    uint256 private _startedAt;
    //UNIX TIME STAMP 기반 시간 기록
    uint256 private _endedAt;
    //판매 완료 표기
    bool private _isClosed;

    /* 
        민트 관련 정보 저장
    */

    // PRIVATE 서버의 Contract(ERC20) 주소
    address private _currencyContractAddress;
    // ERC20 객체화
    IERC20 private _currencyContract;
    // PRIVATE 서버의 NftContract주소(ERC-721)
    address private _animalNftContractAddress;
    // PRIVATE 서버의 AnimalNft(ERC-721) 객체화
    AnimalNft private _animalNftContract;
    
    
    /*
    * constructor
    * 거래내역 관리 객체를 생성
    * @param address currencyContractAddress ERC-20 토큰 계약 주소
    * @param address animalNftContractAddress AnimalNft(ERC-721) 토큰 계약 주소
    * @param uint256 animalId 거래하고자하는 동물 ID
    * @param address seller 판매자 주소
    * @param uint256 price 판매 가격
    * @param uint256 startedAt UNIX TIMESTAMP 기반 시간
    * @param uint256 endedAt UNIX TIMESTAMP 기반 시간
    */
    constructor(
        address currencyContractAddress,
        address animalNftContractAddress,
        uint256 animalId,
        address seller,
        uint256 price,
        uint256 startedAt,
        uint256 endedAt
    ) {
        _currencyContractAddress = currencyContractAddress;
        _currencyContract = IERC20(_currencyContractAddress);
        _animalNftContractAddress = animalNftContractAddress;
        _animalNftContract = AnimalNft(_animalNftContractAddress);

        _animalId = animalId;
        _seller = seller;
        _price = price;
        _startedAt = startedAt;
        _endedAt = endedAt;
        _isClosed = false;
    }

    /*
    * closed
    * 판매 종료/취소를 위한 메서드
    * 종료된 판매는 다시 활성화할 수 없다
    *
    * @ param None
    * @ return None
    * @ exception None
    */
    function closed() private {
        _isClosed = true;
        emit Closed(_animalId);
    }

    /*
    * balanceOf
    * 현재 계약에 보관된 ERC-20 토큰 잔고를 반환
    *
    * @ param None
    * @ return uint256 현재 계약에 보관된 ERC-20 토큰 잔고
    * @ exception None
    */
    function balanceOf() public view returns(uint256) {
        return _currencyContract.balanceOf(msg.sender);
        
    }

    /*
    * animalIdof
    * NftSale을 작성한 글 작성자를 반환
    *
    * @ param None
    * @ return address
    * @ exception None
    */
    function animalIdof() public view returns(address) {
        return _animalNftContract.ownerOf(_animalId);
    }

    /*
    * purchase
    * 판매 조건을 만족할 경우,
    * 판매자의 지갑으로부터 구매자의 지갑으로 등록된 AnimalNft(ERC-721) 토큰을 전송
    * 구매자의 지갑으로부터 계약 지갑으로 판매 가격 만큼의 ERC-20 토큰을 전송
    * @ modifier ActiveSale 시간과 판매 종료 내역 확인
    * @ param None
    * @ return _animalId
    * @ exception 현재 활성 상태(미취소, 미완료, 판매시간 내)의 판매 이어야 함
    * @ exception 판매자가 현재 동물 주인이어야 함
    * @ exception 구매자가 현재 동물 가격 이상의 잔고를 가지고 있어야 함
    */
    function purchase() public returns(uint256)
    //ActiveSale : 넣을 것인지 고려
     {
        
        // 판매자가 동물 주인인가 확인
        require(_animalNftContract.ownerOf(_animalId) == _seller, "seller is not owner");

        // 구매자에게 현재 잔고가 있는가 확인
        require(_currencyContract.balanceOf(msg.sender) >= _price, "balance is exhausted");

        /*
        [판매자 => 구매자]
        판매자에게서 구매자에게 동물 소유권 전송
            1. safeTransferFrom 발동
            2. _isApprovedOrOwner(_msgSender(), tokenId) 실행
            3. _transfer 실행 -> ERC-721 내부에서 소유권 변경
            4. 마지막으로 요청 객체가 ERC-721 Receiver인지 확인(현재 상속 중)
        */
        //_animalNftContract.safeTransferFrom(_seller, msg.sender, _animalId); // 잘되는지 테스트 필요한 핵심 부분

        /* 
        [구매자 => 판매자]
        구매자에게서 판매자에게 토큰 지불
        */
        _currencyContract.transferFrom(msg.sender, _seller, _price);
        _animalNftContract.transferFrom(_seller, msg.sender, _animalId);
        //ERC721 내부에 규정되어있는 approve 후 구매하기는 보안상 뛰어나지만
        //웹페이지 컨셉에 맞지 않아 자체 규정된 민트 기록을 사용한다.
        //만약 사용하기 위해선 구매자가 요청하는 방식이나 판매자가 올리고 구매자가 요청하면 판매자가 허락하는 방식이다.
        //_animalNftContract.transferFrom(owner(), msg.sender, _animalId);
        
        //  _currencyContract.approve(msg.sender,_price);
        // _currencyContract.approve(address(this), _price);
        // _currencyContract.transferFrom(address(this), _seller, _price);
 
        emit Purchase(_animalId, _seller, msg.sender);

        // 판매 종료 메서드 실행
        closed();

        return _animalId;
    }

    function _getSeller() public view returns(address) {
        return _seller;
    }

    function _getPrice() public view returns(uint256) {
        return _price;
    }

    function _getAnimalId() public view returns(uint256) {
        return _animalId;
    }

    function _getSaleTime() public view returns(uint256, uint256) {
        return (_startedAt, _endedAt);
    }
    // IERC721Receiver는 interface므로 이 메서드를 필수로 상속해야한다.
    // function onERC721Received(
    //     address operator,
    //     address from,
    //     uint256 tokenId,
    //     bytes calldata data
    // ) external pure override returns (bytes4) {
    //     return this.onERC721Received.selector;
    // }

    modifier ActiveSale() {
        require(_startedAt < block.timestamp, "This sale is not started yet");
        require(_endedAt > block.timestamp, "This sale is already ended");
        require(!_isClosed);
        _;
    }
}
