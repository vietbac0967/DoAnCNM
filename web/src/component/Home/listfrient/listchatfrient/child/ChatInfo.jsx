import React from 'react';
import { AvatarGroup, Box, IconButton } from '@mui/material'
import './ChatInfo.scss'
import Avatar from '@mui/material/Avatar';

const ChatInfo = (props) => {

    const { avatar, name, click, user } = props;

    return (
        <Box className={click === true ? "chat-info-container active" : "chat-info-container"}>
            <Box className="avt-info">
                {
                    user && user.phoneNumber
                        ?
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            alt="Remy Sharp" src={avatar} />
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