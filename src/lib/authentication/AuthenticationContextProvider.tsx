import React from "react";

import AuthenticationContext from "./AuthenticationContext";
import { IUserDoc } from "../../api/useUserApi/types";
import { useLogin } from "../../api/useUserApi/useApi";
import { useErrorReporting } from "../../components/App/ErrorPage";

const AuthenticationContextProvider: React.FunctionComponent = ({
  children,
}) => {
  const { reportError } = useErrorReporting();
  const { login: apiLogin } = useLogin();

  const [idToken, setIdToken] = React.useState<string>();
  const [currentUser, setCurrentUser] = React.useState<IUserDoc>();

  const onLogin = React.useCallback(
    (_idToken: string) => {
      async function f() {
        try {
          const _currentUser = await apiLogin(_idToken);
          setCurrentUser(_currentUser);
          setIdToken(_idToken);
        } catch (e) {
          reportError(e);
        }
      }

      f();
    },
    [setCurrentUser, setIdToken, reportError, apiLogin]
  );
  const onLogout = React.useCallback(() => {
    setCurrentUser(undefined);
    setIdToken(undefined);
  }, [setCurrentUser, setIdToken]);

  return (
    <AuthenticationContext.Provider
      value={{ idToken, onLogin, onLogout, currentUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
