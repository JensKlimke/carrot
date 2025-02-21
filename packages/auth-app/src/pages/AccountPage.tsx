import React from "react";
import {Account} from "@toolpad/core";
import Box from "@mui/material/Box";

export default function AccountPage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Account />
    </Box>
  )
}