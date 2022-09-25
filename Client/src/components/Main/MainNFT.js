import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainNFT.css";
import Header from "../Header";
import title from "../../assets/our-nft.png";
import paperimg from "../../assets/paperimg.png";
import nftexample from "../../assets/nftexample.jpg";

const MainNFT = () => {
  return (
    <div id="hero" className="box-container">
      <div className="box">
        <img width="500px" src={title} />

        <h5 id="header-subtext-second">
          <h5 id="header-subtext-second">
            Samals 프로젝트는 프로그램으로 생성된
            <br />
            SSAFY D103 올청이 팀의 고유 디지털수집품입니다.
            <br />
            <br />
            동물 일러스트는 모두 팀에서 자체 제작했으며, 세상에서 유일한
            일러스트 NFT입니다. <br />
            Samals 토큰으로 지금 Samals의 nft를 소유해보세요!
          </h5>
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
      <div className="autonft">
        <div className="wrap">
          <div className="items-wrap">
            <div className="items marquee">
              <div className="item">
                <img width="100px" border-radius="6px" src={nftexample} />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://newsimg-hams.hankookilbo.com/2022/03/31/71f341a2-0b9d-4fbd-81e4-0d706e714767.jpg"
                />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/02/fe9129a1-00e7-466c-bfd2-1ac9f08ebd9c.jpg"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://www.blockmedia.co.kr/wp-content/uploads/2022/05/BAYC.png"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTeRDXuEXAjairhgF8QCJD7TiRIsPz2lpFy_KgOe0dtOK1qDcPELM6AWxzkvOudIiZ0&usqp=CAU"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://file.mk.co.kr/meet/neds/2022/03/image_readtop_2022_249531_16480404664979152.jpg"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n6E55NE-oUy7qImItJRgBXuNKkc2kpFEmyfq0n4blkFYJGtCAs2728wbctbtny2UaHE&usqp=CAU"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://www.blockmedia.co.kr/wp-content/uploads/2022/02/%EC%A0%80%EC%8A%A4%ED%8B%B4-%EB%B9%84%EB%B2%84-NFT-BAYC.png"
                />
              </div>
            </div>
            <div aria-hidden="true" className="items marquee">
              <div className="item">
                {" "}
                <img width="100px" border-radius="6px" src={nftexample} />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://newsimg-hams.hankookilbo.com/2022/03/31/71f341a2-0b9d-4fbd-81e4-0d706e714767.jpg"
                />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/02/fe9129a1-00e7-466c-bfd2-1ac9f08ebd9c.jpg"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://www.blockmedia.co.kr/wp-content/uploads/2022/05/BAYC.png"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTeRDXuEXAjairhgF8QCJD7TiRIsPz2lpFy_KgOe0dtOK1qDcPELM6AWxzkvOudIiZ0&usqp=CAU"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://file.mk.co.kr/meet/neds/2022/03/image_readtop_2022_249531_16480404664979152.jpg"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n6E55NE-oUy7qImItJRgBXuNKkc2kpFEmyfq0n4blkFYJGtCAs2728wbctbtny2UaHE&usqp=CAU"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://www.blockmedia.co.kr/wp-content/uploads/2022/02/%EC%A0%80%EC%8A%A4%ED%8B%B4-%EB%B9%84%EB%B2%84-NFT-BAYC.png"
                />
              </div>
            </div>
          </div>

          <div className="items-wrap">
            <div className="items marquee reverce">
              <div className="item">
                {" "}
                <img width="100px" border-radius="6px" src={nftexample} />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://newsimg-hams.hankookilbo.com/2022/03/31/71f341a2-0b9d-4fbd-81e4-0d706e714767.jpg"
                />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/02/fe9129a1-00e7-466c-bfd2-1ac9f08ebd9c.jpg"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://www.blockmedia.co.kr/wp-content/uploads/2022/05/BAYC.png"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTeRDXuEXAjairhgF8QCJD7TiRIsPz2lpFy_KgOe0dtOK1qDcPELM6AWxzkvOudIiZ0&usqp=CAU"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://file.mk.co.kr/meet/neds/2022/03/image_readtop_2022_249531_16480404664979152.jpg"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n6E55NE-oUy7qImItJRgBXuNKkc2kpFEmyfq0n4blkFYJGtCAs2728wbctbtny2UaHE&usqp=CAU"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://www.blockmedia.co.kr/wp-content/uploads/2022/02/%EC%A0%80%EC%8A%A4%ED%8B%B4-%EB%B9%84%EB%B2%84-NFT-BAYC.png"
                />
              </div>
            </div>
            <div aria-hidden="true" className="items marquee reverce">
              <div className="item">
                {" "}
                <img width="100px" border-radius="6px" src={nftexample} />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://newsimg-hams.hankookilbo.com/2022/03/31/71f341a2-0b9d-4fbd-81e4-0d706e714767.jpg"
                />
              </div>
              <div className="item">
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/02/fe9129a1-00e7-466c-bfd2-1ac9f08ebd9c.jpg"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://www.blockmedia.co.kr/wp-content/uploads/2022/05/BAYC.png"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTeRDXuEXAjairhgF8QCJD7TiRIsPz2lpFy_KgOe0dtOK1qDcPELM6AWxzkvOudIiZ0&usqp=CAU"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://file.mk.co.kr/meet/neds/2022/03/image_readtop_2022_249531_16480404664979152.jpg"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n6E55NE-oUy7qImItJRgBXuNKkc2kpFEmyfq0n4blkFYJGtCAs2728wbctbtny2UaHE&usqp=CAU"
                />
              </div>
              <div className="item">
                {" "}
                <img
                  width="100px"
                  border-radius="6px"
                  src="https://www.blockmedia.co.kr/wp-content/uploads/2022/02/%EC%A0%80%EC%8A%A4%ED%8B%B4-%EB%B9%84%EB%B2%84-NFT-BAYC.png"
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
