import React, { useEffect, useState } from 'react';
import './ListAction.scss'
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material'
import Search from '../../Home/listfrient/search/Search';
import Divider from '@mui/material/Divider';
// import ListChatFrient from './listchatfrient/ListChatFrient';
import SearchModel from '../../model/searchModel/SearchModel';
import ChooseAction from './action/ChooseAction';
import _ from 'lodash';
import { getConverstations } from '../../../service/ConverstationService';

const ListAction = (props) => {

    const { mdup, dataredux, showchat, setshowchat, setaction, action, setuser } = props;

    const defaultInput = [
        { id: 1, name: "listfrient", action: false },
        { id: 2, name: "listgroup", action: false },
        { id: 3, name: "sendfrient", action: false },
    ]


    const defaultcurrent = [
        { id: 1, name: "listfrient", action: true },
        { id: 2, name: "listgroup", action: false },
        { id: 3, name: "sendfrient", action: false },
    ]

    const [listaction, setlistaction] = useState(defaultcurrent)

    const [model, setmodel] = useState(false)
    const [listfrient, setlistfrient] = useState([]);


    const handleClickaction = (id) => {
        let cplistaction = _.cloneDeep(defaultInput);
        let index = cplistaction.findIndex(item => +item.id === +id);
        if (index !== -1) {
            cplistaction[index].action = true;
            setaction(cplistaction[index])
        }

        setlistaction(cplistaction)
        if (!mdup) {
            setshowchat(true)
        }
    }

    const handleClick = async (item) => {
        let cplistfrient = _.cloneDeep(listfrient)
        cplistfrient.forEach((item) => {
            item.click = false;
        })
        let objIndex = cplistfrient.findIndex((items) => items._id === item._id);
        if (objIndex !== -1) {
            setuser(cplistfrient[objIndex])
            cplistfrient[objIndex].click = true;

        }
        else {
            let objIndexgr = cplistfrient.findIndex((items) => items._id._id === item._id._id);
            if (objIndexgr !== -1) {
                setuser(cplistfrient[objIndexgr])
                cplistfrient[objIndexgr].click = true;


            }
        }
        setlistfrient(cplistfrient)

        if (!mdup) {
            setTimeout(() => {
                setshowchat(true)
            }, 100);
        }
    }

    const handleGetAllFriend = async () => {
        let res = await getConverstations();
        if (res && res.EC === 0) {
            res.DT.forEach((item) => {
                item.click = false;
            })
            setlistfrient(res.DT)
        }
    }

    useEffect(() => {
        handleGetAllFriend()
    }, [dataredux])

    return (
        <Box className='listfrient-container'>
            <Paper component={Box} sx={{ height: "100%" }}>
                <Box className="search-content">
                    <Search
                        model={model}
                        setmodel={setmodel}
                        setuser={setuser}
                    />
                </Box>
                <Divider orientation="horizontal" />
                <Box className="list-frient-chat-info">

                    {
                        !model
                            ?
                            <ChooseAction
                                listaction={listaction}
                                setlistaction={setlistaction}
                                defaultInput={defaultInput}
                                handleClick={handleClickaction}
                            />
                            :
                            <SearchModel
                                dataredux={dataredux}
                                handleClick={handleClick}
                            />

                    }
                </Box>
            </Paper>

        </Box>
    );
};

export default ListAction;