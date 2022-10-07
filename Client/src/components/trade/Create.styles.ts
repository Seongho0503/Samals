import styled from "@emotion/styled";

export const TradeContainer = styled.div`
  background: #e7e7e7;
  color: #000000;
  height: 100vh;
`;

export const Nftgroup = styled.div`
  display: flex;
`;

export const Image = styled.img``;

export const Form = styled.form`
  padding: 1rem;
  width: 60%;
  margin: 0 auto;
  margin-top: 5rem;
`;

export const Title = styled.span`
  display: block;
  margin-bottom: 1rem;
  color: #00ed28;
  font-size: 1.5rem;
  margin-left: 12px;
`;

export const FormBox = styled.div`
  display: flex;
  margin-bottom: 3rem;
`;

export const SubmitButton = styled.button`
  width: 140px;
  height: 3rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;

  background: #d9d9d9;
  font-size: 1.5rem;

  display: block;
  margin: 0 auto;

  &:hover {
    background: #a8a8a8;
  }
`;
