import React from "react";
import {ReactNode} from "react";
import {alpha, Box, Container, useTheme} from "@mui/material";

export default function Boxed({children} : {children: ReactNode}) {

  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            borderRadius: 1,
            p: 4,
            border: '1px solid',
            borderColor: alpha(theme.palette.grey[400], 0.4),
            boxShadow: theme.shadows[4],
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )

}