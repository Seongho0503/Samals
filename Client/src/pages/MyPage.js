import { useState, useEffect, useContext } from "react";
import "../styles/MyPage.css";
import UserProfile from "../assets/userprofile.png";
import Tiger from "../assets/card/Tiger.png";
import Toad from "../assets/card/Toad.png";
import Shark from "../assets/card/Shark.png";
import Elephant from "../assets/card/Elephant.png";
import Toco from "../assets/card/Toco.png";
import ProfileEdit from "../components/MyPage/ProfileEdit";
import MyProfile from "./MyPofile";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  selectAddress,
  setAddress,
  setUserBio,
  setUserId,
  setUserPFPAddress,
} from "../redux/slice/UserInfoSlice";

const MyPage = () => {
  const [address, setAddress] = useState(useSelector(selectAddress));
  const [donate, setDonate] = useState();
  const [likes, setLikes] = useState();
  const [mint, setMint] = useState();
  const [nft, setNft] = useState();
  const [nftCount, setNftCount] = useState(0);
  const [sales, setSales] = useState();
  const [totaldonate, setTotaldonate] = useState();
  const [userLike, setUserLike] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [userInfo, setUserInfo] = useState({
    userBio: "",
    createdTime: "",
    userNickname: "",
  });

  useEffect(() => {
    fetchDonate();
    fetchLikes();
    fetchMintingList();
    fetchNftList();
    fetchSalesList();
    fetchTotalDonate();
    fetchUserInfo();
    setTotaldonate();
    fetchUserLike();
    console.log(address);
  }, [address]);

  // 내 기부 내역 조회
  const fetchDonate = async () => {
    try {
      // const response = await axios.get(`/api/mypage/` + address + `/donate`);
      await axios.get(`/api/mypage/` + address + `/donate`).then((res) => {
        console.log("fetchDonate: ", res);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };
  //console.log("총기부액" + JSON.stringify(donate));
  // 내 좋아요 리스트 조회
  // const fetchLikes = async () => {
  //   try {
  //     const response = await axios.get(`/api/mypage/` + address + `/like`);
  //     setLikes(response.data);
  //     console.log("like", response.data);
  //   } catch (e) {}
  // };
  // console.log(likes);

  const fetchLikes = async () => {
    try {
      await axios.get(`/api/mypage/` + address + `/like`).then((res) => {
        // console.log("fetchTotalDonate: ", res);
        // console.log("total", res.data);
        // setTotaldonate(res);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };

  // 내 민팅 내역 조회
  const fetchMintingList = async () => {
    try {
      const response = await axios.get(`/api/mypage/` + address + `/mint`);
      setMint(response.data);
    } catch (e) {}
  };
  console.log(mint);

  // 내 NFT 리스트 조회
  const fetchNftList = async () => {
    try {
      const response = await axios.get(`/api/mypage/` + address + `/nft`);
      setNft(response.data);
      setNftCount(response.data.length);
    } catch (e) {}
  };
  console.log(nft);

  // 내 거래 내역 조회
  const fetchSalesList = async () => {
    try {
      const response = await axios.get(`/api/mypage/` + address + `/sale`);
      setSales(response.data);
    } catch (e) {}
  };
  console.log(sales);

  // 내 기부 총액 조회
  const fetchTotalDonate = async () => {
    try {
      // const response = await axios.get(`/api/mypage/` + address + `/donate`);
      await axios.get(`/api/mypage/` + address + `/total-donate`).then((res) => {
        // console.log("fetchTotalDonate: ", res);
        // console.log("total", res.data);
        setTotaldonate(res.data);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };

  // 회원 정보 조회
  const fetchUserInfo = async () => {
    try {
      // const response = await axios.get(`/api/mypage/` + address + `/donate`);
      await axios.get(`/api/user/` + address).then((res) => {
        // setUserInfo({
        //   ...userInfo
        //   userBio: res.,
        //   createdTime: "",
        //   userNickname: "",

        // });
        // const info = JSON.stringify(res);
        // console.log("호호" + info);
        // console.log("인포" + info.data.data.userNickname);
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

  // 내 좋아요 nft 리스트
  const fetchUserLike = async () => {
    try {
      await axios.get(`/api/mypage/` + address + `/like`).then((res) => {
        console.log("좋아요", res.data);
        setUserLike(res.data);
        setLikeCount(res.data.length);
        //console.log(`하트`, likeCount);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };

  return (
    <div>
      {/* <MyPage3 donateSum={donate} /> */}

      <main>
        <div id='profile-upper'>
          <div id='profile-banner-image'>
            {/* <img
              //   src="https://imagizer.imageshack.com/img921/9628/VIaL8H.jpg"
              alt='Banner image'
            /> */}
          </div>
          {/* <div id='profile-d'>
            <div id='profile-pic'>
              <img id='person' src={UserProfile} />
            </div>
            <div id='u-name'>UnKnown</div>
          </div> */}
          <div id='black-grd'></div>
        </div>
        <div id='main-content'>
          <div className='tb'>
            <div className='td' id='l-col'>
              <MyProfile
                donate={totaldonate}
                address={address}
                userNickname={userInfo.userNickname}
                createdTime={userInfo.createdTime}
                likeCount={likeCount}
                nftCount={nftCount}
              />
              <div className='l-cnt l-mrg'>
                <div className='cnt-label'>
                  <i className='l-i' id='l-i-k'></i>
                  <span>자기 소개</span>
                  <div></div>
                  {userInfo.userBio == null ? (
                    <span className='use-bio'>자기 소개 내용이 없습니다</span>
                  ) : (
                    <span className='use-bio'>{userInfo.userBio}</span>
                  )}
                  {/* {userInfo.userBio} = null ? 자기 소개 없음 : {userInfo.userBio} */}
                </div>
                <div>
                  <div className='q-ad-c'>
                    <a href='#' className='q-ad'>
                      {/* <img src="https://imagizer.imageshack.comm/img923/1849/4TnLy1.png" /> */}
                      {/* <span>프로필 수정</span> */}
                      <ProfileEdit></ProfileEdit>
                    </a>
                  </div>
                </div>
              </div>
              {/* 왼쪽 사이드 이미지모음 레이아웃 */}
              <div className='l-cnt l-mrg'>
                <div className='cnt-label'>
                  <i className='l-i' id='l-i-p'></i>
                  <span>보유 뱃지</span>
                </div>
                <div id='photos'>
                  <div className='tb'>
                    <div className='tr'>
                      <div className='td'></div>
                      <div className='td'></div>
                      <div className='td'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='td' id='m-col'>
              <div className='m-mrg' id='p-tabs'>
                <div className='tb'>
                  <div className='td'>
                    <div className='tb' id='p-tabs-m'>
                      <div className='td active'>
                        <i className='material-icons'>보유 NFT</i>
                      </div>
                      <div className='td'>
                        <i className='material-icons'>찜한 NFT</i>
                      </div>
                      <div className='td'>
                        <i className='material-icons'>기부 내역</i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='l-cnt l-mrg'>
                  <div className='cnt-label'>
                    <i className='l-i' id='l-i-p'></i>
                    <span>보유 NFT</span>
                  </div>
                  <div id='photos'>
                    <div className='tb'>
                      <div className='tr'>
                        {/* userLike.map((item, idx) => {
                        return <div className="img" key={idx}></div>
                        })  */}
                        {/* <img className='td' src={userLike[0].imgUri} />
                        <img className='td' src={userLike[1].imgUri} />
                        <img className='td' src={userLike[2].imgUri} /> */}
                        {/* <div className='td'></div> */}
                      </div>
                      <div className='tr'>
                        {/* <div className='td'></div>
                        <div className='td'></div>
                        <div className='td'></div> */}
                      </div>
                      <div className='tr'>
                        {/* <div className='td'></div>
                        <div className='td'></div>
                        <div className='td'></div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <h1>하하</h1>
              </div>
            </div>
          </div>
        </div>
        <div id='device-bar-2'>
          <i className='fab fa-apple'></i>
        </div>
      </main>
    </div>
  );
};

export default MyPage;
