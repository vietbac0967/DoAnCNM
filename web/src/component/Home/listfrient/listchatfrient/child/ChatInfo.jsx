import React from 'react';
import { AvatarGroup, Box, IconButton } from '@mui/material'
import './ChatInfo.scss'
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';

const ChatInfo = (props) => {

    const { avatar, name, click, user } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)


    return (
        <Box className={click === true ? "chat-info-container active" : "chat-info-container"}>
            <Box className="avt-info">
                {
                    user && user.type === "private"
                        ?
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            alt="Remy Sharp" src={avatar} />
                        : user.type === "group" && user.avatar ?
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
                <Box className="chat-info">
                    {
                        user && user.message
                            ? user.message.senderId === dataredux._id
                                ?
                                <Box>
                                    Bạn:{user.message.content}
                                </Box>
                                :
                                <Box>
                                    {user.message.content}
                                </Box>
                            :
                            <Box>
                                Gửi lời chào , Bắt đầu cuộc trò chuyện....
                            </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default ChatInfo;