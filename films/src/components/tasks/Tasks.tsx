import { Box, Checkbox, IconButton, List, ListItem, TextField, Typography } from "@mui/material";
import classes from "./Tasks.module.css"; 
import { useState } from "react"
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ITask {
    id: number,
    name: string,
    status: boolean
}

interface TaskProps {
    task: ITask,
    onDeleteTask: (id: number) => void,
    onTaskChange: (changedTask: ITask) => void
}

const initTasks: ITask[] = [
    {
        id: 1,
        name: "Stay Alive",
        status: false
    },
    {
        id: 2,
        name: "AUUUUGH",
        status: false
    },
    {
        id: 3,
        name: "Do eltex",
        status: false
    }
]

export function TaskList() {
    const [tasks, setTasks] = useState(initTasks);

    const handleDeleteTask = (id: number) => {
        setTasks(
            tasks.filter((task) => task.id !== id)
        )
    }

    const handleTaskChange = (changedTask: ITask) => {
        setTasks(tasks.map((task) => (task.id === changedTask.id ? changedTask : task)))
    }

    return (
        <>
            <Typography className={classes.title} style={{fontSize: 12}}>
                ПЛАН {"(" + tasks.length + ")"}
            </Typography>
            <List id="PlannedTasks">
                {tasks.map((task: ITask) => task.status || (
                    <ListItem key={task.id}>
                        <Task task={task} onDeleteTask={handleDeleteTask} onTaskChange={handleTaskChange}/>
                    </ListItem>
                ))}
            </List>
            <Typography className={classes.title} style={{fontSize: 12}}>
                ГОТОВО {"(" + tasks.length + ")"}
            </Typography>
            <List id="PlannedTasks">
                {tasks.map((task: ITask) => task.status && (
                    <ListItem key={task.id}>
                        <Task task={task} onDeleteTask={handleDeleteTask} onTaskChange={handleTaskChange}/>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

const Task: React.FC<TaskProps> = ({ task, onDeleteTask, onTaskChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    let taskContent;

    function handleEdit() {
        setIsEditing(!isEditing);
    }

    function handleCheck() {
        if(!task.status) {
            onTaskChange({...task, status: !task.status})
        } else {
            onTaskChange({...task, status: !task.status})
        }
    }

    if (isEditing) {
        taskContent = (
            <TextField
                fullWidth
                variant="standard"
                label="Имя задачи"
                value={task.name}
                onChange={(e) => onTaskChange({...task, name: e.target.value})}
                InputProps={{
                    endAdornment: <CheckIcon 
                                    color="primary" 
                                    onClick={handleEdit}
                                    sx={{cursor: "pointer"}} />
                }}
                sx={{width: "430px",
                    margin: "0 auto", 
                    outline: "none"}}
            />
        )
    } else {
        taskContent = (
            <Box
                sx={{
                    width: "450px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Checkbox
                    size="medium"
                    checked={task.status}
                    onChange={handleCheck}
                />
                <Typography variant="body1">
                    {task.name}
                </Typography>
                <div style={{marginLeft: 'auto'}}>
                    <IconButton onClick={handleEdit}>
                        <EditIcon fontSize="small" sx={{color: "#0288D1"}}/>
                    </IconButton>
                    <IconButton onClick={() => onDeleteTask(task.id)}>
                        <DeleteIcon fontSize="small" sx={{color: "#ED6C02"}}/>
                    </IconButton>
                </div>
            </Box>
        )
    }

    return (
        taskContent
    )
}