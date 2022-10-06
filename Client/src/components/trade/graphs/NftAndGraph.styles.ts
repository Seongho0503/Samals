import styled from "@emotion/styled";

export const NftAndGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 4rem;
  width: 45%;
`;

export const NftImg = styled.img`
  width: 400px;

  background: #fff;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  width: 90%;
  height: 60px;
  border-radius: 0.8rem;
  margin-top: 1rem;
  background: #2d68c8;
  font-family: "김포평화B";
  color: #ffffff;
  font-size: 2rem;
  &:hover {
    background: #00358b;
  }
`;

export const Graph = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #fff;
  border-radius: 1rem;
`;
