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
  background: #11998e;
  outline: none;
  border: 1px solid #1e0d86;
  border-radius: 0.5rem;
  width: 100%;
  height: 2rem;
  padding: 0.5rem;

  margin-bottom: 1rem;
  color: #fefefe;
`;

export const PromotionTextarea = styled.textarea`
  background: #11998e;
  outline: none;
  border: 1px solid #1e0d86;
  border-radius: 0.5rem;
  width: 100%;
  height: 6rem;
  padding: 0.5rem;

  margin-bottom: 1rem;
  color: #fefefe;
`;
