import styled from "@emotion/styled";

export const BridContainer = styled.div`
  position: relative;
`;

export const ImageWrapper = styled.div`
  cursor: pointer;

  img {
    border-radius: 50%;

    width: 100%;
    aspect-ratio: 1;
  }
`;

export const HoverName = styled.span`
  position: absolute;
  top: -2.5rem;
  left: 50%;
  width: 100%

  transform: translateX(-50%);
  padding: 0.5rem;
  border-radius: 4px;
  background: #20c997;
  color: #fefefe;
`;
