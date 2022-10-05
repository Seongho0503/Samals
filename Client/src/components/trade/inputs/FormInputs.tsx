import { useState } from "react";
import { nft } from "../Create";
import { FormInputsWrapper, Input, PromotionTextarea } from "./FormInputs.styles";
import { useSelector } from "react-redux";
import {
  selectAddress,
} from "../../../redux/slice/UserInfoSlice";

interface FormInpusProps {
  values: nft;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormInputs: React.FC<FormInpusProps> = ({ values, onChange } : FormInpusProps) => {
  const [nft, setNft] = useState(values);
  const [reduxAddress] = useState(useSelector(selectAddress));
 
  return (
    <FormInputsWrapper>
      <label htmlFor='seller'>내 지갑 주소</label>
      <Input type='text' id='seller' name='seller' value={reduxAddress } disabled/>

      <label htmlFor='animal'>동물명</label>
      <Input type='text' id='animal' name='animal' value={values.animalSpecies} disabled/>

      <label htmlFor='animal'>토큰 아이디</label>
      <Input type='text' id='animal' name='animal' value={values.tokenId} onChange={onChange} disabled/>
      
      <label htmlFor='animal'>발행 순서</label>
      <Input type='text' id='animal' name='animal' value={values.nftMintNumber} onChange={onChange} disabled/>

      {/* <label htmlFor='nft'>nft명</label>
      <Input type='text' id='nft' name='nft' value={values.} onChange={onChange} /> */}

      <label htmlFor='price'>가격</label>
      <Input type='number' id='price' name='price' onChange={onChange} />

      <label htmlFor='promotion'>홍보 메세지</label>
      <PromotionTextarea
        id='promotion'
        name='promotion'
        onChange={onChange}
      />
    </FormInputsWrapper>
  );
};

export default FormInputs;
