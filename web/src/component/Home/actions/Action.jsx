import React, { useState } from 'react';
import './Action.scss'
import { Box, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import Paper from '@mui/material/Paper';
import _, { findIndex } from 'lodash';
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch, useSelector } from 'react-redux';
import InfoModel from '../../model/infoModel/InfoModel';

const Action = (props) => {

    const navigate = useNavigate();
    const { user, setuser } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    const [openmodelprivate, setopenprivate] = useState(false)


    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClickSetting = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const defaultlist = [
        { id: 1, name: "chat", action: false, path: "/" },
        { id: 2, name: "phoneBook", action: false, path: "/phonebook" },
        // { id: 3, name: "listFrient", action: false, path: "/listfrient" },
        { id: 3, name: "setting", action: false, path: "/setting" },
    ]

    const defaultaction = [
        { id: 1, name: "chat", action: true, path: "/" },
        { id: 2, name: "phoneBook", action: false, path: "/phonebook" },
        // { id: 3, name: "listFrient", action: false, path: "/listfrient" },
        { id: 3, name: "setting", action: false, path: "/setting" },
    ]

    const [listaction, setlistaction] = useState(defaultaction);

    const handleClick = (id) => {
        let cplistaction = _.cloneDeep(defaultlist);
        let index = cplistaction.findIndex(item => +item.id === +id);
        if (index !== -1) {
            cplistaction[index].action = true;
            navigate(cplistaction[index].path)
        }
        // if (user) {
        //     setuser({})
        // }
        setlistaction(cplistaction)
    }

    const handleCloseModelPrivate = () => {
        setopenprivate(false)
    }

    return (
        <Box className='action-container'>
            <Paper component={Box} sx={{ height: "100%" }}>
                <Box className="action-body">
                    <IconButton color={listaction[0].action ? "primary" : "#ffffff"} size='large'
                        onClick={() => handleClick(1)}
                    >
                        <ChatIcon fontSize='inherit' color='#ffffff' />
                    </IconButton>
                    <IconButton color={listaction[1].action ? "primary" : "#ffffff"} size='large'
                        onClick={() => handleClick(2)}

                    >
                        <PermContactCalendarIcon fontSize='inherit' color='#ffffff' />
                    </IconButton>
                    {/* <IconButton color={listaction[2].action ? "primary" : "#ffffff"} size='large'
                        onClick={() => handleClick(3)}
                    >
                        <GroupIcon fontSize='inherit' color='#ffffff' />
                    </IconButton> */}
                    <IconButton color="#ffffff" size='large'
                        onClick={(e) => handleClickSetting(e)}
                    >
                        <SettingsIcon fontSize='inherit' color='#ffffff' />
                    </IconButton>
                </Box>
            </Paper>
            <Menu
                id="basic-button"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                anchorEl={anchorEl}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <MenuItem
                    onClick={() => setopenprivate(true)}
                >
                    <span style={{ display: "flex", alignItems: "center" }}>
                        <PersonIcon />Thông tin tài khoản
                    </span>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <span style={{ color: "#e53935" }}>
                        Đăng suất
                    </span>
                </MenuItem>
            </Menu>
            <InfoModel
                open={openmodelprivate}
                handleCloseModel={handleCloseModelPrivate}
                user={dataredux}
            />
        </Box>

    );
};

export default Action;