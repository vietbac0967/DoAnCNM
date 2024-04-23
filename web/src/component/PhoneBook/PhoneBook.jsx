import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import './PhoneBook.scss'
import HomeListFrient from '../Home/listfrient/HomeListFrient';
import { useDispatch, useSelector } from 'react-redux';
import { handleCusttomClient } from '../../socket/socket';
import ListAction from './listAction/ListAction';
import ListFrient from './directory/listfrient/ListFrient';
import ListGroup from './directory/listgroup/ListGroup';
import ListSendFrient from './directory/listsendfrient/ListSendFrient';
import _ from 'lodash';
import Message from '../Home/message/Message';

const PhoneBook = () => {

    // const defaultInput = [
    //     { id: 1, name: "listfrient", action: false },
    //     { id: 2, name: "listgroup", action: false },
    //     { id: 3, name: "sendfrient", action: false },
    // ]


    // const defaultcurrent = [
    //     { id: 1, name: "listfrient", action: true },
    //     { id: 2, name: "listgroup", action: false },
    //     { id: 3, name: "sendfrient", action: false },
    // ]

    // const [listaction, setlistaction] = useState(defaultcurrent)


    const theme = useTheme();
    const mdup = useMediaQuery(theme.breakpoints.up('md'))

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const [showchat, setshowchat] = useState(false)
    const [action, setaction] = useState({});
    const [user, setuser] = useState({})

    useEffect(() => {
        if (mdup) {
            setshowchat(false)
        }
    }, [mdup])


    useEffect(() => {
        if (dataredux) {
            handleCusttomClient({ customId: dataredux.phoneNumber })
        }
    }, [])

    return (
        <Grid className='home-container' container spacing={0} columns={12}>
            <Grid className='home-frient' item xs={12} sm={12} md={3} display={showchat ? "none" : { md: "block" }}>
                <ListAction
                    // listaction={listaction}
                    // setlistaction={setlistaction}
                    // defaultInput={defaultInput}
                    // handleClick={handleClick}
                    mdup={mdup}
                    dataredux={dataredux}
                    showchat={showchat}
                    setshowchat={setshowchat}
                    setaction={setaction}
                    action={action}
                    setuser={setuser}
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
                        />
                        :
                        action && !_.isEmpty(action)
                            ? action.id === +1 ?
                                <ListFrient
                                    setshowchat={setshowchat}
                                />
                                : action.id === +2 ?
                                    <ListGroup
                                        setshowchat={setshowchat}
                                    />
                                    : action.id === +3 ?
                                        <ListSendFrient
                                            setshowchat={setshowchat}
                                        />
                                        : <></>
                            : <></>
                }
            </Grid>
        </Grid>

    );
};

export default PhoneBook;