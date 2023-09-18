"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { blue, green, orange } from '@mui/material/colors';
import {MutableRefObject} from 'react';
import {useRef} from 'react';
interface propType{
    id:string;
    title:string;
    e:any;
}


export default function CustomTextFields({id,title,e}:propType) {
   
     const outerTheme = createTheme({
    palette: {
      primary: {
        main: green[500],
      },
    },
  });
    const myTheme = createTheme({
        palette:{
            primary:{
                main: green[600],
            }
        }
    })
    console.log(e);
  return (
    <ThemeProvider theme={myTheme}>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField inputRef={e} id={id} label={title} variant="outlined" required />
      
    </Box>
    </ThemeProvider>
  );
}