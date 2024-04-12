import React from 'react';
import { Box } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import './HeaderChat.scss'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HeaderChat = (props) => {

    const { listfrient } = props;

    return (
        <Box className="header-chat-container">
            <Box className="info-user">
                <Avatar
                    alt="Remy Sharp"
                    src={listfrient && listfrient.length > 0 && listfrient[0].avatar}
                    sx={{ width: 56, height: 56 }}
                />
                <Box className="info-name-user">
                    <h3>
                        {listfrient && listfrient.length > 0 && listfrient[0].name}
                    </h3>
                    <p>time:....</p>
                </Box>
            </Box>
            <Box className="action-info">
                <IconButton type="button" aria-label="search">
                    <SearchIcon />
                </IconButton>
                <IconButton type="button" aria-label="search">
                    <LocalPhoneIcon />
                </IconButton>
                <IconButton type="button" aria-label="search">
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default HeaderChat;