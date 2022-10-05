import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainNFT.css";
import Header from "../Header";
import title from "../../assets/our-nft.png";
import paperimg from "../../assets/paperimg.png";
import nftexample from "../../assets/nftexample.jpg";

const MainNFT = () => {
  return (
    <div id='hero2' className='box-container'>
      <div className='box'>
        <img width='500px' src={title} />

        <h5 id='header-subtext-second'>
          <p id='header-subtext-second'>
            Samals 프로젝트는 프로그램으로 생성된
            <br />
            SSAFY D103 올청이 팀의 고유 디지털수집품입니다.
            <br />
            <br />
            동물 일러스트는 모두 팀에서 자체 제작했으며, <br />
            세상에서 유일한 일러스트 NFT입니다. <br />
            Samals 토큰으로 지금 Samals의 nft를 소유해보세요!
          </p>
        </h5>
      </div>

      {/* <img
                    src={
                        paperimg
                    }
                />
                <img
                    width="340"
                    height="340"
                    src={
                        nftexample
                    }
                /> */}
      <div className='autonft'>
        <div className='wrap'>
          <div className='items-wrap'>
            <div className='items marquee'>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/bird%20(55).png'
                />
              </div>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/frog%20(55).png'
                />
              </div>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/tiger%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/leopard%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/iguana%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/elephant%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/frog%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/rhino%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/penguin%20(55).png'
                />
              </div>
            </div>
            <div aria-hidden='true' className='items marquee'>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/bird%20(15).png'
                />
              </div>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/frog%20(15).png'
                />
              </div>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/tiger%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/leopard%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/iguana%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/penguin%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/elephant%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/frog%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/rhino%20(15).png'
                />
              </div>
            </div>
          </div>

          <div className='items-wrap'>
            <div className='items marquee reverce'>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/penguin%20(15).png'
                />
              </div>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/bird%20(55).png'
                />
              </div>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/frog%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/tiger%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/leopard%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/iguana%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/elephant%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/frog%20(55).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/rhino%20(55).png'
                />
              </div>
            </div>
            <div aria-hidden='true' className='items marquee reverce'>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/bird%20(15).png'
                />
              </div>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/frog%20(15).png'
                />
              </div>
              <div className='item'>
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/tiger%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/leopard%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/iguana%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/penguin%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/elephant%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/frog%20(15).png'
                />
              </div>
              <div className='item'>
                {" "}
                <img
                  width='100px'
                  border-radius='6px'
                  src='https://j7d103.p.ssafy.io/image/downloadFile/rhino%20(15).png'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNFT;
