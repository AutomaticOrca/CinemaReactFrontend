import { useParams, useNavigate } from "react-router-dom";
import useFetchSessionApi from "../../shared/hooks/useFetchSessionApi";
import ErrorMessage from "../../shared/components/ErrorMessage";
import Loading from "../../shared/components/Loading";
function SessionPage() {
  const { sessionid } = useParams();
  const navigate = useNavigate();

  const {
    session,
    movie,
    cinema,
    formattedTime,
    movieEndTime,
    formattedMovieDuration,
    error,
    isLoading,
  } = useFetchSessionApi(sessionid || "");

  const handleClickBookTickets = () => {
    navigate(`/purchase/${sessionid}`);
  };

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}
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
                    {formattedMovieDuration}
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
                {formattedTime} &nbsp;| &nbsp; {session.time}:00 -{" "}
                {movieEndTime}
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
