import React from 'react';
import { Box, IconButton } from '@mui/material'
import './HeaderDirectory.scss'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

const HeaderDirectory = (props) => {

    const { titleHeader } = props;

    return (
        <Box className="header-directory-container">
            <Paper
                component="form"
                className='header-body'
            >
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