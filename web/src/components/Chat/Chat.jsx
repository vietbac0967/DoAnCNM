import React from 'react'
import Box from '@mui/material/Box'
import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import avatar from '../../assets/Ellipse_191.png'
import SearchIcon from '@mui/icons-material/Search';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Input from '@mui/material/Input';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SendIcon from '@mui/icons-material/Send';



function Chat() {
    const handleSearchIconClick = () => {

    }
    const handlePhoneClick = () => {

    }

    const handleMoreIconClick = () => {

    }
    const attachfileClick = () => {

    }
    const handleSendIcon = () => { }
    return (
        <Box
            flex={8}
            bgcolor={''}>
            <Stack height={'100%'} flexDirection={'column'} justifyContent={'space-between'}>
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
                <Stack sx={{ backgroundColor: '#F1EEDC', height: '100%' }}>

                </Stack>
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                    <IconButton onClick={attachfileClick}>
                        <AttachFileIcon />
                    </IconButton>
                    <Input sx={{ width: '80%' }} placeholder="Enter your text" />
                    <Stack flexDirection={'row'}>
                        <IconButton>
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                        <IconButton onClick={handleSendIcon}>
                            <SendIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Chat