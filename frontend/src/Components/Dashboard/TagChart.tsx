import React, { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { tagInfo } from "../Services/getTagInfo";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    Divider
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TagIcon from "@mui/icons-material/LocalOffer";

ChartJS.register(ArcElement, Tooltip, Legend);

const TagChart: React.FC = () => {
    const [chartData, setChartData] = useState<any>(null);
    const [tagList, setTagList] = useState<{ name: string; article_count: number }[]>([]);
    const chartRef = useRef<any>(null);

    const colors = [
        "rgba(255, 99, 132, 0.9)",
        "rgba(54, 162, 235, 0.9)",
        "rgba(255, 206, 86, 0.9)",
        "rgba(75, 192, 192, 0.9)",
        "rgba(153, 102, 255, 0.9)",
        "rgba(255, 159, 64, 0.9)",
        "rgba(0, 200, 83, 0.9)",
        "rgba(0, 188, 212, 0.9)",
        "rgba(233, 30, 99, 0.9)",
        "rgba(255, 87, 34, 0.9)",
        "rgba(155, 229, 186, 0.9)",
    ];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 6,
                    boxHeight: 6,
                    color: "#333",
                },
                onHover: (_event: any, legendItem: any) => {
                    const chart = chartRef.current;
                    if (!chart) return;
                    const hoverIndex = legendItem.index;
                    const hoverBackgroundColors = colors.map((color, index) =>
                        index === hoverIndex ? color : color.replace(/[\d.]+\)$/, "0.3)")
                    );
                    chart.data.datasets[0].backgroundColor = hoverBackgroundColors;
                    chart.setActiveElements([{ datasetIndex: 0, index: hoverIndex }]);
                    chart.update();
                },
                onLeave: () => {
                    const chart = chartRef.current;
                    if (!chart) return;
                    chart.data.datasets[0].backgroundColor = [...colors];
                    chart.setActiveElements([]);
                    chart.update();
                },
            }, 
        },
        
        
        elements: {
            arc: {
                borderWidth: 2,
                borderColor: "rgba(255,255,255,0.5)",
                hoverOffset: 20,
            },
        },
        animation: false,
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const datafromBackend = await tagInfo();
                setTagList(datafromBackend);
                const labels = datafromBackend.map((item: any) => item.name);
                const values = datafromBackend.map((item: any) => item.article_count);
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "No of Articles per Tag",
                            data: values,
                            backgroundColor: colors,
                            borderAlign: "center",
                        },
                    ],
                });
            } catch (error) {
                console.log("Internal Server Error");
            }
        };
        fetchData();
    }, []);

    return (

        <Box sx={{ width:800}}>
            <Box >

                <Typography variant="h6" fontWeight={600} color={"#689F38"} marginBottom={2} marginTop={2}  fontSize={18} >
                    Popular Tags
                    <Divider />
                </Typography>


                <Box display="flex" justifyContent="center" alignItems="flex-start" gap={17} marginBottom={2}>

                    {chartData ? (
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Box sx={{ width: 300, height: 300 }}>
                                <Pie data={chartData} options={options} ref={chartRef} />
                            </Box>
                        </Box>
                    ) : (
                        <Typography>Loading chart...</Typography>
                    )}
                    <List
                        sx={{
                            maxHeight: 300,
                            overflowY: "auto",
                            "&::-webkit-scrollbar": {
                                width: "6px",
                            },

                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#78909c",
                            },
                        }}
                    >
                        {tagList.map((tag, index) => (
                            <ListItem
                                key={tag.name}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    py: 0.5,
                                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                                }}
                            >
                                <TagIcon
                                sx={{
                                    fontSize: 20,
                                    color: colors[index % colors.length],
                                }}
                            />
                                <Typography sx={{ flexGrow: 1, fontSize: "14px" }}>
                                    {tag.name}
                                </Typography>
                                <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>
                                    {tag.article_count}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default TagChart;
