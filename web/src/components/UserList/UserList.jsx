import { Avatar, Badge, Box, IconButton, InputAdornment, Stack } from '@mui/material'
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import React from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import avatar from '../../assets/Ellipse_191.png'
import Typography from '@mui/material/Typography';
function UserList() {
    return (
        <Box
            bgcolor={''}
            flex={3}>
            <Stack flexDirection={'column'}>
                <Stack flexDirection={'row'} justifyContent={'space-around'}>
                    <TextField
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={''} aria-label="delete">
                        <PersonAddAltIcon fontSize="small" />
                    </IconButton>
                </Stack>
                <Stack flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'}>
                    <Avatar alt="viet bac" src={avatar}>
                    </Avatar>
                    <Stack>
                        <Typography>
                            Ahmet kadyrow
                        </Typography>
                        <Typography>
                            men erafff
                        </Typography>
                        <Typography>
                            12:00
                        </Typography>
                    </Stack>
                    <Badge badgeContent={4} color="primary" />
                </Stack>
            </Stack>

        </Box>
    )
}

export default UserList