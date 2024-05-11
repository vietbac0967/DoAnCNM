import { Box, IconButton } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CancelIcon from '@mui/icons-material/Cancel';

const HeaderListMembers = (props) => {
    const { handleCloseModel, setupdateUser } = props;

    return (
        <Box className="info-header"
        >
            <IconButton
                onClick={() => setupdateUser(0)}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <span className='header-title'>
                Danh sách thành viên
            </span>
            <IconButton
                onClick={() => handleCloseModel()}
            >
                <CancelIcon />
            </IconButton>
        </Box>
    );
};

export default HeaderListMembers;