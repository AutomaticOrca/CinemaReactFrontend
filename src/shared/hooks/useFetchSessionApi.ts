import {
  fetchSessionById,
  fetchMovieById,
  fetchCinemaById,
} from "../utils/api";
import { Session, Movie, Cinema } from "../Models";
import {
  formatDate,
  convertMinutesToHours,
  calculateEndTime,
} from "../utils/timeUtils";
import { useEffect, useState } from "react";

const useFetchSessionApi = (sessionid: string) => {
  const [session, setSession] = useState<Session | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cinema, setCinema] = useState<Cinema | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [formattedTime, setFormattedTime] = useState<string | null>(null);
  const [formattedMovieDuration, setFormattedMovieDuration] = useState<
    string | null
  >(null);
  const [movieEndTime, setMovieEndTime] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null); // State for error

  useEffect(() => {
    const fetchAndCalculate = async () => {
      try {
        setIsLoading(true);
        const sessionData = await fetchSessionById(sessionid);
        setSession(sessionData);

        const [movieData, cinemaData] = await Promise.all([
          fetchMovieById(sessionData.movieId),
          fetchCinemaById(sessionData.cinemaId),
        ]);
        setMovie(movieData);
        setCinema(cinemaData);

        const movieDuration = convertMinutesToHours(movieData.runtime);
        setFormattedMovieDuration(movieDuration);
        setFormattedTime(formatDate(sessionData.time));
        setMovieEndTime(calculateEndTime(sessionData.time, movieData.runtime));
      } catch (err: unknown) {
        if (err instanceof Error) {
          // Narrowing the `unknown` type to `Error`
          setError(
            `Sorry, something wrong happened😥 backend msg: ${err.message}`
          );
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndCalculate();
  }, [sessionid]);

  return {
    session,
    movie,
    cinema,
    formattedTime,
    movieEndTime,
    formattedMovieDuration,
    error,
    isLoading,
  };
};

export default useFetchSessionApi;
