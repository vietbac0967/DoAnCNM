import React from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import { Box, IconButton } from '@mui/material'
import './ListSendFrient.scss'
import ListSendInvitation from './sendinvitation/ListSendInvitation';

const ListSendFrient = () => {
    return (
        <Box className="list-send-frient-container">
            <HeaderDirectory
                className="list-send-frient-header"
                titleHeader={{ title: "Lời Mời Kết Bạn", icon: <MarkAsUnreadIcon fontSize='large' /> }}
            />
            <Box className="list-send-frient-body">
                <Box
                    className="list-send-frient-invitation"
                >
                    <ListSendInvitation />
                </Box>
                <Box
                    className="list-send-frient-send-invitation"
                ></Box>
            </Box>
        </Box>
    );
};

export default ListSendFrient;