import styled from "@emotion/styled";

export const NftAndGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

export const NftImg = styled.img`
  width: 400px;
  background: #fff;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  width: 140px;
  height: 3rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  background: #d9d9d9;

  font-size: 1rem;
  &:hover {
    background: #a8a8a8;
  }
`;

export const Graph = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #fff;
  border-radius: 1rem;
`;
