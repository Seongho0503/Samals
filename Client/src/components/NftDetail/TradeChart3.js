import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import styled from "@emotion/styled";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  selectAddress,
  setAddress,
  setUserBio,
  setUserId,
  setUserPFPAddress,
} from "../../redux/slice/UserInfoSlice";

const ContainerWrapper = styled.div`
  & > .recharts-responsive-container {
    margin: 0 auto;
  }
`;

const TradeChart3 = () => {
  const [totaldonate, setTotaldonate] = useState(0);
  const [donateAvg, setDonateAvg] = useState(0);

  const chartData = [
    { transaction: "2022-03-24", value: 1 },
    { transaction: "2022-03-25", value: 2 },
    { transaction: "2022-03-26", value: 3 },
    { transaction: "2022-03-27", value: 4 },
    { transaction: "2022-03-29", value: 5 },
  ];

  const data = [
    {
      pv: totaldonate,
      uv: donateAvg,
    },
  ];
  const [address, setAddress] = useState(useSelector(selectAddress));
  useEffect(() => {
    fetchTotalDonate();
    fetchDonateSum();
  }, []);
  //   const chartData = {
  //     labels: ["거래내역", "2", "3", "4", "5", "6", "7"],
  //     datasets: [
  //       {
  //         type: "line",
  //         borderWidth: 1,
  //         borderColor: "red",
  //         pointBorderWidth: 0,
  //         backgroundColor: "black",
  //         pointBackgroundColor: "transparent",
  //         data: [1, 2, 3, 4, 5],
  //       },
  //     ],
  //   }
  // 내 기부 총액 조회
  const fetchTotalDonate = async () => {
    try {
      // const response = await axios.get(`/api/mypage/` + address + `/donate`);
      await axios.get(`/api/mypage/` + address + `/total-donate`).then((res) => {
        // console.log("fetchTotalDonate: ", res);
        // console.log("total", res.data);
        console.log(`기부합시다`, res.data);
        setTotaldonate(res.data);
      });
    } catch (e) {
      console.log("error:", e);
    }
  };

  const fetchDonateSum = async () => {
    try {
      const response = await axios.get(`/api/nft/avg-donate`).then((res) => {
        setDonateAvg(res.data);
      });
    } catch (e) {}
  };

  return (
    <ContainerWrapper>
      <BarChart width={530} height={450} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='pv' fill='#8884d8' name='내 기부 총액' />
        <Bar dataKey='uv' fill='#FF9326' name='유저 평균 기부금' />
      </BarChart>

      {/* <ResponsiveContainer width={600} height={400}>
        <LineChart
          width={730}
          height={400}
          data={chartData}
          margin={{ top: 60, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='transaction' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='value'
            stroke='red'
            name='기부금액
          '
          />
        </LineChart>
      </ResponsiveContainer> */}
    </ContainerWrapper>
  );
};

export default TradeChart3;
