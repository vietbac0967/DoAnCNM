import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import Box from '@mui/material/Box'
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import { Stack } from '@mui/material';
import styled from '@emotion/styled';


function SideBar() {
    const isSelected = useState(false);
    const handleChatButtonClick = () => {
        console.log('Chat button clicked');
    };
    const handleContactPhoneButtonClick = () => {
        console.log('Chat button clicked');
    };
    const handlePeopleIconButtonClick = () => {
        console.log('Chat button clicked');
    };
    const handleSettingsIconButtonClick = () => {
        console.log('Chat button clicked');
    };
    const CustomIconButton = styled(IconButton)({
        '&:hover': {
            backgroundColor: 'transparent', // Loại bỏ màu nền khi hover
        },
    });
    return (
        <Stack
            height={'100%'}
            flex={1}
            justifyContent={'start'}
            bgcolor={''}>
            <CustomIconButton size="large" onClick={handleChatButtonClick} aria-label="delete">
                <ChatIcon />
            </CustomIconButton>
            <CustomIconButton onClick={handleContactPhoneButtonClick} size="large" aria-label="white">
                <ContactPageIcon />
            </CustomIconButton>
            <CustomIconButton onClick={handlePeopleIconButtonClick} size="large" color="white" aria-label="">
                <PeopleIcon />
            </CustomIconButton>
            <CustomIconButton onClick={handleSettingsIconButtonClick} size="large" color="white" aria-label="">
                <SettingsIcon />
            </CustomIconButton>
        </Stack>
    );
}

export default SideBar;
