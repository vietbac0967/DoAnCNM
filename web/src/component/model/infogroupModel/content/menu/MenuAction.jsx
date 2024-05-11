import { Menu, MenuItem } from '@mui/material';
import React from 'react';
import { deleteMemeberFromGroup, updateDeputyLeader } from '../../../../../service/GroupService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fechUserToken } from '../../../../../redux/UserSlice';
import { sendMessageGroup } from '../../../../../service/MessageService';
import { handlesendAllInfo, handlesendinfoAll, handlsendmessangeingroup } from '../../../../../socket/socket';

const MenuAction = (props) => {

    const { open, handleClose, anchorEl, user, item, setuser } = props;
    const dispatch = useDispatch();

    const handleadddeputy = async () => {
        if (user && item) {
            if (typeof user._id === 'object') {
                let res = await updateDeputyLeader({
                    groupId: user._id._id,
                    userId: item._id
                })
                if (res && res.EC === 0) {
                    toast.success("Bạn đã thêm mới phó nhóm")
                    dispatch(fechUserToken())
                    let data = {
                        groupId: user._id._id,
                        content: `###-id-1-${item._id}`
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
                    toast.success("Thêm mới phó nhóm thất bại")
                }
            } else {
                let res = await updateDeputyLeader({
                    groupId: user._id,
                    userId: item._id
                })
                if (res && res.EC === 0) {
                    toast.success("Bạn đã thêm mới phó nhóm")
                    dispatch(fechUserToken())
                    let data = {
                        groupId: user._id,
                        content: `###-id-1-${item._id}`
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
                    toast.success("Thêm mới phó nhóm thất bại")
                }
            }
        }

    }

    const handleDeleteMemeber = async () => {
        if (user && item) {
            if (typeof user._id === 'object') {
                let res = await deleteMemeberFromGroup({
                    groupId: user._id._id,
                    userId: item._id
                })
                if (res && res.EC === 0) {
                    toast.success("Bạn đã xóa thành viên khỏi nhóm")
                    dispatch(fechUserToken())
                    let arr = [];
                    arr.push(item.id)
                    handlesendinfoAll({ arrmember: arr })
                    let data = {
                        groupId: user._id._id,
                        content: `###-id-4-${item._id}`
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
                    toast.success("xóa thành viên thất bại")
                }
            } else {
                let res = await deleteMemeberFromGroup({
                    groupId: user._id,
                    userId: item._id
                })
                if (res && res.EC === 0) {
                    toast.success("Bạn đã xóa thành viên khỏi nhóm")
                    dispatch(fechUserToken())
                    let arr = [];
                    arr.push(item.id)
                    handlesendinfoAll({ arrmember: arr })
                    let data = {
                        groupId: user._id,
                        content: `###-id-4-${item._id}`
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
                    toast.success("xóa thành viên thất bại")
                }
            }
        }
    }


    return (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                {
                    user && typeof user._id === "object"
                        ? user._id.deputyLeader && user._id.deputyLeader === item._id
                            ?
                            <span
                                onClick={() => handleadddeputy()}
                            >
                                Xóa phó nhóm
                            </span> :
                            <span
                                onClick={() => handleadddeputy()}
                            >
                                Thêm phó nhóm
                            </span>
                        :
                        user.deputyLeader && user.deputyLeader === item._id
                            ?
                            <span
                                onClick={() => handleadddeputy()}
                            >
                                Xóa phó nhóm
                            </span>
                            :
                            <span
                                onClick={() => handleadddeputy()}
                            >
                                Thêm phó nhóm
                            </span>

                }

            </MenuItem>
            <MenuItem onClick={handleClose}>
                <span
                    onClick={() => handleDeleteMemeber()}
                >
                    Xóa khỏi nhóm
                </span>
            </MenuItem>
        </Menu>
    );
};

export default MenuAction;