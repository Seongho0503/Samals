// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/*
굳이 한페이지에 쓰지 않는 이유는?
1. 일단 하나면 없어보임
2. 여러개 작성하면 객체지향을 강조할 수 있다.
3. 다중 검색시 REST하게 각각 요청함으로 속도 줄일 수 있다?? 아니다 오히려 이벤트로 연관된 id값을 받고 다시 해당 컨트랙트로 재요청하는 이슈 발생
4, 여기서는 코드를 줄이는 것을 목표로 함. 그러나 그게 불가능할 때도 있었다.
5. 내부 struct로 객체를 만들었지만 가스 소모가 심하다
*/
contract AnimalNft is ERC721URIStorage, Ownable {
    
    //동물에 대한 정보 보관
    struct AnimalInfo {
        uint32 species; //1~15: string으로 저장하면 저장값이 너무 길어질 수 있음
        uint32 rank; //EW - CR - EN - VU - LC
        string tokenUri; //IPFS에 대한 경로
        uint256 number; //멸종 위기 동물 중 넘버링 번호

        //랜덤성 검사요소에서 필요해 그냥 넣음
        address minter;
        address owner;
    }
    
    //using 키워드로 라이브러리 불러오기
    using Counters for Counters.Counter;

    //현재까지 발급된 토큰의 개수 반환: 뽑기할 때마다 1씩 증가
    Counters.Counter private _tokenIds;

    //const 키워드를 활용해 명시가능
    uint256 constant LIMITED_NUMBER = 22000;

    //uint256 test;
    //남아있는 동물의 값들 저장: 최초발행 22000개
    AnimalInfo[] LIMITED_ANIMALS; //최초값을 2차원 배열로 받아야하는데 가스가 미쳐날뛴다.
    mapping(uint256 => AnimalInfo) MINTED_ANIMALS; //뽑기 이후 민팅된 동물들 => ArrayList가 안되는 것을 깨닫고 방식 변경

    //ERC721URIStrage 표준: 토큰 ID에 매핑된 URI 주소
    //mapping(uint256 => string) private _tokenURIs;

    //토큰의 현 소유자들 기록/갱신
    //mapping(uint256 => address) private _tokenOwners;

    //최초 민트자 기록: 22000개가 발행되었다고 했을 때 검색속도 개선 => 그러나 아래 transactionHistories[tokenId]
    //mapping(uint256 => address) private _minters; => AnimalInfo Struct로 관리한 이상 필요가 없어짐

    //AnimalInfo 저장을 위한 매핑(필요한지 따져볼 것)
    mapping(uint256 => AnimalInfo) private _animalInfos;


    //계약서 생성
    //생성자: 이름, 심볼 -> 심볼 결정하기{임시: AMT}
    constructor(
        uint32[] memory species,
        uint32[] memory rank,
        string[] memory tokenUri,
        uint256[] memory number) ERC721("AnimalNFT", "AMT") {
        
        //22000마리의 한정된 동물의 객체 저장
        for(uint256 i = 0; i< species.length; i++){
            LIMITED_ANIMALS.push(
                AnimalInfo(
                    species[i],
                    rank[i],
                    tokenUri[i],
                    number[i],
                    address(0),
                    address(0)
                )
            );
        }
    }

    function _createAnimalNft (
        //address recipient
        //string memory tokenURI
    ) public returns (uint256)
    {
        //유효성 검사
        require(_tokenIds.current() < 22000, "ALL ANIMALS WERE ISSUED");
        require(LIMITED_ANIMALS[_tokenIds.current()].minter == address(0), "ALREADY ISSUED NFT");
        
        //랜덤으로 동물을 뽑아주는 메서드
        uint256 random = _randomAnimalNft();

        //유효성 검사: 민트가 일어나지 않았는지 재확인
        require(LIMITED_ANIMALS[random].minter == address(0), "NFT MINTER ALREADY EXISTS");

        _tokenIds.increment(); //현재 관리하고 있는 NFT 개수에 1을 추가하고 INDEX 부여
        
        //AnimalInfo newAnimalInfo = new AnimalInfo(LIMITED_ANIMAL[random].species, LIMITED_ANIMAL[random])
        
        uint256 newItemId = _tokenIds.current();
        MINTED_ANIMALS[newItemId] = LIMITED_ANIMALS[random];

        //ERC721 내부에서 owner변경 => 내부 contract를 쓸껀지 아닌지 결정-> 관리하는 객체가 많기 때문에 고민
        _mint(msg.sender, newItemId); 
        _setMinter(newItemId, msg.sender);
        _setTokenURI(newItemId, MINTED_ANIMALS[newItemId].tokenUri);

        return newItemId;
    }

    
    function _randomAnimalNft(  
    ) private view returns(uint){
        //방법1
        //Solidity는 deterministic하다 -> random성을 지양하는 언어
        //하지만 keccak256 라이브러리와 abi을 이용해 랜덤성을 부여할 수 있다
        //조사해보니 Solidity 환경에서 ArrayList의 add는 가능하지만 delete는 논리삭제만 가능했다
        //uint256 random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _tokenIds.current()))) % (MINTED_ANIMALS.length);
        //MINTED_ANIMALS.push(LIMITED_ANIMALS[random]);
        //delete LIMITED_ANIMALS
        
        //방법2
        //극한의 조회문을 사용하기로 결정
        //새로 배열을 임시로 만들어 뽑기를 진행하려고 했는데 i와 크기 배열 tmp는 임시로 만들 수 있지만 인덱스를 기록하기 위한 j는 임시로 만들기 불가
        //uint256[] memory tmp = new uint256[](LIMITED_NUMBER - _tokenIds.current());
        //for(uint256 i=0; i<LIMITED_ANIMALS.length; i++){
        //    if(LIMITED_ANIMALS[i].minter == address(0)){
        //        tmp.push(i); 
        //    }
        //}
        
        //방법3 = 방법1 + 방법2 = view 키워드를 사용해 gas를 최대한 아끼고 리턴값을 밖으로 빼서 gas를 사용한다.
        uint256 random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender,  _tokenIds.current()))) %  LIMITED_ANIMALS.length;
        //특정 random수를 임의로 정하고 앞으로 이동하면서 가장 가까운 숫자를 번호로 뽑아낸다.
        for(uint256 i = random ; i < random +  LIMITED_ANIMALS.length; i++){
            //민트자가 정해지지 않았다면 채택
            if(LIMITED_ANIMALS[ i % LIMITED_ANIMALS.length].minter == address(0)){ 
                return i;
            }
        }

        return random;
        //delete LIMITED_ANIMALS
        
    }

    function _getSpecies(
        uint256 tokenId
    ) public view returns(uint32){
        return LIMITED_ANIMALS[tokenId].species;
    } 
    function _getRank(
        uint256 tokenId
    ) public view returns(uint32){
        return LIMITED_ANIMALS[tokenId].rank;
    }

    function _getTokenUri(
        uint256 tokenId
    ) public view returns(string memory){
        return LIMITED_ANIMALS[tokenId].tokenUri;
    }

    function _getNumber(
        uint256 tokenId
    ) public view returns(uint256){
        return LIMITED_ANIMALS[tokenId].number;
    }

    //Animal Info 내부 mint값 초기화
    function _setMinter (
        uint256 tokenId,
        address minter 
    ) private {
        MINTED_ANIMALS[tokenId].minter = minter;
    }

    function _getMinter (
        uint256 tokenId
    ) public view returns(address){
        //require(_tokenIds.current() < tokenId, "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].minter;
    }

    function _setOwner (
        uint256 tokenId,
        address newOwner
    ) public {
        MINTED_ANIMALS[tokenId].owner = newOwner;
    }

    function _getOwner (
        uint256 tokenId
    ) public view returns(address){
        //require(_tokenIds.current() < tokenId, "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].owner;
    }
}