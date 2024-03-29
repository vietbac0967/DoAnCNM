import React from 'react'
import Box from '@mui/material/Box'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import avatar from '../../assets/Ellipse_191.png'
import SearchIcon from '@mui/icons-material/Search';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
function Chat() {
    const handleSearchIconClick = () => {

    }
    const handlePhoneClick = () => {

    }

    const handleMoreIconClick = () => {

    }
    return (
        <Box
            flex={8}
            bgcolor={''}>
            <Stack flexDirection={'column'} justifyContent={'space-around'}>
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                    <Stack flexDirection={'row'}>
                        <Avatar alt="viet bac" src={avatar} />
                        <Stack flexDirection={'column'}>
                            <Typography>
                                Ahmet Kadyrow
                            </Typography>
                            <Typography>
                                @bac112
                            </Typography>
                            <Typography>
                                Last seen at 16:00
                            </Typography>
                        </Stack>

                    </Stack>
                    <Stack flexDirection={'row'}>
                        <IconButton onClick={handleSearchIconClick}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton onClick={handlePhoneClick}>
                            <PhoneEnabledIcon />
                        </IconButton>
                        <IconButton onClick={handleMoreIconClick}>
                            <MoreHorizIcon />
                        </IconButton>
                    </Stack>
                </Stack>
                <Stack>

                </Stack>
                <Stack>

                </Stack>
            </Stack>
        </Box>
    )
}

export default Chat