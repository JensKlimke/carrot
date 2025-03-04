import {useEffect, useState} from 'react';
import {TextField} from '@mui/material';
import AuthFormWrapper from './AuthFormWrapper';
import {useTranslation} from 'react-i18next';
import {FormError} from "../../config/FormError.ts";

type SignInFormProps = {
  callback : (formData : FormData) => Promise<FormError | undefined>
}

type InputErrors = {
  confirm ?: string,
  password ?: string,
  name ?: string,
  message ?: string
}

const SignInForm = ({callback} : SignInFormProps) => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<InputErrors>({});
  const { t } = useTranslation();

  useEffect(() => {
    setErrors({
      confirm: (confirm !== '' && password !== confirm) ? t('auth.errors.password_not_equal') : undefined,
      password: undefined,
    })
  }, [t, confirm, password])

  return (
    <AuthFormWrapper
      title={t('auth.labels.title_set_pw_and_name')}
      buttonText={t('auth.labels.button_set_pw_and_name')}
      callback={callback}
    >
      <TextField
        fullWidth
        name='name'
        label={t('auth.labels.field_label_name')}
        placeholder={t('auth.labels.field_placeholder_name')}
        type='text'
        variant='outlined'
        margin='normal'
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name !== undefined}
        helperText={errors.name || ''}
      />
      <TextField
        fullWidth
        name='password'
        label={t('auth.labels.field_label_password_change')}
        type='password'
        variant='outlined'
        margin='normal'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password !== undefined}
        helperText={errors.password || ''}
      />
      <TextField
        fullWidth
        name='password_confirm'
        label={t('auth.labels.field_label_password_confirm')}
        type='password'
        variant='outlined'
        margin='normal'
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm !== undefined}
        helperText={errors.confirm || ''}
      />
    </AuthFormWrapper>
  );
};

export default SignInForm;
