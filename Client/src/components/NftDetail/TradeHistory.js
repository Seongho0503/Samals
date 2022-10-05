import React, { Component } from "react";
import "../../styles/NftDetail/TradeHistory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import TradeChart from "./TradeChart";
import TradeChart2 from "./TradeChart2";

const TradeHistory = (props) => {
  const [tokenid, setTokenid] = useState();
  const [saleDate, setSaleDate] = useState([] || "판매날짜가 없습니다");
  const [sellDates, setSellDates] = useState({
    date1: [] || "판매내역이 없습니다.",
    date2: [] || "판매내역이 없습니다.",
    date3: [] || "판매내역이 없습니다.",
    date4: [] || "판매내역이 없습니다.",
    date5: [] || "판매내역이 없습니다.",
  });

  const [sellByer, setSellByer] = useState({
    buy1: [] || "판매내역이 없습니다.",
    buy2: [] || "판매내역이 없습니다.",
    buy3: [] || "판매내역이 없습니다.",
    buy4: [] || "판매내역이 없습니다.",
    buy5: [] || "판매내역이 없습니다.",
  });

  const [sellPrices, setSellPrices] = useState({
    price1: sellDates.date1 == [] || "판매내역이 없습니다.",
    price2: sellDates.date2 == [] || "판매내역이 없습니다.",
    price3: sellDates.date3 == [] || "판매내역이 없습니다.",
    price4: sellDates.date4 == [] || "판매내역이 없습니다.",
    price5: sellDates.date5 == [] || "판매내역이 없습니다.",
  });
  const [saleData, setSaleData] = useState([]);
  // [] ||  [] || "판매날짜가 없습니다"
  //const [saleDate, setSaleDate] = useState(saleDate === null ? "출석날짜가 없습니" : saleDate);

  useEffect(() => {
    console.log("얼마", props.sale);
    SaleDetail(props.sale).then((res) => {
      SaleHistory(tokenid).then((res) => {
        console.log("날짜체크", saleDate);
      });
    });
    console.log("토큰", tokenid);
  }, []);

  // 거래 상세 조회

  // const Sale = async (saleSeq) => {
  //   try {
  //     await axios.get(`/api/sale/${saleSeq}`).then((res) => {
  //       console.log("details", res.data);
  //       setSaleDetail(res.data.saleCreatedTime);
  //       // console.log(saleDetail);
  //     });
  //   } catch (e) {
  //     console.log("error:", e);
  //   }
  // };

  const SaleDetail = async (saleSeq) => {
    try {
      await axios.get(`/api/sale/${saleSeq}`).then((res) => {
        console.log("detailsss", res.data.tokenId);
        setTokenid(res.data.tokenId);
        // console.log(saleDetail);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };

  // const SaleDetail = async (tokenId) => {
  //   try {
  //     await axios.get(`/api/nft/${tokenId}` + `/sale`).then((res) => {
  //       console.log("details", res.data);
  //       setSaleDate(res.data.saleCompletedTime);
  //       // console.log(saleDetail);
  //     });
  //   } catch (e) {
  //     console.log("error:", e);
  //   }
  // };

  const SaleHistory = async (tokenid) => {
    try {
      console.log("토큰2", tokenid);
      await axios.get(`/api/nft/${tokenid}` + `/sale`).then((res) => {
        console.log("거래기간", res.data[0].saleCompletedTime);
        setSellDates({
          date1: res.data[0].saleCompletedTime,
          date2: res.data[1].saleCompletedTime,
          date3: res.data[2].saleCompletedTime,
          date4: res.data[3].saleCompletedTime,
          date5: res.data[4].saleCompletedTime,
        });
        setSellByer({
          buy1: res.data[0].buyerNickname,
          buy2: res.data[1].buyerNickname,
          buy3: res.data[2].buyerNickname,
          buy4: res.data[3].buyerNickname,
          buy5: res.data[4].buyerNickname,
        });
        setSellPrices({
          price1: res.data[0].salePrice,
          price2: res.data[1].salePrice,
          price3: res.data[2].salePrice,
          price4: res.data[3].salePrice,
          price5: res.data[4].salePrice,
        });
        //console.log("하", res.data[3].saleCompletedTime);
        //console.log("허", res.data[4].saleCompletedTime);
        // console.log(saleDetail);
        console.log("거래데이터", res.data);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };
  return (
    <div className='history'>
      {/* <TradeChart date={saleDate} price={tokenid}></TradeChart> */}
      <TradeChart2 />
      <div id='table-container'>
        <table>
          <tbody>
            <tr>
              <th>순번</th>
              <th>판매자</th>
              <th>판매 가격</th>
              <th>팔린 날짜</th>
              {/* <th className='Dsc'>Description</th> */}
            </tr>
            <tr>
              <th>1</th>
              <th>{sellByer.buy1}</th>
              <th>{sellPrices.price1}</th>
              <th>{sellDates.date1}</th>
              {/* <th className='Dsc'>Description</th> */}
            </tr>
            <tr>
              <td>2</td>
              <td>{sellByer.buy2}</td>
              <td>{sellPrices.price2}</td>
              <td>{sellDates.date2}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>{sellByer.buy3}</td>
              <td>{sellPrices.price3}</td>
              <td>{sellDates.date3}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>{sellByer.buy4}</td>
              <td>{sellPrices.price4}</td>
              <td>{sellDates.date4}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>{sellByer.buy5}</td>
              <td>{sellPrices.price5}</td>
              <td>{sellDates.date5}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
