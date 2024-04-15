import React from 'react';
import './Receiver.scss'
import { Avatar, Box, Paper } from '@mui/material'

const Receiver = (props) => {

    const { item, listfrient } = props;

    return (
        <Box className="messenge-container">
            <Box className="avatar-messenge">
                <Avatar
                    sx={{ width: 45, height: 45 }}
                >
                    {/* {
                        userinfo ?
                            firstInitial + lastInitial
                            :
                            ""
                    } */}
                </Avatar>
            </Box>
            <Box className="info-messenge">
                <Paper className='form-text'>
                    <span className='text'>
                        {item && item.content}
                    </span>
                </Paper>
            </Box>
        </Box>
    );
};

export default Receiver;