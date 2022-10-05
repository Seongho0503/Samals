import { CloseOutlined } from '@ant-design/icons';
import { ListProps } from '@mui/material';
import React, { ReactNode, useCallback, useState } from 'react';
import Modal from 'react-modal';
import { List } from 'reactstrap';

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
} from './Modal.styles';

interface nft{
  tokenId: BigInteger,
  nftMintNumber: BigInteger,
  nftImagUrl: String,
  animalSpecies: String,
  getTime:String
}

interface AskModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  nftList: nft[];
}

const AskModal = ({ nftList, isModalOpen, closeModal } : AskModalProps) => {
  console.log("nftList: ",nftList);
  
  const [isCompleted, setIsCompleted] = useState(false);

  const onSale = useCallback(() => setIsCompleted(true), []);
  const onClose = useCallback(() => {
    closeModal();
    if (isCompleted) {
      setIsCompleted(false);
    }
  }, [closeModal, isCompleted]);

  return (
    <Modal isOpen={isModalOpen} onRequestClose={onClose} style={modalStyles} ariaHideApp={false}>
      <AskModalBlock>
        <TopBar onClick={onClose}>
          <CloseOutlined />
        </TopBar>

        {isCompleted ? (
          <ConfirmDialog>
            <ConfirmText>판매 등록이 완료되었습니다.</ConfirmText>
            <Button onClick={onClose} marginAuto>
              확인
            </Button>
          </ConfirmDialog>
        ) : (
            ()=>{return (nftList.map((data, index)=>{}))}
          // <>
          //   <Box />

          //   <Meta>
          //     <span>동물명</span>
          //     <span>값</span>
          //   </Meta>

          //   <Meta>
          //     <span>가격</span>
          //     <span>값</span>
          //   </Meta>

          //   <ButtonGroup>
          //     <Button onClick={onSale} marginRight>
          //       판매
          //     </Button>
          //     <Button onClick={onClose}>취소</Button>
          //   </ButtonGroup>
          // </>
        )}
      </AskModalBlock>
    </Modal>
  );
};

export default AskModal;
