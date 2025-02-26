import * as React from 'react';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet, useNavigate } from 'react-router';
import {cognitoToUserType, UserSession, UserType} from './contexts/SessionContext';
import {branding, theme} from './config/themes';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Amplify} from 'aws-amplify';
import config from '@carrot/cdk/dist/cdk-outputs.json';
import {fetchUserAttributes, signOut} from '@aws-amplify/auth';
import {useTranslation} from "react-i18next";

// Load environment variables
const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID || config.AuthStack.UserPoolId;
const userPoolClientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || config.AuthStack.UserPoolClientId;

if (!userPoolId || !userPoolClientId) {
  console.error('Missing Amplify Auth config. Did you run the CDK deployment?');
}

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
    },
  },
});


function App() {

  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cognitoSignOut = useCallback(async () => {
    // Set loading
    setLoading(true);
    // Logout from Cognito
    signOut()
      .then(() => setUser(undefined))
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, [])

  /**
   * Create the authentication value
   * - Create sign in and sign out functions
   */
  const authenticationValue = useMemo(
    () => ({
      signIn: (() => navigate('/signin')),
      signOut: (() => cognitoSignOut()),
    }), [cognitoSignOut, navigate]
  )

  const reloadSession = useCallback(() => {
    // Set loading
    setLoading(true);
    // Get user information
    fetchUserAttributes()
      .then(user => cognitoToUserType(user))
      .then(user => setUser(user))
      .catch(_ => setUser(undefined))
      .finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    reloadSession();
  }, [reloadSession]);

  useEffect(() => {
    document.title = t('auth.labels.app_title');
  }, [t]);

  return (
    <ReactRouterAppProvider
      theme={theme}
      session={{user, loading, reloadSession} as UserSession}
      authentication={authenticationValue}
      branding={branding(t)}
    >
      <Outlet />
    </ReactRouterAppProvider>
  );
}

export default App;