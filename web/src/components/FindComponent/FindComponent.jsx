import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function FindComponent({ handleAddUserClick }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TextField
                variant="standard"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
            <IconButton

                onClick={handleAddUserClick} aria-label="delete">
                <PersonAddAltIcon fontSize="small" />
            </IconButton>
        </Box>
    )
}

export default FindComponent