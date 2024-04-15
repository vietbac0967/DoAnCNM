import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { sendRequestFrient } from '../../../../service/UserService';
import { handlesendtext } from '../../../../socket/socket';

const ChildAddFrient = (props) => {

    const { user, setuser } = props

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)


    const [accept, setaccept] = useState(false)

    const handleAddFrient = async () => {
        let res = await sendRequestFrient({
            receiver: user._id
        })
        if (res && res.EC === 0) {
            setaccept(true)
            handlesendtext({ receiver: user._id })
        }

    }


    useEffect(() => {
        let index = dataredux
            && dataredux.sentFriendRequests && dataredux.sentFriendRequests.length > 0
            && dataredux.sentFriendRequests.findIndex(item => item === user._id);
        // if (index !== -1) {
        //     setaccept(true)
        // } else {
        //     setaccept(false)
        // }
    }, [user])

    return (
        <Stack sx={{ flexDirection: 'row', position: 'relative' }}>
            <Avatar alt="Remy Sharp" />
            <Box>
                <Typography variant="h6" sx={{ fontSize: 14 }} >
                    {user && user.name}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: 12, fontWeight: 'normal' }} >
                    {user && user.phoneNumber}
                </Typography>
            </Box>
            {
                dataredux.phoneNumber !== user.phoneNumber
                    ?
                    (
                        accept ?
                            <Button
                                variant="outlined"
                                sx={{ position: 'absolute', right: 10, top: 10, }}
                                onClick={() => handleCancelinvatation()}
                            >Hủy lời mời</Button>
                            :
                            <Button
                                variant="outlined"
                                sx={{ position: 'absolute', right: 10, top: 10, }}
                                onClick={() => handleAddFrient()}
                            >Thêm bạn</Button>
                    )
                    : <></>
            }

        </Stack>
    );
};

export default ChildAddFrient;