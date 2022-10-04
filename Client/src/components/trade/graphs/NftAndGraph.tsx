import React from 'react';
import {
  Button,
  Graph,
  NftAndGraphContainer,
  NftImg,
} from './NftAndGraph.styles';

const NftAndGraph = () => {
  return (
    <NftAndGraphContainer>
      <NftImg />

      <Button>nft 가져오기</Button>

      <Graph>graph</Graph>
    </NftAndGraphContainer>
  );
};

export default NftAndGraph;
