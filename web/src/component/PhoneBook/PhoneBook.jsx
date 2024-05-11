import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import './PhoneBook.scss'
import HomeListFrient from '../Home/listfrient/HomeListFrient';
import { useDispatch, useSelector } from 'react-redux';
import { handleCusttomClient, handleuserleavegroup } from '../../socket/socket';
import ListAction from './listAction/ListAction';
import ListFrient from './directory/listfrient/ListFrient';
import ListGroup from './directory/listgroup/ListGroup';
import ListSendFrient from './directory/listsendfrient/ListSendFrient';
import _ from 'lodash';
import Message from '../Home/message/Message';

const PhoneBook = (props) => {

    const { user, setuser } = props;

    const theme = useTheme();
    const mdup = useMediaQuery(theme.breakpoints.up('md'))

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const [showchat, setshowchat] = useState(false)
    const [action, setaction] = useState({});
    // const [user, setuser] = useState({})

    useEffect(() => {
        if (mdup) {
            setshowchat(false)
        }
    }, [mdup])


    useEffect(() => {
        if (dataredux) {
            handleCusttomClient({ customId: dataredux.phoneNumber })

            if (user) {
                if (user.type === "group") {
                    let data = { groupId: user._id._id, user: dataredux.phoneNumber, namegroup: user.name };
                    handleuserleavegroup(data)
                } else {
                    if (!user.phoneNumber) {
                        let data = { groupId: user._id, user: dataredux.phoneNumber, namegroup: user.name };
                        handleuserleavegroup(data)
                    }

                }
                setuser({})
            }
        }
    }, [])


    useEffect(() => {
        if (dataredux) {
            handleCusttomClient({ customId: dataredux.phoneNumber })
        }
    }, [dataredux])

    return (
        <Grid className='home-container' container spacing={0} columns={12}>
            <Grid className='home-frient' item xs={12} sm={12} md={3} display={showchat ? "none" : { md: "block" }}>
                <ListAction
                    mdup={mdup}
                    dataredux={dataredux}
                    showchat={showchat}
                    setshowchat={setshowchat}
                    setaction={setaction}
                    action={action}
                    setuser={setuser}
                    user={user}

                />
            </Grid>
            <Grid className='home-message' item xs={12} sm={12} md={9} display={showchat ? "block" : { sm: "none", md: "block", xs: "none" }}>
                {
                    user && !_.isEmpty(user)
                        ?
                        <Message
                            showchat={showchat}
                            setshowchat={setshowchat}
                            mdup={mdup}
                            users={user}
                            setusers={setuser}
                            dataredux={dataredux}
                        />
                        :
                        action && !_.isEmpty(action)
                            ? action.id === +1 ?
                                <ListFrient
                                    setshowchat={setshowchat}
                                    dataredux={dataredux}
                                    setuser={setuser}
                                    users={user}
                                />
                                : action.id === +2 ?
                                    <ListGroup
                                        setshowchat={setshowchat}
                                        dataredux={dataredux}
                                        setuser={setuser}
                                        users={user}
                                    />
                                    : action.id === +3 ?
                                        <ListSendFrient
                                            setshowchat={setshowchat}
                                            setuser={setuser}
                                            users={user}
                                            dataredux={dataredux}
                                        />
                                        : <></>
                            : <></>
                }
            </Grid>
        </Grid>

    );
};

export default PhoneBook;