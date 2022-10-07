import { Description, DetailBox, Img, LeftBox, MetaBox, MetaBoxWrapper } from "./Detail.styles";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
import { getDescription } from "../../../api.js";

interface DetailProps {
  birdImg: string;
  animal: string;
}
interface AnimalData {
  animalClass: "";
  animalDescription: "";
  animalHabitat: "";
  animalNameEn: "";
  animalNameKr: "";
  animalTotal: "";
}

const Detail = ({ birdImg, animal }: DetailProps) => {
  const [animals, setAnimals] = useState({
    animalClass: "",
    animalDescription: "",
    animalHabitat: "",
    animalNameEn: "",
    animalNameKr: "",
    animalTotal: "",
  });
  useEffect(() => {
    console.log("애니" + animal);
    getDescription(animal).then((data: any) => {
      // console.log("뜨는건가: ", data.data);
      setAnimals({
        animalClass: data.data.animalClass,
        animalDescription: data.data.animalDescription,
        animalHabitat: data.data.animalHabitat,
        animalNameEn: data.data.animalNameEn,
        animalNameKr: data.data.animalNameKr,
        animalTotal: data.data.animalTotal,
      });
      //console.log(animals);
    });
  }, []);

  return (
    <>
      <DetailBox>
        <LeftBox>
          <div>NFT 고유번호</div>
          <div>bird#12 db추가물어보기</div>
        </LeftBox>

        <MetaBoxWrapper marginRight>
          <MetaBox marginBottom>
            <div>한국 이름</div>
            <div>{animals.animalNameKr}</div>
          </MetaBox>

          <MetaBox>
            <div>영어 이름</div>
            <div>{animals.animalNameEn}</div>
          </MetaBox>
        </MetaBoxWrapper>

        <Img src={birdImg} alt='' />

        <MetaBoxWrapper marginLeft>
          <MetaBox marginBottom>
            <div>생존 수</div>
            <div>{animals.animalTotal}</div>
          </MetaBox>

          <MetaBox>
            <div>서식지</div>
            <div>{animals.animalHabitat}</div>
          </MetaBox>
        </MetaBoxWrapper>
      </DetailBox>
      {/* <Description>{faker.lorem.paragraphs(8)}</Description> */}
      <Description>{animals.animalDescription}</Description>
    </>
  );
};

export default Detail;
