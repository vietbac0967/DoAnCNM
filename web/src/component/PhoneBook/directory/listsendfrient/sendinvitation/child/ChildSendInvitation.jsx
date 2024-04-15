import React from 'react';
import { Box, IconButton } from '@mui/material'
import './ChildSendInvitation.scss'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { acceptRequestFrient } from '../../../../../../service/UserService';
import { handlesendtext } from '../../../../../../socket/socket';
import { fechUserToken } from '../../../../../../redux/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

const ChildSendInvitation = (props) => {

    const { avatar, name, phoneNumber, _id } = props;

    const dispatch = useDispatch();

    const handleacceptFrient = async () => {
        let res = await acceptRequestFrient({ senderId: _id })
        if (res && res.EC === 0) {
            await dispatch(fechUserToken())
            handlesendtext({ receiver: _id })
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
            <Box className="user-action">
                <Button className='btn-access' variant="contained"
                    onClick={() => handleacceptFrient()}
                >Xác Nhận</Button>
                <Button className='btn-cancel' variant="outlined">Hủy</Button>
            </Box>
        </Box>
    );
};

export default ChildSendInvitation;