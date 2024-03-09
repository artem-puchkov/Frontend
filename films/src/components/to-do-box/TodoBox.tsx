import { Box, Typography } from "@mui/material";
import React from "react";

interface MainProps {
    children: React.ReactNode
}

export function TodoBox({ children }: MainProps) {
    return (
        <Box
            sx={{
                width: 514,
                height: 766,
                borderRadius: 5,
                backgroundColor: 'white',
                mt: '60px',
                ml: '350px',
                textAlign: 'left'
            }}
        >
            <Typography 
                variant="h6"
                sx={{
                    color: "#2196F3",
                    fontSize: '34px',
                    pt: '32px',
                    pl: '50px',
                    fontWeight: 400
                }}
            >TODO</Typography>
            {children}
        </Box>
    )
}
