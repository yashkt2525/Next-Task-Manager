import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Container,Box } from '@mui/material';
import {  Lock, Email } from '@mui/icons-material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { blue } from '@mui/material/colors';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Validation schema using yup
const schema = yup.object().shape({
 
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});


type LoginFormSchema = yup.InferType<typeof schema>;



interface CustomLoginFormProps{
  login:(data: any) => Promise<void>;
}
const CustomLoginForm = (props:CustomLoginFormProps) => {
  const {data:session} = useSession();
  const router = useRouter();
  if(session){
    router.push('/task/home');
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: yupResolver(schema),
  });
  const onSubmit:SubmitHandler<LoginFormSchema> = (data,e) => {
    e.preventDefault();
    console.log("Login data is ",data);
    props.login(data);
  };

  return (
    <Container maxWidth="sm">
        <Box marginTop={0}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          Login
        </Button>
      </form><br />
      <h6 style={{fontSize:'20px',fontWeight:300}}> if you haven&apos;t account do <Link href={'/user/register'}><span style={{color:blue[500],fontSize:'21px',textDecorationLine:'underline'}}>&nbsp;Sign Up</span></Link></h6>
      </Box>
    </Container>
  );
};

export default CustomLoginForm;
