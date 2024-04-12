import React, { useState } from 'react';
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './Search.scss'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import ModelAddFrient from '../../model/ModelAddFrient'

const Search = (props) => {

    const { model, setmodel } = props;

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Box className="search-container">
            <Paper
                component="form"
                className='search-body'
            >
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Tìm kiếm"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onClick={() => setmodel(true)}
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                {
                    !model
                        ?
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
                            onClick={() => handleOpen()}
                        >
                            <PersonAddAltIcon />
                        </IconButton>
                        :
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
                            onClick={() => setmodel(false)}
                        >
                            <CancelIcon />
                        </IconButton>
                }

            </Paper>
            <ModelAddFrient
                handleClose={handleClose}
                open={open}
                handleOpen={handleOpen}
            />
        </Box>
    );
};

export default Search;