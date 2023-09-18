"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { CustomDialogBox } from "./CustomDialogBox";
interface obj {
  id: string;
  title: string;
  desc: string;
  date: string;
  priority: string;
}
interface CustomDialogBoxPropType {
  isSubmit: boolean;
  tasks: obj[];
  Del: (id: string) => void;
  id: string;
  title: string;
  desc: string;
  date: string;
  priority: string;
  index?: number;

  setTasks: (
    dispatch: Array<obj> | ((prevState: Array<obj>) => Array<obj>)
  ) => void;
}

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CustomCard({
  tasks,
  Del,
  id,
  title,
  desc,
  date,
  priority,
  index,
  setTasks,
}: CustomDialogBoxPropType) {
  console.log('This is the new tasks',tasks);
  return (  
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          id is {id}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {desc}
        </Typography>
        <Typography variant="body2">
          {date}
          <br />
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {priority}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => Del(id)} size="small">
          <DeleteIcon />
        </Button>
        <CustomDialogBox
          id={id}
          title="edit"
          tasks={tasks}
          isEdit={true}
          setTasks={setTasks}
          index={index}
        />
      </CardActions>
    </Card>
  );
}
