import { Description, DetailBox, Img, LeftBox, MetaBox, MetaBoxWrapper } from "./Detail.styles";
import { faker } from "@faker-js/faker";

interface DetailProps {
  birdImg: string;
}

const Detail: React.FC<DetailProps> = ({ birdImg }) => {
  return (
    <>
      <DetailBox>
        <LeftBox>
          <div>토코토칸</div>
          <div>bird#12</div>
        </LeftBox>

        <MetaBoxWrapper marginRight>
          <MetaBox marginBottom>
            <div>서식지</div>
            <div>바다</div>
          </MetaBox>

          <MetaBox>
            <div>생존수</div>
            <div>2000 마리</div>
          </MetaBox>
        </MetaBoxWrapper>

        <Img src={birdImg} alt='' />

        <MetaBoxWrapper marginLeft>
          <MetaBox marginBottom>
            <div>외국이름</div>
            <div>Tococan</div>
          </MetaBox>

          <MetaBox>
            <div>음</div>
            <div>음</div>
          </MetaBox>
        </MetaBoxWrapper>
      </DetailBox>

      {/* <Description>{faker.lorem.paragraphs(8)}</Description> */}
      <Description>
        토코투칸(영어: Toco Toucan, 학명: Ramphastos toco)은 왕부리새과(투칸과)에서 가장 잘 알려져
        있고, 크기도 가장 큰 종이다. 이들은 중부 및 동부 남아메리카에 서식한다. 동물원에서 흔히 볼
        수 있다. 부리는 커서 무거워 보이지만, 실제로는 유공성으로 가벼운 편이다. 부리가 몸의 1/3을
        차지한다. 토코투칸(영어: Toco Toucan, 학명: Ramphastos toco)은 왕부리새과(투칸과)에서 가장
        잘 알려져 있고, 크기도 가장 큰 종이다. 이들은 중부 및 동부 남아메리카에 서식한다. 동물원에서
        흔히 볼 수 있다. 부리는 커서 무거워 보이지만, 실제로는 유공성으로 가벼운 편이다. 부리가 몸의
        1/3을 차지한다토코투칸(영어: Toco Toucan, 학명: Ramphastos toco)은 왕부리새과(투칸과)에서
        가장 잘 알려져 있고, 크기도 가장 큰 종이다. 이들은 중부 및 동부 남아메리카에 서식한다.
        동물원에서 흔히 볼 수 있다. 부리는 커서 무거워 보이지만, 실제로는 유공성으로 가벼운 편이다.
        부리가 몸의 1/3을 차지한다
      </Description>
    </>
  );
};

export default Detail;
