import { FormEvent, useCallback, useEffect, useState } from "react";
import useInputs from "hooks/useInputs";
import NftAndGraph from "./graphs/NftAndGraph";
// import Menu from "./menu/Menu";
import { Form, FormBox, SubmitButton, Title, TradeContainer } from "./Create.styles";
import FormInputs from "./inputs/FormInputs";
import AskModal from "./modals/AskModal";

export interface TradeInputs {
  seller: string;
  animal: string;
  nft: string;
  price: number;
  promotion: string;
}

const initialValues: TradeInputs = {
  seller: "",
  animal: "",
  nft: "",
  price: 0,
  promotion: "",
};

const Trade = () => {
  const [values, onChange, setValues] = useInputs<TradeInputs>(initialValues);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // api로부터 받은 데이터를 초기값으로 설정하려고 할 경우
    setValues((prevValues) => ({
      ...prevValues,
      seller: "여기에 데이터를 넣어주세요(판매자명)",
      animal: "여기에 데이터를 넣어주세요(동물명)",
      nft: "여기에 데이터를 넣어주세요.(nft명)",
    }));
  }, [setValues]);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <TradeContainer>
        {/* <Menu /> */}

        <Form onSubmit={onSubmit}>
          <Title>거래 등록</Title>
          <FormBox>
            <NftAndGraph />

            <FormInputs values={values} onChange={onChange} />
          </FormBox>

          <SubmitButton>등록</SubmitButton>
        </Form>
      </TradeContainer>

      <AskModal isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default Trade;
