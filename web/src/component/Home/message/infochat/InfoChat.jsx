import React, { useEffect, useRef, useState } from 'react';
import './InfoChat.scss'
import { Box } from '@mui/material'
import Sender from './messageSender/Sender';
import Receiver from './messageReceiver/Receiver';
import { getAllMessage } from '../../../../service/MessageService';
import { handlerefreshMessange } from '../../../../socket/socket';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';

const InfoChat = (props) => {

    const { users, handleGetAllMessage, listmessage,
        setlistmessage, user, reflistmessage, handleGetAllMessageinGroup
    } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    return (
        <Box className="info-chat-container">
            <Box
                id="scrollableDiv"
                sx={{
                    overflowY: 'auto',
                    height: "100%",
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    borderWidth: 1
                }}
            >
                <InfiniteScroll
                    dataLength={listmessage.length}
                    // next={fetchMoreData}
                    // hasMore={true}
                    inverse={true}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                >
                    {
                        listmessage && listmessage.length > 0
                        && listmessage.reverse().map((item, index) => {
                            if (item && item.senderId && item.receiverId) {
                                return (
                                    <Box key={`chat-private-${index}`}>
                                        {
                                            item.senderId._id === dataredux._id ?
                                                <Box key={`chat-private-sender-${index}`}>
                                                    <Sender
                                                        item={item}
                                                        users={users}
                                                        setlistmessage={setlistmessage}
                                                        reflistmessage={reflistmessage}
                                                        handleGetAllMessage={handleGetAllMessage}
                                                        user={user}
                                                        handleGetAllMessageinGroup={handleGetAllMessageinGroup}

                                                    />
                                                </Box>
                                                :
                                                <Box key={`chat-private-receiver-${index}`}>
                                                    <Receiver
                                                        item={item}
                                                        users={users}
                                                        setlistmessage={setlistmessage}
                                                        reflistmessage={reflistmessage}
                                                        handleGetAllMessage={handleGetAllMessage}
                                                        handleGetAllMessageinGroup={handleGetAllMessageinGroup}
                                                        user={user}
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
                                                        users={users}
                                                        setlistmessage={setlistmessage}
                                                        reflistmessage={reflistmessage}
                                                        handleGetAllMessage={handleGetAllMessage}
                                                        user={user}
                                                        handleGetAllMessageinGroup={handleGetAllMessageinGroup}

                                                    />
                                                </Box>
                                                :
                                                <Box key={`chat-private-receiver-${index}`}>
                                                    <Receiver
                                                        item={item}
                                                        user={user}
                                                        handleGetAllMessage={handleGetAllMessage}
                                                        handleGetAllMessageinGroup={handleGetAllMessageinGroup}

                                                    />
                                                </Box>

                                        }
                                    </Box>
                                )
                            }
                        })
                    }
                </InfiniteScroll>
            </Box>
        </Box>
    );
};

export default InfoChat;