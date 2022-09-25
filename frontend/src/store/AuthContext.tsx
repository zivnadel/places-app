import React from "react";

export interface AuthContextModel {
  isLoggedIn: boolean;
  uid: string;
  login: (uid: string) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextModel | null>(null);

export default AuthContext;
