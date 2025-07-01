import React, { useContext, useEffect, useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Container,
    Divider,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getComments } from '../Services/getComments';
import { Main_URL } from '../constants';
import axios from 'axios';
import { UserContext } from '../../App';
import { Favorite } from '@mui/icons-material';
import { postComment } from '../Services/postComment';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { postFavorite } from '../Services/postFavorite';
import { postFollow } from '../Services/postFollow';

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { deleteArticle } from '../Services/deleteArticle';


type Props = {
    setUserData: (userData: any, isAuth?: boolean) => void;
};

export const ReadMorePage: React.FC<Props> = ({ setUserData }) => {

    const [comments, setComments] = useState([]);
    const { slug } = useParams();
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const location = useLocation();
    const article = location.state?.article;

    const [isFollowing, setIsFollowing] = useState(article.author.followers || false);
    const [followersCount, setFollowersCount] = useState(article.author.followersCount || 0);
    const [isFavorited, setIsFavorited] = useState(article.favorited || false)
    const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount || 0)
    const [body, setBody] = useState("");

    const username = userInfo?.user?.user?.username

    const handleToggleFollow = async () => {

        if (!userInfo?.isAuth) {
            console.log(userInfo?.isAuth);
            alert("you need to login first");
            return;
        }

        try {
            if (isFollowing) {
                setFollowersCount((followersCount: any) => followersCount - 1);
            } else {
                setFollowersCount((followersCount: any) => followersCount + 1);
            }
            setIsFollowing(!isFollowing);

            const followingResponse = await postFollow(article.slug, article.author.username, isFollowing, followersCount);
            console.log("folling response ", followingResponse);
            setFollowersCount(followingResponse.followersCount);
            setIsFollowing(followingResponse.following)

        } catch (error) {
            console.log(error);
        }
    };

    const handleToggleFavorits = async () => {

        if (!userInfo?.isAuth) {
            console.log(userInfo?.isAuth);
            alert("you need to login first");
            return;
        }

        try {
            if (isFavorited) {
                setFavoritesCount((favoritesCount: any) => favoritesCount - 1)
            }
            else {
                setFavoritesCount((favoritesCount: any) => favoritesCount + 1)
            }
            setIsFavorited(!isFavorited);

            const likeResponse = await postFavorite(article.slug, isFavorited);
            console.log("likes response..", likeResponse);
            console.log("likes response..", likeResponse.favorited);
            console.log("likes count", likeResponse.favoritesCount);

            if (likeResponse) {
                setIsFavorited(likeResponse.favorited);
                setFavoritesCount(likeResponse.favoritesCount);
            }

        } catch (error) {
            console.error(error);
        }

    };

    const handleSubmit = async () => {

        if (!userInfo?.isAuth) {
            console.log(userInfo?.isAuth);
            alert("you need to login first");
            return;
        }
        try {
            const postedComment = await postComment(article.slug, body);
            console.log("posted comment", postedComment)
            setBody("");
        }
        catch (error) {
            console.error("error posting comment", error)
        }
    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this article?");
        if (!confirmDelete) return;

        try {
            await deleteArticle(article.slug);
            alert("Article deleted successfully!");
            navigate('/');
        } catch (error) {
            console.error("Error deleting article:", error);
            alert("Failed to delete the article. Please try again.");
        }
    };

    const handleUpdate = async () => {

        navigate('/newArticle', { state: { article } });
    };

    useEffect(() => {
        const fetchComments = async () => {
            try {
                console.log("artilce from effect", article)
                const commentResponse = await getComments(article.slug);
                setComments(commentResponse.comments);
                console.log("Fetched Comments:", commentResponse.comments);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, []);


    return (
        <Box sx={{
            width: '100vw',
            overflowX: 'hidden',
            m: 0,
            p: 0
        }}>
            <Box sx={{
                bgcolor: '#8bc34a',
                color: 'white',
                py: 4,
                px: 4,
                width: '93.7%',
                m: 0
            }}>
                <Typography variant="h4" align="left" fontWeight="bold" > {article.title}</Typography>

                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap" lineHeight={0.5} mt={3} mb={-1}>
                    <Avatar
                        src={article.author.image || ''}
                        alt={article.author.username}
                        sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                        <Typography fontWeight="bold" align='left'>{article.author.username}</Typography>
                        <Typography variant="caption" >
                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Typography>
                    </Box>

                    {username === article.author.username ? (
                        <Box ml={2} display="flex" gap={1}>
                            <Button variant="outlined" size="small" sx={{ backgroundColor: "white" }} onClick={handleUpdate}>Edit Article</Button>
                            <Button variant="outlined" size="small" color="error" onClick={handleDelete}>Delete Article</Button>
                        </Box>
                    ) : (
                        <Box ml={2} display="flex" gap={1}>
                            <Button variant="outlined" size="small"
                                sx={{
                                    backgroundColor: "white",
                                    color: "#66bb6a",
                                    border: "1px solid #66bb6a",
                                    '&:hover': {
                                        color: "#2e7d32",
                                        border: "1px solid #66bb6a",
                                    },
                                }}
                                onClick={handleToggleFollow}
                                value={followersCount}
                            >
                                {isFollowing ? `-Unfollow` : `+ Follow`} {article.author.username} ({followersCount})
                            </Button>

                            <Button
                                sx={{
                                    backgroundColor: "white",
                                    color: "#66bb6a",
                                    border: "1px solid #66bb6a",
                                    '&:hover': {
                                        color: "#2e7d32",
                                        border: "1px solid #66bb6a",
                                    },
                                }}
                                variant="outlined"
                                size="small"
                                startIcon={
                                    isFavorited ? (
                                        <FavoriteIcon sx={{ fontSize: "small", color: "#66bb6a" }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ fontSize: "small", color: "#66bb6a" }} />
                                    )
                                }
                                value={favoritesCount}
                                onClick={handleToggleFavorits}
                            >
                                {isFavorited ? `dislike` : `like`} ({favoritesCount})
                            </Button>
                        </Box>
                    )}
                </Box>

            </Box>


            <Box sx={{ px: 4, py: 4, width: '100vw' }}>
                <Typography variant="h6" gutterBottom textAlign={"left"}>
                    {article.description}
                </Typography>

                <Box mt={4} mb={4} display="flex" flexWrap="wrap">
                    {article.tagList.map((tag: any, index: number) =>
                        <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{ mr: 1 }} variant="outlined"
                        />
                    )}
                </Box>
                <Divider sx={{ mb: 3 }} />


                {/* Comment */}

                <Box display="flex" alignItems="center" gap={1} justifyContent={"center"} lineHeight={0.5} >
                    <Avatar
                        src={article.author.image || ''}
                        alt={article.author.username}
                        sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                        <Typography fontWeight="bold" align="left">{article.author.username}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date(article.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Typography>
                    </Box>

                    {username === article.author.username ? (
                        <Box ml={2} display="flex" gap={1}>
                            <Button variant="outlined" size="small" sx={{ backgroundColor: "white" }}>Edit Article</Button>
                            <Button variant="outlined" size="small" color="error" onClick={handleDelete}>Delete Article</Button>
                        </Box>
                    ) : (
                        <Box ml={2} display="flex" gap={1}>
                            <Button variant="outlined" size="small"
                                onClick={handleToggleFollow}
                                value={followersCount}
                                sx={{
                                    backgroundColor: "white",
                                    color: "#66bb6a",
                                    border: "1px solid #66bb6a",
                                    '&:hover': {
                                        color: "#2e7d32",
                                        border: "1px solid #66bb6a",
                                    },
                                }}
                            >
                                {isFollowing ? `-Unfollow` : `+ Follow`} {article.author.username} ({followersCount})
                            </Button>

                            <Button
                                sx={{
                                    backgroundColor: "white",
                                    color: "#66bb6a",
                                    border: "1px solid #66bb6a",
                                    '&:hover': {
                                        color: "#2e7d32",
                                        border: "1px solid #66bb6a",
                                    },
                                }}
                                variant="outlined"
                                size="small"
                                startIcon={
                                    isFavorited ? (
                                        <FavoriteIcon sx={{ fontSize: "small", color: "#66bb6a" }} />
                                    ) : (
                                        <FavoriteBorderIcon sx={{ fontSize: "small", color: "#66bb6a" }} />
                                    )
                                }

                                value={favoritesCount}
                                onClick={handleToggleFavorits}
                            >
                                {isFavorited ? `dislike` : `like`} ({favoritesCount})
                            </Button>
                        </Box>
                    )}
                </Box>



                <Box display="flex" justifyContent="center">
                    <Box display="flex" flexDirection="column" gap={2} mb={4} mt={4} width='60%'>
                        <textarea
                            placeholder="Write a comment..."
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            style={{
                                minHeight: '100px',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                resize: 'vertical',
                            }}
                        />

                        <Box display="flex" justifyContent="flex-end" >
                            <Button variant="contained"
                                sx={{
                                    backgroundColor: '#fff',
                                    color: '#689f38',
                                    '&:hover': {
                                        backgroundColor: '#689f38',
                                        color: '#fff',
                                    }
                                }}
                                onClick={handleSubmit}
                            >
                                Post Comment
                            </Button>
                        </Box>

                        <Divider />


                        <Box>
                            <Typography fontWeight="bold" color="text.secondary" mb={2}>Comments</Typography>
                            {comments.length === 0 ? (
                                <Typography variant="body2" color="text.secondary">No comments yet.</Typography>
                            ) : (
                                comments.map((comment: any) => (
                                    <Card key={comment.id} sx={{ mb: 2, p: 2 }}>
                                        <Typography mt={1} align="left">{comment.body}</Typography>

                                        <Divider sx={{ mb: 2, mt: 2 }} />

                                        <Box display="flex" gap={1} lineHeight={0.5} alignItems="center">
                                            <Avatar src={comment.author.image || ''} sx={{ width: 24, height: 24 }} />

                                            <Typography align='left' sx={{ fontSize: '1 rem' }}>{comment.author.username}</Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                                {new Date(article.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </Typography>


                                            {/* <Box display="flex" justifyContent={"end"}>
                                                    <IconButton
                                                        size="small"
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box> */}
                                        </Box>
                                    </Card>
                                ))
                            )}
                        </Box>
                    </Box>
                </Box>






            </Box>
        </Box>
    );
};
