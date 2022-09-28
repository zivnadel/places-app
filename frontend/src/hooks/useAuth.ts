import React from "react";
import { AuthContextModel } from "../store/AuthContext";

let logoutTimer: any;

const useAuth = () => {
  const [token, setToken] = React.useState("");
  const [tokenExpirationDate, setTokenExpirationDate] =
    React.useState<Date | null>(null);
  const [uid, setUid] = React.useState("");

  React.useEffect(() => {
    const userData: { token: string; uid: string; expiration: string } =
      JSON.parse(localStorage.getItem("userData") || "{}");
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      setToken(userData.token);
      setUid(userData.uid);
    }
  }, []);

  const login = React.useCallback((uid: string, token: string) => {
    setToken(token);
    setUid(uid);
    const tokenExpiration = new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        uid,
        token,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  const logout = React.useCallback(() => {
    setToken("");
    setUid("");
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  React.useEffect(() => {
    if (token && tokenExpirationDate) {
      logoutTimer = setTimeout(
        logout,
        tokenExpirationDate.getTime() - new Date().getTime()
      );
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  const authContext: AuthContextModel = {
    isLoggedIn: !!token,
    token,
    uid,
    login,
    logout,
  };

  return { token, authContext };
};

export default useAuth;
