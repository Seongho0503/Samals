import styled from '@emotion/styled';

export const DetailBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fefefe;

  padding-top: 5rem;
`;

export const LeftBox = styled.div`
  position: absolute;
  top: 1rem;
  left: 0;
  margin-left: 2rem;
  width: 200px;

  div:first-of-type {
    background: #0ca678;
    padding: 12px;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  div:last-of-type {
    color: #000;
    background: #fff;
    text-align: right;
    padding: 12px;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

interface MetaBoxWrapperProps {
  marginLeft?: boolean;
  marginRight?: boolean;
}

export const MetaBoxWrapper = styled.div<MetaBoxWrapperProps>`
  margin-left: ${({ marginLeft }) => marginLeft && '2rem'};
  margin-right: ${({ marginRight }) => marginRight && '2rem'};
`;

interface MetaBoxProps {
  marginBottom?: boolean;
}

export const MetaBox = styled.div<MetaBoxProps>`
  width: 200px;
  margin-bottom: ${({ marginBottom }) => marginBottom && '1rem'};

  div:first-of-type {
    background: #0ca678;
    padding: 12px;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  div:last-of-type {
    color: #000;
    background: #fff;
    text-align: right;
    padding: 12px;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
`;

export const Img = styled.img`
  width: 30%;
  aspect-ratio: 1;
  border-radius: 50%;
  margin-bottom: 3rem;
`;

export const Description = styled.div`
  background: #fff;
  padding: 1rem;
  padding-left: 10rem;
  padding-right: 10rem;
  color: #868e96;
`;
