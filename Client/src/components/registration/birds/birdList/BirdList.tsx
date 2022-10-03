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
import { faker } from "@faker-js/faker";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import Detail from "../../detail/Detail";
import Bird from "../bird/Bird";
import empty from "assets/empty.png";

const title = faker.lorem.word();
const text1 = faker.lorem.word();
const text2 = faker.lorem.word();

export interface IBird {
  id: number;
  name: string;
  imgUrl: string;
}

const BirdList = () => {
  const [clickedBird, setClickedBird] = useState<IBird | null>(null);
  const [birds, setBirds] = useState<IBird[]>([]);
  const [isDetail, setIsDetail] = useState(false);

  useEffect(() => {
    const birdArr = [...new Array(32)].map((_, i) => ({
      id: i + 1,
      name: faker.lorem.word(),
      imgUrl: faker.image.image(),
    }));

    setBirds(birdArr);
    setClickedBird(birdArr[0]);
  }, []);

  const openDetail = useCallback(() => setIsDetail(true), []);
  const closeDetail = useCallback(() => setIsDetail(false), []);

  const onClick = useCallback(() => {
    if (!isDetail) return;

    closeDetail();
  }, [closeDetail, isDetail]);

  return (
    <BirdListContainer>
      <Top>
        {/* <Title>{title}</Title> */}
        <Title>내가 구한 야생동물</Title>

        <Block>
          <Circle />
          {/* <span>{text1}</span>
          <span>{text2}</span> */}
          <span>내가 구한 야생동물</span>
          <span>23 마리</span>
        </Block>
      </Top>

      <IllustratedBook>
        {<button onClick={onClick}>{isDetail ? "전국 도감" : "도감보기"}</button>}
      </IllustratedBook>

      {isDetail && clickedBird ? (
        <Detail birdImg={clickedBird.imgUrl} />
      ) : (
        <Box>
          <ScrollBox isEmpty={birds.length === 0}>
            {birds.length ? (
              birds.map((bird) => (
                <Bird key={bird.id} bird={bird} setClickedBird={setClickedBird} />
              ))
            ) : (
              <EmptyImg src={empty} alt='empty' />
            )}
          </ScrollBox>

          <CharacterBox>
            <Button onClick={openDetail}>상세보기</Button>
            <Character src={clickedBird ? clickedBird.imgUrl : birds[0]?.imgUrl} />

            <CharacterMetaBox>
              <CharacterNumber>{clickedBird?.id}</CharacterNumber>
              <CharacterName>{clickedBird?.name}</CharacterName>
            </CharacterMetaBox>
          </CharacterBox>
        </Box>
      )}
    </BirdListContainer>
  );
};

export default BirdList;
