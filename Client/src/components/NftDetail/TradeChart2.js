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
    float: left;
  }
`;

const TradeChart2 = ({ sellPrices, sellDates }) => {
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
    { transaction: sellDates.date1, value: sellPrices.price1 },
    { transaction: sellDates.date2, value: sellPrices.price2 },
    { transaction: sellDates.date3, value: sellPrices.price3 },
    { transaction: sellDates.date4, value: sellPrices.price4 },
    { transaction: sellDates.date5, value: sellPrices.price5 },
  ];

  return (
    <ContainerWrapper>
      <ResponsiveContainer width={700} height={600}>
        <LineChart
          width={730}
          height={400}
          data={chartData}
          margin={{ top: 30, right: 10, left: 10, bottom: 100 }}
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
