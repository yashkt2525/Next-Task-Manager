'use client'
import { Box, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import {useEffect} from 'react';

const Error404 = () => {
    const router = useRouter();
    router.back();
  return (
    <Box height={'100vh'} width={'100vw'} >
        <Stack height={'100%'} width={'100%'} justifyContent={'center'} alignItems={'center'}>
    <div>404 Error Page not found</div>
    </Stack>
    </Box>
  )
}

export default Error404;