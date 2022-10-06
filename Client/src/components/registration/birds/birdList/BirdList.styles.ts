import styled from "@emotion/styled";

export const BirdListContainer = styled.div`
  flex: 1;
  background: linear-gradient(to bottom, #e6fcf5 5%, #96f2d7 20%);
  top: 77px;
  // height: calc(100vh - 200px);
  height: calc(100vh - 70px);
`;

export const Top = styled.div`
  display: flex;
`;

export const Title = styled.span`
  color: black;
  width: 279px;
  font-size: 27px;
  align-items: center;
  margin-left: 1rem;
  margin-top: 30px;
  font-family: "GangwonEdu_OTFBoldA";
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(60deg, transparent 1.5rem, #96f2d7 0);
  flex: 1;

  span:first-of-type {
    display: block;
    margin-left: 0.5rem;
  }

  span:last-of-type {
    display: block;
    margin-left: 4rem;
  }
`;

export const Circle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #ccc;
  margin-left: 3rem;
`;

export const IllustratedBook = styled.div`
  margin-left: 0rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  button {
    padding: 0.5rem;
    border-radius: 10px;
    font-family: "GangwonEdu_OTFBoldA";
    font-size: 23px;
    background-color: #0ca678;
    margin-right: 30px;
    cursor: pointer;
  }
`;

export const Box = styled.div`
  display: flex;

  height: calc(100vh - 200px);
`;

interface ScrollBoxProps {
  isEmpty: boolean;
}

export const ScrollBox = styled.div<ScrollBoxProps>`
  overflow-y: scroll;

  padding: 1rem;
  padding-top: 3rem;
  padding-bottom: 20rem;

  display: ${({ isEmpty }) => (isEmpty ? "flex" : "grid")};
  justify-content: ${({ isEmpty }) => (isEmpty ? "center" : "flex-start")};
  align-items: ${({ isEmpty }) => (isEmpty ? "center" : "flex-start")};
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2.5rem;
  width: 66%;
  background: #c3fae8;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 10%;
    background: #38d9a9;

    border-radius: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #c3fae8;
  }
`;

export const EmptyImg = styled.img`
  display: block;
  margin: 0 auto;
`;

export const CharacterBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10%;
  background: linear-gradient(to bottom, #c3fae8, #63e6be);
  height: 100%;
`;

export const Button = styled.button`
  padding: 12px;
  border-radius: 5rem;
  margin-bottom: 1rem;
  font-size: 40px;
  background-color: #0ca678;
  font-family: "GangwonEdu_OTFBoldA";
  cursor: pointer;
`;

export const Character = styled.img`
  width: 80%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ccc;
  margin-bottom: 1rem;
`;

export const CharacterMetaBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 60%;
  border-radius: 0.5rem;
`;

const CharacterMeta = styled.div`
  width: 100%;
  background: #0ca678;
  text-align: center;
  padding: 0.5rem;
  color: #fefefe;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  height: 50px;
  font-size: 35px;
  font-family: "GangwonEdu_OTFBoldA";
`;

export const CharacterNumber = styled(CharacterMeta)``;

export const CharacterName = styled(CharacterMeta)`
  background: #fff;
  color: #000;
  height: 70px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;
