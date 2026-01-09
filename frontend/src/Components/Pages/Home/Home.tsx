import React, { useContext, useEffect, useState, type SyntheticEvent } from "react";
import {
  Box,
  Tabs,
  Tab,
  Stack,
  Pagination,
  CircularProgress,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

import { getTags } from "../../Services/getTags";
import { getArticles } from "../../Services/getArticles";
import type { ArticleResponse } from "../../interfaces";
import TagPage from "./TagPage";
import ArticlePage from "./ArticlePage";
import Header from "../../Header";
import { UserContext } from "../../../App";
import { useLocation, useParams } from "react-router-dom";
import { getComments } from "../../Services/getComments";
import Dashboard from "./Dashboard";

type Props = {
  setUserData: (userData: any, isAuth?: boolean) => void;

};

const Home: React.FC<Props> = ({ setUserData}) => {
  const [page, setPage] = useState(1);
  const userInfo = useContext(UserContext);
  const [articles, setArticles] = useState<any[]>([]); // 3 articles on one page 
  const articleOnOnePage = 3;
  const [articleCount, setArticleCount] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedTab, setselectedTab] = useState<number>(-1);

  //const [selectedTab, setselectedTab] = useState(-1);

  const { username } = useParams();

  const location = useLocation();

  const isProfilePage = location.pathname.startsWith("/profile");

  const [loading, setLoading] = useState(true);

  const handlePages = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleTags = (value: string) => {
    setSelectedTag(value);
    setselectedTab(3)
  };

  const handleReset = () => {
    if (userInfo?.isAuth) {
      setselectedTab(0);
    } else {
      setselectedTab(1);
    }
    setPage(1);
    setSelectedTag("");
  };

  const changeTab = (event: React.SyntheticEvent, value: number) => {
    setPage(1);
    setselectedTab(value);
    if (value !== 2) {
      setSelectedTag("");
    }
  };

  const fetchArticles = async () => {

    try {
      setLoading(true);
      // pages * 3 - pages * 2
      const offset = (page - 1) * articleOnOnePage;
      let articleResponse: ArticleResponse;

      if (isProfilePage) {

        if (selectedTab === 0) {
          articleResponse = await getArticles(offset, articleOnOnePage, "", userInfo?.user?.token, false, username);
        }
        else if (selectedTab === 1) {
          articleResponse = await getArticles(offset, articleOnOnePage, "", userInfo?.user?.token, false, " ", username);
        }
        else {
          return;
        }
        setArticles(articleResponse?.articles || []);
        setArticleCount(articleResponse?.articlesCount || 0);

      }
      else {
        setLoading(true);

        if (selectedTab === 1 && userInfo?.isAuth) {
          articleResponse = await getArticles(offset, articleOnOnePage, "", userInfo?.user?.token, true);
        }
        else if (selectedTab === 2) {
          articleResponse = await getArticles(offset, articleOnOnePage, "", userInfo?.user?.token, false);
        }
        else if (selectedTab === 3 && selectedTag) {
          articleResponse = await getArticles(offset, articleOnOnePage, selectedTag, userInfo?.user?.token, false);
        }
        else {
          return;
        }
        setArticles(articleResponse?.articles || []);
        setArticleCount(articleResponse?.articlesCount || 0);
      }

    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
      setArticleCount(0);
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
    fetchTags();
  }, []);

  useEffect(() => {
    if (userInfo?.isAuth !== undefined) {
      setselectedTab(userInfo?.isAuth ? 0 : 1);
      setPage(1);
    }
  }, [userInfo?.isAuth]);

  useEffect(() => {
    if (selectedTab !== -1) {
      fetchArticles();
    }
  }, [selectedTab, selectedTag, page]);


  useEffect(() => {
    if (isProfilePage) {
      setselectedTab(0);
    } else if (userInfo?.isAuth !== undefined) {
      setselectedTab(userInfo.isAuth ? 0 : 1);
    }
    setPage(1);
    setSelectedTag("");
  }, [isProfilePage, userInfo?.isAuth]);

  return (
    <Box>
      {(loading || selectedTab === -1) ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {isProfilePage ? (
            <Box display="flex" flexDirection="column" alignItems="center" py={4} sx={{ backgroundColor: "#e0e0e0" }}>
              <Avatar sx={{ width: 80, height: 80 }} />
              <Typography variant="h5" mt={2}>
                {userInfo?.user?.user?.username}
              </Typography>
            </Box>
          ) : (
            <Header />
          )}

          {/* Tabs */}
          {isProfilePage ? (
            <Tabs value={selectedTab} onChange={changeTab} textColor="inherit"
              TabIndicatorProps={{
                style: { backgroundColor: "#8bc34a" },
              }}>
              <Tab label="My Articles" sx={{ color: "#8bc34a" }} value={0} />
              <Tab label="Favorited Articles" sx={{ color: "#8bc34a" }} value={1} />
            </Tabs>
          ) : (
            <Tabs value={selectedTab} onChange={changeTab} textColor="inherit"
              TabIndicatorProps={{
                style: { backgroundColor: "#8bc34a" },
              }}>
              <Tab label="Dashboard" sx={{ color: "#8bc34a" }} value={0} />
              {userInfo?.isAuth && <Tab label="Your Feed" sx={{ color: "#8bc34a" }} value={1} />}
              <Tab label="Global Feed" sx={{ color: "#8bc34a" }} value={2} />
              {selectedTag && <Tab label={selectedTag} sx={{ color: "#8bc34a" }} value={3} />}
            </Tabs>
          )}

          <Box width="100%" display="flex" justifyContent="space-between" gap={2}>
            <Box flex={3}>
              {isProfilePage ? (
                <>
                  {selectedTab === 0 && <ArticlePage articles={articles} />}
                  {selectedTab === 1 && <ArticlePage articles={articles} />}
                </>
              ) : (
                <>
                  {selectedTab === 0 && <Dashboard />}
                  {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                      <CircularProgress />
                      loading articles
                    </Box>
                  ) : (
                    <>
                      {selectedTab === 1 && <ArticlePage articles={articles} />}
                      {selectedTab === 2 && <ArticlePage articles={articles} />}
                      {selectedTab === 3 && <ArticlePage articles={articles} />}
                      {articles.length > 0 && selectedTab !== 0 ? (
                        <Box>
                          <Stack spacing={2}>
                            <Pagination
                              count={Math.ceil(articleCount / articleOnOnePage)}
                              onChange={handlePages}
                              page={page}
                            />
                          </Stack>
                        </Box>
                      ) : (
                        selectedTab !== 0 && (
                          <Typography align="left" padding={2} marginLeft={-2}>
                            Articles not available
                          </Typography>
                        )
                      )}
                    </>
                  )}
                </>
              )}
            </Box>

            {!isProfilePage && selectedTab !== 0 && (
              loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                  <CircularProgress />
                  loading Tags
                </Box>
              ) : (
                <Box
                  sx={{
                    backgroundColor: "#e0e0e0",
                    width: "25%",
                    borderRadius: "8px"
                  }}
                >
                  <TagPage tags={tags} handleTags={handleTags} />
                </Box>
              )
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Home;