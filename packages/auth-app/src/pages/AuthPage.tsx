import * as React from 'react';
import { type AuthProvider, SignInPage } from '@toolpad/core/SignInPage';
import {signIn} from '@aws-amplify/auth';
import {useCallback} from "react";
import {useNavigate} from "react-router";
import {useSession} from "@toolpad/core";
import AccountPage from "./AccountPage";
import {UserSession} from "../contexts/SessionContext";
import {LinearProgress} from "@mui/material";


const providers = [
  { id: 'credentials', name: 'Email and Password' }
];

export default function AuthPage() {

  const navigate = useNavigate()
  const session = useSession<UserSession>()

  const signInCallback = useCallback(async (provider: AuthProvider, formData: FormData) => {
    // Get credentials
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Sign-in and reload session
      const {isSignedIn, nextStep} = await signIn({username: email, password});
      session && session.reloadSession();
      // TODO: use next step
      if (isSignedIn) {
        return Promise.resolve({success: 'Login successful!'});
      } else {
        return Promise.resolve({
          error: 'Sign-in failed. Please check your credentials.',
          type: 'authentication',
        });
      }
    } catch (error: any) {
      console.error('Sign-in error:', error);
      return Promise.resolve({
        error: error.message || 'An unknown error occurred',
        type: error.name || 'authentication',
      });
    }
  }, [navigate]);

  if (!session || session.loading)
    return <LinearProgress />

  if (session && session.user)
    return <AccountPage />

  return (
    <SignInPage
      signIn={signInCallback}
      providers={providers}
      slots={{
        rememberMe: () => (<></>)
      }}
      slotProps={{
        emailField: { autoFocus: false },
      }}
    />
  );
}
