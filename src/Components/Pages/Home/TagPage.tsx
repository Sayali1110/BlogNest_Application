import { Box, Button, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const TagPage: React.FC<any> = ({
  tags,
  handleTags
}) => {
  return (
    <>
      <Typography margin={1} >Popular Tags</Typography>
      {!tags ? "" : tags.slice(0, 30).map((tag: any, index: number) =>
        <Chip
          key={index}
          label={tag}
          size="small"
          sx={{
            color: "black",
            backgroundColor: "white",
          }}
          onClick={() => handleTags(tag)}
        />

      )
      }
    </>

  )

}

export default TagPage;