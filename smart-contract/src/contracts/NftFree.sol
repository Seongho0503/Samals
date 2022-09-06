// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./MascortNft.sol";
/*
* 거래 정보를 저장하는 Contracts
* 거래 등록마다 생성되므로 객체로 활용
* @author
* @version
*/

contract NftFree is Ownable {
    using SafeMath for uint256;

    event Free(address minter);
    
    /*
        민트내역 정보 저장
    */
    //민트를 하고자 하는 사람
    address private _minter; 
    //UNIX TIME STAMP 기반 시간 기록
    uint256 private _mintedAt;

    /* 
        민트 관련 정보 저장
    */
    //민트 가격
    uint constant MINT_PRICE = 0;

    // PRIVATE 서버의 Contract(ERC20) 주소
    address private _currencyContractAddress;
    // ERC20 객체화
    IERC20 private _currencyContract;
    // PRIVATE 서버의 NftContract주소(ERC-721)
    address private _mascortNftContractAddress;
    // PRIVATE 서버의 MascortNft(ERC-721) 객체화
    MascortNft private _mascortNftContract;
    
    
    /*
    * constructor
    * 민트내역 관리 객체를 생성
    * @param address mascortNftContractAddress MascortNft(ERC-721) 토큰 계약 주소
    * @param address minter 민트자 주소
    * @param uint256 price 판매 가격
    * @param uint256 mintedAt UNIX TIMESTAMP 기반 시간
    */
    constructor(
        address currencyContractAddress,
        address mascortNftContractAddress,
        address minter,
        uint256 mintedAt
    ) {
        _currencyContractAddress = currencyContractAddress;
        _currencyContract = IERC20(_currencyContractAddress);
        _mascortNftContractAddress = mascortNftContractAddress;
        _mascortNftContract = MascortNft(_mascortNftContractAddress);

        _minter = minter;
        _mintedAt = mintedAt;
    }


    /*
    * free
    * 민트 조건을 만족할 경우, 소유권 분배
    * @ param None
    * @ return newMascortId
    * @ exception 안정장치를 위해 승인까지 완료된 객체여야한다.
    * @ exception 구매자가 민트가격 잔고를 가지고 있어야 함
    */
    function free() public 
    returns (uint256)
    {
        require(_mascortNftContract._isOwner(msg.sender) == false, "ALREADY IS AN OWNER");
        /*
        [관리자 => 민트]
        */
        uint256 newMascortId = _mascortNftContract._createMascortNft();

        emit Free(_minter);

        return newMascortId;
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

}