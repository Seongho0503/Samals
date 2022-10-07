import styled from "@emotion/styled";

export const FormInputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  padding-top: 0;
  label {
    margin-bottom: 0.5rem;
  }
`;

export const Input = styled.input`
  background: #d9d9d9;
  outline: none;
  margin-left: 3rem;
  border-radius: 0.5rem;
  width: 80%;
  height: 3rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  color: #000000;
`;

export const PromotionTextarea = styled.textarea`
  background: #d9d9d9;
  outline: none;
  border-radius: 0.5rem;
  width: 80%;
  height: 6rem;
  padding: 0.5rem;
  margin-left: 3rem;
  margin-bottom: 1rem;
  color: #fefefe;
`;
