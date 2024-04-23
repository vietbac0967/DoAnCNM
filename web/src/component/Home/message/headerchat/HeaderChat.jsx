import React, { useEffect, useRef, useState } from 'react';
import { AvatarGroup, Box, useMediaQuery, useTheme } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import './HeaderChat.scss'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import _ from 'lodash';

const HeaderChat = (props) => {

    const { users, setshowchat } = props;
    const showChatRef = useRef(null);

    const theme = useTheme();
    const mdup = useMediaQuery(theme.breakpoints.up('md'))
    const [user, setuser] = useState({});

    useEffect(() => {
        if (users && !_.isEmpty(users)) {
            setuser(users)
        }
    }, [])

    useEffect(() => {
        if (users && !_.isEmpty(users)) {
            setuser(users)
        }
    }, [users])

    const handleCancel = async () => {
        setshowchat(false)
        // await handleGetAllFriend()
    }

    return (
        <Box className="header-chat-container">
            <Box
                display={mdup ? "none" : "block"}
                className="header-icon-goback"
            >
                <IconButton
                    onClick={() => handleCancel()}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            </Box>
            <Box className="info-and-action">

                <Box className="info-user">
                    {
                        user && user.type === "private"
                            ?
                            <Avatar
                                sx={{ width: 50, height: 50 }}
                                alt="Remy Sharp" src={user.avatar} />
                            : user.type === "group" && user.avatar ?
                                <Avatar
                                    sx={{ width: 50, height: 50 }}
                                    alt="Remy Sharp" src={user.avatar} />
                                :
                                <AvatarGroup max={4}>
                                    {user && user.members && user.members.length > 0 &&
                                        user.members.slice(0, 3).map((member, index) => {
                                            return (
                                                <Avatar
                                                    key={`avatar-${index}`}
                                                    sx={{ width: 40, height: 40 }}
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