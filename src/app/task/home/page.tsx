"use client";
import CustomCard from "@/app/task/components/CustomCard";
import { CustomDialogBox } from "@/app/task/components/CustomDialogBox";
import { Box, Stack, Button, Alert, AlertTitle } from "@mui/material";
import { useState,useEffect } from "react";
import {  useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { AxiosInstance } from "@/app/services/AxiosInstance";
import { toast } from "react-toastify";
interface obj {
  id: string;
  title: string;
  desc: string;
  date: string;
  priority: string;
}

const Task = () => {
  const [tasks, setTasks] = useState<Array<obj>>([]);
  const [index, setIndex] = useState<number>();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/user/login");
    },
  });
  console.log("Session is",session);
  const takeData =async (newState: obj) => {
    
    const response =await AxiosInstance.post('/task/add-task',{...newState,userId:session.user.id});
    if(response.status ==201){
      
      setTasks([...tasks, newState]);
      toast("Task added Successfully");

    }
  };
  const getData =async ()=>{ 
    console.log("Access Token is",session?.user.accessToken);
    const response =await AxiosInstance.get('/task/get-task');
    const data = response.data.data;
    console.log("data is ",data);
    setIsLoading(true);
    setTasks([...data]);
  }
  useEffect(()=>{
   
      getData();
    
    
},[]);

  const DeleteData =async (id: string) => {
   
    const res =await AxiosInstance.delete(`task/delete-task/${id}`);
    console.log("res",res);
   if (res.status==200){

    toast("Deleted successfully");
    getData();
    
   }
    
  };

  setTimeout(() => {
    setIsSubmit(false);
  }, 2000);
  console.log("the the tasks is",tasks);
  return (
    <Box height={"90vh"} width={"100vw"} marginTop={"80px"}>
      <Stack flexDirection={"column"} margin={4}>
        {
          <CustomDialogBox
            title="Add Task"
            setIsSubmit={setIsSubmit}
            takeData={takeData}
          />
        }
        {isSubmit && (
          <Stack
            top={"100px"}
            left={"400px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Alert severity="success">
              <AlertTitle>Successfully added task</AlertTitle>
            </Alert>
          </Stack>
        )}
        <br />
       {tasks.length>0 ? <Stack flexDirection={"row"} margin={0} flexWrap={"wrap"}>
          {tasks.map((obj, i) => (
         
            <div key={i}>
              <CustomCard
                isSubmit={isSubmit}
                tasks={tasks}
                id={obj.id}
                title={obj.title}
                desc={obj.desc}
                date={obj.date}
                priority={obj.priority}
                Del={DeleteData}
                index={index}
                setTasks={setTasks}
              />
            </div> 
          ))}
        </Stack>:isLoading && tasks.length<1?"No task Found":"Loading..."}
      </Stack>
    </Box>
  );
};
export default Task;
