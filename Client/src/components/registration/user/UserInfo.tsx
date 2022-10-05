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
} from "./UserInfo.styles";
import { faker } from "@faker-js/faker";

const UserInfo = () => {
  const [address, setAddress] = useState(useSelector(selectAddress));
  const [userInfo, setUserInfo] = useState({
    userBio: "",
    createdTime: "",
    userNickname: "",
  });
  const [nftCount, setNftCount] = useState(0);
  useEffect(() => {
    fetchUserInfo();
    fetchNftList();

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

  return (
    <UserInfoContainer>
      <Block>
        <Images>
          <Bird src={bird} alt='' />
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
        <BirdName>구한 멸종 위기 동물 수 : {nftCount}마리</BirdName>
        {/* <UserName>
          {userInfo.userBio == null ? (
            <span className='use-bio'>자기 소개 내용이 없습니다</span>
          ) : (
            <span className='use-bio'>{userInfo.userBio}</span>
          )}
        </UserName> */}
      </Meta>

      <Circles>
        <CircleWrapper>
          <Circle />
          <BirdName>동물보호입문</BirdName>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <BirdName>동물보호중급</BirdName>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <BirdName>동물보호마스터</BirdName>
        </CircleWrapper>
      </Circles>
    </UserInfoContainer>
  );
};

export default UserInfo;
