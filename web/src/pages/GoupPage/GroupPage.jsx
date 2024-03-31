import { Box, Stack } from '@mui/material'
import React from 'react'
import SideBar from '../../components/SideBar/SideBar'

function GroupPage() {
    return (
        <Stack
            sx={{ height: '100vh' }}

            justifyContent={'space-between'}
            direction={'row'}>
            <SideBar />

        </Stack>
    )
}

export default GroupPage