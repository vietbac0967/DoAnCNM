import React from 'react';
import './Header.scss'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';

const Header = () => {

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)


    return (
        <Box className='header-container'>
            <Box className="header-body">
                <Box className="header-info-user">
                    <Box className="avt-user">
                        <Avatar alt="Remy Sharp" src={dataredux.avatar} />
                    </Box>
                    <Box className="name-user">
                        <h3>{dataredux.name}</h3>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;