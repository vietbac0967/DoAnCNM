import React, { useEffect } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import './HeaderDirectory.scss'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { handleuserleavegroup } from '../../../../socket/socket';

const HeaderDirectory = (props) => {

    const { titleHeader, setshowchat, users } = props;

    const theme = useTheme();
    const mdup = useMediaQuery(theme.breakpoints.up('md'))

    const handleCancel = () => {
        setshowchat(false)
    }

    return (
        <Box className="header-directory-container">
            <Paper
                component="form"
                className='header-body'
            >
                <Box
                    display={mdup ? "none" : "block"}
                    className="header-icon-goback"
                >
                    <IconButton
                        onClick={() => handleCancel()}
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                </Box>
                <Box
                    className="header-icon"
                >
                    {titleHeader.icon}
                </Box>
                <Box
                    className="header-title"
                >
                    {titleHeader.title}
                </Box>

                <Divider orientation="horizontal" />
            </Paper>
        </Box>
    );
};

export default HeaderDirectory;