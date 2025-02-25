import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import AuthFormWrapper, {Error} from "./AuthFormWrapper";

type SignInFormProps = {
  callback : (formData : FormData) => Promise<Error | undefined>
}

type InputErrors = {
  confirm ?: string,
  password ?: string,
  name ?: string,
  message ?: string
}

const SignInForm = ({callback} : SignInFormProps) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<InputErrors>({});

  useEffect(() => {
    setErrors({
      confirm: (confirm !== '' && password !== confirm) ? 'Passwords must be equal' : undefined,
      password: undefined,
    })
  }, [confirm, password])

  return (
    <AuthFormWrapper
      title="Set Password and Name"
      buttonText={"Update"}
      callback={callback}
    >
      <TextField
        fullWidth
        name="name"
        label="Name"
        type="text"
        variant="outlined"
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name !== undefined}
        helperText={errors.name || ''}
      />
      <TextField
        fullWidth
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password !== undefined}
        helperText={errors.password || ''}
      />
      <TextField
        fullWidth
        name="password_confirm"
        label="Confirm password"
        type="password"
        variant="outlined"
        margin="normal"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        error={errors.confirm !== undefined}
        helperText={errors.confirm || ''}
      />
    </AuthFormWrapper>
  );
};

export default SignInForm;
