import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLikedArticles } from "../Services/getMostLikedArticles";
import {
    Box,
    Divider,
    List,
    ListItem,
    Paper,
    Typography,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import type { Article } from "../interfaces";
import { getArticleData } from "../Services/getArticleData";

const MostLikedArticles: React.FC = () => {
    const [likeData, setLikeData] = useState<any>([]);
    const navigate = useNavigate();
    console.log("likedata", likeData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getLikedArticles();
                setLikeData(data);
            } catch (error) {
                console.error("Error fetching liked articles:", error);
            }
        };
        fetchData();
    }, []);

    const handleArticleClick = (article: any) => {
        navigate(`/article/${article.slug}`, { state: { article } });
    };


    const colors = [
        "#1976D2",
        "#D32F2F",
        "#F57C00",
        "#7B1FA2",
        "#00897B",
        "#C2185B",
        "#FBC02D",
    ];


    return (
        <Paper
            elevation={3}
            sx={{ p: 2, borderRadius: 3, width: 316, bgcolor: "background.paper" }}
        >
            <Box display="flex" alignItems="center" gap={1} mb={1}>
                <AssignmentIcon sx={{ color: "#689F38" }} />
                <Typography
                    variant="h6"
                    fontWeight={600}
                    fontSize={16}
                    color="text.primary"
                >
                    Popular Articles
                </Typography>
            </Box>
            <Divider sx={{ mb: 1 }} />

            {likeData && likeData.length > 0 ? (
                <List
                    sx={{
                        maxHeight: 400,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                            width: "6px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#81C784",
                        },
                    }}
                >
                    {likeData.map((item: any, index: number) => {
                        const color = colors[index % colors.length]; // pick color based on index
                        return (
                            <ListItem
                                key={index}
                                // onClick={() => handleArticleClick(item)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    py: 1,
                                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                                    transition: "0.2s",
                                    "&:hover": {
                                        backgroundColor: "rgba(104,159,56,0.08)",
                                        borderRadius: 2,
                                    },
                                }}
                            >
                                <AssignmentIcon sx={{ fontSize: 22, color }} />
                                <Typography flexGrow={1} sx={{ fontSize: "14px" }}>
                                    {item.title}
                                </Typography>
                                <Box
                                    sx={{
                                        px: 1,
                                        py: 0.2,
                                        borderRadius: "8px",
                                        bgcolor: "#E8F5E9",
                                        color: "#388E3C",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        minWidth: "28px",
                                        textAlign: "center",
                                    }}
                                >
                                    {item.likes}
                                </Box>
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    py={4}
                    flexDirection="column"
                >
                    <AssignmentIcon sx={{ fontSize: 40, color: "grey.400", mb: 1 }} />
                    <Typography color="text.secondary">No articles found</Typography>
                </Box>
            )}
        </Paper>
    );
};

export default MostLikedArticles;
