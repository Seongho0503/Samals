import styled from "@emotion/styled";

export const UserInfoContainer = styled.div`
  width: 30%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  /* background: #ffe8cc; */
  background: #fff;
  // background: linear-gradient(-45deg, #ffe8cc, #ffd8a8);
`;

export const Block = styled.div`
  position: relative;
`;

export const UserName = styled.div`
  font-size: 2rem;
  font-family: "GangwonEdu_OTFBoldA";
  margin: 20px 20px;
`;

export const BirdName = styled.div`
  font-size: 1.2rem;
  font-family: "GangwonEdu_OTFBoldA";
`;

export const BirdSum = styled.div`
  font-size: 20px;
  font-family: "GangwonEdu_OTFBoldA";
`;

export const Images = styled.div`
  position: absolute;
  top: 0;
  left: 5rem;
`;

export const Bird = styled.img`
  width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Person = styled.img`
  height: 400px;
`;

export const Meta = styled.div`
  padding-top: 278px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Circles = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CircleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: #ccc;
  margin-bottom: 10px;
`;
