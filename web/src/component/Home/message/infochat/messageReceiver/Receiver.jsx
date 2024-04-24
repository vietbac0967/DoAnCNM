import React, { useState } from 'react';
import './Receiver.scss'
import { Avatar, Box, Paper } from '@mui/material'
import MenuMessage from '../menuaction/MenuMessage';

const Receiver = (props) => {

    const { item, listfrient, handleGetAllMessage, handleGetAllMessageinGroup, user } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (event.type === 'contextmenu') {
            event.preventDefault();
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className="messenge-container">
            <Box className="avatar-messenge">
                <Avatar
                    sx={{ width: 45, height: 45 }}
                    src={item.senderId && item.senderId.avatar}
                >
                </Avatar>
            </Box>
            <Box className="info-messenge">
                <Paper className='form-text'
                    onContextMenu={(e) => handleClick(e)}
                >
                    <span className='text'>
                        {item && item.content}
                    </span>
                </Paper>
            </Box>
            <MenuMessage
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                item={item}
                listfrient={listfrient}
                handleGetAllMessage={handleGetAllMessage}
                handleGetAllMessageinGroup={handleGetAllMessageinGroup}
                user={user}
            />
        </Box>
    );
};

export default Receiver;