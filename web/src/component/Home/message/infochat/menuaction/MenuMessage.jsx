import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { deleteMessage, getAllMessage, recallMessage } from '../../../../../service/MessageService';
import { useDispatch, useSelector } from 'react-redux';
import { handlsendmessange, handlsendmessangeingroup } from '../../../../../socket/socket';
import { Box } from '@mui/material';

const MenuMessage = (props) => {
    const { open, handleClose, anchorEl, item, handleGetAllMessage, user, handleGetAllMessageinGroup } = props;
    const [userinfo, setuserinfo] = useState({});

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const handledelteMessage = async () => {
        let res = await deleteMessage({ messageId: item._id })
        if (res && res.EC === 0) {
            if (userinfo && userinfo.phoneNumber) {
                await handleGetAllMessage({ userId: userinfo._id })
            } else {
                await handleGetAllMessageinGroup({ groupId: userinfo._id })
            }
        }
    }

    useEffect(() => {
        if (user && user.length > 0)
            setuserinfo(user[0])
    }, [user])

    const handlerecallMessage = async () => {
        let res = await recallMessage({ messageId: item._id })
        if (res && res.EC === 0) {
            // await handleGetAllMessage({ userId: userinfo._id })
            if (userinfo && userinfo.phoneNumber) {
                handlsendmessange({
                    sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                    , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id }
                })
            } else {
                handlsendmessangeingroup({ groupId: userinfo._id })
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
                <span style={{ display: 'flex', justifyContent: "center", color: "red" }}
                    onClick={() => handledelteMessage()}
                >
                    <DeleteOutlineIcon /> Xóa chỉ ở phía tôi
                </span>
            </MenuItem>
            {
                item && item.senderId && item.senderId._id !== dataredux._id
                    ?
                    <Box></Box>
                    :
                    <MenuItem onClick={handleClose}>
                        <span style={{ display: 'flex', justifyContent: "center", color: "blue" }}
                            onClick={() => handlerecallMessage()}

                        >
                            <RestartAltIcon /> Thu hồi tin nhắn
                        </span>
                    </MenuItem>
            }

        </Menu>
    );
};

export default MenuMessage;