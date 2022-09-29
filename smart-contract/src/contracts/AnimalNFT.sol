// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;
//THIS: 0x5e45178E4DE2FA3fEFA86782Fa3faAf94Fd681A0
//ERC20: 0x4a82464C63ff4252A32674e2B484545cb70CE3EF
//TOKENURI: https://ipfs.io/ipfs/Qmaw3ZREDkRUYuLHCiGgyxettBQDssM8yzhDktKQZfRU17/donate/
//TOTAL_NUMBER: 400
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/*
기부금으로 발행하는 NFT 토큰
구매를 진행한 사람들이게 랜덤한 동물의 소유권이 기록된다.
*/
contract AnimalNft is ERC721URIStorage, Ownable {
    
    // 기부 등록 관리를 위한 Struct
    struct Donate {
        uint256 donatedAt;
        address donator;
    }

    // 동물 정보 보관을 위한 Struct
    struct AnimalInfo {
        string tokenUri; //IPFS에 대한 경로

        // 편의성을 고려한 변수값들
        uint256 donatedAt;
        address minter;
        address owner;
    }
    
    // 이벤트 : 로깅
    event Donated(uint256 indexed newAnimalId, string indexed tokenUri, address indexed donator);
    event Register(string indexed species, string indexed tokenUri, uint256 indexed tmpAnimalNumber);

    // using 키워드 : 내부 라이브러리 사용
    using Counters for Counters.Counter;

    // 현재까지 발급된 토큰의 개수 반환: 뽑기할 때마다 1씩 증가
    Counters.Counter private _tokenIds;

    // constant 키워드를 활용해 명시
    uint256 constant public MINT_PRICE = 500;

    // 변하지 않는 뽑기 마리 수를 명시
    uint256 public constant TOTAL_NUMBER = 400;

    // 랜덤 뽑기 IPFS 주소
    string public constant TOKEN_URI = "https://ipfs.io/ipfs/Qmaw3ZREDkRUYuLHCiGgyxettBQDssM8yzhDktKQZfRU17/donate/";

    // 상점 뽑기 IPFS 주소
    mapping(string => string) market_token_uri;

    // limited_number은 TOTAL_NUMBER 중 남은 동물의 값
    uint256 private limited_number = 400;

    // 동물이 민트되었는지 확인
    mapping(uint256 => bool) private isAnimalMinted;
    mapping(string => mapping (uint256 => bool)) private isStoreAnimalMinted;    

    //기부 시: MINTED_ANIMALS에 기록
    mapping(uint256 => AnimalInfo) private MINTED_ANIMALS;

    // 상점에서 판매하고 있는 동물의 정보
    mapping(string => AnimalInfo[]) private MARKET_ANIMALS;

    // 상점에서 판매하고 있는 동물의 개수 - 기준 species
    mapping(string => uint256) private _marketAnimalNumber;

    // 상점에서 팔고 남은 동물의 개수
    mapping(string => uint256) private _marketLeftAnimalNumber;

    // 특정 지갑에 따른 기부 ID 목록
    mapping(address => uint256[]) private _donateIdsByWallet;

    

    // ERC20 Contract 객체
    IERC20 private _currencyContract;

    /* constructor : 계약서 생성(AnimalNFT, AMT)
        - memory 키워드 사용 : 임시 변수로 사용, 가변성 존재
       @param address currencyContractAddress : 거래를 위한 ERC-20 컨트랙트 주소 받기
       @param string memory tokenUri : 해당 동물의 IPFS 폴더 주소
       @param uint256 memory total_number : 등록할 동물의 총 마리 수
       @parmam bool[] check : 내부에서 사용할 배열, function 내부에서 memory로 생성하기 위해서는 동물의 수를 constant로 한정 지어 사용할 수 있다. 하지만 테스트를 위해 유동적으로 가져가기 위한 목적으로 매개변수로 받아준다.
    */
    constructor(
        address currencyContractAddress
    ) ERC721("AnimalNFT", "AMT") {
        
        // ERC20 Contract 불러오기
        _currencyContract = IERC20(currencyContractAddress);
    }
    
    /*
    * register
    * Donate Struct를 생성해 상점 상품의 동물 정보를 기록
    * @param uint32 memory species : 동물의 종
    * @param string memory tokenUri : 해당 동물의 IPFS 주소
    * @param uint256 tmpAnimalNumber : 해당 동물 종이 등록될 총 개수
    * @ return newTokenId
    */
    function register(
        string memory species,
        string memory tokenUri,
        uint256 tmpAnimalNumber
    ) public returns (string memory){
        
        // 이전에 등록했던 동물은 더 이상 등록할 수 없다. : 이미 등록한 동물의 개수는 실제 개수 + 1 이다.
        require(_marketAnimalNumber[species] == 0, "THIS KIND OF ANIMAL WAS ALREADY ISSUED");
        require(tmpAnimalNumber > 0, "NO ANIMAL DATA EXISTS");
        
        //최초 발행 기록용
        _marketAnimalNumber[species] = tmpAnimalNumber;
        //남은 상품 수 
        _marketLeftAnimalNumber[species] = tmpAnimalNumber;

        market_token_uri[species] = tokenUri;

        emit Register(species, tokenUri, tmpAnimalNumber);
        return species;
    }

    /*
    * buy
    * 상점에서 구매 후 mint 수행
    * @ param uint256 donatedAt : UNIX TIME STAMP 기반한 시간 정보 기록
    * @ return newTokenId
    */
    function buy (
            string memory species,
            uint256 tmpAnimalNumber,
            uint256 donatedAt
    ) public returns (uint256){
            require(_marketLeftAnimalNumber[species] > 0, "ALL ANIMALS WERE ISSUED");
            require(isStoreAnimalMinted[species][tmpAnimalNumber] == false, "ALREADY ISSUED");
            require(_currencyContract.balanceOf(msg.sender) >= MINT_PRICE, "balance is exhausted");
            
            _currencyContract.transferFrom(msg.sender, owner(), MINT_PRICE);
            isStoreAnimalMinted[species][tmpAnimalNumber] = true;
            // 먼저 배분
            uint256 newTokenId = _tokenIds.current();

            _tokenIds.increment();

            // ERC721의 소유권 기록
            _mint(msg.sender, newTokenId);
            
            string memory tmpString = string.concat(market_token_uri[species], "/", Strings.toString(tmpAnimalNumber), ".json");
            // ERC721URIStorage에 URI 기록
            _setTokenURI(newTokenId, tmpString);

            AnimalInfo memory tmpAnimalInfo = AnimalInfo(
                tmpString, donatedAt, msg.sender, msg.sender
            );

            // AnimalInfo : 자체 관리 Struct
            MINTED_ANIMALS[newTokenId] = tmpAnimalInfo;

            /* 빠른 검색에 사용될 mapping 내부 기록
                1. tokenId 기준 데이터 저장
                2. 지갑 주소 기준 데이터 저장
            */
            _donateIdsByWallet[msg.sender].push(newTokenId);

            // 로깅을 위한 Event 발생 부분
            
            emit Donated(newTokenId, tmpString, msg.sender);
            return newTokenId;
    }

    /*
    * donate
    * uint256 donatedAt 민트 시간
    * uint256 animalId 민트 번호
    * @ return newTokenId
    */
    function donate (
        uint256 donatedAt,
        uint256 animalId
    )
    public returns (uint256){

        /* 유효성 검사
            - 모든 동물들이 민트가 진행되었다면 더 이상 NFT를 발행할 수 없다
            - 구매자에게 잔고가 있는지 확인한다
        */
        require(0 < limited_number, "ALL ANIMALS WERE ISSUED");
        require(isAnimalMinted[animalId] == false, "ALREADY ISSUED ONE");
        // tokenId 작동 방식 수정할 것
        require(_currencyContract.balanceOf(msg.sender) >= MINT_PRICE, "balance is exhausted");
        
        // 거래 진행 : ERC-20에 대한 허가 필요
        _currencyContract.transferFrom(msg.sender, owner(), MINT_PRICE);
        isAnimalMinted[animalId] = true;
        /* Race Condition 방지
            거래 성사 후 tokenIds를 먼저 증가시킨다.
        */
        uint256 newTokenId = _tokenIds.current();
        _tokenIds.increment();
        -- limited_number;
        
        /* 소유권 기록 부분 
            1. 표준 ERC721 내부 기록
            2. 자체 관리 Struct 내부 기록
            3. 빠른 검색에 사용될 mapping 내부 기록
        */

        // ERC721의 소유권 기록
        _mint(msg.sender, newTokenId);

        string memory tmpString = string.concat(TOKEN_URI, Strings.toString(animalId), ".json");
        
        // ERC721URIStorage에 URI 기록
        _setTokenURI(newTokenId, tmpString);

        // AnimalInfo : 자체 관리 Struct
        AnimalInfo memory tmpAnimalInfo = AnimalInfo(
                tmpString, donatedAt, msg.sender, msg.sender
            );
        
        MINTED_ANIMALS[newTokenId] = tmpAnimalInfo;

        /* 빠른 검색에 사용될 mapping 내부 기록
            1. tokenId 기준 데이터 저장
            2. 지갑 주소 기준 데이터 저장
        */
        _donateIdsByWallet[msg.sender].push(newTokenId);

        // 로깅을 위한 Event 발생 부분
        emit Donated(newTokenId, tmpString, msg.sender);

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

    /*
    * _getMarketAnimalNumber
    * 최초 상점 발급 개수 조회
    * @ param string species : 동물 종류
    * @ return uint256 : 동물의 최초 발급 수
    */
    function _getMarketAnimalNumber(
        string memory species
    ) public view returns(uint256){
        return _marketAnimalNumber[species];
    } 

    /*
    * _getMarketLeftAnimalNumber
    * 남은 상점 발급 개수 조회
    * @ param string species : 동물 종류
    * @ return uint256 : 동물의 남은 발급 수
    */
    function _getMarketLeftAnimalNumber(
        string memory species
    ) public view returns(uint256){
        return _marketLeftAnimalNumber[species];
    } 

    /*
    function _getSpecies(
        uint256 tokenId
    ) public view returns(string memory){
        require( tokenId <= _tokenIds.current(), "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].species;
    } 

    function _getClass(
        uint256 tokenId
    ) public view returns(string memory){
        require( tokenId <= _tokenIds.current(), "tokenId is a cause of OverFlow");
        return MINTED_ANIMALS[tokenId].class;
    }
    */
    
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
        return limited_number;
    }

    function _getTotalMint()
    public view returns(uint256){
        return _tokenIds.current();
    }
}