import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material'
import './ChooseAction.scss'
import PersonIcon from '@mui/icons-material/Person';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import _ from 'lodash';

const ChooseAction = (props) => {

    const { listaction, setlistaction, defaultInput } = props;

    const handleClick = (id) => {
        let cplistaction = _.cloneDeep(defaultInput);
        let index = cplistaction.findIndex(item => +item.id === +id);
        if (index !== -1) {
            cplistaction[index].action = true;
        }

        setlistaction(cplistaction)

    }

    return (
        <Box className="choose-action-container">
            <Box className={listaction[0].action ? "chat-info-container active" : "chat-info-container"}
                onClick={() => handleClick(1)}

            >
                <Box className="avt-info">
                    <PersonIcon color='#ffffff' fontSize='large' />
                </Box>
                <Box className="name-chat-info">
                    <Box className="name-info">
                        Danh Sách Bạn Bè
                    </Box>
                </Box>
            </Box>
            <Box className={listaction[1].action ? "chat-info-container active" : "chat-info-container"}
                onClick={() => handleClick(2)}

            >
                <Box className="avt-info">
                    <PeopleOutlineIcon color='#ffffff' fontSize='large' />
                </Box>
                <Box className="name-chat-info">
                    <Box className="name-info">
                        Danh Sách Nhóm
                    </Box>
                </Box>
            </Box>
            <Box className={listaction[2].action ? "chat-info-container active" : "chat-info-container"}
                onClick={() => handleClick(3)}

            >
                <Box className="avt-info">
                    <MarkAsUnreadIcon color='#ffffff' fontSize='large' />
                </Box>
                <Box className="name-chat-info">
                    <Box className="name-info">
                        Lời Mời Kết Bạn
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ChooseAction;