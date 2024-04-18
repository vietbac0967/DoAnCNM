import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handlerefreshAccount } from '../../../../../socket/socket';
import { fechUserToken } from '../../../../../redux/UserSlice';
import { Box, Grid } from '@mui/material';
import ChildFriend from './child/ChildFriend';

const ListFriend = () => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    useEffect(() => {
        handlerefreshAccount(() => {
            dispatch(fechUserToken())
        })
    }, [])

    return (
        <Box className="list-send-invitation-container">
            <Box className="list-send-invitation-title">
                Danh Sách Gửi Kết Bạn
            </Box>
            <Box className="list-send-invitation-body">
                <Grid container spacing={3} columns={12}>
                    {
                        dataredux && dataredux.sentFriendRequests && dataredux.sentFriendRequests.length > 0
                        && dataredux.sentFriendRequests.map((item, index) => {
                            return (
                                <Grid item xs={6} sm={6} md={4} key={`list-frient-${index}`}>
                                    <ChildFriend
                                        avatar={item.avatar}
                                        name={item.name}
                                        phoneNumber={item.phoneNumber}
                                        _id={item._id}
                                    />
                                </Grid>
                            )
                        })
                    }


                </Grid>
            </Box>
        </Box>
    );
};

export default ListFriend;