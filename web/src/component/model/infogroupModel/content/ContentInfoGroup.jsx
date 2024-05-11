import { Avatar, AvatarGroup, Box, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import './ContentInfoGroup.scss'
import { getInfoUser } from '../../../../service/UserService';
import threedots from '../../../../assets/threedot.png';
import { deleteGroup, leaveGroup } from '../../../../service/GroupService';
import { toast } from 'react-toastify';
import { fechUserToken } from '../../../../redux/UserSlice';
import _ from 'lodash';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { sendMessageGroup } from '../../../../service/MessageService';
import { handlesendAllInfo, handlesendinfoAll, handleuserleavegroup, handlsendmessangeingroup } from '../../../../socket/socket';

const ContentInfoGroup = (props) => {

    const { user, handleMessage, setupdateimg, handleCloseModel, setuser, setshowchat } = props;
    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)


    const [listmember, setlistmember] = useState([]);

    useEffect(() => {
        handleGetAllUserInfo()
    }, [])

    const handleGetAllUserInfo = async () => {
        let arr = [];
        if (user) {
            if(typeof user._id === "object"){
                if (user._id.members && user._id.members.length > 0) {
                    arr = [...user._id.members,user._id.author]
                        let members = await Promise.all(arr.map(async (item, index) => {
                            let res = await getInfoUser({ userId: item })
                            return res.DT;
                        }))
                        setlistmember(members)
                    }
            }else{
                if (user.members && user.members.length > 0) {
                    arr = [...user.members,user.author._id]
                        let members = await Promise.all(arr.map(async (item, index) => {
                            let res = await getInfoUser({ userId: item })
                            return res.DT;
                        }))
                        setlistmember(members)
                    }
            }
            
        }
    }


    const handleDeleteGroup = async () => {
        if (user) {
            if (typeof user._id === "object") {
                let res = await deleteGroup({ groupId: user._id._id })
                if (res && res.EC === 0) {
                    toast.success("Bạn đã giải tán nhóm")
                    dispatch(fechUserToken())
                    handleCloseModel()
                    setuser({})
                    setshowchat(false)
                    handlesendinfoAll({ arrmember: user.members })
                } else {
                    toast.error("Bạn không thể giải tán nhóm")
                }
            } else {
                let res = await deleteGroup({ groupId: user._id })
                if (res && res.EC === 0) {
                    toast.success("Bạn đã giải tán nhóm")
                    dispatch(fechUserToken())
                    handleCloseModel()
                    setuser({})
                    setshowchat(false)
                    handlesendinfoAll({ arrmember: user.members })
                } else {
                    toast.error("Bạn không thể giải tán nhóm")
                }
            }

        }
    }

    const handleLeaveGroup = async () => {
        if (user) {
            if (typeof user._id === "object") {
                let res = await leaveGroup({ groupId: user._id._id })
                if (res && res.EC === 0) {
                    toast.success("Bạn đã rời khỏi nhóm")
                    dispatch(fechUserToken())
                    handleCloseModel()
                    setuser({})
                    setshowchat(false)
                    let datasocket = { groupId: user._id._id, user: dataredux.phoneNumber, namegroup: user.name };
                    handleuserleavegroup(datasocket)
                    handlesendinfoAll({ arrmember: user.members })
                    let data = {
                        groupId: user._id._id,
                        content: `###-id-2-${dataredux && dataredux._id}`
                    }
                    let res = await sendMessageGroup(data)
                    if (res) {
                        if (res.EC === 0) {
                            handlsendmessangeingroup({ groupId: user._id._id })
                            handlesendAllInfo({
                                groupId: user._id._id,
                                type: "group"
                            })

                        }
                    }
                } else {
                    toast.error("Bạn không thể rời nhóm")
                }
            } else {
                let res = await leaveGroup({ groupId: user._id })
                if (res && res.EC === 0) {
                    toast.success("Bạn đã rời khỏi nhóm")
                    dispatch(fechUserToken())
                    handleCloseModel()
                    setuser({})
                    setshowchat(false)
                    handlesendinfoAll({ arrmember: user.members })
                    let datasocket = { groupId: user._id, user: dataredux.phoneNumber, namegroup: user.name };
                    handleuserleavegroup(datasocket)
                    let data = {
                        groupId: user._id,
                        content: `###-id-2-${dataredux && dataredux._id}`
                    }
                    let res = await sendMessageGroup(data)
                    if (res) {
                        if (res.EC === 0) {
                            handlsendmessangeingroup({ groupId: user._id })
                            handlesendAllInfo({
                                groupId: user._id,
                                type: "group"
                            })

                        }
                    }
                } else {
                    toast.error("Bạn không thể rời nhóm")
                }
            }

        }
    }


    return (
        <Box
            className="info-body"
        >
            <Scrollbars style={{ width: "100%", height: "100%" }}>
                <Box className="info-group">
                    <Box className="info-group-avt">
                        <Box className="info-group-avt-and-action">
                            <Avatar
                                sx={{ width: 80, height: 80 }}
                                alt="Remy Sharp"
                                className='info-group-avatar'
                                src={user && user.avatar}
                            />
                            <>
                                <IconButton className='info-group-action-avt'
                                    onClick={() => setupdateimg(1)}
                                >
                                    <CameraAltIcon />
                                </IconButton>
                            </>
                        </Box>


                        <span className='info-group-name'>
                            {user && user.name}
                        </span>

                        <Box className="info-group-custom">
                            <IconButton
                                onClick={() => setupdateimg(2)}

                            >
                                <DriveFileRenameOutlineIcon />
                            </IconButton>
                        </Box>

                    </Box>

                    <Box className="info-user-action">
                        <Button
                            variant='contained'
                            className='btn-send-message'
                            style={{
                                backgroundColor: "#b2ebf2",
                            }}
                            onClick={() => handleMessage()}
                        >
                            <span className='text-action-message'>
                                Nhắn tin
                            </span>
                        </Button>
                    </Box>

                </Box>
                <Box className="info-group-des">
                    <span className='info-group-des-title'>
                        Thành viên({listmember && listmember.length})
                    </span>
                    <Box className='info-group-des-gender'>
                        <AvatarGroup max={4}>
                            {listmember && listmember.length > 0 &&
                                listmember.slice(0, 3).map((member, index) => {
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
                            <IconButton
                                onClick={() => setupdateimg(3)}
                            >
                                <MoreHorizIcon />
                            </IconButton>
                        </AvatarGroup>
                    </Box>
                </Box>
                <Box className="info-action">
                    {
                        dataredux && user
                            ?
                            typeof user._id === "object"
                                ? dataredux._id === user._id.author
                                    ?
                                    <Box className="info-action-btn"
                                        sx={{
                                            color: "red"
                                        }}
                                        onClick={() => handleDeleteGroup()}
                                    >
                                        <DeleteIcon />
                                        <span className='info-action-text'
                                            style={{
                                                color: "red"
                                            }}
                                        >
                                            Giải tán nhóm
                                        </span>
                                    </Box>
                                    :
                                    <Box className="info-action-btn"
                                        sx={{
                                            color: "red"
                                        }}
                                        onClick={() => handleLeaveGroup()}
                                    >
                                        <DeleteIcon />
                                        <span className='info-action-text'
                                            style={{
                                                color: "red"
                                            }}
                                        >
                                            Rời khỏi nhóm
                                        </span>
                                    </Box>
                                : dataredux._id === user.author
                                    ?
                                    <Box className="info-action-btn"
                                        sx={{
                                            color: "red"
                                        }}
                                        onClick={() => handleDeleteGroup()}
                                    >
                                        <DeleteIcon />
                                        <span className='info-action-text'
                                            style={{
                                                color: "red"
                                            }}
                                        >
                                            Giải tán nhóm
                                        </span>
                                    </Box>
                                    :
                                    <Box className="info-action-btn"
                                        sx={{
                                            color: "red"
                                        }}
                                        onClick={() => handleLeaveGroup()}
                                    >
                                        <DeleteIcon />
                                        <span className='info-action-text'
                                            style={{
                                                color: "red"
                                            }}
                                        >
                                            Rời khỏi nhóm
                                        </span>
                                    </Box>
                            : <></>
                    }


                </Box>
            </Scrollbars>
        </Box>
    );
};

export default ContentInfoGroup;