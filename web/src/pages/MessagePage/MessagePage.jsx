import React from 'react'
import Chat from '../../components/Chat/Chat'
import UserList from '../../components/UserList/UserList'
import SideBar from '../../components/SideBar/SideBar'
import Stack from '@mui/material/Stack'
function MessagePage() {
    return (
        <Stack
            sx={{ height: '100vh' }}

            justifyContent={'space-between'}
            direction={'row'}>
            <SideBar />
            <UserList />
            <Chat />

        </Stack>

    )
}

export default MessagePage