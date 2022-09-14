// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
//0x9dE8aCDbFe898E579F8B79D9141F5e595ca09E99
//"tokokukan_uri_test"
//"tokokukan"
//"NT"
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/*
무료로 발급해주는 NFT 토큰
구매를 클릭한 모든 사람들이게 소유권이 기록된다.
세이멀스의 마스코트는 토코쿠칸이다.
*/
contract MascortNft is ERC721Enumerable, Ownable {
    
    // 증정 내역 관리
    struct Free {
        uint256 tokenId;
        uint256 mintedAt;
    }

    event CreateMascortNft(uint256 indexed newItemId, address indexed minter);

    //using 키워드로 라이브러리 불러오기
    using Counters for Counters.Counter;

    //현재까지 발급된 토큰의 개수 반환: 뽑기할 때마다 1씩 증가
    Counters.Counter private _tokenIds;

    //민트가격
    uint256 public MINT_PRICE = 0;

    // ERC721URIStrage 표준: 토큰 ID에 매핑된 URI 주소
    string private _tokenUri;

    // 현 토큰에 대한 정보 저장
    string private _species;

    // 현 토큰에 대한 등급 저장
    string private _class;

    mapping(address => uint256) _minters;

    // 소유를 확인하기 위한 매핑 작업
    mapping(address => Free) private _frees;

    IERC20 private _currencyContract;

    //계약서 생성
    //@param address tokenUri : 현 NFT가 지정하고 있는 IPFS URI
    //@param string name : 현 마스코트 NFT 동물의 이름 (=토코투칸)
    //@param string class : 현 마스코트 NFT 동물의 멸종위기등급
    constructor(
        address currencyContractAddress,
        string memory tokenUri,
        string memory species,
        string memory class
    ) ERC721("MascortNFT", "MCT") {

        //ERC20 Contract 불러오기
        _currencyContract = IERC20(currencyContractAddress);

        _tokenUri = tokenUri;
        _species = species;
        _class = class;

        // _createMascortNft 함수에서 유효성 검사를 위한 tokenId 증가
        _tokenIds.increment();
    }

    function _createMascortNft (
        uint256 mintedAt
    )
    public returns (uint256)
    {
        require(_minters[msg.sender] == uint256(0), "ALREADY OWNED THIS TOKEN");

        // 거래 진행
        _currencyContract.transferFrom(msg.sender, owner(), MINT_PRICE);

        uint256 _presentTokenId = _tokenIds.current();

        //ERC721 소유권 추가
        _mint(msg.sender, _presentTokenId);
        _minters[msg.sender] = _presentTokenId;
        _frees[msg.sender] = Free(_presentTokenId, mintedAt);

        emit CreateMascortNft(_presentTokenId, msg.sender);

        //현재 관리하고 있는 token 개수에 1을 추가
        _tokenIds.increment();

        return _presentTokenId;
    }

    function _getSpecies()
    public view returns(string memory){
        return _species;
    } 

    function _getClass() 
    public view returns(string memory){
        return _class;
    }

    function _getTokenUri()
    public view returns(string memory){
        return _tokenUri;
    }
    
    //_getTotalFreeNumber : 전체 발행 개수 반환
    //@param none
    //@return uint256 : 전체 발행 개수 반환
    function _getTotalFreeNumber()
    public view returns(uint256){
        return (_tokenIds.current()-1);
    }

    //_getTokenInfoByWallet : Free Struct 정보 조회
    //@param address walletAddress : 현 지갑에 매핑된 Free Struct 데이터 조회
    //@return (uint256, uint256) : Free Struct 내의 ( tokenId, mintedAt ) 값 반환
    function _getTokenInfoByWallet(
        address walletAddress
    ) public view returns(uint256, uint256) {
        if(_isOwner(walletAddress)){
            return (_frees[walletAddress].tokenId, _frees[walletAddress].mintedAt);
        }

        // 소유자가 아닌 경우 0,0 반환
        return (0,0); 
    }

    //_isOwner : 지갑에 한 소유 여부 조회(_getTokenId를 호출하기 전에 사용)
    //@param address walletAddress : 현 지갑에 매핑된 Free Struct 데이터 조회
    //@returns(uint256, uint256) : Free Struct 내의 ( tokenId, mintedAt ) 값 반환
    function _isOwner(
        address walletAddress
    ) public view returns(bool){
        
        //key값이 없을 때 작동하는지 확인해야함
        if(_minters[walletAddress] == uint256(0)){
            return false;
        }
        return true;
    }


}