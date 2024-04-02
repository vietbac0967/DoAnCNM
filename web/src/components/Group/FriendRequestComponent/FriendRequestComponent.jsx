import { Avatar, Box, Button, Icon, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import HeaderInfo from '../HeaderInfo/HeaderInfo'
import DraftsIcon from '@mui/icons-material/Drafts';
import avatar from '../../../assets/Ellipse_191.png'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
function FriendRequestComponent() {
    return (
        <Stack flexDirection={'column'}>
            <HeaderInfo icon={<DraftsIcon />} title={'Friend Requests'} />
            <Box sx={{ backgroundColor: 'red', width: '100%', height: 50 }}>
                <Typography>Friend Request (2)</Typography>
            </Box>
            <Stack>
                <Box sx={{ borderWidth: 1, }}>
                    <Stack flexDirection={'row'} >
                        <Avatar alt="Remy Sharp" src={avatar} />
                        <Stack>
                            <Typography>John Doe</Typography>
                            <Typography>2 mutual friends</Typography>
                        </Stack>
                        <IconButton>
                            <ChatBubbleOutlineIcon />
                        </IconButton>
                    </Stack>
                    <Stack>
                        kb voi tau
                    </Stack>
                    <Stack flexDirection={'row'}>
                        <Button variant="outlined" color="error">
                            reject
                        </Button>
                        <Button variant="contained" color="success">
                            Accept
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    )
}

export default FriendRequestComponent