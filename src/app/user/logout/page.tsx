'use client'
import { Box, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
const Page = () => {
  const handleLogout = async () => {
    await signOut({ redirect: false });
  };
  useEffect(()=>{
   
    handleLogout();
  
  
},[]);
  return (
    <Box height={"100vh"} width={"100vw"}>
      <Stack
        height={"100%"}
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        fontSize={"50px"}
        fontWeight={"600"}
      >
        Logout Succesfully <br />
        do login again <br />
        <Link href={"login"}>
          <Button variant="outlined">Login</Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default Page;
