import React, { useState } from 'react';
import './Action.scss'
import { Box, IconButton } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import _, { findIndex } from 'lodash';
import { useNavigate } from "react-router-dom";

const Action = () => {

    const navigate = useNavigate();


    const defaultlist = [
        { id: 1, name: "chat", action: false, path: "/" },
        { id: 2, name: "phoneBook", action: false, path: "/phonebook" },
        { id: 3, name: "listFrient", action: false, path: "/listfrient" },
        { id: 4, name: "setting", action: false, path: "/setting" },
    ]

    const defaultaction = [
        { id: 1, name: "chat", action: true, path: "/" },
        { id: 2, name: "phoneBook", action: false, path: "/phonebook" },
        { id: 3, name: "listFrient", action: false, path: "/listfrient" },
        { id: 4, name: "setting", action: false, path: "/setting" },
    ]

    const [listaction, setlistaction] = useState(defaultaction);

    const handleClick = (id) => {
        let cplistaction = _.cloneDeep(defaultlist);
        let index = cplistaction.findIndex(item => +item.id === +id);
        if (index !== -1) {
            cplistaction[index].action = true;
            navigate(cplistaction[index].path)
        }

        setlistaction(cplistaction)

    }

    return (
        <Box className='action-container'>
            <Paper component={Box} sx={{ height: "100%" }}>
                <Box className="action-body">
                    <IconButton color={listaction[0].action ? "primary" : "#ffffff"} size='large'
                        onClick={() => handleClick(1)}
                    >
                        <ChatIcon fontSize='inherit' color='#ffffff' />
                    </IconButton>
                    <IconButton color={listaction[1].action ? "primary" : "#ffffff"} size='large'
                        onClick={() => handleClick(2)}

                    >
                        <PermContactCalendarIcon fontSize='inherit' color='#ffffff' />
                    </IconButton>
                    <IconButton color={listaction[2].action ? "primary" : "#ffffff"} size='large'
                        onClick={() => handleClick(3)}
                    >
                        <GroupIcon fontSize='inherit' color='#ffffff' />
                    </IconButton>
                    <IconButton color={listaction[3].action ? "primary" : "#ffffff"} size='large'
                        onClick={() => handleClick(4)}
                    >
                        <SettingsIcon fontSize='inherit' color='#ffffff' />
                    </IconButton>
                </Box>
            </Paper>
        </Box>

    );
};

export default Action;