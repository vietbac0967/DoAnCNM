import React from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import { Box, IconButton } from '@mui/material'
import './ListSendFrient.scss'
import ListSendInvitation from './sendinvitation/ListSendInvitation';
import ListFriend from './listfriends/ListFriend';

const ListSendFrient = (props) => {

    const { setshowchat } = props;


    return (
        <Box className="list-send-frient-container">
            <HeaderDirectory
                className="list-send-frient-header"
                titleHeader={{ title: "Lời Mời Kết Bạn", icon: <MarkAsUnreadIcon fontSize='large' /> }}
                setshowchat={setshowchat}
            />
            <Box className="list-send-frient-body">
                <Box
                    className="list-send-frient-invitation"
                >
                    <ListSendInvitation />
                </Box>
                <Box
                    className="list-send-frient-send-invitation"
                >
                    <ListFriend />

                </Box>
            </Box>
        </Box>
    );
};

export default ListSendFrient;