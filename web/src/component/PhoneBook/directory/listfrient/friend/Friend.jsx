import { Avatar, Box, IconButton, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import './Friend.scss'
import FriendModalOption from '../FriendModalOption/FriendModalOption';
function Friend({ id, alt, src, name, handleClick, handleClose, openModalId }) {
    return (
        <Box className="friendComponent" sx={{ display: 'flex', justifyContent: 'space-between', padding: "10px" }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ width: 54, height: 54 }} className='avatar' alt={alt} src={src} />
                <Typography variant="h6" sx={{ marginLeft: 1 }}>{name}</Typography>
            </Box>
            <IconButton className='moreInfoButton' >
                <MoreHorizIcon className="iconButtonCustom" onClick={() => handleClick(id)} />
                {openModalId === id && <FriendModalOption open={true} handleClose={handleClose} />}
            </IconButton>
        </Box>
    );
}

export default Friend