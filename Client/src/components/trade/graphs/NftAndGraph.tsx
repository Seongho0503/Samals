import { useState, useEffect, useContext } from "react";
import { Button, Graph, NftAndGraphContainer, NftImg } from "./NftAndGraph.styles";

// interface AskModalProps {
//   isModalOpen: boolean;
//   closeModal: () => void;
// }

// const AskModal: React.FC<AskModalProps> = ({ isModalOpen, closeModal }) => {

type Props = {
  setIsModalOpen: (value: boolean) => void;
  nftImgUrl: string;
};

const NftAndGraph: React.FC<Props> = ({ setIsModalOpen, nftImgUrl }) => {
  return (
    <NftAndGraphContainer>
      {/* 기본 이미지 출력 */}
      <NftImg
        src={
          nftImgUrl !== ""
            ? nftImgUrl
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Ramphastos_toco.jpg/375px-Ramphastos_toco.jpg"
        }
      />

      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        nft 가져오기
      </Button>

      {/* <Graph>graph</Graph> */}
    </NftAndGraphContainer>
  );
};

export default NftAndGraph;
