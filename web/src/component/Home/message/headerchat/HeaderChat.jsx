import React, { useEffect, useState } from 'react';
import { AvatarGroup, Box, useMediaQuery, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import './HeaderChat.scss'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const HeaderChat = (props) => {

    const { listfrient, setshowchat } = props;

    const theme = useTheme();
    const mdup = useMediaQuery(theme.breakpoints.up('md'))
    const [user, setuser] = useState({});

    useEffect(() => {
        if (listfrient && listfrient.length > 0) {
            let index = listfrient.findIndex(item => item.click === true);
            if (index !== -1) {
                setuser(listfrient[index])
            }
        }
    }, [])

    useEffect(() => {
        if (listfrient && listfrient.length > 0) {
            let index = listfrient.findIndex(item => item.click === true);
            if (index !== -1) {
                setuser(listfrient[index])
            }
        }
    }, [listfrient])

    return (
        <Box className="header-chat-container">
            <Box
                display={mdup ? "none" : "block"}
                className="header-icon-goback"
            >
                <IconButton
                    onClick={() => setshowchat(false)}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            </Box>
            <Box className="info-and-action">

                <Box className="info-user">
                    {
                        user && user.phoneNumber
                            ?
                            <Avatar
                                alt="Remy Sharp"
                                src={user && user.avatar}
                                sx={{ width: 56, height: 56 }}
                            />
                            : <AvatarGroup max={4}>
                                {user && user.members && user.members.length > 0 &&
                                    user.members.slice(0, 3).map((member, index) => {
                                        return (
                                            <Avatar
                                                key={`avatar-${index}`}
                                                sx={{ width: 30, height: 30 }}
                                                src={member && member.avatar}

                                            >

                                            </Avatar>
                                        )
                                    }
                                    )}
                            </AvatarGroup>
                    }

                    <Box className="info-name-user">
                        <h3>
                            {user && user.name}
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

        </Box>
    );
};

export default HeaderChat;