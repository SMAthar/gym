import { Box, Stack, Typography } from "@mui/material";
import React from "react";

import HorizontalScrollBar from "./HorizontalScrollBar";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0" } }}>
      <Typography variant="h3" mb={5}>
        Exercises that target the same muscle group
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: "relative" }}>
        <HorizontalScrollBar data={targetMuscleExercises} />
      </Stack>
      <Typography variant="h3" mb={5}>
        Exercises that use the same equipment
      </Typography>
      <Stack direction="row" sx={{ p: 2, position: "relative" }}>
        <HorizontalScrollBar data={equipmentExercises} />
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
