import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import Box from "@mui/material/Box";
import { downloadInfo } from "../Services/getDownloadInfo";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DownloadChart = () => {
  const [chartData, setChartData] = useState<any>(null);
  const chartRef = useRef<any>(null);

  const colors = [
    "rgba(255, 99, 132, 0.7)",
    "rgba(54, 162, 235, 0.7)",
    "rgba(255, 206, 86,  0.7)",
    "rgba(75, 192, 192,  0.7)",
    "rgba(153, 102, 255,  0.7)",
    "rgba(255, 159, 64,  0.7)",
    "rgba(18, 243, 153,  0.7)",
    "rgba(241, 22, 205,  0.7)"
  ];

  const options = {
    plugins: {
      title: { //title of bar chart
        display: true,
        text: "Downloaded Articles"
      },

      legend: { //legends above bar chart
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          boxWidth: 8,
          boxHeight: 8,

        },

        onHover: (_event: any, legendItem: any) => {
          const chart = chartRef.current;
          if (!chart) return;

          const hoverIndex = legendItem.datasetIndex;

          chart.data.datasets.forEach((dataset: any, index: number) => {
            dataset.backgroundColor = index === hoverIndex
              ? colors[index % colors.length]
              : colors[index % colors.length].replace(/[\d.]+\)$/, "0.3)");
          });

          chart.setActiveElements(
            chart.data.labels.map((_label: any, idx: number) => ({
              datasetIndex: hoverIndex,
              index: idx
            }))
          );
          chart.update();
        },
        onLeave: () => {
          const chart = chartRef.current;
          if (!chart) return;

          chart.data.datasets.forEach((dataset: any, index: number) => {
            dataset.backgroundColor = colors[index % colors.length];
          });

          chart.setActiveElements([]);
          chart.update();
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        stacked: true, 
        grid: {
          display: false
        },
      },
      y: {
        stacked: true, 
        grid: {
          display: false
        },
      }
    },
    barThickness: 30,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 2

  };

  useEffect(() => {
    const fetchData = async () => {
      const info = await downloadInfo();
      if (!info || !Array.isArray(info)) return;

      const labels = info.map(item => item.title);
      const allTags = Array.from(new Set(info.flatMap(item => item.tagList))).sort();

      const datasets = allTags.map((tag, index) => ({
        label: tag,
        data: info.map(item =>
          item.tagList.includes(tag)
            ? item.download_count / item.tagList.length
            : 0
        ),
        backgroundColor: colors[index % colors.length]
      }));

      setChartData({ labels, datasets });
    };

    fetchData();
  }, []);

  return (
    <Box height={"700px"} width={"650px"}>
      {chartData ? (
        <Bar ref={chartRef} data={chartData} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
    </Box>
  );
};

export default DownloadChart;
