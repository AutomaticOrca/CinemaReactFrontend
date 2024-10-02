import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchMovieById, fetchCinemaById } from "../../shared/utils/api";
import {
  formatDate,
  convertMinutesToHours,
} from "../../shared/utils/timeUtils";

import { Movie, Cinema, Session } from "../../shared/Models";
import ErrorMessage from "../../shared/components/ErrorMessage";

interface NowShowingCardProps {
  sessionData: Session;
}

const NowShowingCard: FC<NowShowingCardProps> = ({ sessionData }) => {
  const { movieId, cinemaId, date, time, _id } = sessionData;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cinema, setCinema] = useState<Cinema | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const movieData = await fetchMovieById(movieId);
        setMovie(movieData);
        const cinemaData = await fetchCinemaById(cinemaId);
        setCinema(cinemaData);
      } catch {
        setErrorMessage(
          `Sorry, something wrong happend😥 Error fetching session by id. sessionId: ${_id}`
        );
      }
    };

    fetchSessionData();
  }, [movieId, cinemaId, _id]);

  return (
    <>
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {movie && cinema && (
        <div className="flex">
          {movie.poster && movie.poster !== "" && (
            <img
              src={movie.poster}
              alt={movie.title}
              className="m-3 transition duration-500 hover:animate-quick-blur"
            />
          )}
          <div className="flex flex-col justify-between m-3 p-1 w-full">
            <div>
              <h1 className="font-urbanist text-4xl">{movie.title}</h1>
              <p className="py-2">
                {convertMinutesToHours(movie.runtime)} | {movie.genres[0]}
              </p>
            </div>

            <div className="pb-1">
              <p>
                <strong>Directors:</strong> {movie.directors.join(", ")}
              </p>
              <p>
                <strong>Casts:</strong> {movie.cast.join(", ")}
              </p>
            </div>
            <p className="line-clamp-3">{movie.plot}</p>

            <hr className="my-3 border-t border-gray-200" />

            <div className="flex flex-col md:flex-row md:space-x-4">
              <p>
                {formatDate(date)} | {time}
              </p>
              <p>{cinema.name}</p>
            </div>

            <button
              onClick={() => {
                navigate(`/session/${_id}`);
              }}
              className="bg-ritzBgBlue text-white rounded-none border-none hover:bg-ritzHeaderPink hover:border-none"
            >
              View Details
            </button>
          </div>
        </div>
      )}
      {/* {JSON.stringify(movie)}
      {JSON.stringify(cinema)} */}
    </>
  );
};

export default NowShowingCard;
