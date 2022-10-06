import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAddress,
  selectUserId,
  setAddress,
  setUserBio,
  setUserId,
  selectHeaderClickSwitch,
  setHeaderClickSwitch,
} from "../redux/slice/UserInfoSlice";
import { approveERC20ForMint, firstSupply } from "../utils/event";
import logo from "../assets/nav_logo_clean.png";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";

import { MetaLoadingScreen, addressTransferShort } from "../api";
const Header = () => {
  const [loading, setLoading] = useState(false);

  const main = useRef(null);
  const mada = useRef(null);
  const mark = useRef(null);
  const trad = useRef(null);
  const dona = useRef(null);
  const mypa = useRef(null);
  const injected = new InjectedConnector();
  //redux의 값을 호출 후 state로 관리
  const [reduxAddress, setReduxAddress] = useState(useSelector(selectAddress));
  const [reduxUserNickName, setReduxUserNickName] = useState(useSelector(selectUserId));
  const [focus, setFocus] = useState(useSelector(selectHeaderClickSwitch));

  const { account, active, activate, deactivate } = useWeb3React();
  const dispatch = useDispatch();

  //연결 확인
  async function handleConnect() {
    // 비활성화 전환
    if (active) {
      // deactivate();
      // //초기화
      // dispatch(setAddress(undefined));
      // dispatch(setUserBio(undefined));
      // dispatch(setUserId(undefined));
      // setReduxAddress(undefined);
      // return;
    }
    // 활성화 시
    else {
      //메타마스크 연결 확인 및 연결
      activate(injected, (error) => {
        alert("동물을 구하기 위해선 메타 마스크 연결이 필요합니다!");
        window.open("https://metamask.io/download.html");
        window.localStorage.setItem("active", JSON.stringify(active)); //user persisted data
      });
    }
  }
  // useEffect(() => {
  //   if (focus === "") {
  //   } else if (focus === "mada") {
  //     mada.current.style.backgroundColor = "gold";
  //   } else if (focus === "mark") {
  //     mark.current.style.backgroundColor = "gold";
  //   } else if (focus === "trad") {
  //     trad.current.style.backgroundColor = "gold";
  //   } else if (focus === "dona") {
  //     dona.current.style.backgroundColor = "gold";
  //   } else if (focus === "mypa") {
  //     mypa.current.style.backgroundColor = "gold";
  //   }
  // });
  if (focus === "") {
  } else if (focus === "mada") {
    mada.current.style.backgroundColor = "gold";
  } else if (focus === "mark") {
    mark.current.style.backgroundColor = "gold";
  } else if (focus === "trad") {
    trad.current.style.backgroundColor = "gold";
  } else if (focus === "dona") {
    dona.current.style.backgroundColor = "gold";
  } else if (focus === "mypa") {
    mypa.current.style.backgroundColor = "gold";
  }

  useEffect(() => {
    let isAccountData;
    async function fetchData() {
      if (account !== undefined) {
        //dispatch를 통해 redux에 저장
        dispatch(setAddress(account));
        setReduxAddress(account);

        //DB에서 해당 지갑 주소의 정보 호출
        await axios({ method: "GET", url: `/api/user/${account.toLowerCase()}` })
          .then(({ data }) => {
            console.log("get user data: ", data);
            isAccountData = data;
          })
          .catch((err) => {
            console.log(err);
          });

        //기존 가입 주소가 아니라면
        if (isAccountData === "") {
          // 민트 권한 허가

          setLoading(true);
          try {
            await approveERC20ForMint();
            // 첫 가입 이용료 1000ACE 입금
            await firstSupply().then(() => {
              setLoading(false);
            });
          } catch (e) {
            setLoading(false);
          }

          //DB 가입 처리
          await axios({
            method: "POST",
            url: `/api/user/signup`,
            data: {
              walletAddress: account,
            },
          })
            .then((res) => {
              //DB 저장 결과 반환
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }
        //기존 가입 주소라면
        else {
          dispatch(setUserBio(isAccountData.userBio));
          dispatch(setUserId(isAccountData.userNickname));
          setReduxUserNickName(isAccountData.userNickname);
        }
      }
    }
    fetchData();
  }, [account]);

  // const changeColor = (linkText) => {
  //   console.log(linkText);
  //   let a = document.getElementsByClassName("Links-List");
  //   console.log(a);
  //   console.log(a.length);
  //   // for (let i = 0; i < a.length; i++) {
  //   //   i.style.backgroundColor = "";
  //   // }
  //   // console.log("document.getElementById(linkText): ", document.getElementById(linkText));
  //   let b = document.getElementById(linkText);
  //   console.log(b);
  //   console.log("b.style: ", b.style);
  //   b.style.backgroundColor = "red";
  //   // document.getElementById(linkText).style.backgroundColor = "gold";
  // };

  return (
    <div id='header' style={{ height: "80px" }}>
      <div id='logo'>
        <Link
          className='Links-List'
          id='main'
          ref={main}
          to='/'
          style={{ width: "50px", height: "50px", backgroundColor: "" }}
          // onClick={() => {
          //   changeColor("main");
          // }}
        >
          <img
            width='50px'
            src={logo}
            alt='logo'
            style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
          />
        </Link>
      </div>

      <div
        id='link-containers'
        style={{ textAlign: "center", verticalAlign: "middle", top: "5px" }}
      >
        {/* <Button variant='outlined' size='medium'> */}
        {/* <button>버튼</button> */}
        <Link
          className='Links-List'
          id='mada'
          ref={mada}
          to='/game'
          style={{ backgroundColor: focus === "game" ? "gold" : "" }}
          // onClick={() => {
          //   changeColor("mada");
          // }}
        >
          MADAGASCAR
        </Link>

        <Link
          className='Links-List'
          id='mark'
          ref={mark}
          to='/explore'
          style={{ backgroundColor: focus === "explore" ? "gold" : "" }}
          // onClick={() => {
          //   changeColor("mark");
          // }}
        >
          MARKET
        </Link>
        <Link
          className='Links-List'
          id='trad'
          ref={trad}
          to='/trade'
          style={{ backgroundColor: focus === "trade" ? "gold" : "" }}
          // onClick={() => {
          //   changeColor("trad");
          // }}
        >
          TRADE
        </Link>
        <Link
          className='Links-List'
          id='dona'
          ref={dona}
          to='/minting'
          style={{ backgroundColor: focus === "minting" ? "gold" : "" }}
          // onClick={() => {
          //   changeColor("dona");
          // }}
        >
          DONATION
        </Link>

        <Link
          className='Links-List'
          id='mypa'
          ref={mypa}
          to='/mypage'
          style={{
            visibility: reduxAddress !== undefined ? "visible" : "hidden",
            backgroundColor: focus === "mypage" ? "gold" : "",
          }}
          // onClick={() => {
          //   changeColor("mypa");
          // }}
        >
          MYPAGE
        </Link>
      </div>
      <div>
        <button id='connect-wallet' onClick={handleConnect}>
          {reduxUserNickName === "" || reduxUserNickName === undefined ? (
            <div>
              <AccountBalanceWalletIcon />

              <span style={{ top: "-7px", fontSize: "20px" }}>{"  "}wallet</span>
            </div>
          ) : (
            `${reduxUserNickName}`
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
