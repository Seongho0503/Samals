import bird from "assets/profile-example.png";
import person from "assets/person.png";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  selectAddress,
  setAddress,
  setUserBio,
  setUserId,
  setUserPFPAddress,
} from "../../../redux/slice/UserInfoSlice";
import {
  Bird,
  BirdName,
  Block,
  Circle,
  Circles,
  CircleWrapper,
  Images,
  Meta,
  Person,
  UserInfoContainer,
  UserName,
  BirdSum,
} from "./UserInfo.styles";
import { faker } from "@faker-js/faker";
import Sea from "assets/sea.png";
import {
  approveERC20ForMint,
  getTotalMint,
  getLimitedNumber,
  firstSupply,
  balanceOf,
} from "../../../utils/event";
import ProfileEdit from "../../MyPage/ProfileEdit";

const UserInfo = () => {
  const [address, setAddress] = useState(useSelector(selectAddress));
  const [alltoken, setAlltoken] = useState(0);
  const [userInfo, setUserInfo] = useState({
    userBio: "",
    createdTime: "",
    userNickname: "",
    userImgUrl: "",
  });
  const [grade1Is, setGrade1Is] = useState(0);
  const [nftCount, setNftCount] = useState(0);
  const [myToken, setMytoken] = useState();

  useEffect(() => {
    fetchUserInfo();
    fetchNftList();
    balanceOf().then((res) => {
      console.log("현재토큰수 얼마: ", res);
    });
    // approveERC20ForMint().then((res) => {
    //   setAlltoken(res);
    //});
    balanceOf().then((res) => {
      setMytoken(res);
      // console.log(`내 토큰 수 how`, res);
    });
    // fetchDonateSum();
    //console.log("평균", donateSum);

    console.log(`새로운`, address);
  }, [address]);
  // 회원 정보 조회
  const fetchUserInfo = async () => {
    try {
      // const response = await axios.get(`/api/mypage/` + address + `/donate`);
      await axios.get(`/api/user/` + address).then((res) => {
        console.log(res.data);
        setUserInfo({
          userNickname: res.data.userNickname,
          userBio: res.data.userBio,
          createdTime: res.data.createdTime,
          userImgUrl: res.data.userImgUrl,
        });
      });
    } catch (e) {
      console.log("error:", e);
    }
  };

  // 내 NFT 리스트 조회
  const fetchNftList = async () => {
    try {
      const response = await axios.get(`/api/mypage/` + address + `/nft`);
      setNftCount(response.data.length);
    } catch (e) {}
  };

  // // 기부 평균
  // const fetchDonateSum = async () => {
  //   try {
  //     const response = await axios.get(`/api/nft/avg-donate`).then((res) => {
  //       setDonateSum(res.data);
  //     });
  //   } catch (e) {}
  // };
  return (
    <UserInfoContainer>
      <Block>
        <Images>
          <Bird src={userInfo.userImgUrl} alt='' />
          {/* <Person src={person} alt='' /> */}
        </Images>
      </Block>

      {/* <UserName>권성호</UserName>
      <BirdName>121eqweqwdqwdqwdqwd</BirdName> */}

      <Meta>
        {/* <span>내가 찜한 개수</span>
        <span>23개</span> */}
        <UserName>닉네임 : {userInfo.userNickname}</UserName>
        <BirdName>지갑 주소 : {address}</BirdName>
        <BirdName> {myToken} 토큰 보유</BirdName>
        <BirdName>
          <BirdSum>{nftCount} 마리의 멸종 위기 동물을 구하셨습니다</BirdSum>
        </BirdName>
        {/* <ProfileEdit /> */}
        {/* <UserName>
          {userInfo.userBio == null ? (
            <span className='use-bio'>자기 소개 내용이 없습니다</span>
          ) : (
            <span className='use-bio'>{userInfo.userBio}</span>
          )}
        </UserName> */}
      </Meta>

      {/* <ProfileEdit></ProfileEdit> */}
      {/* <Circles>
        <CircleWrapper>
          {nftCount > 7 ? (
            <Circle>
              {" "}
              <img src={Sea} />{" "}
            </Circle>
          ) : (
            <Circle />
          )}
          <BirdName>동물보호입문</BirdName>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <BirdName>동물보호지킴이</BirdName>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <BirdName>동물보호수호자</BirdName>
        </CircleWrapper>
      </Circles> */}
      {/* <ProfileEdit></ProfileEdit> */}
    </UserInfoContainer>
  );
};

export default UserInfo;
