import React, { useEffect, useRef, useState } from 'react';
import './InfoChat.scss'
import { Box } from '@mui/material'
import Sender from './messageSender/Sender';
import Receiver from './messageReceiver/Receiver';
import { getAllMessage } from '../../../../service/MessageService';
import { handlerefreshMessange } from '../../../../socket/socket';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

const InfoChat = (props) => {

    const { listfrient, handleGetAllMessage, listmessage, setlistmessage, user } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    useEffect(() => {
        handleGetAllMessage()
    }, [])

    return (
        <Box className="info-chat-container">
            {
                listmessage && listmessage.length > 0
                && listmessage.map((item, index) => {
                    if (item && item.senderId && item.receiverId) {
                        return (
                            <Box key={`chat-private-${index}`}>
                                {
                                    item.senderId._id === dataredux._id ?
                                        <Box key={`chat-private-sender-${index}`}>
                                            <Sender
                                                item={item}
                                                listfrient={listfrient}
                                                setlistmessage={setlistmessage}
                                                handleGetAllMessage={handleGetAllMessage}
                                                user={user}

                                            />
                                        </Box>
                                        :
                                        <Box key={`chat-private-receiver-${index}`}>
                                            <Receiver
                                                item={item}
                                                listfrient={listfrient}
                                                setlistmessage={setlistmessage}
                                                handleGetAllMessage={handleGetAllMessage}

                                            />
                                        </Box>

                                }
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={`chat-private-${index}`}>
                                {
                                    item.senderId && item.senderId._id === dataredux._id ?
                                        <Box key={`chat-private-sender-${index}`}>
                                            <Sender
                                                item={item}
                                                listfrient={listfrient}
                                                setlistmessage={setlistmessage}
                                                handleGetAllMessage={handleGetAllMessage}
                                                user={user}

                                            />
                                        </Box>
                                        :
                                        <Box key={`chat-private-receiver-${index}`}>
                                            <Receiver
                                                item={item}
                                                user={user}
                                                handleGetAllMessage={handleGetAllMessage}
                                            />
                                        </Box>

                                }
                            </Box>
                        )
                    }
                })
            }

        </Box>
    );
};

export default InfoChat;