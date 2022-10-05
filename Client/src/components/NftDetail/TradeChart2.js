import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "@emotion/styled";

const ContainerWrapper = styled.div`
  & > .recharts-responsive-container {
    margin: 0 auto;
  }
`;

const TradeChart2 = () => {
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

  const chartData = [
    { transaction: "2022-03-24", value: 1 },
    { transaction: "2022-03-25", value: 2 },
    { transaction: "2022-03-26", value: 3 },
    { transaction: "2022-03-27", value: 4 },
    { transaction: "2022-03-29", value: 5 },
  ];

  return (
    <ContainerWrapper>
      <ResponsiveContainer width={600} height={400}>
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
          <Line type='monotone' dataKey='value' stroke='red' name='가격' />
        </LineChart>
      </ResponsiveContainer>
    </ContainerWrapper>
  );
};

export default TradeChart2;
