import { Box, Button, IconButton, Modal, Typography, } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,

};
export default function FriendModalOption({ open, handleClose }) {
    return (
        <>
            {open && <Box sx={style}>
                <Typography>Xem thông tin</Typography>
                <Typography >Chặn</Typography>
                <Typography>Xóa bạn bè</Typography>
                <IconButton sx={{ position: 'absolute', right: 0, top: 0 }}>
                    <CloseIcon onClick={handleClose} />
                </IconButton>

            </Box>}
        </>


    )
}
