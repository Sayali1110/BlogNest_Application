import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";

import { getTags } from "../../Services/getTags";
import { getArticles } from "../../Services/getArticles";
import type { ArticleResponse } from "../../interfaces";
import TagPage from "./TagPage";
import ArticlePage from "./ArticlePage";
import Header from "../../Header";
import { UserContext } from "../../../App";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<any[]>([]); // articles on one page
  const articleOnOnePage = 3;
  const [articleCount, setArticleCount] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tagSelected, setTagSelected] = useState("");

  const [loading, setLoading] = useState(true);

  const userInfo = useContext(UserContext);

  const handlePages = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleTags = (value: string) => {
    setTagSelected(value);
  };
  const handleReset = () => {
    setPage(1);
    setTagSelected("");
  };

  const fetchArticles = async () => {
    try {
      const offset = (page - 1) * articleOnOnePage;
      let articleResponse: ArticleResponse;
      if (!tagSelected) {
        articleResponse = await getArticles(offset, articleOnOnePage);
      } else {
        articleResponse = await getArticles(offset, articleOnOnePage, tagSelected);
      }
      setArticles(articleResponse?.articles);
      setArticleCount(articleResponse?.articlesCount);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const tagResponse: any = await getTags();
      setTags(tagResponse?.tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [tagSelected, page]);

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <Box sx={{ overflowX: "hidden" }}>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Header />

          <Tabs value={userInfo?.isAuth ? 0 : !tagSelected ? 1 : 2}>
            {userInfo?.isAuth && <Tab label="Your Feed" sx={{color:"#e91e63"}} />}
            <Tab label="Global Feed" onClick={() => handleReset()} sx={{color:"#e91e63"}}   />
            {tagSelected && <Tab label={tagSelected} sx={{color:"#e91e63"}}/>}
          </Tabs>

          <Box width="100%" display="flex" justifyContent="space-between" gap={2}>

            {loading ? (<Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="300px"
            >
              <CircularProgress />
              loading artciles

            </Box>) : (<Box flex={3}>
              <ArticlePage articles={articles} />
              <Box>
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(articleCount / articleOnOnePage)}
                    onChange={handlePages}
                    page={page}
                  />
                </Stack>
              </Box>
            </Box>)}

            {loading ? (<Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="300px"
            >
              <CircularProgress />
              loading Tags
            </Box>) : (
              <Box
                sx={{
                  backgroundColor: '#e0e0e0',
                  width: "25%",
                  borderRadius: "8px"
                }}
              >
                <TagPage tags={tags} handleTags={handleTags} />

              </Box>)}

          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;
