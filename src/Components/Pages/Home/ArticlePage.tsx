import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { Article } from "../../interfaces";

interface ArticlePageProps {
  articles: Article[];
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {
  return (
    <>
      {articles.map((article, index) => (
        <Card
          key={index}
          variant="outlined"
          sx={{
            my: 2,
            width: "100%",
            boxSizing: "border-box",
            transition: "0.3s",
            "&:hover": { boxShadow: 2 },
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" gap={0.7}>
                {article.author.image ? (
                  <Avatar src={article.author.image} />
                ) : (
                  <Avatar
                    sx={{ backgroundColor: "#e91e63", width: 48, height: 48 }}
                  >
                    {article.author.username[0]}
                  </Avatar>
                )}
                <Box textAlign="left" lineHeight={1.2}>
                  <Typography fontWeight="bold" sx={{ mb: -0.7 }}>
                    {article.author.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(article.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <FavoriteBorderIcon
                  sx={{
                    fontSize: "small",
                    color: "#f48fb1",
                    "&:hover": {
                      color: "#e91e63",
                    },
                  }}
                />
                <Typography
                  fontSize={"small"}
                  color="#f48fb1"
                  sx={{
                    "&:hover": {
                      color: "#e91e63",
                    },
                  }}
                >
                  {article.favoritesCount}
                </Typography>
              </Box>
            </Box>

            <Box mt={2} textAlign="left">
              <Typography variant="h6" fontWeight="bold">
                {article.slug}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description}
              </Typography>
              <Typography
                variant="caption"
                color="#e91e63"
                sx={{ cursor: "pointer" }}
              >
                Read more...
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
      
    </>
  );
};

export default ArticlePage;
