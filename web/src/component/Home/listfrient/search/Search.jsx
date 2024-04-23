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
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ModuleGroup from '../../../model/moduleaddgroup/ModuleGroup';

const Search = (props) => {

    const { model, setmodel, setuser } = props;

    const [open, setOpen] = useState(false);
    const [openAddGroup, setOpenAddGroup] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');


    const handleClose = () => {
        setPhoneNumber("")
        setOpen(false);
    }


    const handleOpen = () => {
        setPhoneNumber("")
        setOpen(true)
    }

    const handleOpenAddGroup = () => {
        setOpenAddGroup(true)
    }

    const handleCloseAddGroup = () => {
        setOpenAddGroup(false)
    }

    const handleCloseSearchModel = () => {
        setmodel(false)
        setuser({})
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
                        <>
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
                                onClick={() => handleOpen()}
                            >
                                <PersonAddAltIcon />
                            </IconButton>
                            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
                                onClick={() => handleOpenAddGroup()}
                            >
                                <GroupAddIcon />
                            </IconButton>
                        </>

                        :
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions"
                            onClick={() => handleCloseSearchModel()}
                        >
                            <CancelIcon />
                        </IconButton>
                }

            </Paper>
            <ModelAddFrient
                handleClose={handleClose}
                open={open}
                handleOpen={handleOpen}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
            />
            <ModuleGroup
                open={openAddGroup}
                handleClose={handleCloseAddGroup}
            />
        </Box>
    );
};

export default Search;