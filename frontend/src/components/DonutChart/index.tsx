import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
  labels: string[];
  series: number[];
};

export function DonutChart() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    series: [],
  });

  useEffect(() => {
    axios
      .get<SaleSum[]>(`${BASE_URL}/sales/amount-by-seller`)
      .then(({ data }) => {
        const labels = data.map((salesum) => salesum.sellerName);
        const series = data.map((salesum) => salesum.sum);

        setChartData({ labels, series });
      });
  }, []);

  const options = {
    legend: {
      show: true,
    },
  };

  return (
    <Chart
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
}
