import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import './Home.scss'
import HomeListFrient from './listfrient/HomeListFrient';
import Message from './message/Message'
import { useDispatch, useSelector } from 'react-redux';
import { handleCusttomClient, handlerefreshAccount, handleuserjoingroup, handleuserleavegroup } from '../../socket/socket';
import { fechUserToken } from '../../redux/UserSlice';
import _ from 'lodash';
import { getAllMessage, getMessagesGroup } from '../../service/MessageService';
import { getAllFriend } from '../../service/UserService';
import { GetGroupbyUser } from '../../service/GroupService';

const Home = () => {

    const theme = useTheme();
    const mdup = useMediaQuery(theme.breakpoints.up('md'))

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const [listfrient, setlistfrient] = useState([]);
    const [currentMessange, setcurrentMessange] = useState("");
    const [currentgroup, setcurrentgroup] = useState({});

    const handleGetAllMessage = async (receiverId) => {
        let res = await getAllMessage({ receiverId: receiverId })
        if (res && res.EC === 0)
            return res.DT
    }

    const handleGetAllMessagebyGroup = async (groupId) => {
        let res = await getMessagesGroup(groupId)
        if (res && res.EC === 0)
            return res.DT
    }

    const [showchat, setshowchat] = useState(false)

    useEffect(() => {
        if (mdup) {
            setshowchat(false)
        }
    }, [mdup])


    useEffect(() => {
        if (dataredux) {
            handleCusttomClient({ customId: dataredux.phoneNumber })

            handlerefreshAccount(() => {
                dispatch(fechUserToken())
            })

            handleGetAllFriend()
        }
    }, [])

    useEffect(() => {
        handleGetAllFriend()
    }, [dataredux])

    const resetClickProperty = (items) => {
        items.forEach((item) => {
            item.click = false;
        });
    };


    const handleGetAllFriend = async () => {
        if (dataredux && dataredux.friends && dataredux.groups
            && dataredux.friends.length > 0 && dataredux.groups.length > 0) {
            // resetClickProperty(dataredux.friends)
            // resetClickProperty(dataredux.groups);
            setlistfrient(dataredux.friends.concat(dataredux.groups));
        } else {
            if (dataredux && dataredux.friends && dataredux.friends.length > 0) {
                // resetClickProperty(dataredux.friends)

                setlistfrient(dataredux.friends);
            } else if (dataredux && dataredux.groups && dataredux.groups.length > 0) {
                // resetClickProperty(dataredux.groups);

                setlistfrient(dataredux.groups);
            }
        }
    }


    const handleClick = async (item) => {
        let cplistfrient = _.cloneDeep(listfrient)
        cplistfrient.forEach((item) => {
            item.click = false;
        })
        let objIndex = cplistfrient.findIndex((items) => items._id === item._id);
        if (objIndex !== -1) {
            cplistfrient[objIndex].click = true;
            if (cplistfrient[objIndex].phoneNumber) {
                setcurrentMessange("private")
                if (currentgroup) {
                    if (item._id !== currentgroup._id) {
                        let data = { groupId: currentgroup._id, user: dataredux.phoneNumber, namegroup: currentgroup.name };
                        await handleuserleavegroup(data)
                        setcurrentgroup({})
                    }
                }
                let listmessage = await handleGetAllMessage(cplistfrient[objIndex]._id);
                listmessage.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                let closestData = listmessage[0];
                if (closestData && closestData.length > 0) {
                    cplistfrient[objIndex].current = closestData.content;
                }
            } else {
                if (!currentgroup) {
                    setcurrentMessange("group")
                    setcurrentgroup(item)
                } else {
                    if (item._id !== currentgroup._id) {
                        let data = { groupId: currentgroup._id, user: dataredux.phoneNumber, namegroup: currentgroup.name };
                        await handleuserleavegroup(data)
                        setcurrentgroup(item)
                    }
                }
                let listmessage = await handleGetAllMessagebyGroup(cplistfrient[objIndex]._id);
                listmessage.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                let closestData = listmessage[0];
                if (closestData && closestData.length > 0) {
                    cplistfrient[objIndex].current = closestData.content;
                }
            }
        }
        setlistfrient(cplistfrient)
        if (!mdup) {
            setTimeout(() => {
                setshowchat(true)
            }, 100);
        }
    }

    useEffect(() => {
        if (currentMessange === "private") {
            handleuserleavegroup({ groupId: currentgroup._id, user: dataredux.phoneNumber, namegroup: currentgroup.name })
        }
    }, [currentMessange])

    useEffect(() => {
        if (currentgroup) {
            handleuserjoingroup({ groupId: currentgroup._id, user: dataredux.phoneNumber, namegroup: currentgroup.name })
        }
    }, [currentgroup])



    return (
        <Grid className='home-container' container spacing={0} columns={12}>
            <Grid className='home-frient' item xs={12} sm={12} md={3} display={showchat ? "none" : { md: "block" }}>
                <HomeListFrient
                    dataredux={dataredux}
                    handleClick={handleClick}
                    listfrient={listfrient}
                    currentMessange={currentMessange}
                />
            </Grid>
            <Grid className='home-message' item xs={12} sm={12} md={9} display={showchat ? "block" : { sm: "none", md: "block", xs: "none" }}>
                {
                    listfrient && listfrient.length > 0
                        && (listfrient.findIndex(item => !_.isEmpty(item) && item.click === true) !== -1)
                        ?
                        <Message
                            listfrient={listfrient}
                            setshowchat={setshowchat}
                            currentMessange={currentMessange}

                        />
                        :
                        <></>
                }
            </Grid>
        </Grid>

    );
};

export default Home;