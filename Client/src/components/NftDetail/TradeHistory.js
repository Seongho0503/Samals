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
    date1: "",
    date2: "",
    date3: "",
    date4: "",
    date5: "",
  });

  const [sellByer, setSellByer] = useState({
    buy1: "",
    buy2: "",
    buy3: "",
    buy4: "",
    buy5: "",
  });

  const [test, setTest] = useState({});

  const [sellPrices, setSellPrices] = useState({
    price1: sellDates.date1 == null || "최근 거래 내역이 없습니다.",
    price2: sellDates.date2 == null || "최근 거래 내역이 없습니다.",
    price3: sellDates.date3 == null || "최근 거래 내역이 없습니다.",
    price4: sellDates.date4 == null || "최근 거래 내역이 없습니다.",
    price5: sellDates.date5 == null || "최근 거래 내역이 없습니다.",
  });

  const [selldatas, setSelldatas] = useState({});
  const [saleData, setSaleData] = useState([]);

  // [] ||  [] || "판매날짜가 없습니다"
  //const [saleDate, setSaleDate] = useState(saleDate === null ? "출석날짜가 없습니" : saleDate);

  useEffect(() => {
    console.log("얼마", props.sale);
    SaleDetail(props.sale).then((res) => {
<<<<<<< HEAD
      // await SaleHistory(res).then((response) => {
      // console.log(`res`, response);
      console.log(`가격1`, sellPrices.price1);
      console.log(`가격2`, sellPrices.price2);
      console.log(`가격3`, sellPrices.price3);
      //console.log("날짜체크", saleDate);
=======
      // console.log(res);
      if (res === undefined) {
        console.log("res === undefined, 거래 데이터 없음");
        return;
      }

      SaleHistory(res.data.tokenId).then((res) => {
        console.log("날짜체크", saleDate);
      });
>>>>>>> c0a622afc8aa15a0db6c7e5a796f5ae62ce54390
    });
    // console.log("아", sellDates.date1);
  }, []);

  // 거래 상세 조회
  useEffect(() => {
    console.log("test", test);
  }, [test]);

  useEffect(() => {
    console.log("test", sellDates);
    console.log("test", sellPrices);
    console.log("test", sellByer);
  }, [sellDates, sellPrices, sellByer]);
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
        setTokenid(res.data.tokenId);
        // console.log(saleDetail);
        return SaleHistory(res.data.tokenId);
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
<<<<<<< HEAD
      await axios.get(`/api/nft/${tokenid}` + `/sale`).then((res) => {
        console.log("거래기간1", res.data[1].saleCompletedTime);
        const dataLength = res.data.length;
        let _sellDatas = {};
        let _sellByer = {};
        let _sellPrices = {};
        for (let i = 0; i < dataLength; i++) {
          _sellDatas[`date${i + 1}`] = res.data[i].saleCompletedTime || [];
          _sellByer[`buy${i + 1}`] = res.data[i].buyerNickname || [];
          _sellPrices[`price${i + 1}`] = res.data[i].salePrice || [];
        }
        setSellDates(_sellDatas);
        setSellByer(_sellByer);
        setSellPrices(_sellPrices);
        // selldatas(res.data);
        // setSellDates({
        //   date1: res.data[0].saleCompletedTime || [],
        //   date2: res.data[1].saleCompletedTime || [],
        //   date3: res.data[2].saleCompletedTime || [],
        //   date4: res.data[3].saleCompletedTime || [],
        //   date5: res.data[4].saleCompletedTime || [],
        // });
        // setSellByer({
        //   buy1: res.data[0].buyerNickname || [],
        //   buy2: res.data[1].buyerNickname || [],
        //   buy3: res.data[2].buyerNickname || [],
        //   buy4: res.data[3].buyerNickname || [],
        //   buy5: res.data[4].buyerNickname || [],
        // });
        // setSellPrices({
        //   price1: res.data[0].salePrice || [],
        //   price2: res.data[1].salePrice || [],
        //   price3: res.data[2].salePrice || [],
        //   price4: res.data[3].salePrice || [],
        //   price5: res.data[4].salePrice || [],
        // });
        setTest(res.data[0]);
=======
      await axios.get(`/api/nft/${tokenid}/sale`).then((res) => {
        if (res.data[0].saleCompletedTime === undefined) {
          console.log("거래 완료된 기록이 없습니다.");
          return;
        }
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
>>>>>>> c0a622afc8aa15a0db6c7e5a796f5ae62ce54390
        //console.log("하", res.data[3].saleCompletedTime);
        //console.log("허", res.data[4].saleCompletedTime);
        // console.log(saleDetail);
        console.log("거래데이터", res.data);
        //console.log("데이터", sellDates);
      });
    } catch (e) {
      // console.log("error:", e);
    }
  };
  return (
    <div className='history'>
      {/* <TradeChart date={saleDate} price={tokenid}></TradeChart> */}
      <TradeChart2 sellPrices={sellPrices} sellDates={sellDates} />
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
