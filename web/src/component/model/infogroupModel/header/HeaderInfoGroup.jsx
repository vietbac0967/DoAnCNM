import { Box, IconButton } from '@mui/material';
import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import './HeaderInfoGroup.scss'

const HeaderInfoGroup = (props) => {

    const { handleCloseModel } = props;

    return (
        <Box className="info-header-group"
        >
            <span className='header-title-group'>
                Thông tin cộng đồng
            </span>
            <IconButton
                onClick={() => handleCloseModel()}
            >
                <CancelIcon />
            </IconButton>
        </Box>
    );
};

export default HeaderInfoGroup;