import styled from "styled-components";
import Nft from "./Nft";

const StyledDiv = styled.div`
  display: flex;

  flex-wrap: wrap;
  align-self: stretch;
  width: 100%;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 10px;
`;

function Gallery({ nftlist, keyword, address }) {
  console.log(
    `Gallery: nftlist: ${nftlist}, keyword: ${nftlist}, address: ${address}`
  );

  return (
    <StyledDiv>
      {nftlist.map((el, index) => {
        if (
          keyword !== "" &&
          !el.name.toLowerCase().includes(keyword.toLowerCase())
        ) {
          return null;
        }
        if (
          address !== "" &&
          el.owner.toLowerCase() !== address.toLowerCase()
        ) {
          return null;
        }
        return <Nft el={el} key={index} />;
      })}
    </StyledDiv>
  );
}

export default Gallery;
