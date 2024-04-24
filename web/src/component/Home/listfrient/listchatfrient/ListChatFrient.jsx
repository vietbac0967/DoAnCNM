import React from 'react';
import { Box, IconButton } from '@mui/material'
import './ListChatFrient.scss'
import ChatInfo from './child/ChatInfo';

const ListChatFrient = (props) => {

    const { dataredux, handleClick, listfrient, currentMessange } = props;


    return (
        <Box>
            {
                listfrient && listfrient.length > 0
                && listfrient.map((item, index) => {
                    return (
                        <Box key={`friend-${index}`}>
                            <Box className="chatfrient"
                                onClick={() => handleClick(item)}
                            >
                                <ChatInfo
                                    avatar={item.avatar}
                                    name={item.name}
                                    click={item.click}
                                    currentMessange={currentMessange}
                                    user={item}
                                />
                            </Box>
                        </Box>

                    )
                })
            }
        </Box>
    );
};

export default ListChatFrient;