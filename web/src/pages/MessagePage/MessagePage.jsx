import React from 'react'
import Chat from '../../components/Chat/Chat'
import UserList from '../../components/UserList/UserList'
import SideBar from '../../components/SideBar/SideBar'
import Stack from '@mui/material/Stack'
function MessagePage() {
    return (
        <div>
            <Stack
                height={'100%'}
                justifyContent={'space-between'}
                direction={'row'}>
                <SideBar />
                <UserList />
                <Chat />

            </Stack>
        </div>

    )
}

export default MessagePage