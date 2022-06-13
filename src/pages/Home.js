import React from "react";
import { Box } from "@mui/material";

import Exercises from "../components/Exercises";
import HeroBanner from "../components/HeroBanner";
import SearchExercises from "../components/SearchExercises";

const Home = () => {
  const [exercises, setExercises] = React.useState([]);
  const [bodyPart, setBodyPart] = React.useState("all");

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        exercises={exercises}
        setExercise={setExercises}
        bodyPart={bodyPart}
      />
    </Box>
  );
};

export default Home;
