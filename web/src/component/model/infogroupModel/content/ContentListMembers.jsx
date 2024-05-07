import React, { useEffect, useState } from 'react';
import './ContentListMembers.scss'
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars-2';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { getInfoUser } from '../../../../service/UserService';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';
import InfoModel from '../../infoModel/InfoModel';
import MenuAction from './menu/MenuAction';
import ModelGroup from './model/ModuleGroup'
import { getUserForGroup } from '../../../../service/GroupService';

const ContentListMembers = (props) => {

    const { user, handleCloseModel, handleShowChatUser, setuser } = props;

    const [listmember, setlistmember] = useState([]);
    const [open, setopen] = useState(false);
    const [chooseuser, setchooseuser] = useState({});
    const [openmodelgroup, setopenmodelgroup] = useState(false);

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const [anchorEl, setAnchorEl] = useState(null);

    const openmenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        handleGetAllUserInfo()
    }, [])

    useEffect(() => {
        handleGetAllUserInfo()
    }, [dataredux])

    // console.log("check user user", user)

    const handleGetAllUserInfo = async () => {
        if (user) {
            if (typeof user._id === "object") {
                let res = await getUserForGroup(user._id._id)
                if (res && res.EC === 0) {
                    setlistmember(res.DT)
                }
            } else {
                let res = await getUserForGroup(user._id)
                if (res && res.EC === 0) {
                    setlistmember(res.DT)
                }
            }
        }
        // if (user) {
        //     if (user.members && user.members.length > 0) {
        //         let members = await Promise.all(user.members.map(async (item, index) => {
        //             let res = await getInfoUser({ userId: item })
        //             return res.DT;
        //         }))
        //         setlistmember(members)
        //     }
        // }
    }

    // console.log("check list member", listmember)

    const handleClickShow = (item) => {
        setchooseuser(item)
    }

    const handleAction = (e) => {
        handleClick(e)
    }

    const handleCloseModelGroup = () => {
        setopenmodelgroup(false)
    }

    return (
        <Box className="list-member-container">
            <Box className="list-member-add">
                <Button variant='contained'
                    className='btn-add-member'
                    onClick={() => setopenmodelgroup(true)}
                >
                    <GroupAddIcon />
                    Thêm thành viên
                </Button>
            </Box>
            <Box className="list-member-show">
                <span className='text-list-member'>
                    Danh sách thành viên({listmember && listmember.length})
                </span>
                <Scrollbars style={{ width: "100%", height: "100%" }}>
                    <Box className="list-member-show-all">
                        {
                            listmember && listmember.length > 0
                            && listmember.map((item, index) => {
                                return (
                                    <Box className="member-show-all"
                                        key={`member-show-index-${index}`}
                                        onClick={() => handleClickShow(item)}
                                    >
                                        <Box className="info-user-member"
                                            onClick={() => setopen(true)}
                                        >
                                            <Box className="info-user-member-avt">
                                                <Avatar
                                                    sx={{ width: 50, height: 50 }}
                                                    alt="Remy Sharp"
                                                    src={item && item.avatar}
                                                />
                                            </Box>
                                            <Box className="info-user-member-continue">
                                                <span className='text-name-user-info'>
                                                    {
                                                        dataredux && item
                                                            && dataredux._id === item._id
                                                            ?
                                                            <>
                                                                Bạn
                                                            </>
                                                            :
                                                            <>
                                                                {item && item.name}
                                                            </>
                                                    }
                                                </span>
                                                <span className='text-name-user-permission'>
                                                    {
                                                        user && item
                                                            && typeof user._id === "object"
                                                            ?
                                                            user._id.author === item._id
                                                                ?
                                                                <>
                                                                    Trưởng nhóm
                                                                </>
                                                                : user._id.deputyLeader &&
                                                                    user._id.deputyLeader === item._id
                                                                    ?
                                                                    <>
                                                                        Phó nhóm
                                                                    </>
                                                                    :
                                                                    <></>
                                                            : user.author && typeof user.author === "object"
                                                                ? user.author._id === item._id
                                                                    ?
                                                                    <>
                                                                        Trưởng nhóm
                                                                    </>
                                                                    :
                                                                    user.deputyLeader &&
                                                                        user.deputyLeader === item._id
                                                                        ?
                                                                        <>
                                                                            Phó nhóm
                                                                        </>
                                                                        :
                                                                        <></>
                                                                : user.author === item._id
                                                                    ?
                                                                    <>
                                                                        Trưởng nhóm
                                                                    </>
                                                                    :
                                                                    user.deputyLeader &&
                                                                        user.deputyLeader === item._id
                                                                        ?
                                                                        <>
                                                                            Phó nhóm
                                                                        </>
                                                                        :
                                                                        <></>
                                                    }
                                                </span>
                                            </Box>
                                        </Box>
                                        <Box className="user-info-action">
                                            {
                                                dataredux && item
                                                    && dataredux._id === item._id
                                                    ?
                                                    <>
                                                    </>
                                                    : user && item
                                                        && typeof user._id === "object"
                                                        ?
                                                        user._id.author === dataredux._id
                                                            ?
                                                            <IconButton
                                                                onClick={(e) => handleAction(e)}
                                                            >
                                                                <MoreHorizIcon />
                                                            </IconButton>
                                                            :
                                                            <></>
                                                        : user.author && typeof user.author === "object"
                                                            ? user.author._id === dataredux._id
                                                                ?
                                                                <IconButton
                                                                    onClick={(e) => handleAction(e)}
                                                                >
                                                                    <MoreHorizIcon />
                                                                </IconButton>
                                                                :
                                                                <></>
                                                            :

                                                            user.author === dataredux._id
                                                                ?
                                                                <IconButton
                                                                    onClick={(e) => handleAction(e)}
                                                                >
                                                                    <MoreHorizIcon />
                                                                </IconButton>
                                                                :
                                                                <></>

                                            }

                                        </Box>
                                    </Box>
                                )
                            })
                        }

                    </Box>

                </Scrollbars>
            </Box>
            <InfoModel
                open={open}
                user={chooseuser}
                handleCloseModel={handleCloseModel}
                handleShowChatUser={handleShowChatUser}
            />
            <MenuAction
                open={openmenu}
                anchorEl={anchorEl}
                handleClose={handleClose}
                item={chooseuser}
                user={user}
                setuser={setuser}
            />
            <ModelGroup
                open={openmodelgroup}
                handleClose={handleCloseModelGroup}
                group={user}
                handleGetAllUserInfo={handleGetAllUserInfo}
            />
        </Box>
    );
};

export default ContentListMembers;