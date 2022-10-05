import { FormEvent, useCallback, useEffect, useState } from "react";
import NftAndGraph from "./graphs/NftAndGraph";
// import Menu from "./menu/Menu";
import {
  Form,
  FormBox,
  SubmitButton,
  Title,
  TradeContainer,
  Image,
  Nftgroup,
} from "./Create.styles";
import FormInputs from "./inputs/FormInputs";
import { useSelector } from "react-redux";
import { selectAddress } from "../../redux/slice/UserInfoSlice";
import axios from "axios";
import {
  AskModalBlock,
  Box,
  Button,
  ButtonGroup,
  ConfirmDialog,
  ConfirmText,
  Meta,
  modalStyles,
  TopBar,
  NftCard,
} from "./modals/Modal.styles";
import { CloseOutlined } from "@ant-design/icons";
import Modal from "react-modal";
import Bg from "../../assets/create.png";
import { useNavigate } from "react-router-dom";
import { createSale } from "../../utils/event";
const initialValues: nft = {
  tokenId: 0,
  nftMintNumber: 0,
  nftImgUrl: "",
  animalSpecies: "",
  getTime: "",
};

export interface nft {
  tokenId: number;
  nftMintNumber: number;
  nftImgUrl: string;
  animalSpecies: string;
  getTime: string;
}

const Trade = () => {
  const [address] = useState(useSelector(selectAddress));
  const [price, setPrice] = useState(0);
  const [promotion, setPromotion] = useState("");
  const navigate = useNavigate();
  //현재 나의 주소 저장
  //NFT리스트 저장
  const [nftList, setNftList] = useState<nft[]>();
  const [confirmEathAnimal, setConfirmEathAnimal] = useState<nft>(initialValues);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  //Nft 선택 모달이 열렸을 때 nftList 호출
  useEffect(() => {
    //창이 열릴 때 리스트 호출
    if (isModalOpen === true) {
      getMyNftList();
    }
  }, [isModalOpen]);

  // useEffect(() => {
  // }, [confirmEathAnimal])

  //입력값에 대한 출력 확인
  const onChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(e);
    if (e.currentTarget.id === "price") {
      setPrice(Number(e.currentTarget.value));
    } else if (e.currentTarget.id === "promotion") {
      setPromotion(e.currentTarget.value);
      console.log(promotion);
    }
  };
  //본인 MFT 리스트 호출 후 저장
  const getMyNftList = async () => {
    await axios({
      url: `api/mypage/${address}/nft`,
      method: "GET",
    }).then((res) => {
      setNftList(res.data);
      console.log("res.data: ", res.data);
    });
  };

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const onSale = useCallback(() => setIsCompleted(true), []);
  const onClose = useCallback(() => {
    closeModal();
    if (isCompleted) {
      setIsCompleted(false);
    }
  }, [closeModal, isCompleted]);

  const registNFT = () => {
    if (confirmEathAnimal.nftImgUrl === "") {
      alert("보유중인 NFT를 선택해주세요.");
      return;
    }
    console.log(
      "토큰 아이디, 가격, 시작 시간, 종료 시간: ",
      confirmEathAnimal.tokenId,
      price,
      Date.now(),
      Date.now() * 2
    );

    //토큰 아이디, 가격, 시작 시간, 종료 시간
    createSale(confirmEathAnimal.tokenId, price, Date.now(), Date.now() * 2)
      .then((res) => {
        console.log(res);
        axios({
          method: "POST",
          url: "api/sale/create",
          data: {
            saleContractAddress: res,
            saleDescription: promotion,
            salePrice: price,
            sellerAddress: address,
            tokenId: confirmEathAnimal.tokenId,
          },
        })
          .then((res) => {
            console.log(res);
            alert("등록 완료");
            navigate("/trade");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <TradeContainer>
        {/* <Menu /> */}
        <Image src={Bg} width='100%'></Image>
        <Form onSubmit={onSubmit}>
          <FormBox>
            {/* NFT 이미지 및 NFT 가져오기 버튼 */}
            <NftAndGraph setIsModalOpen={setIsModalOpen} nftImgUrl={confirmEathAnimal.nftImgUrl} />
            <FormInputs values={confirmEathAnimal} onChange={onChange} />
          </FormBox>
          <SubmitButton onClick={registNFT}>등록</SubmitButton>
        </Form>
      </TradeContainer>

      {/* 모달 창으로 동물 선택 */}
      <Modal isOpen={isModalOpen} onRequestClose={onClose} style={modalStyles} ariaHideApp={false}>
        <AskModalBlock>
          {/* <TopBar onClick={onClose}>
            <CloseOutlined />
          </TopBar> */}
          <Nftgroup>
            {isCompleted ? (
              <ConfirmDialog>
                <ConfirmText>판매 등록이 완료되었습니다.</ConfirmText>
                <Button onClick={onClose} marginAuto>
                  확인
                </Button>
              </ConfirmDialog>
            ) : (
              nftList?.map((data) => {
                return (
                  <NftCard>
                    <div key={data.nftImgUrl}>
                      <Box src={data.nftImgUrl} />
                      <Meta>
                        {/* <span>동물 종</span > */}
                        <span>{data.animalSpecies}</span>
                      </Meta>
                      <ButtonGroup>
                        <Button
                          onClick={() => {
                            onSale();
                            setConfirmEathAnimal(data);
                          }}
                          marginRight
                        >
                          판매
                        </Button>
                      </ButtonGroup>
                    </div>
                  </NftCard>
                );
              })
            )}
          </Nftgroup>
        </AskModalBlock>
      </Modal>
      {/* <AskModal nftList={nftList} isModalOpen={isModalOpen} closeModal={closeModal} /> */}
    </>
  );
};

export default Trade;
