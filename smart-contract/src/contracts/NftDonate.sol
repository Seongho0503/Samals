// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

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

contract NftDonate is Ownable {
    using SafeMath for uint256;

    event Closed(uint256 indexed animalId);
    event Donate(address seller, address buyer);
    
    /*
        민트내역 정보 저장
    */
    //민트된 동물 ID 저장
    uint256 private _animalId;
    //민트를 하고자 하는 사람
    address private _buyer; 
    //UNIX TIME STAMP 기반 시간 기록
    uint256 private _mintedAt;
    //민트 완료 표기
    bool private _isClosed;

    /* 
        민트 관련 정보 저장
    */
    //민트 가격
    uint constant MINT_PRICE = 300;

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
    * 민트내역 관리 객체를 생성
    * @param address currencyContractAddress ERC-20 토큰 계약 주소
    * @param address animalNftContractAddress AnimalNft(ERC-721) 토큰 계약 주소
    * @param address seller 민트자 주소
    * @param uint256 price 판매 가격
    * @param uint256 mintedAt UNIX TIMESTAMP 기반 시간
    */
    constructor(
        address currencyContractAddress,
        address animalNftContractAddress,
        address buyer,
        uint256 mintedAt
    ) {
        _currencyContractAddress = currencyContractAddress;
        _currencyContract = IERC20(_currencyContractAddress);
        _animalNftContractAddress = animalNftContractAddress;
        _animalNftContract = AnimalNft(_animalNftContractAddress);

        _buyer = buyer;
        _mintedAt = mintedAt;
        _isClosed = false;
    }

    /*
    * closed
    * 민트 성공적인 종료를 위한 메서드
    * 종료된 민트는 다시 활성화할 수 없다
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
    * donate
    * 민트 조건을 만족할 경우,
    * 구매자의 지갑으로부터 관리자에게 토큰을 전송
    * @ modifier ActiveMint 이미 민트 종료된 Nft라면 불가
    * @ param None
    * @ return animalId
    * @ exception 안정장치를 위해 승인까지 완료된 객체여야한다.
    * @ exception 구매자가 민트가격 잔고를 가지고 있어야 함
    */
    function donate()
    public payable ActiveMint 
    returns (uint256)
    {

        // 구매자에게 현재 잔고가 있는가 확인
        require(_currencyContract.balanceOf(_buyer) >= MINT_PRICE, "balance is exhausted");

        /*
        [관리자 => 민트]
        */
        uint256 newAnimalId = _animalNftContract._createAnimalNft();

        /* 
        [구매자 => 관리자]
        구매자에게서 판매자에게 토큰 지불
        */
        _currencyContract.transferFrom(msg.sender, owner(), MINT_PRICE);

        _animalId = newAnimalId;
        emit Donate(_buyer, msg.sender);

        // 민트 종료 메서드 실행
        closed();

        return newAnimalId;
    }

    // IERC721Receiver는 interface므로 이 메서드를 필수로 상속해야한다.
    // function onERC721Received(
    //     address operator,
    //     address from,
    //     uint256 tokenId,
    //     bytes calldata data
    // ) external pure returns (bytes4) {
    //     return this.onERC721Received.selector;
    // }

    modifier ActiveMint() {
        require(!_isClosed);
        _;
    }
}