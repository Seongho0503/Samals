import React, { Component } from "react";
import "../../styles/NftDetail/TradeHistory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import TradeChart from "./TradeChart";
import TradeChart2 from "./TradeChart2";

const TradeHistory = (props) => {
  const [tokenid, setTokenid] = useState([]);
  const [saleDate, setSaleDate] = useState([] || "판매날짜가 없습니다");
  // [] ||  [] || "판매날짜가 없습니다"
  //const [saleDate, setSaleDate] = useState(saleDate === null ? "출석날짜가 없습니" : saleDate);

  useEffect(() => {
    console.log("얼마", props.sale);
    SaleDetail(props.sale);
    SaleHistory(tokenid).then((res) => {
      console.log("날짜체크", saleDate);
    });
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
      await axios.get(`/api/nft/${tokenid}` + `/sale`).then((res) => {
        console.log("거래기간", res.data[0].saleCompletedTime);
        setSaleDate(res.data[0].saleCompletedTime);
        // console.log(saleDetail);
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
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Trade-Date</th>
              {/* <th className='Dsc'>Description</th> */}
            </tr>
            <tr>
              <td>548</td>
              <td>권성호</td>
              <td>200달러</td>
              <td>{saleDate}</td>
            </tr>
            <tr>
              <td>954</td>
              <td>김채리</td>
              <td>300달러</td>
              <td>{saleDate}</td>
            </tr>
            <tr>
              <td>417</td>
              <td>이청</td>
              <td>300달러</td>
              <td>{saleDate}</td>
            </tr>
            <tr>
              <td>033</td>
              <td>양요셉</td>
              <td>300달러</td>
              <td>{saleDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TradeHistory;
