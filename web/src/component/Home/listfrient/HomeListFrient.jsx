import React, { useEffect, useState } from 'react';
import './HomeListFrient.scss'
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material'
import Search from './search/Search';
import Divider from '@mui/material/Divider';
import ListChatFrient from './listchatfrient/ListChatFrient';
import SearchModel from '../../model/searchModel/SearchModel';
import { useDispatch, useSelector } from 'react-redux';
import { handlerefreshAllInfo, handlerefreshMessange, handlerefreshinfoAll, handleuserjoingroup, handleuserleavegroup } from '../../../socket/socket';
import { getConverstations } from '../../../service/ConverstationService';
import _ from 'lodash';
import Scrollbars from 'react-custom-scrollbars-2';

const HomeListFrient = (props) => {

    const { setshowchat, setuser, mdup, user } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    console.log("dataredux:::", dataredux)

    const [model, setmodel] = useState(false)
    const [search, setsearch] = useState("");

    const [listfrient, setlistfrient] = useState([]);

    const [currentMessange, setcurrentMessange] = useState("");
    const [currentgroup, setcurrentgroup] = useState({});

    const handleGetAllFriend = async () => {
        let res = await getConverstations();
        if (res && res.EC === 0) {
            res.DT.forEach((item) => {
                item.click = false;
            })
            setlistfrient(res.DT)
        }
    }

    useEffect(() => {
        handleGetAllFriend()
    }, [dataredux])

    useEffect(() => {
        handleGetAllFriend()
    }, [])

    const handleGeAllFriendUpdate = async () => {
        let cplistfrient = _.cloneDeep(listfrient);
        let res = await getConverstations();
        if (res && res.EC === 0) {
            let clickedItems = cplistfrient.filter(item => item.click);

            let newData = res.DT.map(item => {
                let newItem = _.cloneDeep(item);
                clickedItems.forEach(clickedItem => {
                    if (clickedItem.type === "private") {
                        if (clickedItem._id === item._id) {
                            newItem.click = true;
                        }
                    } else {
                        if (clickedItem._id._id === item._id._id) {
                            newItem.click = true;
                        }
                    }

                });
                return newItem;
            });

            setlistfrient(newData)
        }
    }


    useEffect(() => {
        handlerefreshAllInfo(async (data) => {
            if (data && data.type === "group") {
                if (dataredux && dataredux.groups.length > 0) {
                    let index = dataredux.groups.findIndex(item => item && item._id === data.groupId)
                    if (index !== -1) {
                        await handleGeAllFriendUpdate();
                    }
                }
            } else {
                if (dataredux && (dataredux._id === data.sender.userId || dataredux._id === data.receiver.userId)) {

                    await handleGeAllFriendUpdate();
                }
            }
        })

        handlerefreshinfoAll(async (data) => {
            if (data && data.arrmember && data.arrmember.length > 0) {
                if (dataredux) {
                    let check = data.arrmember.filter(item => item === dataredux._id)
                    if (check) {
                        handleGeAllFriendUpdate();
                    }
                }
            }
        })

    }, [dataredux])

    useEffect(() => {
        handlerefreshAllInfo(async (data) => {
            if (data && data.type === "group") {
                if (dataredux && dataredux.groups.length > 0) {
                    let index = dataredux.groups.findIndex(item => item && item._id === data.groupId)
                    if (index !== -1) {
                        await handleGeAllFriendUpdate();
                    }
                }
            } else {
                if (dataredux && (dataredux._id === data.sender.userId || dataredux._id === data.receiver.userId)) {
                    await handleGeAllFriendUpdate();
                }
            }
        })

        handlerefreshinfoAll(async (data) => {
            if (data && data.arrmember && data.arrmember.length > 0) {
                if (dataredux) {
                    let check = data.arrmember.filter(item => item === dataredux._id)
                    if (check) {
                        handleGeAllFriendUpdate();
                    }
                }
            }
        })

    }, [])

    const handleClick = async (item) => {
        let cplistfrient = _.cloneDeep(listfrient)
        cplistfrient.forEach((item) => {
            item.click = false;
        })
        let objIndex = cplistfrient.findIndex((items) => items._id === item._id);
        if (objIndex !== -1) {
            cplistfrient[objIndex].click = true;
            setuser(cplistfrient[objIndex])
            if (cplistfrient[objIndex].type === "private") {
                setcurrentMessange("private")
                if (currentgroup && !_.isEmpty(currentgroup._id)) {
                    if (item._id !== currentgroup._id._id) {
                        let data = { groupId: currentgroup._id._id, user: dataredux.phoneNumber, namegroup: currentgroup.name };
                        handleuserleavegroup(data)
                        setcurrentgroup({})
                    }
                }
            }
        }
        else {
            let objIndexgr = cplistfrient.findIndex((items) => items._id._id === item._id._id);
            if (objIndexgr !== -1) {
                cplistfrient[objIndexgr].click = true;
                setuser(cplistfrient[objIndexgr])
                if (cplistfrient[objIndexgr].type === "group") {
                    setcurrentgroup(item)
                    setcurrentMessange("group")
                    if (currentgroup && !_.isEmpty(currentgroup._id))
                        if (item._id._id !== currentgroup._id._id) {
                            let data = { groupId: currentgroup._id._id, user: dataredux.phoneNumber, namegroup: currentgroup.name };
                            handleuserleavegroup(data)
                            setcurrentgroup(item)
                        }
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
        if (!currentgroup) {
            return;
        } else {
            if (currentgroup && !_.isEmpty(currentgroup._id)) {
                handleuserjoingroup({
                    groupId: currentgroup._id._id, user: dataredux.phoneNumber, namegroup: currentgroup.name
                })
            }
        }

    }, [currentgroup])

    return (
        <Box className='listfrient-container'>
            <Paper component={Box} sx={{ height: "100%" }}>
                <Scrollbars style={{ width: "100%", height: "100%" }}>

                    <Box className="search-content">
                        <Search
                            model={model}
                            setmodel={setmodel}
                            setuser={setuser}
                            setsearch={setsearch}
                            search={search}
                        />
                    </Box>
                    <Divider orientation="horizontal" />
                    <Box className="list-frient-chat-info">
                        {
                            !model
                                ?
                                <ListChatFrient
                                    dataredux={dataredux}
                                    listfrient={listfrient}
                                    handleClick={handleClick}
                                    currentMessange={currentMessange}
                                />
                                :
                                <SearchModel
                                    dataredux={dataredux}
                                    handleClick={handleClick}
                                    search={search}
                                />

                        }
                    </Box>
                </Scrollbars>
            </Paper>

        </Box>
    );
};

export default HomeListFrient;