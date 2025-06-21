import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { postNewArticle } from "../Services/postNewArticle";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Main_URL } from "../constants";

export const NewArticlePage = () => {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");

  let navigate = useNavigate();
  const location = useLocation();
  const article = location.state?.article;

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    body: "",
  });

  const [error, setError] = useState()

  const handleSubmit = async () => {

    const newErrors = {
      title: title.trim() === "" ? "Title is required" : "",
      description: description.trim() === "" ? "Description is required" : "",
      body: body.trim() === "" ? "Article content is required" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    const tagList = tagInput
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    try {
      const postedArticle = await postNewArticle(body, description, tagList, title);
      console.log("Article posted:", postedArticle);
      const slug = postedArticle.slug;
      console.log("slug from new", slug)
     navigate(`/article/${slug}`, { state: { article: postedArticle } });
     
    } catch (error: any) {
      const backendError = error?.response?.data?.errors?.body?.[0];
      setError(backendError || "Error posting article.");
    }
  }
  return (
    <Box
      minHeight="100vh"
      bgcolor="#fafafa"
      py={9}
      display="flex"
      justifyContent="center"
      mt={-3}
      alignItems="center"
    >

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        p={4}
        bgcolor="white"
        borderRadius={2}
        boxShadow={3}
        width="900px"
      >

        {error && (<FormHelperText error>{error}</FormHelperText>)}
        <TextField
          label="Article Title"
          required
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="What's this article about"
          required
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Write your article content"
          required
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          error={!!errors.body}
          helperText={errors.body}
        />
        <TextField
          label="Enter Tags"
          variant="outlined"
          fullWidth
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e91e63",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#d81b60",
              },
            }}
            onClick={handleSubmit}
          >
            PUBLISH ARTICLE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
