import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

import { fetchData, exerciseOptions, youtubeOptions } from "../utils/fetchData";

const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = React.useState({});
  const [exerciseVideos, setExerciseVideos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    const fetchExercisesData = async () => {
      setIsLoading(true);
      const exercisedbUrl = `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`;
      const youtubeSearchUrl =
        "https://youtube-search-and-download.p.rapidapi.com";

      const exerciseDetailData = await fetchData(
        exercisedbUrl,
        exerciseOptions
      );

      const ExerciseVideosData = await fetchData(
        `${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`,
        youtubeOptions
      );

      setExerciseDetail(exerciseDetailData);
      setExerciseVideos(ExerciseVideosData.contents);
      setIsLoading(false);
    };

    fetchExercisesData();
  }, [id]);

  if (isLoading) {
    return (
      <Box>
        <>Loading...</>
      </Box>
    );
  } else {
    return (
      <Box>
        <Detail exerciseDetail={exerciseDetail} />
        <ExerciseVideos
          exerciseVideos={exerciseVideos}
          name={exerciseDetail.name}
        />
        <SimilarExercises />
      </Box>
    );
  }
};

export default ExerciseDetails;
