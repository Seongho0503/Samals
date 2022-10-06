import {
  BirdListContainer,
  Block,
  Box,
  Button,
  Character,
  CharacterBox,
  CharacterMetaBox,
  CharacterName,
  CharacterNumber,
  Circle,
  ScrollBox,
  IllustratedBook,
  Title,
  Top,
  EmptyImg,
} from "./BirdList.styles";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddress,
  setAddress,
  setUserBio,
  setUserId,
  setUserPFPAddress,
} from "../../../../redux/slice/UserInfoSlice";
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import Detail from "../../detail/Detail";
import Bird from "../bird/Bird";
import empty from "assets/empty (5).png";
import axios from "axios";
import { CompassOutlined } from "@ant-design/icons";
import Like, { ILike } from "../like/Like";
import TradeChart3 from "components/NftDetail/TradeChart3";

const title = faker.lorem.word();
const text1 = faker.lorem.word();
const text2 = faker.lorem.word();

export interface IBird {
  id: number;
  name: string;
  nftImgUrl: string;
  getTime: string;
  animalSpecies: string;
  nftMintNumber: string;
  tokenId: number;
}

const BirdList = () => {
  const [clickedBird, setClickedBird] = useState<IBird | null>(null);
  const [clickedLike, setClickedLike] = useState<ILike | null>(null);

  const [birds, setBirds] = useState<IBird[]>([]);
  const [isDetail, setIsDetail] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isDonation, setIsDonation] = useState(false);
  const [address, setAddress] = useState(useSelector(selectAddress));
  const [likeList, setLikeList] = useState([]);
  const [myList, setMyList] = useState([]);
  const [animal, setAnimal] = useState("");
  const [tokenId, setTokenId] = useState();

  // 나의 nft 조회
  const myNftList = async (address: string) => {
    try {
      await axios.get(`/api/mypage/${address}` + `/nft`).then((res) => {
        console.log("마의리스트", res.data);
        console.log(`지갑`, address);
        setMyList(res.data);
        setAnimal(res.data.animalSpecies);

        //console.log("피까츄", res.data[0].animalSpecies);
        //setSaleDate(res.data[0].saleCompletedTime);
        // console.log(saleDetail);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };

  //내 좋아요 리스트 조회
  const myLikeList = async (address: string) => {
    try {
      await axios.get(`/api/mypage/${address}` + `/like`).then((res) => {
        //console.log("나의좋아요리스트", res);
        setLikeList(res.data);
        console.log(`리스트 `, res.data);
        //setSaleDate(res.data[0].saleCompletedTime);
        // console.log(saleDetail);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };

  useEffect(() => {
    myNftList(address);
    myLikeList(address);
    const birdArr = [...new Array(32)].map((_, i) => ({
      id: i + 1,
      name: faker.lorem.word(),
      imgUrl: faker.image.image(),
    }));

    //setBirds(birdArr);
    //setClickedBird(birdArr[0]);
    // 뿌려줄 데이터 셋팅
    //setBirds(likeList); // 좋아요 리스트
    setBirds(myList); // 마의 nft 리스트
  }, []);

  const openDetail = useCallback(() => setIsDetail(true), []);
  const closeDetail = useCallback(() => setIsDetail(false), []);
  const storeProfile = useCallback((tokenid: any) => setTokenId(tokenId), []);

  const openLike = useCallback(() => {
    setIsDonation(false);
    setIsLike(true);
  }, []);
  const closeLike = useCallback(() => setIsLike(false), []);

  const onClick = useCallback(() => {
    if (isDonation) setIsDonation(false);
    if (isLike) closeLike();
    if (!isDetail) return;

    closeDetail();
  }, [closeDetail, isDetail, isLike, isDonation]);

  const onLike = useCallback(() => {
    if (isDonation) setIsDonation(false);
    if (!isLike) return;

    closeLike();
  }, [closeLike, isLike]);

  return (
    <BirdListContainer>
      <Top>
        {/* <Title>{title}</Title> */}
        <Title>내가 구한 멸종 위기 동물</Title>

        <Block>
          {/* <Circle /> */}
          {/* <span>{text1}</span>
          <span>{text2}</span> */}
          {/* <span>현재 보유 NFT 수</span>
          <span>23 마리</span> */}
        </Block>
      </Top>

      <IllustratedBook>
        {<button onClick={onClick}>{isDetail ? "전국 도감" : "도감보기"}</button>}
        {<button onClick={openLike}> 좋아요</button>}
        {<button onClick={() => setIsDonation(true)}> 기부 내역</button>}
        {/* {<button onClick={onClick}> 구매 내역</button>} */}
      </IllustratedBook>
      {isDetail && clickedBird ? (
        <Detail
          birdImg={clickedBird.nftImgUrl}
          animal={clickedBird.animalSpecies}
          // tokenid={clickedBird.tokenid}
          // tokenid={clickedBird.tokenid}
        />
      ) : (
        <Box>
          {isDonation ? null : isLike ? (
            <ScrollBox isEmpty={likeList.length === 0}>
              {likeList.length ? (
                likeList.map((like, index) => (
                  <Like key={index} like={like} setClickedLike={setClickedLike} />
                  //
                ))
              ) : (
                <EmptyImg src={empty} alt='empty' />
              )}
            </ScrollBox>
          ) : (
            <ScrollBox isEmpty={myList.length === 0}>
              {myList.length ? (
                myList.map((like, index) => (
                  <Bird key={index} bird={like} setClickedBird={setClickedBird} />
                  //
                ))
              ) : (
                <EmptyImg src={empty} alt='empty' />
              )}
            </ScrollBox>
          )}
          {/* {isDetail && clickedBird ? (
        <Detail birdImg={clickedBird.imgUri} />
      ) : (
        <Box>
          <ScrollBox isEmpty={birds.length === 0}>
            {likeList.length ? (
              likeList.map((like, index) => (
                <Bird key={index} bird={like} setClickedBird={setClickedBird} />
              ))
            ) : (
              <EmptyImg src={empty} alt='empty' />
            )}
          </ScrollBox> */}
          {/* {birds.length ? (
              birds.map((bird) => (
                <Bird key={bird.id} bird={bird} setClickedBird={setClickedBird} />
              ))
            ) : (
              <EmptyImg src={empty} alt='empty' />
            )} */}

          {isDonation ? (
            <TradeChart3 />
          ) : (
            // <div>
            //   {[...new Array(30)].map(() => (
            //     <div>Test</div>
            //   ))}
            // </div>
            <CharacterBox>
              <Button onClick={openDetail}>상세보기</Button>
              {/* <Button onClick={storeProfile}>프로필 설정</Button> */}
              <Character
                src={
                  isLike
                    ? clickedLike
                      ? clickedLike?.imgUri
                      : (likeList[0] as { imgUri: string })?.imgUri
                    : clickedBird
                    ? clickedBird?.nftImgUrl
                    : birds[0]?.nftImgUrl
                }
              />
              <CharacterMetaBox>
                <CharacterNumber>
                  {clickedBird?.animalSpecies}#{clickedBird?.nftMintNumber}
                </CharacterNumber>
                <CharacterName>{clickedBird?.getTime}</CharacterName>
                {/* <CharacterName>{clickedBird?.name}</CharacterName> */}
              </CharacterMetaBox>
            </CharacterBox>
          )}
        </Box>
      )}
    </BirdListContainer>
  );
};

export default BirdList;
