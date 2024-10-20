import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CategoryKey } from "../../../types/CommonTypes";

interface ILineChart {
  selectedKey: CategoryKey;
  data: { day: string; val: number }[];
}

const LineChart = ({ selectedKey, data }: ILineChart) => {
  const transformedData = useMemo(() => {
    return data.map((item) => [new Date(item.day).getTime(), item.val]);
  }, [data]);

  const chartOptions = {
    chart: {
      type: "line",
      zoomType: "x",
      panning: true,
      panKey: "shift",
    },
    title: {
      text: "Category - " + selectedKey?.toUpperCase(),
      align: "center",
    },
    xAxis: {
      type: "datetime",
      labels: {
        format: "{value:%e %b}",
        style: {
          fontSize: "12px",
        },
      },
      title: {
        text: "Date",
        style: {
          fontSize: "18px",
        },
      },
    },
    yAxis: {
      title: {
        text: "Numeric Values",
        style: {
          fontSize: "18px",
        },
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: "Values",
        data: transformedData,
      },
    ],
  };

  return (
    <>
      <div className="line_chart_cont">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </>
  );
};

export default LineChart;
