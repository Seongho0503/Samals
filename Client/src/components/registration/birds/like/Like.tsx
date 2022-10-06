import { ImageWrapper } from "../bird/Bird.styles";

export interface ILike {
  animalSpecies: string;
  imgUri: string;
  isSold: string;
  likeCount: number;
  nftMintNumber: number;
  salePrice: number;
  saleSeq: number;
}

interface LikeProps {
  like: ILike;
  setClickedLike: (like: ILike) => void;
}

const Like: React.FC<LikeProps> = ({ like, setClickedLike }) => {
  return (
    <ImageWrapper onClick={() => setClickedLike(like)}>
      <img src={like.imgUri} alt='' />
    </ImageWrapper>
  );
};

export default Like;
