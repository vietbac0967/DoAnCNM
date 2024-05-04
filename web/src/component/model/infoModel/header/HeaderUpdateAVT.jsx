import { Box, IconButton } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CancelIcon from '@mui/icons-material/Cancel';

const HeaderUpdateAVT = (props) => {
    const { handleCloseModel, setupdateimg } = props;

    return (
        <Box className="info-header"
        >
            <IconButton
                onClick={() => setupdateimg(0)}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <span className='header-title'>
                Cập nhật ảnh đại diện
            </span>
            <IconButton
                onClick={() => handleCloseModel()}
            >
                <CancelIcon />
            </IconButton>
        </Box>
    );
};

export default HeaderUpdateAVT;