import { FormEvent, useCallback, useEffect, useState } from "react";
import NftAndGraph from "./graphs/NftAndGraph";
// import Menu from "./menu/Menu";
import {
  Form,
  FormBox,
  SubmitButton,
  Title,
  TradeContainer,
  TradeGrid,
  TradeGrid2,
  TradeGrid3,
  Image,
  Nftgroup,
  Text,
  Text2,
  Text3,
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
import { createSale, animalSaleApprove, recordSale } from "../../utils/event";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MetaLoadingScreen } from "../../api";

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
  // alert 관련
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("success");
  const [title, setTitle] = useState("This is a alert");

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>("");

  const [address] = useState<string>(useSelector(selectAddress));
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
  const notify = (text: string) =>
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const registNFT = async () => {
    let createSaleV: string = "";
    if (address === "" || address === undefined) {
      notify("지갑 로그인이 필요합니다.");
      return;
    } else if (confirmEathAnimal.nftImgUrl === "") {
      notify("판매할 NFT를 선택해주세요.");
      return;
    } else if (price === 0) {
      notify("가격은 0원 이상이어야 합니다.");
      return;
    }

    console.log(
      "토큰 아이디, 가격, 시작 시간, 종료 시간: ",
      confirmEathAnimal.tokenId,
      price,
      Date.now(),
      Date.now() * 2
    );
    setLoadingText("판매생성 요청!");
    setLoading(true);
    //토큰 아이디, 가격, 시작 시간, 종료 시간
    try {
      //       export var createSale = async (animalId, price, startedAt, endedAt) => {
      //   // 1 : 글을 등록하고 글의 주소를 받아온다.
      //   const _createSale = await nftSaleManagerContract.methods
      //     .createSale(animalId, price, startedAt, endedAt)
      //     .send({ from: window.ethereum.selectedAddress })
      //     .then("1", console.log); //유저 지갑 주소를 넣어줄 것
      //   console.log("판매 contract 주소", _createSale.events.SaleCreated.returnValues.newNftSaleAddress);

      //   // 2 : 글에 대한 NFT 양도 허가를 진행한다.
      //   const res1 = await animalNftContract.methods
      //     .approve(_createSale.events.SaleCreated.returnValues.newNftSaleAddress, animalId)
      //     .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것
      //   console.log("1 : NFT 양도 허가", res1);

      //   // 게시글 솔리디티 등록
      //   const res2 = await nftSaleManagerContract.methods
      //     .recordSale(animalId, _createSale.events.SaleCreated.returnValues.newNftSaleAddress)
      //     .send({ from: window.ethereum.selectedAddress }); //유저 지갑 주소를 넣어줄 것
      //   console.log("2 : 게시글 등록", res2);

      //   return _createSale.events.SaleCreated.returnValues.newNftSaleAddress;
      // };

      await createSale(confirmEathAnimal.tokenId, price, Date.now(), Date.now() * 2)
        .then((res) => {
          notify("판매생성 완료!");
          setLoadingText("판매승인 요청!");
          console.log("saleContractAddress: ", res);
          console.log("saleDescription: ", promotion);
          console.log("salePrice: ", price);
          console.log("sellerAddress: ", address);
          console.log("tokenId: ", confirmEathAnimal.tokenId);
          createSaleV = res;
        })
        .catch((err) => {
          console.log(err);
        });

      await animalSaleApprove(createSaleV, confirmEathAnimal.tokenId).then(() => {
        notify("판매승인 완료!");
        setLoadingText("판매기록 요청!");
      });

      await recordSale(confirmEathAnimal.tokenId, createSaleV).then(() => {
        setLoading(false);
        notify("판매기록 완료!");
      });
    } catch (e) {
      setLoading(false);
      notify("등록 중 문제 발생!");
      navigate("/trade");
    }

    await axios({
      method: "POST",
      url: "api/sale/create",
      data: {
        saleContractAddress: createSaleV.toLowerCase(),
        saleDescription: promotion,
        salePrice: price,
        sellerAddress: address.toLowerCase(),
        tokenId: confirmEathAnimal.tokenId,
      },
    })
      .then((res) => {
        console.log(res);
        notify("등록 완료!");
        navigate("/trade");
      })
      .catch((err) => {
        console.log(err);
        notify("알 수 없는 이유로 등록 실패!");
      });
  };

  return (
    <>
      <TradeContainer>
        <Image src={Bg} width='100%'></Image>
        <TradeGrid>
          <Text>판매등록</Text>
          {/* <Menu /> */}
          <TradeGrid2>
            <Form onSubmit={onSubmit}>
              <FormBox>
                {/* NFT 이미지 및 NFT 가져오기 버튼 */}
                <NftAndGraph
                  setIsModalOpen={setIsModalOpen}
                  nftImgUrl={confirmEathAnimal.nftImgUrl}
                />
                <FormInputs values={confirmEathAnimal} onChange={onChange} />
              </FormBox>
              <TradeGrid3></TradeGrid3>
              <SubmitButton onClick={registNFT}>판매 등록</SubmitButton>
            </Form>
          </TradeGrid2>
        </TradeGrid>
        <TradeGrid3>
          <Text2>유의사항</Text2>
          <Text3>
            ㆍ NFT 등록은 이탈없이 총 3번의 MetaMask Transaction이 일어나야 등록이 완료됩니다.
          </Text3>
          <Text3>
            ㆍ 보유하고 있는 NFT를 기준으로 거래가 진행되며, 거래 데이터는 블록체인에 저장됩니다.
          </Text3>
        </TradeGrid3>
        <TradeGrid3></TradeGrid3>
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
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default Trade;
