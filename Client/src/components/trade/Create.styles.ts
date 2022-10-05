import styled from "@emotion/styled";

export const TradeContainer = styled.div`
  color: #fefefe;

  height: 100vh;
`;

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

  background: #11998e;
  border: 1px solid #11998e;
  font-size: 1rem;

  display: block;
  margin: 0 auto;

  &:hover {
    background: #1e0d86;
    border: 1px solid #1e0d86;
  }
`;
