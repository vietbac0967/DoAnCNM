import { Box, IconButton, InputBase, MenuItem, Paper, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './SearchFriend.scss'
import SearchIcon from '@mui/icons-material/Search';

const SearchFriend = (props) => {

    const { value, setvalue, search, setsearch } = props;

    return (
        <Box className="search-friend-container">
            <Box className="search-friend-field">
                <Box
                    component="form"
                    className='search-body'
                >
                    <IconButton size='small' type="button" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        placeholder="Tìm kiếm"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                    />
                </Box>
            </Box>
            <Box className="search-friend-fill">
                <Select
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                    className='fill-select'
                >
                    <MenuItem
                        className='menu-item'
                        value={0}>Tên (A-Z)</MenuItem>
                    <MenuItem
                        className='menu-item'
                        value={1}>Tên (Z-A)</MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default SearchFriend;