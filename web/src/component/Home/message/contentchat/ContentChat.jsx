import React, { useEffect, useState } from 'react';
import { Box, OutlinedInput } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import './ContentChat.scss'
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../../service/MessageService';
import { handlsendmessange } from '../../../../socket/socket';

const ContentChat = (props) => {

    const { listfrient, user } = props;

    const [chat, setchat] = useState("");
    const [userinfo, setuserinfo] = useState({});

    useEffect(() => {
        if (listfrient && listfrient.length > 0)
            setuserinfo(listfrient[0])
    }, [listfrient])


    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    useEffect(() => {
        if (user && user.length > 0)
            setuserinfo(user[0])
    }, [user])

    const handleSendChat = async (e) => {
        if (e.key === 'Enter') {
            if (chat) {
                if (userinfo && userinfo._id) {
                    let data = {
                        receiverId: userinfo._id,
                        content: chat
                    }
                    let res = await sendMessage(data)
                    if (res) {
                        if (res.EC === 0) {
                            setchat("")
                            handlsendmessange({ sender: dataredux.phoneNumber, receiver: userinfo.phoneNumber })
                        }
                    }
                } else {
                    let data = {
                        phonesender: dataredux.phonenumber,
                        groupId: userinfo._id,
                        content: chat
                    }
                    let res = await sendmessangeingroup(data)
                    if (res) {
                        if (res.EC === 0) {
                            setchat("")

                            handlsendmessangeingroup({ groupId: userinfo._id })
                        }
                    }

                }

            }
        }
    }

    return (
        <Box className="chat-infor-bottom-child-bottom">
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <AttachFileIcon />
            </IconButton>
            <OutlinedInput
                className='chat-infor-bottom-child-text'
                placeholder="Nhập tin nhắn muốn gửi"
                onKeyDown={(e) => handleSendChat(e)}
                value={chat}
                onChange={(e) => setchat(e.target.value)}
            />
        </Box>
    );
};

export default ContentChat;