import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_URL from "../../shared/utils/apiConfig";

import { AuthContext } from "../../shared/context/auth-context";
import SignInForm from "../components/SignInForm";
import RegisterForm from "../components/RegisterForm";
import SuccessMessage from "../components/SuccessMessage";

function AuthPage() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const navigateToPreviousOrHome = () => {
    if (window.history.length > 1) {
      navigate(-1); // Go back if there is a history
    } else {
      navigate("/"); // Go to homepage if no history
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await axios.post(
        `${API_URL}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { userId, token } = response.data;
      auth.login(userId, token);

      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => {
        navigateToPreviousOrHome();
      }, 3000);
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 403
      ) {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (
    email: string,
    name: string,
    password: string
  ) => {
    const body = { email: email, name: name, password: password };
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { userId, token } = response.data;
      auth.login(userId, token);
      setSuccessMessage("Welcome! Redirecting...");
      setTimeout(() => {
        navigateToPreviousOrHome();
      }, 2000);
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        setErrorMessage(
          "The email has already been registered, please sign in."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      setSuccessMessage("You are already logged in. Redireting to homepage...");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [auth.isLoggedIn, navigate]);
  return (
    <>
      {successMessage && <SuccessMessage message={successMessage} />}
      {!successMessage && (
        <>
          {isLoginMode ? (
            <SignInForm
              onSignIn={handleLogin}
              setIsLoginMode={setIsLoginMode}
              isSubmitting={isSubmitting}
            />
          ) : (
            <RegisterForm
              onRegister={handleRegister}
              setIsLoginMode={setIsLoginMode}
            />
          )}
          {errorMessage && (
            <div className="text-red-500 mb-4">
              <p>🚨{errorMessage}🚨</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
export default AuthPage;
