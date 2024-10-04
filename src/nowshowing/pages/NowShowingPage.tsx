import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../shared/utils/apiConfig";
import NowShowingCard from "../components/NowShowingCard";
import Loading from "../../shared/components/Loading";

function NowShowingPage() {
  const [sessions, setSessions] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${API_URL}/sessions/nowshowing`);
        setSessions(response.data.sessions);
        setErrorMessage(null);
      } catch {
        setErrorMessage("Error fetching nowSessions");
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return (
    <Fragment>
      <h1 className="font-italiana text-4xl px-4 font-bold text-center ">
        NOW SHOWING
      </h1>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {sessions.map((session, index) => (
            <Fragment key={index}>
              <NowShowingCard sessionData={session} />
              {index !== sessions.length - 1 && (
                <hr className="my-4 border-t border-ritzBgBlue" />
              )}
            </Fragment>
          ))}
        </div>
      )}

      {errorMessage && (
        <div className="text-red-500 mb-4">
          <p>🚨{errorMessage}🚨</p>
        </div>
      )}
    </Fragment>
  );
}
export default NowShowingPage;
