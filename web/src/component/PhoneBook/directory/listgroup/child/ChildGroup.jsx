import { Avatar, Box, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import './ChildGroup.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoModel from '../../../../model/infoModel/InfoModel';
import { handlesendAllInfo, handlesendinfoAll, handleuserjoingroup, handleuserleavegroup, handlsendmessangeingroup } from '../../../../../socket/socket';
import { deleteGroup, leaveGroup } from '../../../../../service/GroupService';
import { useDispatch } from 'react-redux';
import { fechUserToken } from '../../../../../redux/UserSlice';
import { sendMessageGroup } from '../../../../../service/MessageService';
import { toast } from 'react-toastify';

const ChildGroup = (props) => {

    const { user, setuser, dataredux, handleGetAllGroup } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleShowChatUser = () => {
        if (user) {
            handleuserjoingroup({
                groupId: user._id, user: dataredux.phoneNumber, namegroup: user.name
            })
            setuser(user)
        }
    }

    const handleCloseModel = () => {
        setopenmodel(false)
    }

    const handleDeleteGroup = async () => {
        if (user) {
            let res = await deleteGroup({ groupId: user._id })
            if (res && res.EC === 0) {
                toast.success("Bạn đã giải tán nhóm")
                dispatch(fechUserToken())
                if (typeof user._id === "object") {
                    handlesendinfoAll({ arrmember: user.members })

                } else {
                    let arrmember = user.members.map((item) => {
                        return item._id;
                    })
                    handlesendinfoAll({ arrmember: arrmember })
                }
                handleGetAllGroup()
            } else {
                toast.error("Bạn không thể giải tán nhóm")
            }
        }
    }


    const handleLeaveGroup = async () => {
        if (user) {
            let res = await leaveGroup({ groupId: user._id })
            if (res && res.EC === 0) {
                toast.success("Bạn đã rời khỏi nhóm")
                dispatch(fechUserToken())
                let datasocket = { groupId: user._id, user: dataredux.phoneNumber, namegroup: user.name };
                handleuserleavegroup(datasocket)
                if (typeof user._id === "object") {
                    handlesendinfoAll({ arrmember: user.members })

                } else {
                    let arrmember = user.members.map((item) => {
                        return item._id;
                    })
                    handlesendinfoAll({ arrmember: arrmember })
                }
                handleGetAllGroup()
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

    return (
        <Box className="child-group-container-1"
        >
            <Box className="child-group-info"
                onClick={() => handleShowChatUser()}
            >
                <Box className="child-group-avt">
                    <Avatar
                        sx={{ width: 50, height: 50 }}
                        alt="Remy Sharp"
                        src={user && user.avatar}
                    />
                </Box>
                <Box className="child-group-name">
                    <span className='child-group-name-text'>
                        {user && user.name}

                    </span>
                    <span className='child-group-member-text'>
                        {user && user.members && user.members.length} thành viên
                    </span>
                </Box>
            </Box>
            <Box className="child-group-action">
                <IconButton
                    onMouseDown={(e) => handleClick(e)}
                >
                    <MoreHorizIcon />
                </IconButton>
            </Box>

            <Menu
                id="basic-button"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                anchorEl={anchorEl}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {
                    dataredux && user && user.author
                        && dataredux._id === user.author._id
                        ?
                        <MenuItem
                            onClick={() => handleDeleteGroup()}
                        >
                            <span style={{ color: "red" }}>
                                Giải tán cộng đồng
                            </span>
                        </MenuItem>
                        :
                        <MenuItem
                            onClick={() => handleLeaveGroup()}
                        >
                            <span style={{ color: "red" }}>
                                Rời cộng đồng
                            </span>
                        </MenuItem>
                }
            </Menu>
        </Box>
    );
};

export default ChildGroup;