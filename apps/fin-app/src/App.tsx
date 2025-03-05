import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import {UserSession, UserType} from './contexts/SessionContext';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";
import {branding} from "./config/branding.tsx";
import {theme} from "@carrot/theme/src/themes.ts";


function App() {

  const [user, setUser] = useState<UserType>();
  const { t } = useTranslation();

  const signIn = useCallback(() => {
    setUser(undefined);
  }, []);

  const signOut = useCallback(() => {
    setUser(undefined);
  }, []);

  const authenticationValue = useMemo(
    () => ({
      signIn: (() => signIn()),
      signOut: (() => signOut()),
    }), [signIn, signOut]
  )

  useEffect(() => {
    document.title = t('finapp.labels.app_title');
  }, [t]);

  return (
    <ReactRouterAppProvider
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