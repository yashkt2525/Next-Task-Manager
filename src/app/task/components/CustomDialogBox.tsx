"use client";
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Box,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ModeIcon from "@mui/icons-material/Mode";
import { v4 as uuidv4 } from "uuid";
import { CustomDialogBoxProps } from "@/app/interfaces/CustomDialogBoxPropsInterface";
import { ObjectDataType } from "@/app/interfaces/ObjectDataTypeInterface";
import { Axios } from "axios";
import { AxiosInstance } from "@/app/services/AxiosInstance";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// const schema = yup.object().shape({
//   id: yup.string().required("Email is required"),
//   title: yup.string().required("Email is required"),
//   desc: yup.string().required("Password is required"),
//   date: yup.string().required("Password is required"),
//   priority: yup.string().required("Password is required"),
// });
// type DialogBoxSchemaType = yup.InferType<typeof schema>;
export const CustomDialogBox = ({
  takeData,
  title,
  tasks,
  isEdit,
  id,
  setTasks,
  setIsSubmit,
}: CustomDialogBoxProps) => {
  const [open, setOpen] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   control,
  //   formState: { errors },
  // } = useForm<DialogBoxSchemaType>();
  const [textFieldValues, setTextFieldValues] = useState({
    id: "",
    title: "",
    desc: "",
    date: "",
    priority: "",
  });

  const getLocalData = () => {
    if (tasks && id) {
      const myObj: ObjectDataType | undefined = tasks.find(
        (ele: { id: string }) => ele.id === id
      );
      if (myObj) {
        setTextFieldValues({
          id: myObj.id,
          title: myObj.title,
          desc: myObj.desc,
          date: myObj.date,
          priority: myObj.priority,
        });
      }
    }
  };
  const handleOpen = () => {
    if (isEdit) {
      getLocalData();
    } else {
      setTextFieldValues({ ...textFieldValues, id: uuidv4() });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setTextFieldValues({
      ...textFieldValues,
      id: "",
      title: "",
      desc: "",
      date: "",
      priority: "",
    });
    setOpen(false);
  };

  const handleTextFieldChange = (field: any) => (event: any) => {
    setTextFieldValues({ ...textFieldValues, [field]: event.target.value });
  };
  const handleDate = (date: any) => {
    setTextFieldValues({ ...textFieldValues, date: date.toString() });
  };

  const handleSubmit1 = () => {
    if (
      textFieldValues.id &&
      textFieldValues.desc &&
      textFieldValues.date &&
      textFieldValues.priority &&
      textFieldValues.title
    ) {
      takeData && takeData(textFieldValues);
      setIsSubmit && setIsSubmit(true);
      handleClose();
    }
  };

  const handleUpdate = async () => {
    if (tasks) {
      const res = await AxiosInstance.put("task/edit-task", textFieldValues);
      if (res.status == 201) {
        const index: number | undefined = tasks.findIndex(
          (ele: { id: string }) => ele.id === id
        );
        if (index || index === 0) {
          tasks.splice(index, 1, textFieldValues);
          setTasks && setTasks([...tasks]);
          toast.success("Task Updated Successfully");
        } else {
          toast.error("Error in Updating task");
        }
        handleClose();
      }
    }
  };
  return (
    <Box marginTop={"12px"}>
      {title !== "edit" ? (
        <Button variant="outlined" onClick={handleOpen}>
          Add Task
        </Button>
      ) : (
        <Button variant="text" onClick={handleOpen}>
          <ModeIcon />
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <TextField
            label="Id"
            value={textFieldValues.id}
            fullWidth
            aria-readonly
            margin="normal"
            required
          />
          <TextField
            label="Title"
            value={textFieldValues.title}
            onChange={handleTextFieldChange("title")}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="desc"
            value={textFieldValues.desc}
            onChange={handleTextFieldChange("desc")}
            fullWidth
            margin="normal"
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={dayjs(textFieldValues.date)}
                onChange={(date) => {
                  handleDate(date); // Call your handleDate function as needed
                }}
              />
            </DemoContainer>
          </LocalizationProvider>

          <InputLabel required id="demo-simple-select-label">
            Priority
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={textFieldValues.priority}
            label="Age"
            onChange={handleTextFieldChange("priority")}
          >
            <MenuItem value={"Low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
          </Select>

          {<h1>fill all the fields to submit</h1>}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {!isEdit ? (
            <Button onClick={handleSubmit1} color="primary">
              Submit
            </Button>
          ) : (
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};
