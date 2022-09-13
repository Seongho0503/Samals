import React, {
    useState,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/MainNFT.css";
import Header from "../Header";
import title from "../../assets/our-nft.png";
import paperimg from "../../assets/paperimg.png";
import nftexample from "../../assets/nftexample.jpg";

const MainNFT =
    () => {
        return (
            <div
                id="hero"
                class="box-container"
            >
                <div class="box">
                    <img
                        width="500px"
                        src={
                            title
                        }
                    />
                    <h1 id="">
                        {" "}
                        SAMALS
                    </h1>
                    <h5 id="">
                        Start
                        your
                        NFT
                        collection
                        now
                    </h5>
                    <h5 id="header-subtext-second">
                        {" "}
                        살기위해
                        떠난
                        북극곰들
                        <br />
                        "이대로
                        가다간
                        모두
                        죽게
                        될
                        거야"
                        <br />
                        북극곰은
                        인간들의
                        이기심으로
                        인해
                        살아갈
                        곳을
                        잃어가고,
                        <br />
                        먹을
                        음식이
                        없어
                        점점
                        야위어져만
                        가고
                        있습니다.
                        <br />
                        위기를
                        느낀
                        이들은
                        좁디좁은
                        빙하
                        위에서
                        인간에게
                        도움을
                        요청하고
                        경고를
                        해왔지만
                        <br />
                        돌아오는
                        건
                        플라스틱과
                        더위
                        뿐이었고
                        <br />
                        이에
                        분노한
                        북극곰들은
                        인류와의
                        관계를
                        단절하고
                        그들만의
                        세상을
                        만들어
                        나갔습니다.
                        <br />
                        결국
                        우리
                        인류도
                        언젠간
                        위기를
                        맞이할
                        거에요.
                        <br />
                        화난
                        북극곰들처럼요!
                        <br />
                        다시는
                        이러한
                        일들이
                        일어나지
                        않게,
                        <br />
                        또
                        함께
                        상생하며
                        살아갈
                        수
                        있도록
                        화난
                        북극곰들을
                        찾아가
                        달래주세요.
                        <br />
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
                <div class="autonft">
                    <div class="wrap">
                        <div class="items-wrap">
                            <div class="items marquee">
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src={
                                            nftexample
                                        }
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://newsimg-hams.hankookilbo.com/2022/03/31/71f341a2-0b9d-4fbd-81e4-0d706e714767.jpg"
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/02/fe9129a1-00e7-466c-bfd2-1ac9f08ebd9c.jpg"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://www.blockmedia.co.kr/wp-content/uploads/2022/05/BAYC.png"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTeRDXuEXAjairhgF8QCJD7TiRIsPz2lpFy_KgOe0dtOK1qDcPELM6AWxzkvOudIiZ0&usqp=CAU"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://file.mk.co.kr/meet/neds/2022/03/image_readtop_2022_249531_16480404664979152.jpg"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n6E55NE-oUy7qImItJRgBXuNKkc2kpFEmyfq0n4blkFYJGtCAs2728wbctbtny2UaHE&usqp=CAU"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://www.blockmedia.co.kr/wp-content/uploads/2022/02/%EC%A0%80%EC%8A%A4%ED%8B%B4-%EB%B9%84%EB%B2%84-NFT-BAYC.png"
                                    />
                                </div>
                            </div>
                            <div
                                aria-hidden="true"
                                class="items marquee"
                            >
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src={
                                            nftexample
                                        }
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://newsimg-hams.hankookilbo.com/2022/03/31/71f341a2-0b9d-4fbd-81e4-0d706e714767.jpg"
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/02/fe9129a1-00e7-466c-bfd2-1ac9f08ebd9c.jpg"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://www.blockmedia.co.kr/wp-content/uploads/2022/05/BAYC.png"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTeRDXuEXAjairhgF8QCJD7TiRIsPz2lpFy_KgOe0dtOK1qDcPELM6AWxzkvOudIiZ0&usqp=CAU"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://file.mk.co.kr/meet/neds/2022/03/image_readtop_2022_249531_16480404664979152.jpg"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n6E55NE-oUy7qImItJRgBXuNKkc2kpFEmyfq0n4blkFYJGtCAs2728wbctbtny2UaHE&usqp=CAU"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://www.blockmedia.co.kr/wp-content/uploads/2022/02/%EC%A0%80%EC%8A%A4%ED%8B%B4-%EB%B9%84%EB%B2%84-NFT-BAYC.png"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="items-wrap">
                            <div class="items marquee reverce">
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src={
                                            nftexample
                                        }
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://newsimg-hams.hankookilbo.com/2022/03/31/71f341a2-0b9d-4fbd-81e4-0d706e714767.jpg"
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/02/fe9129a1-00e7-466c-bfd2-1ac9f08ebd9c.jpg"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://www.blockmedia.co.kr/wp-content/uploads/2022/05/BAYC.png"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTeRDXuEXAjairhgF8QCJD7TiRIsPz2lpFy_KgOe0dtOK1qDcPELM6AWxzkvOudIiZ0&usqp=CAU"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://file.mk.co.kr/meet/neds/2022/03/image_readtop_2022_249531_16480404664979152.jpg"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n6E55NE-oUy7qImItJRgBXuNKkc2kpFEmyfq0n4blkFYJGtCAs2728wbctbtny2UaHE&usqp=CAU"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://www.blockmedia.co.kr/wp-content/uploads/2022/02/%EC%A0%80%EC%8A%A4%ED%8B%B4-%EB%B9%84%EB%B2%84-NFT-BAYC.png"
                                    />
                                </div>
                            </div>
                            <div
                                aria-hidden="true"
                                class="items marquee reverce"
                            >
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src={
                                            nftexample
                                        }
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://newsimg-hams.hankookilbo.com/2022/03/31/71f341a2-0b9d-4fbd-81e4-0d706e714767.jpg"
                                    />
                                </div>
                                <div class="item">
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202205/02/fe9129a1-00e7-466c-bfd2-1ac9f08ebd9c.jpg"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://www.blockmedia.co.kr/wp-content/uploads/2022/05/BAYC.png"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQTeRDXuEXAjairhgF8QCJD7TiRIsPz2lpFy_KgOe0dtOK1qDcPELM6AWxzkvOudIiZ0&usqp=CAU"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://cdn.businessplus.kr/news/photo/202203/34566_25578_5733.png"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://file.mk.co.kr/meet/neds/2022/03/image_readtop_2022_249531_16480404664979152.jpg"
                                    />
                                </div>
                                <div class="item">
                                    {" "}
                                    <img
                                        width="100px"
                                        border-radius="6px"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_n6E55NE-oUy7qImItJRgBXuNKkc2kpFEmyfq0n4blkFYJGtCAs2728wbctbtny2UaHE&usqp=CAU"
                                    />
                                </div>
                                <div class="item">
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
