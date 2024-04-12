import React from 'react';
import { Box, IconButton } from '@mui/material'
import './ChatInfo.scss'
import Avatar from '@mui/material/Avatar';

const ChatInfo = (props) => {

    const { avatar, name } = props;

    return (
        <Box className="chat-info-container">
            <Box className="avt-info">
                <Avatar
                    sx={{ width: 50, height: 50 }}
                    alt="Remy Sharp" src={avatar} />
            </Box>
            <Box className="name-chat-info">
                <Box className="name-info">
                    {name}
                </Box>
                {/* <Box className="chat-info">
                    Bạn:Nguyen Phuong Cuong
                </Box>
                <Box className="time-info">
                    Nguyen Phuong Cuong
                </Box> */}
            </Box>
        </Box>
    );
};

export default ChatInfo;