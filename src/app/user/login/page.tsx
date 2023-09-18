"use client";
import CustomLoginForm from "@/app/user/components/CustomLoginPage";
import { Container, Box, Stack, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const login = async (data: any) => {
    
    try{
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "http://localhost:3000/task/home",
      });

      if(res?.error) 
      {
     
      toast.error("Invalid username or Password");
       
      
      }else{
     
       
        toast.success('Login Successfull');
         router.push('/task/home');
      }
    }catch(e)
    {
   toast.error("invalid username and passsword!!!")
    }
    
  };
  return (
    <Container maxWidth={"lg"}>
      <Box height={"100vh"} width={"80dvw"}>
        <Stack
          height={"100%"}
          width={"sm"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginRight={"10vw"}
        >
          <Button onClick={()=>signIn('github',{redirect:true,callbackUrl:'http://localhost:3000/task/home'})}>Login with Github</Button>
          <CustomLoginForm login={login} />
        </Stack>
      </Box>
    </Container>
  );
};

export default LoginPage;
