'use client'
import React from 'react';
import axios from "axios"
import { useForm } from 'react-hook-form';
import { TextField, Button, Container,Box } from '@mui/material';
import { AccountCircle, Lock, Email } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosInstance } from '@/app/services/AxiosInstance';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const schema = yup.object().shape({
  name: yup.string().required('Username is required'),
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'), 
});
type RegisterFormSchema = yup.InferType<typeof schema>;

interface CustomRegistrationFormProps{
  login:(data: any) => Promise<void>;
}


const RegistrationForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: yupResolver(schema),
  });

  const onSubmit =async (data: any) => {
    console.log("Data is",data);
  


  try{
    const response = await axios.post('https://next-app-backend.onrender.com/signup',data);
    
    console.log(response)
    if(response.status == 200){
    toast("Successfully Registered");
    router.push('/user/login');
    
    }else{
      toast.error("Incorrect email or password");
    }

  }catch(e)
  {

    console.log(e)
   toast.error(e.response.data.mes)
  }




    
  };

  return (
    <Container maxWidth="sm">
        <Box marginTop={0}>
      <h2>Register Now</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          InputProps={{
            startAdornment: <AccountCircle />,
          }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          InputProps={{
            startAdornment: <Email />,
          }}
        />
        <TextField
          label="Password"
          fullWidth
          type="password"
          margin="normal"
          variant="outlined"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            startAdornment: <Lock />,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
