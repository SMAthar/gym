import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import Loader from "../components/Loader";
import SimilarExercises from "../components/SimilarExercises";

import { fetchData, exerciseOptions, youtubeOptions } from "../utils/fetchData";

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = React.useState({});
  const [exerciseVideos, setExerciseVideos] = React.useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = React.useState([]);
  const [equipmentExercises, setEquipmentExercises] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchExercisesData = async () => {
      setIsLoading(true);
      const exercisedbUrl = "https://exercisedb.p.rapidapi.com";
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        `${exercisedbUrl}/exercises/exercise/${id}`,
        exerciseOptions
      );

      const ExerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );

      const targetMuscleExercisesData = await fetchData(
        `${exercisedbUrl}/exercises/target/${exerciseDetailData.target}`,
        exerciseOptions
      );
      const equipmentExercisesData = await fetchData(
        `${exercisedbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
        exerciseOptions
      );

      setExerciseDetail(exerciseDetailData);
      setExerciseVideos(ExerciseVideosData.contents);
      setTargetMuscleExercises(targetMuscleExercisesData);
      setEquipmentExercises(equipmentExercisesData);
      setIsLoading(false);
    };

    fetchExercisesData();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Box>
        <Detail exerciseDetail={exerciseDetail} />
        <ExerciseVideos
          exerciseVideos={exerciseVideos}
          name={exerciseDetail.name}
        />
        <SimilarExercises
          targetMuscleExercises={targetMuscleExercises}
          equipmentExercises={equipmentExercises}
        />
      </Box>
    );
  }
};

export default ExerciseDetails;
