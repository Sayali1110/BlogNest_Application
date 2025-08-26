import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { postNewArticle } from "../Services/postNewArticle";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Main_URL } from "../constants";
import { updateArticle } from "../Services/updateArticle";

export const NewArticlePage = () => {
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tagInput, setTagInput] = useState("");

  let navigate = useNavigate();

  const location = useLocation();
  const existingArticle = location.state?.article;

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


    if (!existingArticle) {
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

    else {
      try {
        const updatedArticle = await updateArticle(existingArticle.slug, {
          title,
          description,
          body,
          tagList,
        });
        console.log("Article updated:", updatedArticle);
        navigate(`/article/${updatedArticle.slug}`, { state: { article: updatedArticle } });
      } catch (error: any) {
        const backendError = error?.response?.data?.errors?.body?.[0];
        setError(backendError || "Error updating article.");
      }
    }

  }

  useEffect(() => {
    if (existingArticle) {
      setTitle(existingArticle.title || '');
      setDescription(existingArticle.description || '');
      setBody(existingArticle.body || '');
      setTagInput(existingArticle.tagList?.join(', ') || '');
    }
  }, [existingArticle]);

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

        {existingArticle ?
          (<Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#689f38",
                color: "white",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#aed581",
                },
              }}
              onClick={handleSubmit}
            >
              UPDATE ARTICLE
            </Button>
          </Box>) : (
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#689f38",
                  color: "white",
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#aed581",
                  },
                }}
                onClick={handleSubmit}
              >
                PUBLISH ARTICLE
              </Button>
            </Box>
          )}

      </Box>
    </Box>
  );
};
