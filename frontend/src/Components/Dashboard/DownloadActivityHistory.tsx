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
              backgroundColor: "#b0bec5",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#78909c",
            },
            pr: 1,
          }}
        >
          {history.map((item: any, index: number) => (
            <Box key={index}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                py={1.5}
              >
                <Box display="flex" alignItems="center" gap={2} flex={1}>
                  <Avatar sx={{ width: 40, height: 40 }} />
                  <Typography variant="body1">
                    <strong>{item.username}</strong> downloaded{" "}
                    <span style={{ color: "blue", fontWeight: 500 }}>
                      {item.title} Article
                    </span>{" "}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  sx={{ color: "gray", whiteSpace: "nowrap", pl: 2 }}
                >
                  {calculateDaysAgo(item.createdAt)}
                </Typography>
              </Box>

              {index < history.length - 1 && <Divider />}
            </Box>
          ))}
        </Box>
      ) : (
        <Typography paddingTop={2} color="gray">
          No download activity found.
        </Typography>
      )}
    </Box>
  );
};

export default DownloadActivityHistory;
