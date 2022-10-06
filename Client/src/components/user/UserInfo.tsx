import bird from "../../assets/card/Toco.png";
import person from "../../assets/person.png";
import { useState } from "react";
import { useEffect } from "react";
import {
  Bird,
  BirdName,
  Block,
  Circle,
  Circles,
  CircleWrapper,
  Images,
  Meta,
  Person,
  UserInfoContainer,
  UserName,
} from "./UserInfo.styles";
import { faker } from "@faker-js/faker";

const UserInfo = () => {
  const [nftCount, setNftCount] = useState(0);
  return (
    <UserInfoContainer>
      <Block>
        <UserName>{faker.lorem.word()}</UserName>
        <BirdName>{faker.lorem.word()}</BirdName>
        <Images>
          <Bird src={bird} alt='' />
          <Person src={person} alt='' />
        </Images>
      </Block>

      <Meta>
        <span>{faker.lorem.word()}</span>
        <span>{faker.lorem.words()}</span>
      </Meta>

      <Circles>
        <CircleWrapper>
          <Circle />
          <div>{faker.lorem.word()}</div>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <div>{faker.lorem.word()}</div>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <div>{faker.lorem.word()}</div>
        </CircleWrapper>
      </Circles>
    </UserInfoContainer>
  );
};

export default UserInfo;
