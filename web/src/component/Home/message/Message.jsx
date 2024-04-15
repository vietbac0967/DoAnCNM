import React, { useEffect, useRef, useState } from 'react';
import './Message.scss'
import { Box } from '@mui/material'
import Divider from '@mui/material/Divider';
import InfoChat from './infochat/InfoChat'
import ContentChat from './contentchat/ContentChat';
import HeaderChat from './headerchat/HeaderChat';
import { handlerefreshMessange, handlerefreshMessangesennder } from '../../../socket/socket';
import { getAllMessage } from '../../../service/MessageService';
import _ from 'lodash';

const Message = (props) => {

    const { listfrient } = props;

    const user = useRef({});


    useEffect(() => {
        if (user.current && user.current.length > 0) {
            if (user.current[0].phoneNumber) {
                handlerefreshMessange(async (data) => {
                    if (data.phone === user.current[0].phoneNumber) {
                        await handleGetAllMessage()
                    }
                })
                handlerefreshMessangesennder(async () => {
                    await handleGetAllMessage()
                })
            } else {
                handlerefreshMessangeingroup(async (data) => {
                    if (data.groupId === user.current[0]._id) {
                        await handlegetAllchatgroup()
                    }
                })

            }

        }
    }, [user.current[0]])

    useEffect(() => {
        if (listfrient && listfrient.length > 0) {
            let data = listfrient.filter((item) => item.click === true)
            user.current = data
        }
    }, [listfrient])


    const [listmessage, setlistmessage] = useState([])

    const handleGetAllMessage = async () => {
        if (listfrient && listfrient.length > 0) {
            let res = await getAllMessage({ receiverId: listfrient[0]._id })
            if (res && res.EC === 0) {
                setlistmessage(res.DT)
            } else {
                setlistmessage([])
            }
        }
    }

    return (
        <Box className='message-container'>
            <Box className="message-header">
                <HeaderChat
                    listfrient={listfrient}
                />
            </Box>
            <Divider orientation="horizontal" />

            <Box className="message-info">
                <InfoChat
                    listfrient={listfrient}
                    handleGetAllMessage={handleGetAllMessage}
                    listmessage={listmessage}
                />
            </Box>
            <Divider orientation="horizontal" />

            <Box className="message-content">
                <ContentChat
                    listfrient={listfrient}
                    user={user.current}
                />
            </Box>
        </Box>
    );
};

export default Message;