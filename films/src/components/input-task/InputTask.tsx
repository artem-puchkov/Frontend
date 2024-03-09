import { TextField, Box, IconButton, InputAdornment } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

export function InputTask() {
    const [taskInput, setTaskInput] = useState('');

    const handleAddTask = () => {
        console.log(taskInput);
    }

    return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
            <TextField
              label="Имя новой задачи"
                variant="outlined"
                sx={{
                    width: 426,
                    marginTop: '20px',
                    '& label': {
                        fontSize: '14px',
                        color: 'rgba(0, 0, 0, 0.7)', 
                    },
                }}
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                            onClick={handleAddTask} 
                            style={{ 
                                color: taskInput ? '#1976D2' : 'rgba(33, 150, 243, 0.5)',
                                marginRight: '-5px' }}
                            disabled={!taskInput}
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
            />
        </Box>
    )
}