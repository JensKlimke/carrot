import React from 'react';
import { Typography } from '@mui/material';
import Boxed from "./Boxed";
import {NavLink} from "react-router";

interface ErrorPageProps {
  title : string,
  text : string,
  backLinkText : string,
}

export default function ErrorPage(props : ErrorPageProps) {

  return (
    <Boxed>
      <Typography variant='h4' gutterBottom>
        { props.title }
      </Typography>
      <Typography variant='body1' align='center' sx={{ mb: 4 }}>
        { props.text }
      </Typography>
      <NavLink to='/'>
        { props.backLinkText }
      </NavLink>
    </Boxed>
  );
};
