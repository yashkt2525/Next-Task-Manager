"use client"

import { Box, Button, Stack } from '@mui/material'
import { useSession } from 'next-auth/react'
import Link from 'next/link'



   function Home() {
      const {data:session} = useSession();
  return (
   
     <Box height={'100vh'} width={'100vw'}>
   
    
   {!session? <Stack height={'100%'} width={'100%'} spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap" justifyContent={'center'} alignItems={'center'}>
     <h1>This is The App to Maintain Your Daily Task try one time...</h1>
     <Link href={'/user/register'}> 
     <Button variant='outlined'>Signup</Button></Link>
  </Stack>:<Stack height={'100%'} width={'100%'} spacing={{ xs: 1, sm: 2 }} direction="column" useFlexGap flexWrap="wrap" justifyContent={'center'} alignItems={'center'}>
         <h1>Welcome {session.user.name}</h1>
         <Link href={'/task/home'}> 
     <Button variant='outlined'>Go to task Manager</Button></Link>
   </Stack>}
  </Box>
 
  )
}
export default Home;

