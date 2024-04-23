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

    const { users, setshowchat, showchat, mdup } = props;

    const user = useRef({});

    useEffect(() => {
        if (user.current) {
            if (user.current.type === "private") {
                handlerefreshMessange(async (data) => {
                    if (data.phone === user.current.phoneNumber) {
                        await handleGetAllMessage({ userId: data.userId })

                    }

                })
                handlerefreshMessangesennder(async (data) => {
                    await handleGetAllMessage({ userId: data.userId })

                })

            }
            // if (user.current[0].type === "group") {
            //     handlerefreshMessangeingroup(async (data) => {
            //         if (listfrient && listfrient.length > 0) {
            //             let datagr = listfrient.find((item) => item.click === true);
            //             if (datagr && data.groupId === datagr._id._id) {
            //                 await handleGetAllMessageinGroup({ groupId: data.groupId })

            //             }
            //         }
            //     })

            // }
            if (user.current.type === "group") {
                handlerefreshMessangeingroup(async (data) => {
                    if (users && !_.isEmpty(users)) {
                        if (data.groupId === users._id._id) {
                            await handleGetAllMessageinGroup({ groupId: data.groupId })

                        }
                    }
                })

            }


        }
    }, [user.current])


    // useEffect(() => {
    //     if (listfrient && listfrient.length > 0) {
    //         let data = listfrient.filter((item) => item.click === true)
    //         user.current = data
    //         let index = listfrient.findIndex(item => item.click === true);
    //         if (index !== -1) {
    //             if (listfrient[index] && listfrient[index].type === "private") {
    //                 handleGetAllMessage({ userId: listfrient[index]._id })
    //             }
    //             else {
    //                 handleGetAllMessageinGroup({ groupId: listfrient[index]._id._id })
    //             }
    //         }

    //     }
    // }, [listfrient])

    useEffect(() => {
        if (users && !_.isEmpty(users)) {
            let data = users
            user.current = data
            if (users && users.type === "private") {
                handleGetAllMessage({ userId: users._id })
            }
            else {
                handleGetAllMessageinGroup({ groupId: users._id._id })
            }

        }
    }, [users])


    const [listmessage, setlistmessage] = useState([])

    const handleGetAllMessage = async (data) => {
        // if (listfrient && listfrient.length > 0) {
        //     let index = listfrient.findIndex(item => item.click === true);
        //     if (index !== -1) {
        //         let res = await getAllMessage({ receiverId: data.userId })
        //         if (res && res.EC === 0) {
        //             setlistmessage(res.DT)
        //         } else {
        //             setlistmessage([])
        //         }
        //     }

        // }

        if (users && !_.isEmpty(users)) {
            let res = await getAllMessage({ receiverId: data.userId })
            if (res && res.EC === 0) {
                setlistmessage(res.DT)
            } else {
                setlistmessage([])
            }

        }
    }


    const handleGetAllMessageinGroup = async (data) => {
        // if (listfrient && listfrient.length > 0) {
        //     let index = listfrient.findIndex(item => item.click === true);
        //     if (index !== -1) {
        //         let res = await getMessagesGroup(data.groupId);
        //         if (res && res.EC === 0) {
        //             setlistmessage(res.DT)
        //         } else {
        //             setlistmessage([])
        //         }
        //     }

        // }

        if (users && !_.isEmpty(users)) {
            let res = await getMessagesGroup(data.groupId);

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
                    users={users}
                    setshowchat={setshowchat}
                />
            </Box>
            <Divider orientation="horizontal" />

            <Box className="message-info">
                <InfoChat
                    users={users}
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
                    users={users}
                    user={user.current}
                    // handleGetAllFriend={handleGetAllFriend}
                    showchat={showchat}
                    setshowchat={setshowchat}
                    mdup={mdup}
                // handleGeAllFriendUpdate={handleGeAllFriendUpdate}
                />
            </Box>
        </Box>
    );
};

export default Message;