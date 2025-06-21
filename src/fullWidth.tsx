import { Box, Typography } from "@mui/material";

const FullWidthTitleBox = () => {
  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: "#f06292",
        color: "white",
        py: 3, // vertical padding
        px: 4, // horizontal padding
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        This is a Full Width Title
      </Typography>
    </Box>
  );
};
