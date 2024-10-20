import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { CategoryKey } from "../../../types/CommonTypes";

interface IBarChart {
  data: number[];
  onBarClick: (key: CategoryKey | any) => void;
}

const BarChart = ({ data, onBarClick }: IBarChart) => {
  const options: Highcharts.Options = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Participants Data",
      align: "center",
    },
    xAxis: {
      gridLineWidth: 0,
      categories: ["A", "B", "C", "D", "E", "F"],
      title: {
        text: "Categories",
        style: {
          fontSize: "18px",
        },
      },
    },
    yAxis: {
      gridLineWidth: 1.5,
      title: {
        text: "Category average",
        style: {
          fontSize: "18px",
        },
      },
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        point: {
          events: {
            click: function () {
              onBarClick(String(this?.category) ?? "");
            },
          },
        },
        states: {
          hover: {
            enabled: true,
            color: "red",
          },
        },
      },
      bar: {
        borderColor: "blue",
        borderWidth: 2,
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: "bar",
        name: "Category",
        data: data ?? [],
      },
    ],
  };

  return (
    <>
      <div className="bar_chart_cont">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default BarChart;
