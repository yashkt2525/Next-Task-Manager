import { Box, Stack } from '@mui/material'
import React from 'react'

const loading = () => {
  return (
    <Box height={'100vh'} width={'100vw'}>
        <Stack justifyContent={'center'} alignItems={'center'}>
    <div>loading please wait...</div>
    </Stack>
    </Box>
  )
}

export default loading