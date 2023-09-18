import RegistrationForm from "@/app/user/components/CustomRegistrationForm";
import {Box,Stack} from '@mui/material';

const page = () => {
  return (
    
     <Box height={'100vh'} width={'100vw'}>
        <Stack height={'100%'} width={'sm'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} marginRight={'5vw'}> 
      <RegistrationForm />
      </Stack>
    </Box>
  
  )
}

export default page