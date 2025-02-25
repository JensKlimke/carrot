import React, {useCallback, useState} from "react";
import {TextField} from "@mui/material";
import AuthFormWrapper, {Error} from "./AuthFormWrapper";

type SignInFormProps = {
  signIn : (formData : FormData) => Promise<Error | undefined>
}

const SignInForm = ({signIn} : SignInFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email : boolean, password : boolean}>({email: false, password: false});

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
      title="Sign In"
      callback={checkBeforeSignIn}
    >
      <TextField
        fullWidth
        name="email"
        label="Email"
        variant="outlined"
        margin="normal"
        value={email}
        autoFocus={true}
        placeholder={'your@email.com'}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        helperText={errors.email ? "Email is required" : ""}
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
        error={errors.password}
        helperText={errors.password ? "Password is required" : ""}
      />
    </AuthFormWrapper>
  );
};

export default SignInForm;
