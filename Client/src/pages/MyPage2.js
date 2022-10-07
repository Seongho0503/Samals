import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Top from "../components/MyPage/Top";
import Gallery from "../components/MyPage/Gallery";
import Header from "../components/Header";
import CardList from "../components/Explore/ECardList";
import { exploreList } from "../constants/ExploreDatay";

function MyPage({ nftList, address, mypageNfts }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (address === "") {
  //       navigate("/");
  //     }
  //   }, []);

  return (
    <div className="MyPage">
      <Header></Header>
      <Top></Top>
      {/* <Top address={address} keyword={keyword} changeHandler={setKeyword} /> */}
      {/* <Gallery address={address} nftlist={nftList} keyword={keyword} /> */}
      {/* <ImageList
        sx={{
          width: "80%",
          height: "80%",
          display: "flex",
          justifyContent: "center",
          overflow: "auto",
          flexWrap: "wrap",
          "& .MuiImageListItem-img": {
            width: "100%",
            height: "100%",
            borderRadius: "10%",
            boxShadow: "0 5px 10px 1px lightgray",
          },
        }}
      >
        {mypage &&
          mypage.map((item) => {
            return (
              <Item
                imgURL={item.image_link}
                name={item.name}
                key={item.token_id}
                link={`/sell/${item.token_id}`}
                isLoading={false}
                price={item.price}
                onClick={null}
              />
            );
          })}
      </ImageList> */}
      <div id="list-container">
        <CardList list={exploreList} />
      </div>
    </div>
  );
}

export default MyPage;
