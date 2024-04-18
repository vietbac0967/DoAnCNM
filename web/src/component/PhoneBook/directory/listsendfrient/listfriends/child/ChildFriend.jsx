import React from 'react';
import { Box, IconButton } from '@mui/material'
import './ChildFriend.scss'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { rejectRequestFriend } from '../../../../../../service/UserService';
import { handlesendtext } from '../../../../../../socket/socket';
import { fechUserToken } from '../../../../../../redux/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChildFriend = (props) => {

    const { avatar, name, phoneNumber, _id } = props;

    const dispatch = useDispatch();

    const handleRejectSendrequestfriend = async () => {
        let res = await rejectRequestFriend({ senderId: _id })
        if (res && res.EC === 0) {
            await dispatch(fechUserToken())
            handlesendtext({ receiver: phoneNumber })
        }
    }

    return (
        <Box className="child-send-invitation-container">
            <Box className="user-info">
                <Avatar
                    alt="Remy Sharp"
                    src={avatar}
                    sx={{ width: 50, height: 50 }}
                />
                <Box className="user-name">
                    {name}
                </Box>
            </Box>
            <Box className="user-action-friend">
                <Button className='btn-access' variant="contained"
                    onClick={() => handleRejectSendrequestfriend()}
                >Hủy lời mời</Button>
                {/* <Button className='btn-cancel' variant="outlined">Hủy</Button> */}
            </Box>
        </Box>
    );
};

export default ChildFriend;