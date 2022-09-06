pragma solidity ^0.8.16;

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
    
    //using 키워드로 라이브러리 불러오기
    using Counters for Counters.Counter;

    //현재까지 발급된 토큰의 개수 반환: 뽑기할 때마다 1씩 증가
    Counters.Counter private _tokenIds;

    //ERC721URIStrage 표준: 토큰 ID에 매핑된 URI 주소
    string private _tokenUri;

    //현 토큰에 대한 정보 저장
    string private _name;

    //현 토큰에 대한 등급 저장
    string private _class;

    mapping(address => uint256) private _minters;


    //계약서 생성
    //@param address tokenUri : 현 NFT가 지정하고 있는 IPFS URI
    //@param string name : 현 마스코트 NFT 동물의 이름 (=토코투칸)
    //@param string class : 현 마스코트 NFT 동물의 멸종위기등급
    constructor(
        string memory tokenUri,
        string memory name,
        string memory class
    ) ERC721("MascortNFT", "MCT") {
        _tokenUri = tokenUri;
        _name = name;
        _class = class;
    }

    function _createMascortNft ()
    public returns (uint256)
    {
        //현재 관리하고 있는 token 개수에 1을 추가
        _tokenIds.increment();
        
        uint256 newItemId = _tokenIds.current();

        //ERC721 소유권 추가
        _mint(msg.sender, newItemId);
        _minters[msg.sender] = newItemId;

        return newItemId;
    }

    function _getName()
    public view returns(string memory){
        return _name;
    } 

    function _getClass() 
    public view returns(string memory){
        return _class;
    }

    function _getTokenUri()
    public view returns(string memory){
        return _tokenUri;
    }

    function _getMintersNumber()
    public view returns(uint256){
        return _tokenIds.current();
    }

    function _isOwner(
        address wallet
    ) public view returns(bool){
        
        //key값이 없을 때 작동하는지 확인해야함
        if(_minters[wallet] == 0){
            return false;
        }

        return true;
    }
}