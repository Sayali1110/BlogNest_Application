import React, { useEffect, useState } from "react";
import { downloadActivity } from "../Services/getDownloadActivity";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

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
    const givenDate = new Date(dateString);
    const today = new Date();
    const differenceInTime = today.getTime() - givenDate.getTime();
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    if (differenceInDays === 0) return "Today";
    if (differenceInDays === 1) return "1 day ago";
    return `${differenceInDays} days ago`;
  };

  return (
    <Box sx={{ maxWidth: 700, width: "100%" }}>
      {history && history.length > 0 ? (
        <Box
          sx={{
            maxHeight: 450,
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#cfd8dc",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#90a4ae",
            },
            pr: 1,
          }}
        >
          {history.map((item: any, index: number) => (
            <Card
              key={index}
              sx={{
                mb: 1.5,
                borderRadius: 2,
                boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1.5,
                  px: 2,
                }}
              >
                <Box display="flex" alignItems="center" gap={2} flex={1}>
                  <Avatar sx={{ width: 34, height: 34 }} src={item.image}>
                    {!item.image && item.username?.charAt(0)}
                  </Avatar>
                  <Typography variant="body2" fontSize="15px">
                    <strong>{item.username}</strong> downloaded{" "}
                    <span
                      style={{
                        color: "#1976d2",
                        fontWeight: 500,
                      }}
                    >
                      {item.title}
                    </span>{" "}
                    Article
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", whiteSpace: "nowrap" }}
                >
                  {calculateDaysAgo(item.createdAt)}
                </Typography>
              </CardContent>
              {index < history.length - 1 && <Divider />}
            </Card>
          ))}
        </Box>
      ) : (
        <Typography paddingTop={2} color="gray" textAlign="center">
          No download activity found.
        </Typography>
      )}
    </Box>
  );
};

export default DownloadActivityHistory;
