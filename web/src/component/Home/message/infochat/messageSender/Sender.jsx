import React, { useState } from 'react';
import './Sender.scss'
import { Box, Paper } from '@mui/material'
import MenuMessage from '../menuaction/MenuMessage';
import { formatDate } from '../../../../../utils/formatDateOrTime';

const Sender = (props) => {

    const { item, users, setlistmessage, handleGetAllMessage
        , user, reflistmessage, handleGetAllMessageinGroup } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (event.type === 'contextmenu') {
            event.preventDefault();
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className="my-messenge-container">
            {
                item && item.messageType === "text"
                    ?
                    <Box className="info-messenge"
                    >
                        <Paper className='form-text'
                            onContextMenu={(e) => handleClick(e)}
                        >
                            <span className='text'>
                                {item && item.content}
                            </span>
                            <span className='time'>
                                {formatDate(item && item.createdAt)}
                            </span>
                        </Paper>

                    </Box>
                    : item.messageType === "image"
                        ?
                        <>
                            <Box className="info-image"
                            >
                                <Box className="form-image"
                                    style={{ backgroundImage: `url(${item.content})` }}
                                >
                                </Box>

                            </Box>
                            <Box className="div-time-img">
                                <span className='time-img'>
                                    {formatDate(item && item.createdAt)}
                                </span>
                            </Box>
                        </>

                        : <></>
            }

            <MenuMessage
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                item={item}
                users={users}
                setlistmessage={setlistmessage}
                reflistmessage={reflistmessage}
                handleGetAllMessage={handleGetAllMessage}
                user={user}
                handleGetAllMessageinGroup={handleGetAllMessageinGroup}

            />
        </Box>
    );
};

export default Sender;