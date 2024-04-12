import React, { useState } from 'react';
import './HomeListFrient.scss'
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material'
import Search from './search/Search';
import Divider from '@mui/material/Divider';
import ListChatFrient from './listchatfrient/ListChatFrient';
import SearchModel from '../../model/searchModel/SearchModel';
import { useDispatch, useSelector } from 'react-redux';

const HomeListFrient = (props) => {

    const [model, setmodel] = useState(false)


    const { dataredux, listfrient, handleClick } = props;


    return (
        <Box className='listfrient-container'>
            <Paper component={Box} sx={{ height: "100%" }}>
                <Box className="search-content">
                    <Search
                        model={model}
                        setmodel={setmodel}
                    />
                </Box>
                <Divider orientation="horizontal" />
                <Box className="list-frient-chat-info">
                    {
                        !model
                            ?
                            <ListChatFrient
                                dataredux={dataredux}
                                listfrient={listfrient}
                                handleClick={handleClick}
                            />
                            :
                            <SearchModel />

                    }
                </Box>
            </Paper>

        </Box>
    );
};

export default HomeListFrient;