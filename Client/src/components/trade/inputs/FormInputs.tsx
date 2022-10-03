import { TradeInputs } from "../Create";
import { FormInputsWrapper, Input, PromotionTextarea } from "./FormInputs.styles";

interface FormInpusProps {
  values: TradeInputs;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormInputs: React.FC<FormInpusProps> = ({ values, onChange }) => {
  return (
    <FormInputsWrapper>
      <label htmlFor='seller'>판매자 이름</label>
      <Input type='text' id='seller' name='seller' value={values.seller} onChange={onChange} />

      <label htmlFor='animal'>동물명</label>
      <Input type='text' id='animal' name='animal' value={values.animal} onChange={onChange} />

      <label htmlFor='nft'>nft명</label>
      <Input type='text' id='nft' name='nft' value={values.nft} onChange={onChange} />

      <label htmlFor='price'>가격</label>
      <Input type='number' id='price' name='price' value={values.price} onChange={onChange} />

      <label htmlFor='promotion'>홍보 메세지</label>
      <PromotionTextarea
        id='promotion'
        name='promotion'
        value={values.promotion}
        onChange={onChange}
      />
    </FormInputsWrapper>
  );
};

export default FormInputs;
