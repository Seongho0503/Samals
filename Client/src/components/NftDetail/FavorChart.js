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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import axios from "axios";
import { useState, useEffect } from "react";
const FavorChart = () => {
  const [favors, setFavor] = useState({
    bird: 0,
    elephant: 0,
    shark: 0,
    tiger: 0,
    frog: 0,
    iguana: 0,
    leopard: 0,
    penguin: 0,
    rhino: 0,
  });
  useEffect(() => {
    SaleDetail();
  }, []);
  const data = [
    {
      subject: "토코토칸",
      A: favors.bird,
      //   B: 110,
      fullMark: 150,
    },
    {
      subject: "아프리카 숲 코끼리",
      A: favors.elephant,
      //   B: 130,
      fullMark: 150,
    },
    {
      subject: "아무르 표범",
      A: favors.leopard,
      //   B: 130,
      fullMark: 150,
    },
    {
      subject: "와이오밍 두꺼비",
      A: favors.frog,
      //   B: 100,
      fullMark: 150,
    },
    {
      subject: "호랑이",
      A: favors.tiger,
      //   B: 90,
      fullMark: 150,
    },
    {
      subject: "백상아리",
      A: favors.shark,
      //   B: 85,
      fullMark: 150,
    },
    {
      subject: "바다 이구아나",
      A: favors.iguana,
      //   B: 85,
      fullMark: 150,
    },
    {
      subject: "남부 바위뛰기 펭귄",
      A: favors.penguin,
      //   B: 85,
      fullMark: 150,
    },
    {
      subject: "큰뿔코뿔소",
      A: favors.rhino,
      //   B: 85,
      fullMark: 150,
    },
  ];
  const SaleDetail = async (saleSeq) => {
    try {
      await axios.get(`/api/user/profile/count`).then((data) => {
        console.log("선호도", data);
        setFavor({
          bird: data.data[0].selectCount,
          elephant: data.data[1].selectCount,
          shark: data.data[2].selectCount,
          tiger: data.data[3].selectCount,
          frog: data.data[4].selectCount,
          iguana: data.data[5].selectCount,
          leopard: data.data[6].selectCount,
          penguin: data.data[7].selectCount,
          rhino: data.data[8].selectCount,
        });
      });
    } catch (e) {
      console.log("error:", e);
    }
  };
  return (
    <RadarChart
      outerRadius={90}
      width={730}
      height={250}
      data={data}
      font-family='GangwonEdu_OTFBoldA'
    >
      <PolarGrid />
      <PolarAngleAxis dataKey='subject' />
      <PolarRadiusAxis angle={50} domain={[0, 10]} />
      <Radar
        name='세이멀스 유저 동물 프로필 선호도'
        dataKey='A'
        stroke='#8884d8'
        fill='#8884d8'
        fillOpacity={0.6}
      />
      {/* <Radar name='Lily' dataKey='B' stroke='#82ca9d' fill='#82ca9d' fillOpacity={0.6} /> */}
      <Legend />
    </RadarChart>
  );
};

export default FavorChart;
