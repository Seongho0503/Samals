import React, { useCallback, useState } from 'react';
import { IBird } from '../birdList/BirdList';
import { BridContainer, HoverName, ImageWrapper } from './Bird.styles';

interface BirdProps {
  bird: IBird;
  setClickedBird: (bird: IBird) => void;
}

const Bird: React.FC<BirdProps> = ({ bird, setClickedBird }) => {
  const [isHover, setIsHover] = useState(false);

  const onMouseOver = useCallback(() => setIsHover(true), []);
  const onMouseOut = useCallback(() => setIsHover(false), []);

  return (
    <BridContainer>
      <ImageWrapper
        onClick={() => setClickedBird(bird)}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <img src={bird.imgUrl} alt="" />
      </ImageWrapper>
      {isHover && <HoverName>{bird.name}</HoverName>}
    </BridContainer>
  );
};

export default Bird;
