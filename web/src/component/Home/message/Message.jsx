import React, { useEffect, useRef, useState } from 'react';
import './Message.scss'
import { Box } from '@mui/material'
import Divider from '@mui/material/Divider';
import InfoChat from './infochat/InfoChat'
import ContentChat from './contentchat/ContentChat';
import HeaderChat from './headerchat/HeaderChat';
import { handlerefreshMessange, handlerefreshMessangeingroup, handlerefreshMessangesennder } from '../../../socket/socket';
import { getAllMessage, getMessagesGroup } from '../../../service/MessageService';
import _ from 'lodash';

const Message = (props) => {

    const { listfrient, setshowchat } = props;

    const user = useRef({});

    useEffect(() => {
        if (user.current && user.current.length > 0) {
            if (user.current[0].phoneNumber) {
                handlerefreshMessange(async (data) => {
                    if (data.phone === user.current[0].phoneNumber) {
                        await handleGetAllMessage({ userId: data.userId })
                    }

                })
                handlerefreshMessangesennder(async (data) => {
                    await handleGetAllMessage({ userId: data.userId })
                })

            } else {
                handlerefreshMessangeingroup(async (data) => {
                    if (data.groupId === user.current[0]._id) {
                        await handleGetAllMessageinGroup({ groupId: data.groupId })
                    }
                })

            }

        }
    }, [user.current[0]])


    useEffect(() => {
        if (listfrient && listfrient.length > 0) {
            let data = listfrient.filter((item) => item.click === true)
            user.current = data
            let index = listfrient.findIndex(item => item.click === true);
            if (index !== -1) {
                if (listfrient[index] && listfrient[index].phoneNumber) {
                    handleGetAllMessage({ userId: listfrient[index]._id })
                }
                else {
                    handleGetAllMessageinGroup({ groupId: listfrient[index]._id })
                }
            }

        }
    }, [listfrient])

    const [listmessage, setlistmessage] = useState([])

    const handleGetAllMessage = async (data) => {
        if (listfrient && listfrient.length > 0) {
            let index = listfrient.findIndex(item => item.click === true);
            if (index !== -1) {
                let res = await getAllMessage({ receiverId: data.userId })
                if (res && res.EC === 0) {
                    setlistmessage(res.DT)
                } else {
                    setlistmessage([])
                }
            }

        }
    }

    const handleGetAllMessageinGroup = async (data) => {
        if (listfrient && listfrient.length > 0) {
            let index = listfrient.findIndex(item => item.click === true);
            if (index !== -1) {
                let res = await getMessagesGroup(data.groupId);
                if (res && res.EC === 0) {
                    setlistmessage(res.DT)
                } else {
                    setlistmessage([])
                }
            }

        }
    }

    return (
        <Box className='message-container'>
            <Box className="message-header">
                <HeaderChat
                    listfrient={listfrient}
                    setshowchat={setshowchat}
                />
            </Box>
            <Divider orientation="horizontal" />

            <Box className="message-info">
                <InfoChat
                    listfrient={listfrient}
                    handleGetAllMessage={handleGetAllMessage}
                    setlistmessage={setlistmessage}
                    listmessage={listmessage}
                    user={user.current}
                    handleGetAllMessageinGroup={handleGetAllMessageinGroup}

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