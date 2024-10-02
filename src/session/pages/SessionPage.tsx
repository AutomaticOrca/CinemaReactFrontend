import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  fetchSessionById,
  fetchMovieById,
  fetchCinemaById,
} from "../../shared/utils/api";

import {
  formatDate,
  convertMinutesToHours,
  calculateEndTime,
} from "../../shared/utils/timeUtils";

import { Session, Movie, Cinema } from "../../shared/Models";
import ErrorMessage from "../../shared/components/ErrorMessage";
import Loading from "../../shared/components/Loading";
function SessionPage() {
  const { sessionid } = useParams();
  const [session, setSession] = useState<Session | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cinema, setCinema] = useState<Cinema | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClickBookTickets = () => {
    navigate(`/purchase/${sessionid}`);
  };

  useEffect(() => {
    const fetchSession = async () => {
      if (sessionid) {
        try {
          setIsLoading(true);
          const sessionData = await fetchSessionById(sessionid);
          const { movieId, cinemaId } = sessionData;
          setSession(sessionData);
          const movieData = await fetchMovieById(movieId);
          setMovie(movieData);
          const cinemaData = await fetchCinemaById(cinemaId);
          setCinema(cinemaData);
        } catch (err) {
          setErrorMessage(
            `Sorry, something wrong happend😥 backend msg: ${err}`
          );
        } finally {
          setIsLoading(false);
          setErrorMessage(null);
        }
      } else {
        setErrorMessage(
          "Sorry, something wrong happened🥺 useParams get sessionid error"
        );
      }
    };
    fetchSession();
  }, [sessionid]);
  return (
    <>
      {isLoading && <Loading />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {movie && cinema && (
        <div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex justify-center md:justify-start">
              {movie.poster && movie.poster !== "" && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="rounded-md shadow-lg w-64 h-auto"
                />
              )}
            </div>
            <div className="md:w-2/3 mt-6 md:mt-0 md:ml-8 ">
              <div>
                <h1 className="font-urbanist text-4xl">{movie.title}</h1>
                <p className="py-2">
                  <span className="border-gray-600 border-0.05 rounded-md px-1">
                    {convertMinutesToHours(movie.runtime)}
                  </span>{" "}
                  &nbsp;
                  <span className="border-gray-600 border-0.05 rounded-md px-1">
                    {movie.genres.join(" | ")}
                  </span>
                  &nbsp;
                  <span className="border-gray-600 border-0.05 rounded-md px-1">
                    {movie.year}
                  </span>
                </p>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:mt-6">
                <div>
                  <div>
                    <h2 className="text-2xl font-semibold">Directors</h2>
                    <p>{movie.directors.join(", ")}</p>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Cast</h2>
                    <p>{movie.cast.join(", ")}</p>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Country</h2>
                    <p>{movie.countries.join(", ")}</p>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-5">
                  <h2 className="text-2xl font-semibold">Rates</h2>
                  <p>Rotten Tomatoes: {movie.rateTomato}</p>
                  <p>Imdb: {movie.rateImdb}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p>{movie.plot}</p>
            <p>
              <strong>Awards: </strong>
              {movie.awards}
            </p>
          </div>
          <hr className="mt-6 mb-3 border-0.05 border-ritzHeaderPink" />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Showtime</h2>
            {session ? (
              <p>
                {formatDate(session.date)} &nbsp;| &nbsp; {session.time}:00 -{" "}
                {calculateEndTime(session.time, movie.runtime)}
              </p>
            ) : (
              <p>Get session error</p>
            )}

            <p>{cinema.name}</p>
            <div className="my-2 flex flex-row">
              <button
                className="bg-ritzHeaderPink text-white rounded-none border-none hover:bg-ritzLightBlue"
                onClick={handleClickBookTickets}
              >
                Book Tickets
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SessionPage;
