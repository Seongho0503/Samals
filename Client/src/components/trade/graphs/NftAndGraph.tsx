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
            : "https://cdn.discordapp.com/attachments/1026873081358209135/1027629121917952191/Animals_4.png"
        }
      />

      <Button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        NFT 가져오기
      </Button>

      {/* <Graph>graph</Graph> */}
    </NftAndGraphContainer>
  );
};

export default NftAndGraph;
