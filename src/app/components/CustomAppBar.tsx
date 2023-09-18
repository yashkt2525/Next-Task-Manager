"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function CustomAppBar() {
  const { data: session } = useSession();
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
    },
  });

  const handleLogout = async () => {
    await signOut({ redirect: true });
  };

  return (
    <ThemeProvider theme={outerTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position={"fixed"}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My ToDo App
            </Typography>
            <Typography>{session?.user?.name}</Typography>
            {!session ? (
             <Link href={'/user/login'}> <Button onClick={() => {}} color="inherit">
                Login
              </Button></Link>
            ) : (
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
