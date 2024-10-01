import { useState, useCallback, useEffect } from "react";

let logoutTimer: ReturnType<typeof setTimeout>;

interface UserData {
  userId: string;
  token: string;
  expiration: string;
}

export const useAuth = () => {
  // Define state for the token, userId, and token expiration date
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(
    null
  );

  // Define the login function, wrapped with `useCallback` to memoize the function
  const login = useCallback(
    (uid: string, token: string, expirationDate?: Date) => {
      setToken(token);
      setUserId(uid);

      // Set the token expiration date to 2 hour from now if it's not provided
      const tokenExpiration =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 120);
      setTokenExpirationDate(tokenExpiration);

      // Store user data in localStorage
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpiration.toISOString(),
        })
      );
    },
    []
  );

  // Define the logout function, also memoized with `useCallback`
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);

    // Remove user data from localStorage
    localStorage.removeItem("userData");
  }, []);

  // This effect handles automatic logout when the token expires
  useEffect(() => {
    if (token && tokenExpirationDate) {
      // Calculate the remaining time before token expiration
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();

      // Set a timeout for auto logout
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      // Clear the logout timer if no token or expiration date is set
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  // This effect checks if user data exists in localStorage when the component mounts
  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("userData") || "{}"
    ) as UserData;
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      // Auto-login if valid token and expiration exist in localStorage
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  // Return the token, login, logout, and userId functions and values for use in components
  return { token, login, logout, userId };
};
