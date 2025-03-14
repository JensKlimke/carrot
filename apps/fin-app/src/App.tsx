import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import {cognitoToUserType, UserSession, UserType} from './contexts/SessionContext';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import {branding} from "./config/branding.tsx";
import {theme} from "@carrot/theme/src/themes.ts";
import {nav} from "./config/navigation.tsx";
import { jwtDecode } from "jwt-decode";


function App() {

  const [user, setUser] = useState<UserType>();
  const { t } = useTranslation();

  const signIn = useCallback(() => {
    window.location.href = `http://localhost:3030/?redirect=${window.location.href}`;
  }, []);

  const signOut = useCallback(() => {
    // Clear storage
    localStorage.removeItem('auth');
    // Unset user
    setUser(undefined);
  }, []);

  const authenticationValue = useMemo(
    () => ({
      signIn: (() => signIn()),
      signOut: (() => signOut()),
    }), [signIn, signOut]
  )

  const handleAuthData = useCallback((paramString : string) => {
    // Parse parameters
    const params = new URLSearchParams(paramString);
    // Get tokens
    const access_token = params.get('access_token');
    const id_token = params.get('id_token');
    // If tokens are present, log them
    if (access_token && id_token) {
      // Decode token
      const uData = jwtDecode(id_token);
      // Get cognito user
      setUser(cognitoToUserType(uData));
      // Return user data
      return uData;
    }
    // Return null
    return null;
  }, []);

  useEffect(() => {
    // Get hash
    const hash = window.location.hash.substring(1).trim();
    // Parse hash
    if (hash !== '' && handleAuthData(hash) !== null) {
      // Store tokens in local storage
      localStorage.setItem('auth', btoa(hash));
      // Reset tokens in hash
      window.history.replaceState({}, document.title, window.location.pathname)
      // End here
      return
    }
    // Get storage data
    const storage = localStorage.getItem('auth');
    if (storage !== null && handleAuthData(atob(storage)) !== null) {
      // End here
      return;
    }
    // Sign out
    signOut();
  }, [handleAuthData, signIn, signOut]);

  useEffect(() => {
    document.title = t('finapp.labels.app_title');
  }, [t]);

  const navigation = useMemo(() => {
    return nav(t);
  }, [t]);

  return (
    <ReactRouterAppProvider
      navigation={navigation}
      theme={theme}
      session={{user} as UserSession}
      authentication={authenticationValue}
      branding={branding(t)}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}

export default App;