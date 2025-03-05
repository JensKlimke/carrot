import {signIn, confirmSignIn} from '@aws-amplify/auth';
import {useCallback, useState} from 'react';
import {useSession} from '@toolpad/core';
import AccountPage from './AccountPage';
import {UserSession} from '../contexts/SessionContext';
import {LinearProgress} from '@mui/material';
import SignInForm from './auth/SignInForm';
import ConfirmWithPasswordForm from './auth/ConfirmWithPasswordForm';
import {FormError} from "../config/FormError.ts";


export default function AuthPage() {

  const session = useSession<UserSession>()
  const [confirmWithPassword, setConfirmWithPassword] = useState(false);

  const signInCallback = useCallback<(formData: FormData) => Promise<FormError | undefined>>(async (formData: FormData) => {
    // Get credentials
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      // Sign-in and reload session
      const {isSignedIn, nextStep} = await signIn({username: email, password});
      if (session) session.reloadSession();
      // Switch for next step
      if (isSignedIn) {
        return Promise.resolve(undefined);
      } else if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        // Set state to confirm with password
        setConfirmWithPassword(true);
        // Return no error
        return Promise.resolve(undefined);
      } else {
        // Log error
        console.error('Sign-in error:', nextStep);
        // Return error
        return Promise.resolve({
          message: 'An unknown error occurred',
        });
      }
    } catch (error: unknown) {
      console.error('Sign-in error:', error);
      return Promise.resolve({
        message: ((error as Error).message) || 'An unknown error occurred',
      });
    }
  }, [session]);

  const confirmPasswordCallback = useCallback(async (formData: FormData) => {
    // Get credentials
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    try {
      // Sign-in and reload session
      const {isSignedIn, nextStep} = await confirmSignIn({
        challengeResponse: password,
        options: {
          userAttributes: { name }
        }
      });
      if (session) session.reloadSession();
      // Switch for next step
      if (isSignedIn) {
        console.info('Successfully signed in.')
        return Promise.resolve(undefined);
      } else {
        // Log error
        console.error('Sign-in error:', nextStep);
        // Return error
        return Promise.resolve({
          message: 'An unknown error occurred',
        });
      }
    } catch (error: unknown) {
      // Log error
      console.error('Sign-in error:', error);
      // Return error
      return Promise.resolve({
        message: ((error as Error).message as string) || 'An unknown error occurred'
      });
    }
  }, [session]);

  if (!session || session.loading)
    return <LinearProgress />

  if (session && session.user)
    return <AccountPage />

  if (confirmWithPassword) {
    return (
      <ConfirmWithPasswordForm
        callback={confirmPasswordCallback}
      />
    );
  }

  return (
    <SignInForm
      signIn={signInCallback}
    />
  );
}
