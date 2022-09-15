// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
//ERC20: 0x9dE8aCDbFe898E579F8B79D9141F5e595ca09E99
//SPECIES: [1, 2, 3]
//CLASS: [1, 2, 3]
//TOKENURI: ["TEST_IPFS1", "TEST_IPFS2", "TEST_IPFS3"]
//CHECK: [false, false, false]
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
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
    
    // 기부 등록 관리를 위한 Struct
    struct Donate {
        uint256 donatedAt;
        address donator;
    }

    // 동물 정보 보관을 위한 Struct
    struct AnimalInfo {
        uint32 species; //1~15: string으로 저장하면 저장값이 너무 길어질 수 있음
        uint32 class; //EW - CR - EN - VU - LC
        string tokenUri; //IPFS에 대한 경로

        // 편의성을 고려한 변수값들
        uint256 donatedAt;
        address minter;
        address owner;
    }
    
    // 이벤트 : 로깅
    event Donated(uint256 indexed newAnimalId, address indexed donator);

    // using 키워드 : 내부 라이브러리 사용
    using Counters for Counters.Counter;

    // 현재까지 발급된 토큰의 개수 반환: 뽑기할 때마다 1씩 증가
    Counters.Counter private _tokenIds;

    // LIMITED_NUMBER은 랜덤하게 배치된 동물의 정보들이 보관되어 있음
    uint256 private LIMITED_NUMBER;

    // constant 키워드를 활용해 명시
    uint256 constant public MINT_PRICE = 500;

    //기부 시: LIMITED_ANIMALS(랜덤) => MINTED_ANIMALS(순서)
    mapping(uint256 => AnimalInfo) private LIMITED_ANIMALS; //최초값을 2차원 배열로 받아야하는데 가스가 미쳐날뛴다.
    mapping(uint256 => AnimalInfo) private MINTED_ANIMALS; //뽑기 이후 민팅된 동물들 => ArrayList가 안되는 것을 깨닫고 방식 변경

    //ERC721URIStrage 표준: 토큰 ID에 매핑된 URI 주소
    //mapping(uint256 => string) private _tokenURIs;

    //토큰의 현 소유자들 기록/갱신
    //mapping(uint256 => address) private _tokenOwners;

    //최초 민트자 기록: 22000개가 발행되었다고 했을 때 검색속도 개선 => 그러나 아래 transactionHistories[tokenId]
    //mapping(uint256 => address) private _minters; => AnimalInfo Struct로 관리한 이상 필요가 없어짐

    // 특정 지갑에 따른 기부 ID 목록
    mapping(address => uint256[]) private _donateIdsByWallet;

    // ERC20 Contract 객체
    IERC20 private _currencyContract;

    /* constructor : 계약서 생성(AnimalNFT, AMT)
        - memory 키워드 사용 : 임시 변수로 사용, 가변성 존재
       @param address currencyContractAddress : 거래를 위한 ERC-20 컨트랙트 주소 받기
       @param uint32[] memory species : 동물의 종
       @param uint32[] memory rank : 동물 구분 번호
       @param string[] memory tokenUri : 해당 동물의 IPFS 주소
       @param uint256[] memory numbeR : 해당 동물의 고유 넘버링 번호
       @parmam bool[] check : 내부에서 사용할 배열, function 내부에서 memory로 생성하기 위해서는 동물의 수를 constant로 한정 지어 사용할 수 있다. 하지만 테스트를 위해 유동적으로 가져가기 위한 목적으로 매개변수로 받아준다.
    */
    constructor(
        address currencyContractAddress,
        uint32[] memory species,
        uint32[] memory class,
        string[] memory tokenUri,
        bool[] memory check // 초기값 : false
    ) ERC721("AnimalNFT", "AMT") {
        
        // ERC20 Contract 불러오기
        _currencyContract = IERC20(currencyContractAddress);

        // 동물의 수 정하기
        LIMITED_NUMBER = species.length;

        /* 생성자 단계에서 랜덤한 배치
            - 동물의 수(= 배치 횟수) : N
            - 초반에 가스 비용이 발생하지만 Race Condition의 가능성을 줄일 수 있다 
        */
        for(uint256 i = 0; i < LIMITED_NUMBER; i++){
            uint256 random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, i + LIMITED_NUMBER))) % LIMITED_NUMBER;
            for(uint256 j = random; j < random + LIMITED_NUMBER; j++){

                /* 탈중앙화 및 gas 소모 고려
                    - 단순 조회는 가스가 발생하지 않는다 : 랜덤으로 뽑고 내부에서 빈 값을 찾을 때까지 이동하는 방식
                    - 배포하는 개발자조차 뽑기의 결과를 예측할 수 없음
                */
                if(check[j % LIMITED_NUMBER] == false){
                    LIMITED_ANIMALS[i] =
                        AnimalInfo(
                            species[j % LIMITED_NUMBER],
                            class[j % LIMITED_NUMBER],
                            tokenUri[j % LIMITED_NUMBER],
                            uint256(0),
                            address(0),
                            address(0)
                        );
                    check[j % LIMITED_NUMBER] = true;

                    // 조건을 만족하면 반복문 종료
                    j  = random + LIMITED_NUMBER;
                }
            }
        
        }
    }
    
    /*
    * donate
    * Donate Struct를 생성해 내용을 기록하고 mint 수행
    * @ param uint256 donatedAt : UNIX TIME STAMP 기반한 시간 정보 기록
    * @ return newTokenId
    */
    function donate(
            uint256 donatedAt
    ) public returns (uint256){

        /* 유효성 검사
            - 모든 동물들이 민트가 진행되었다면 더 이상 NFT를 발행할 수 없다
            - 구매자에게 잔고가 있는지 확인한다
        */
        require(_tokenIds.current() < LIMITED_NUMBER, "ALL ANIMALS WERE ISSUED");
        require(_currencyContract.balanceOf(msg.sender) >= MINT_PRICE, "balance is exhausted");
        
        // 거래 진행 : ERC-20에 대한 허가 필요
        _currencyContract.transferFrom(msg.sender, owner(), MINT_PRICE);

        /* Race Condition 방지
            거래 성사 후 tokenIds를 먼저 증가시킨다.
        */
        _tokenIds.increment();
        
        // 0부터 저장하기 위해 -1을 빼준다
        uint256 newTokenId = _tokenIds.current() - 1; 


        /* 소유권 기록 부분 
            1. 표준 ERC721 내부 기록
            2. 자체 관리 Struct 내부 기록
            3. 빠른 검색에 사용될 mapping 내부 기록
        */

        // ERC721의 소유권 기록
        _mint(msg.sender, newTokenId);
        // ERC721URIStorage에 URI 기록
        _setTokenURI(newTokenId, MINTED_ANIMALS[newTokenId].tokenUri);

        // AnimalInfo : 자체 관리 Struct
        LIMITED_ANIMALS[newTokenId].donatedAt = donatedAt;
        LIMITED_ANIMALS[newTokenId].minter = msg.sender;
        LIMITED_ANIMALS[newTokenId].owner = msg.sender;
        MINTED_ANIMALS[newTokenId] = LIMITED_ANIMALS[newTokenId];

        /* 빠른 검색에 사용될 mapping 내부 기록
            1. tokenId 기준 데이터 저장
            2. 지갑 주소 기준 데이터 저장
        */
        _donateIdsByWallet[msg.sender].push(newTokenId);

        // 로깅을 위한 Event 발생 부분
        emit Donated(newTokenId, msg.sender);

        return newTokenId;
    }

    /*
    * transferFrom
    * ERC721 토큰의 transferFrom 함수를 override 해서 사용
    * @ param address from : NFT 판매자
    * @ param address to : NFT 구매자
    * @ param uint256 tokenId : 양도할 토큰 animalId
    * @ return newTokenId
    */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override{
        //solhint-disable-next-line max-line-length
        //내용을 덮어씌운다
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");

        _transfer(from, to, tokenId);

        MINTED_ANIMALS[tokenId].owner = to;
    }

    // 무작위의 동물을 뽑기
    // function _createAnimalNft (
    // ) private returns (uint256)
    // {
        
    //     //랜덤으로 동물을 뽑아주는 메서드 -> 4번째 방식에서 수정됨
    //     //uint256 randomAnimalId = _getRandomAnimalId();

    //     /* 유효성 검사
    //         - 모든 동물들이 민트가 진행되었다면 더 이상 NFT를 발행할 수 없다
    //     */
    //     require(_tokenIds.current() <= LIMITED_NUMBER, "ALL ANIMALS WERE MINTED");

    //     //유효성 검사: 민트가 일어나지 않았는지 재확인
    //     require(LIMITED_ANIMALS[randomAnimalId].minter == address(0), "NFT MINTER ALREADY EXISTS");
    
    //     //현재 관리하고 있는 NFT 개수에 1을 추가
    //     uint256 newAnimalId = _tokenIds.current();

    //     require( newAnimalId < LIMITED_NUMBER );       

    //     LIMITED_ANIMALS[randomAnimalId].minter = msg.sender;
    //     LIMITED_ANIMALS[randomAnimalId].owner = msg.sender;

    //     MINTED_ANIMALS[newAnimalId] = LIMITED_ANIMALS[randomAnimalId];

    //     //ERC721의 소유권 기록
    //     _mint(msg.sender, newAnimalId);
    //     //ERC721URIStorage에 URI 기록
    //     _setTokenURI(newAnimalId, MINTED_ANIMALS[newAnimalId].tokenUri);

    //     _tokenIds.increment();

    //     return newAnimalId;
    // }

    
    // function _getRandomAnimalId(  
    // ) private view returns(uint256){
    //     //방법1
    //     //Solidity는 deterministic하다 -> random성을 지양하는 언어
    //     //하지만 keccak256 라이브러리와 abi을 이용해 랜덤성을 부여할 수 있다
    //     //조사해보니 Solidity 환경에서 ArrayList의 add는 가능하지만 delete는 논리삭제만 가능했다
    //     //uint256 random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _tokenIds.current()))) % (MINTED_ANIMALS.length);
    //     //MINTED_ANIMALS.push(LIMITED_ANIMALS[random]);
    //     //delete LIMITED_ANIMALS
        
    //     //방법2
    //     //극한의 조회문을 사용하기로 결정
    //     //새로 배열을 임시로 만들어 뽑기를 진행하려고 했는데 i와 크기 배열 tmp는 임시로 만들 수 있지만 인덱스를 기록하기 위한 j는 임시로 만들기 불가
    //     //uint256[] memory tmp = new uint256[](LIMITED_NUMBER - _tokenIds.current());
    //     //for(uint256 i=0; i<LIMITED_ANIMALS.length; i++){
    //     //    if(LIMITED_ANIMALS[i].minter == address(0)){
    //     //        tmp.push(i); 
    //     //    }
    //     //}
        
    //     //방법3 = 방법1 + 방법2 = view 키워드를 사용해 gas를 최대한 아끼고 리턴값을 밖으로 빼서 gas를 사용한다.
    //     // uint256 random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender,  _tokenIds.current()))) % LIMITED_NUMBER;
    //     //특정 random수를 임의로 정하고 앞으로 이동하면서 가장 가까운 숫자를 번호로 뽑아낸다.
    //     // for(uint256 i = random ; i < random + LIMITED_NUMBER; i++){
    //     //     //민트자가 정해지지 않았다면 채택
    //     //     if(LIMITED_ANIMALS[ i % LIMITED_NUMBER ].minter == address(0)){ 
    //     //         return i;
    //     //     }
    //     // }
    //     // 디버깅 해 본 결과 트랜잭션이 생성되거나 하면서 Race Condition이 매우 많이 발생했고 민트가 정상적으로 수행되지 않았다
    //     // 이것을 방지하기 위해 조건을 만족한다면 바로 tokenIds를 증가시켜 다음 번 오는 사람이 민트를 요청했을 때 충돌하지 않도록 한다



    //     return LIMITED_NUMBER;
    //     //delete LIMITED_ANIMALS
        
    // }

    function _getSpecies(
        uint256 tokenId
    ) public view returns(uint32){
        require( tokenId <= _tokenIds.current(), "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].species;
    } 

    function _getClass(
        uint256 tokenId
    ) public view returns(uint32){
        require( tokenId <= _tokenIds.current(), "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].class;
    }

    function _getTokenUri(
        uint256 tokenId
    ) public view returns(string memory){
        require( tokenId <= _tokenIds.current(), "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].tokenUri;
    }

    //Animal Info 내부 mint값 초기화
    function _setMinter (
        uint256 tokenId,
        address minter 
    ) private {
        require( tokenId <= _tokenIds.current(), "tokenId is a cause of OverFlow");
        MINTED_ANIMALS[tokenId].minter = minter;
    }

    function _getMinter (
        uint256 tokenId
    ) public view returns(address){
        require( tokenId <= _tokenIds.current(), "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].minter;
    }

    function _setOwner (
        uint256 tokenId,
        address newOwner
    ) private {
        MINTED_ANIMALS[tokenId].owner = newOwner;
    }

    function _getOwner (
        uint256 tokenId
    ) public view returns(address){
        require( tokenId <= _tokenIds.current(), "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].owner;
    }

    function _getDonatesByWallet(
        address wallet
    ) public view returns(uint256[] memory){
        return _donateIdsByWallet[wallet];
    }

    function _getLimitedNumber()
    public view returns(uint256){
        return LIMITED_NUMBER;
    }

    function _getTotalMint()
    public view returns(uint256){
        return _tokenIds.current();
    }
}