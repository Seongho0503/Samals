import bird from "assets/image_readtop.jpeg";
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
  useEffect(() => {
    fetchUserInfo();

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
  return (
    <UserInfoContainer>
      <Block>
        <Images>
          {/* <Bird src={bird} alt='' /> */}
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
        <UserName>
          {userInfo.userBio == null ? (
            <span className='use-bio'>자기 소개 내용이 없습니다</span>
          ) : (
            <span className='use-bio'>{userInfo.userBio}</span>
          )}
        </UserName>
      </Meta>

      <Circles>
        <CircleWrapper>
          <Circle />
          <div>동물보호입문</div>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <div>동물보호중급</div>
        </CircleWrapper>

        <CircleWrapper>
          <Circle />
          <div>동물보호마스터</div>
        </CircleWrapper>
      </Circles>
    </UserInfoContainer>
  );
};

export default UserInfo;
