import React from "react";
import { IUserDoc } from "../../api/useUserApi/types";

interface AuthenticationContextApi {
  onLogin: (idToken: string) => void;
  onLogout: () => void;
  idToken?: string;
  currentUser?: IUserDoc;
}

const defaultContext: AuthenticationContextApi = {
  onLogin: (idToken: string) => {
    console.error("Default Implementation for Authentication Context");
  },
  onLogout: () => {
    console.error("Default Implementation for Authentication Context");
  },
};

const AuthenticationContext: React.Context<AuthenticationContextApi> = React.createContext(
  defaultContext
);

export default AuthenticationContext;
