import { Box, Stack } from '@mui/material'
import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import GroupSideBar from '../../components/GroupSideBar/GroupSideBar'
import RightNavBar from '../../components/RightNavBar/RightNavBar'

function GroupPage() {
    return (
        <Stack
            sx={{ height: '100vh' }}

            justifyContent={'space-between'}
            direction={'row'}>
            <SideBar />
            <GroupSideBar />
            <RightNavBar />
        </Stack>
    )
}

export default GroupPage