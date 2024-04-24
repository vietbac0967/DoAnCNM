import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { acceptRequestFrient, deleteFriend, rejectRequestFriend, sendRequestFrient } from '../../../../service/UserService';
import { handlesendtext } from '../../../../socket/socket';
import _ from 'lodash';
import { fechUserToken } from '../../../../redux/UserSlice';

const ChildAddFrient = (props) => {

    const { user, setuser } = props

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)


    const [accept, setaccept] = useState(0)

    const handleAddFrient = async () => {
        let res = await sendRequestFrient({
            receiver: user._id
        })
        if (res && res.EC === 0) {
            setaccept(2)
            await dispatch(fechUserToken())
            handlesendtext({ receiver: user.phoneNumber })
        }

    }

    const handleuseraddfrient = () => {
        if (user && !_.isEmpty(user)) {
            if (dataredux && dataredux.friendRequests && dataredux.friendRequests.length > 0) {
                let index = dataredux.friendRequests.findIndex(item => item.phoneNumber === user.phoneNumber)
                if (index !== -1) {
                    setaccept(1)
                }
            } else
                if (dataredux && dataredux.sentFriendRequests && dataredux.sentFriendRequests.length > 0) {
                    let index = dataredux.sentFriendRequests.findIndex(item => item.phoneNumber === user.phoneNumber)
                    if (index !== -1) {
                        setaccept(2)
                    }
                }
                else
                    if (dataredux && dataredux.friends && dataredux.friends.length > 0) {
                        let index = dataredux.friends.findIndex(item => item.phoneNumber === user.phoneNumber)
                        if (index !== -1) {
                            setaccept(3)
                        }
                    }
        } else {
            setaccept(0)
        }

    }

    useEffect(() => {
        handleuseraddfrient()
    }, [user])

    useEffect(() => {
        dispatch(fechUserToken())
        handleuseraddfrient()
    }, [])

    const handleacceptAddFrient = async () => {
        let res = await acceptRequestFrient({ senderId: user._id })
        if (res && res.EC === 0) {
            setaccept(2)
            await dispatch(fechUserToken())
            handlesendtext({ receiver: user.phoneNumber })
        }
    }

    const handleRejectSendrequestfriend = async () => {
        let res = await rejectRequestFreind({ senderId: user._id })
        if (res && res.EC === 0) {
            setaccept(0)
            await dispatch(fechUserToken())
            handlesendtext({ receiver: user.phoneNumber })
        }
    }

    const handledeleteFriend = async () => {
        let res = await deleteFriend({ friendId: user._id })
        if (res && res.EC === 0) {
            setaccept(0)
            await dispatch(fechUserToken())
            handlesendtext({ receiver: user.phoneNumber })
        }
    }

    return (
        <Stack sx={{ flexDirection: 'row', position: 'relative' }}>
            <Avatar alt="Remy Sharp" src={user && user.avatar} />
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
                        accept === 0 ?
                            (
                                <Button
                                    variant="outlined"
                                    sx={{ position: 'absolute', right: 10, top: 10, }}
                                    onClick={() => handleAddFrient()}
                                >Thêm bạn</Button>

                            )

                            : accept === 1 ?
                                (
                                    <Button
                                        variant="outlined"
                                        sx={{ position: 'absolute', right: 10, top: 10, }}
                                        onClick={() => handleacceptAddFrient()}
                                    >Đồng ý</Button>
                                )
                                : accept === 2 ?
                                    <Button
                                        variant="outlined"
                                        sx={{ position: 'absolute', right: 10, top: 10, }}
                                        onClick={() => handleRejectSendrequestfriend()}
                                    >Hủy lời mời</Button>
                                    :
                                    <Button
                                        variant="outlined"
                                        sx={{ position: 'absolute', right: 10, top: 10, }}
                                        onClick={() => handledeleteFriend()}
                                    >Xóa bạn</Button>

                    )
                    : <></>
            }

        </Stack>
    );
};

export default ChildAddFrient;