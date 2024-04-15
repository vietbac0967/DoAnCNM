import React, { useEffect, useState } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material'
import './Home.scss'
import HomeListFrient from './listfrient/HomeListFrient';
import Message from './message/Message'
import { useDispatch, useSelector } from 'react-redux';
import { handleCusttomClient, handlerefreshAccount } from '../../socket/socket';
import { fechUserToken } from '../../redux/UserSlice';
import _ from 'lodash';
import { getAllMessage } from '../../service/MessageService';

const Home = () => {

    const theme = useTheme();
    const mdup = useMediaQuery(theme.breakpoints.up('md'))

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const [listfrient, setlistfrient] = useState([]);

    const handleGetAllMessage = async (receiverId) => {
        let res = await getAllMessage({ receiverId: receiverId })
        if (res && res.EC === 0)
            return res.DT

    }

    const [showchat, setshowchat] = useState(false)

    useEffect(() => {
        if (mdup) {
            setshowchat(false)
        }
    }, [mdup])


    useEffect(() => {
        if (dataredux) {
            handleCusttomClient({ customId: dataredux.phoneNumber })

            handlerefreshAccount(dispatch(fechUserToken()))
        }
    }, [])

    // useEffect(() => {
    //     handlerefreshAccount(dispatch(fechUserToken()))
    // }, [dataredux.friends])

    const handleClick = async (item) => {
        if (dataredux && dataredux.friends && dataredux.friends.length > 0) {
            let cplistfrient = _.cloneDeep(dataredux.friends)
            cplistfrient.forEach((item) => {
                item.click = false;
            })

            let objIndex = cplistfrient.findIndex((items) => items._id === item._id);
            if (objIndex !== -1) {
                cplistfrient[objIndex].click = true;
                let listmessage = await handleGetAllMessage(cplistfrient[objIndex]._id);
                listmessage.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                let closestData = listmessage[0];
                console.log(closestData)
                if (closestData && closestData.length > 0) {
                    cplistfrient[objIndex].current = closestData.content;
                }

            }
            setlistfrient(cplistfrient)
        }
    }


    return (
        <Grid className='home-container' container spacing={0} columns={12}>
            <Grid className='home-frient' item xs={12} sm={12} md={3} display={showchat ? "none" : { md: "block" }}>
                <HomeListFrient
                    dataredux={dataredux}
                    handleClick={handleClick}
                    listfrient={listfrient}
                />
            </Grid>
            <Grid className='home-message' item xs={12} sm={12} md={9} display={showchat ? "block" : { sm: "none", md: "block", xs: "none" }}>
                {
                    listfrient && listfrient.length > 0
                        && (listfrient.findIndex(item => item.click === true) !== -1)
                        ?
                        <Message
                            listfrient={listfrient}
                        />
                        :
                        <></>
                }
            </Grid>
        </Grid>

    );
};

export default Home;