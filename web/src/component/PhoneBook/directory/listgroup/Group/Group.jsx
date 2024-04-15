import { Avatar, Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import './Group.scss'
import GroupModalOption from '../GroupModalOption/GroupModalOption'
function Group({ id, alt, src, name, handleClick, handleClose, openModalId }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Avatar sx={{ width: 54, height: 54 }} alt={alt} src={src} />
                <Box sx={{ marginLeft: 1 }}>
                    <Typography className='groupName'>Tên nhóm</Typography>
                    <Typography>1000 Thành viên</Typography>
                </Box>
            </Box>
            <IconButton sx={{ position: 'relative' }}>
                <Typography onClick={() => handleClick(id)} className='moreInfoButton'>...</Typography>
                {openModalId === id && <GroupModalOption open={true} handleClose={handleClose} />}
            </IconButton>
        </Box>

    )
}

export default Group