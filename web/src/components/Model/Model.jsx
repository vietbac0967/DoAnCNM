import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import exampleAvatar from '../../assets/Ellipse_191.png';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
};

function Model() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setPhoneNumber(inputValue);
        }
    };
    const handleDeleteRecentResarches = (event) => {
    };
    return (
        <div>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ borderBottom: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                        <Typography variant="h6" >
                            Thêm bạn
                        </Typography>
                        <IconButton
                            sx={{ position: 'absolute', right: 10, top: 10, width: '5' }}
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                            aria- label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            id="phone-number-input"
                            label="Số điện thoại"
                            variant="outlined"
                            value={phoneNumber}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                            sx={{

                            }}
                        />
                    </Box>
                    <Box sx={{}}>
                        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2, fontSize: 12, fontWeight: 'normal' }}>
                            Recent searches
                        </Typography>
                    </Box>
                    <Stack sx={{ flexDirection: 'row', position: 'relative' }}>
                        <Avatar alt="Remy Sharp" src={exampleAvatar} />
                        <Box>
                            <Typography variant="h6" sx={{ fontSize: 14 }} >Huy dz</Typography>
                            <Typography variant="h6" sx={{ fontSize: 12, fontWeight: 'normal' }} >0123456789</Typography>
                        </Box>
                        <IconButton
                            sx={{ position: 'absolute', right: 10, top: 10, width: '5' }}
                            edge="end"
                            color="inherit"
                            onClick={handleDeleteRecentResarches}
                            aria- label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Box>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 12, }}>
                            May you know
                        </Typography>

                    </Box>
                    <Stack sx={{ flexDirection: 'row', position: 'relative' }}>
                        <Avatar alt="Remy Sharp" src={exampleAvatar} />
                        <Box>
                            <Typography variant="h6" sx={{ fontSize: 14 }} >Huy dz</Typography>
                            <Typography variant="h6" sx={{ fontSize: 12, fontWeight: 'normal' }} >0123456789</Typography>
                        </Box>
                        <IconButton
                            sx={{ position: 'absolute', right: 10, top: -20, width: '5' }}
                            edge="end"
                            color="inherit"
                            onClick={handleDeleteRecentResarches}
                            aria- label="close"
                        >
                            <CloseIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                        <Button
                            variant="outlined"
                            sx={{ position: 'absolute', right: 10, top: 10, }}>Add friend</Button>
                    </Stack>
                </Box>
            </Modal>
        </div >
    );
}
export default Model