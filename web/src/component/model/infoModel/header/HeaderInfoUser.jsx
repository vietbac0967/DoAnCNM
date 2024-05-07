import { Box, IconButton } from '@mui/material';
import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import './HeaderInfoUser.scss'

const HeaderInfoUser = (props) => {

    const { handleCloseModel } = props;

    return (
        <Box className="info-header"
        >
            <span className='header-title'>
                Thông tin tài khoản
            </span>
            <IconButton
                onClick={() => handleCloseModel()}
            >
                <CancelIcon />
            </IconButton>
        </Box>
    );
};

export default HeaderInfoUser;