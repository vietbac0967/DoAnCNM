import { Box, Typography, IconButton } from '@mui/material'
import React from 'react'
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
function GroupModalOption({ open, handleClose }) {
    return (
        <>
            {open && <Box sx={style}>
                <Typography>Xem thông tin</Typography>
                <Typography onClick={() => console.log('rời')} >Rời nhóm</Typography>
                <IconButton sx={{ position: 'absolute', right: 0, top: 0 }}>
                    <CloseIcon onClick={handleClose} />
                </IconButton>

            </Box>}
        </>
    )
}

export default GroupModalOption