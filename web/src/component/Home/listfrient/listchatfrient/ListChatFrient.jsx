import React from 'react';
import { Box, IconButton } from '@mui/material'
import './ListChatFrient.scss'
import ChatInfo from './child/ChatInfo';

const ListChatFrient = (props) => {

    const { dataredux, handleClick, listfrient } = props;


    return (
        <Box>
            {
                dataredux && dataredux.friends && dataredux.friends.length > 0
                && dataredux.friends.map((item, index) => {
                    return (
                        <Box className={
                            listfrient && listfrient.length > 0
                                && (listfrient.findIndex(items => items.click === true) !== -1)
                                ? "chatfrient active" : "chatfrient"
                        } key={`friend-${index}`}
                            onClick={() => handleClick(item)}
                        >
                            <ChatInfo
                                avatar={item.avatar}
                                name={item.name}
                            />
                        </Box>
                    )
                })
            }
        </Box>
    );
};

export default ListChatFrient;