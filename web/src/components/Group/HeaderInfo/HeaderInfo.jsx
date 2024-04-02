import { Stack, Typography } from '@mui/material'
import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function HeaderInfo({ icon, title }) {
    return (
        <Stack flexDirection={'row'}>
            {icon}
            <Typography>{title}</Typography>
        </Stack>
    )
}

export default HeaderInfo