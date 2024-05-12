import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material'
import './ListSendInvitation.scss'
import ChildSendInvitation from './child/ChildSendInvitation';
import { useDispatch, useSelector } from 'react-redux';
import { handlerefreshAccount } from '../../../../../socket/socket';
import { fechUserToken } from '../../../../../redux/UserSlice'
import Scrollbars from 'react-custom-scrollbars-2';

const ListSendInvitation = () => {

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
                Danh Sách Lời Mời
            </Box>
            <Box className="list-send-invitation-body">
                <Scrollbars style={{ width: "100%", height: "100%" }}>
                    <Grid container spacing={3} columns={12}>
                        {
                            dataredux && dataredux.friendRequests && dataredux.friendRequests.length > 0
                            && dataredux.friendRequests.map((item, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} key={`list-frient-${index}`}>
                                        <ChildSendInvitation
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
                </Scrollbars>
            </Box>
        </Box>
    );
};

export default ListSendInvitation;