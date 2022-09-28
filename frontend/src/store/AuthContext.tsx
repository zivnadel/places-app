import React from "react";

export interface AuthContextModel {
  isLoggedIn: boolean;
  token: string;
  uid: string;
  login: (uid: string, token: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextModel | null>(null);

export default AuthContext;
