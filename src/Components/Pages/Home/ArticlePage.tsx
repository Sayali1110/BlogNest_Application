import React, { createContext, use, useContext, useEffect, useState } from "react";
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { Article } from "../../interfaces";
import { Link, Navigate } from "react-router-dom";
import { ReadMorePage } from "../ReadMorePage";
import { postFavorite } from "../../Services/postFavorite";
import { UserContext } from "../../../App";
import { getArticles } from "../../Services/getArticles";



interface ArticlePageProps {
  articles: Article[];
}
export const articleContext = createContext<any>(null);

const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {// 3 articles

  const [article, setArticle] = useState<any[]>(articles);
  console.log("article from state", article);
  console.log("article from props", articles);


  const userInfo = useContext(UserContext);
  console.log(userInfo, "userInfo");
  const username = userInfo?.user?.user?.username

  const handleLikes = async (likeIndex: number) => {

    if (!userInfo?.isAuth) {
      console.log(userInfo?.isAuth);
      alert("you need to login first");
      return;
    }

    try {
      const modifyArticle = await articles.map(async (article: Article, index: number) => {
        if (likeIndex === index) {

          if (article.favorited) {
            let count = article.favoritesCount - 1;
            article.favoritesCount = count;
            article.favorited = false;
            setArticle(articles);
          }
          else {
            let count = article.favoritesCount + 1;
            article.favoritesCount = count;
            article.favorited = true;
            setArticle(articles)
          }

          const likeResponse = await postFavorite(article.slug, article.favorited);
          return article;
        }
      })
      setArticle(modifyArticle);
    }
    catch (error) {
      console.error(error);
    }
  }

   useEffect(() => {
    setArticle(articles);
  }, [])

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
            <Box display="flex" justifyContent="space-between" >
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
                    color: article.favorited ? "red" : "#7cb342",
                    borderColor: article.favorited ? "red" : "white",
                  }}

                  onClick={() => { handleLikes(index) }}
                >

                  {article.favorited ? (<FavoriteIcon
                    sx={{
                      fontSize: "small",
                      color: "#e53935",

                    }}
                  />) :
                    (<FavoriteBorderIcon
                      sx={{
                        fontSize: "small",
                        color: "#e53935",
                      }}
                    />)}

                  <Typography
                    fontSize={"small"}
                    sx={{ color: "#e53935" }}
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

