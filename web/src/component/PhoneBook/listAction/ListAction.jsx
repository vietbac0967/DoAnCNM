import React, { useState } from 'react';
import './ListAction.scss'
import Paper from '@mui/material/Paper';
import { Box, IconButton } from '@mui/material'
import Search from '../../Home/listfrient/search/Search';
import Divider from '@mui/material/Divider';
// import ListChatFrient from './listchatfrient/ListChatFrient';
import SearchModel from '../../model/searchModel/SearchModel';
import ChooseAction from './action/ChooseAction';


const ListAction = (props) => {

    const { listaction, setlistaction, defaultInput, handleClick } = props


    const [model, setmodel] = useState(false)


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
                            <ChooseAction
                                listaction={listaction}
                                setlistaction={setlistaction}
                                defaultInput={defaultInput}
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

export default ListAction;