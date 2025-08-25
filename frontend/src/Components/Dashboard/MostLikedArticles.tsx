import { useEffect, useState } from "react";
import { getLikedArticles } from "../Services/getMostLikedArticles";
import { Box, Divider, List, ListItem, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const MostLikedArticles: React.FC = () => {

    const [likeData, setLikeData] = useState<any>([]);

    useEffect(() => {

        const fetchData = async () => {
            const info = await getLikedArticles();
            console.log("like data result", info);
            setLikeData(info);
        };
        fetchData();
    }, []);


    return (
        <>
            <Box width={316} >
                <Box>
                    <Typography variant="h6" fontWeight={600} color={"#689F38"} marginBottom={2} marginTop={2} >
                        Popular Articles
                        <Divider />
                    </Typography>

                    <Box>

                        {likeData && likeData.length > 0 ? (
                            <List
                                sx={{
                                    maxHeight: 400,
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
                                }}
                            >
                                {likeData.map((item: any, index: number) => (
                                    <ListItem sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        py: 0.5,
                                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                                    }}>
                                        <AssignmentIcon
                                            sx={{
                                                fontSize: 26,
                                                color: "#689F38"

                                            }}
                                        />
                                        <Typography key={index} flexGrow={1} sx={{ fontSize: "14px" }}>{item.title}</Typography>
                                        <Typography sx={{ fontWeight: 600, fontSize: "13px" }}>{item.likes}</Typography>

                                    </ListItem>

                                ))}
                            </List>
                        ) : (
                            <Box>
                                <Typography>No data Found</Typography>
                            </Box>
                        )}


                    </Box>


                </Box>
            </Box>

        </>
    )

}

export default MostLikedArticles;