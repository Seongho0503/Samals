import { useState } from "react";
import { nft } from "../Create";
import {
  FormInputsWrapper,
  Input,
  PromotionTextarea,
  Text,
  Text2,
  Div,
  Span,
} from "./FormInputs.styles";
import { useSelector } from "react-redux";
import { selectAddress } from "../../../redux/slice/UserInfoSlice";
import { FaFrog } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CustomTextField = styled(TextField)({}) as typeof TextField;

interface FormInpusProps {
  values: nft;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormInputs: React.FC<FormInpusProps> = ({ values, onChange }: FormInpusProps) => {
  const [nft, setNft] = useState(values);
  const [reduxAddress] = useState(useSelector(selectAddress));
  console.log(values);

  return (
    <FormInputsWrapper>
      <Text2>
        {values.animalSpecies} #{values.nftMintNumber}
      </Text2>
      {/* <Text>{values.animalSpecies}</Text> */}
      <Text>판매 설명</Text>
      <PromotionTextarea id='promotion' name='promotion' onChange={onChange} />

      <Text>판매 가격</Text>
      {/* <TextField id='seller' name='seller' value={reduxAddress} variant='outlined' disabled /> */}
      <Div>
        <Input
          type='number'
          id='price'
          name='price'
          onChange={onChange}
          placeholder='1token 이상 입력해주세요.'
        />
        <Span>ACE</Span>
      </Div>
      {/* <label htmlFor='seller'>내 지갑 주소</label>
      <Input type='text' id='seller' name='seller' value={reduxAddress} disabled />
      <label htmlFor='animal'>동물명</label>
      <Input type='text' id='animal' name='animal' value={values.animalSpecies} disabled />

      <label htmlFor='animal'>토큰 아이디</label>
      <Input
        type='text'
        id='animal'
        name='animal'
        value={values.tokenId}
        onChange={onChange}
        disabled
      />

      <label htmlFor='animal'>발행 순서</label>
      <Input
        type='text'
        id='animal'
        name='animal'
        value={values.nftMintNumber}
        onChange={onChange}
        disabled
      /> */}

      {/* <label htmlFor='nft'>nft명</label>
      <Input type='text' id='nft' name='nft' value={values.} onChange={onChange} /> */}
    </FormInputsWrapper>
  );
};

export default FormInputs;
