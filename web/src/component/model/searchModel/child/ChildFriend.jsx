import { Avatar, Box } from '@mui/material';
import React from 'react';
import './ChildFriend.scss'

const ChildFriend = (props) => {

    const { user, handleClick } = props;

    const handleClickUser = async () => {
        await handleClick(user)
    }


    return (
        <Box className="child-friend-container"
            onClick={() => handleClickUser()}
        >
            <Box className="child-friend-avt">
                <Avatar
                    sx={{ width: 50, height: 50 }}
                    alt="Remy Sharp"
                    src={user && user.avatar}
                />
            </Box>
            <Box className="child-friend-name">
                <span className='text-name'>
                    {user && user.name}
                </span>
            </Box>
        </Box>
    );
};

export default ChildFriend;