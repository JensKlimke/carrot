import {useCallback, useState} from 'react';
import {TextField} from '@mui/material';
import AuthFormWrapper from './AuthFormWrapper';
import {useTranslation} from "react-i18next";
import {FormError} from "../../config/FormError.ts";
import {useSession} from "@toolpad/core";
import {UserSession} from "../../contexts/SessionContext.ts";

type SignInFormProps = {
  signIn : (formData : FormData) => Promise<FormError | undefined>
}

const SignInForm = ({signIn} : SignInFormProps) => {

  const session = useSession<UserSession>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{email : boolean, password : boolean}>({email: false, password: false});
  const { t } = useTranslation();

  const checkBeforeSignIn = useCallback((data : FormData) => {
    // Get email and password error
    const errEmail = data.get('email') === '';
    const errPassword = data.get('password') === '';
    // On error, set error and return
    if (errEmail || errPassword) {
      setErrors({
        email: errEmail,
        password: errPassword
      });
      return Promise.resolve(undefined);
    }
    // Otherwise, sign in
    return signIn(data);
  }, [signIn]);

  return (
    <AuthFormWrapper
      title={t('auth.labels.title_sign_in')}
      callback={checkBeforeSignIn}
      footerText={ session && session.redirectTo ? <>You will be redirected to <i>{session.redirectTo}</i></> : undefined }
    >
      <TextField
        fullWidth
        name='email'
        label={t('auth.labels.field_label_email')}
        variant='outlined'
        margin='normal'
        value={email}
        autoFocus={true}
        placeholder={t('auth.labels.field_placeholder_email')}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        helperText={errors.email ? t('auth.errors.email_required') : ''}
      />
      <TextField
        fullWidth
        name='password'
        label={t('auth.labels.field_label_password')}
        type='password'
        variant='outlined'
        margin='normal'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        helperText={errors.password ? t('auth.errors.password_required') : ''}
      />
    </AuthFormWrapper>
  );
};

export default SignInForm;
