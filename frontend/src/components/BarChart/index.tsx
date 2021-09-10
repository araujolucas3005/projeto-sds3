import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSuccess } from "types/sale";
import { round } from "utils/format";
import { BASE_URL } from "utils/requests";

type SeriesData = {
  name: string;
  data: number[];
};

type ChartData = {
  labels: {
    categories: String[];
  };
  series: SeriesData[];
};

export function BarChart() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: [],
    },
    series: [
      {
        name: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    axios
      .get<SaleSuccess[]>(`${BASE_URL}/sales/success-by-seller`)
      .then(({ data }) => {
        const labels = data.map((salesum) => salesum.sellerName);
        const series = data.map((salesum) =>
          round((100 * salesum.deals) / salesum.visited, 1)
        );

        setChartData({
          labels: {
            categories: labels,
          },
          series: [
            {
              name: "% Success",
              data: series,
            },
          ],
        });
      });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
}
