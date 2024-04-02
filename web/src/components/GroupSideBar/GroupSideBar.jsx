import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import FindComponent from '../FindComponent/FindComponent'
import IconButton from '@mui/material/IconButton'
import PersonIcon from '@mui/icons-material/Person';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DraftsIcon from '@mui/icons-material/Drafts';
import Button from '@mui/material/Button'
function GroupSideBar() {
    const handleAddUserClick = () => { }
    const handleFriendClick = () => { }
    const handleDraftClick = () => { }
    const handleGroupClick = () => { }
    return (
        <Box
            bgcolor={'#F5F5F5'}
            flex={3}
        >
            <Stack flexDirection={'column'}>
                <Stack flexDirection={'row'} justifyContent={'space-around'}>
                    <FindComponent handleAddUserClick={handleAddUserClick} />
                </Stack>
            </Stack >
            <Stack
                direction="column"  // Xếp các phần tử theo hàng ngang
                spacing={1}       // Khoảng cách giữa các phần tử
                justifyContent="center" // Căn giữa các phần tử theo chiều ngang
                alignItems="center"
                flexDirection={'column'}>
                <Button
                    sx={{
                        color: '#333'
                    }}
                    fullWidth
                    onClick={handleFriendClick}
                    variant="text" startIcon={<PersonIcon />}>
                    Friend Lists
                </Button>
                <Button
                    sx={{
                        color: '#333'
                    }}
                    fullWidth
                    onClick={handleGroupClick}
                    variant="text" startIcon={<PeopleOutlineIcon />}>
                    Joined Groups
                </Button>

                <Button
                    sx={{
                        color: '#333'
                    }}
                    fullWidth
                    onClick={handleDraftClick}
                    variant="text" startIcon={<DraftsIcon />}>
                    Friend Requests
                </Button>

            </Stack>
        </Box>
    )
}

export default GroupSideBar