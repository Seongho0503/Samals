import bird from "assets/image_readtop.jpeg";
import person from "assets/person.png";
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
  return (
    <UserInfoContainer>
      <Block>
        <UserName>권성호</UserName>
        <BirdName>121eqweqwdqwdqwdqwd</BirdName>
        <Images>
          <Bird src={bird} alt='' />
          <Person src={person} alt='' />
        </Images>
      </Block>

      <Meta>
        <span>내가 찜한 개수</span>
        <span>23개</span>
      </Meta>

      <Circles>
        <CircleWrapper>
          <Circle />
          <div>동물보호입문</div>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <div>동물보호중급</div>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <div>동물보호마스터</div>
        </CircleWrapper>
      </Circles>
    </UserInfoContainer>
  );
};

export default UserInfo;
