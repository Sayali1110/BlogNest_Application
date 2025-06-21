import React, { createContext, use, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { Article } from "../../interfaces";
import { Link, Navigate } from "react-router-dom";
import { ReadMorePage } from "../ReadMorePage";
import { postFavorite } from "../../Services/postFavorite";

interface ArticlePageProps {
  articles: Article[];
}
export const articleContext = createContext<any>(null);

const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {

  


  // const handleLikes = (article:Article) =>{
  //   const like = article.favorited;
  //   const likeResponse = postFavorite(article.slug);
  //   console.log("LIke Response", likeResponse)

  // }

  return (
    <>
      {!articles ? "" : articles.map((article, index) => (
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
                    sx={{ backgroundColor: "#bdbdbd", width: 38, height: 38 }}
                  >
                    {article.author.username[0]}
                  </Avatar>
                )}
                <Box textAlign="left" lineHeight={1.2}>
                  <Typography sx={{ mb: -0.7, color: "#558b2f" }}>
                    {article.author.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={0.5}>
                <Button variant="outlined"
                  sx={{
                    color: "#558b2f",
                    '&:hover': {
                      backgroundColor: '#8bc34a',
                      borderColor: 'white',
                    },
                  }}
                >
                  <FavoriteBorderIcon
                    sx={{
                      fontSize: "small",
                    }}
                  />
                  <Typography
                    fontSize={"small"}
                  >
                    {article.favoritesCount}
                  </Typography>
                </Button>
              </Box>
            </Box>


            <Box mt={2} textAlign="left">
              <Typography variant="h6" fontWeight="bold">
                {article.slug}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {article.description}
              </Typography>

              <Box display="flex" justifyContent="space-between" mt={1} mb={-1}>
                <Typography
                  component={Link}
                  to={`/article/${article.slug}`}
                  state={{ article }}
                  sx={{
                    fontSize: "0.775rem",
                    cursor: "pointer",
                    color: "#9e9e9e",
                    textDecoration: "none",
                  }}
                >
                  Read more...
                </Typography>
                <Box display="flex">
                  {article.tagList.map((tag: any, index: number) => (
                    <Link
                      key={index}
                      to={`/article/${article.slug}`}
                      state={{ article }}
                      style={{ textDecoration: 'none' }}
                    >
                      <Chip
                        label={tag}
                        size="small"
                        sx={{ mr: 1, cursor: 'pointer' }}
                        variant="outlined"
                      />
                    </Link>
                  ))}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}

    </>
  );
};

export default ArticlePage;
