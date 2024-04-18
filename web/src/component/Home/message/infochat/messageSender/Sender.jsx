import React, { useState } from 'react';
import './Sender.scss'
import { Box, Paper } from '@mui/material'
import MenuMessage from '../menuaction/MenuMessage';

const Sender = (props) => {

    const { item, listfrient, setlistmessage, handleGetAllMessage, user } = props;

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
        <Box className="my-messenge-container">
            <Box className="info-messenge"
            >
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
                setlistmessage={setlistmessage}
                handleGetAllMessage={handleGetAllMessage}
                user={user}

            />
        </Box>
    );
};

export default Sender;