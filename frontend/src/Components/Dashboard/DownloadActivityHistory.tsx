import React, { useEffect, useState } from "react";
import { downloadActivity } from "../Services/getDownloadActivity";
import { Avatar, Box, Card, Typography } from "@mui/material";

const DownloadActivityHistory = () => {
    const [history, setHistory] = useState<any>([]);

    useEffect(() => {
        const data = async () => {
            const result = await downloadActivity();
            console.log("result downloading history", result);
            setHistory(result);
        };
        data();
    }, []);

    const calculateDaysAgo = (dateString: string) => {
        console.log("dataString", dateString);
        const givenDate = new Date(dateString);//indian dtanaderd format
        console.log("given data", givenDate);
        const today = new Date();
        const differenceInTime = today.getTime() - givenDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

        if (differenceInDays === 0) return "Today";
        if (differenceInDays === 1) return "1 day ago";
        return `${differenceInDays} days ago`;
    };

    return (
        <div>
            <Typography sx={{ color: "#e53935" }} marginBottom={2}>Download Activity</Typography>

            <Card
                sx={{
                    borderRadius: 4,
                }}
            >


                {history && history.length > 0 ? (
                    <Box
                        sx={{
                            maxHeight: 300,
                            overflowY: "auto",
                            background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
                            padding: 2,
                            borderRadius: 6
                        }}
                    >
                        {history.map((item: any, index: any) => (
                            <Box
                                key={index}
                                display={"flex"}
                                gap={2}
                                padding={1}
                                borderBottom="1px solid #ccc"
                            >
                                <Avatar sx={{ width: 40, height: 40 }} />

                                <Box display={"flex"} alignItems={"center"} flexWrap="wrap">
                                    <Typography fontWeight="bold">{item.username} </Typography>
                                    <Typography paddingLeft={1}> - downloaded - </Typography>
                                    <Typography paddingLeft={1} sx={{ color: "blue" }}> {item.title} Article </Typography>
                                    <Typography paddingLeft={1}> - {item.description}</Typography>
                                    <Typography paddingLeft={1} sx={{ color: "gray" }}>
                                        - {calculateDaysAgo(item.createdAt)}
                                    </Typography>


                                </Box>
                            </Box>
                        ))}
                    </Box>
                ) : (
                    <Typography paddingTop={2} color="gray">
                        No download activity found.
                    </Typography>
                )}

            </Card>

        </div>
    );
};

export default DownloadActivityHistory;
