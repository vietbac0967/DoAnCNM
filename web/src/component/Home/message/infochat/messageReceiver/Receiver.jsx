import React, { useState } from 'react';
import './Receiver.scss'
import { Avatar, Box, Paper } from '@mui/material'
import MenuMessage from '../menuaction/MenuMessage';
import { formatDate } from '../../../../../utils/formatDateOrTime';
import { Link } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import ReactPlayer from 'react-player';

const Receiver = (props) => {

    const { item, listfrient, handleGetAllMessage, handleGetAllMessageinGroup, user } = props;

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
        <Box className="messenge-container">
            <Box className="avatar-messenge">
                <Avatar
                    sx={{ width: 45, height: 45 }}
                    src={item.senderId && item.senderId.avatar}
                >
                </Avatar>
            </Box>
            <Box className="body-messenge">
                {
                    item && item.messageType === "text"
                        ?
                        <Box className="info-messenge">
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
                            :
                            item.messageType === "file"
                                ?
                                <Box className="info-messenge"
                                >
                                    <Paper className='form-file'
                                        onContextMenu={(e) => handleClick(e)}
                                    >
                                        <span className='text-file'>
                                            {
                                                item && item.content
                                                && item.content.split('/').slice(-1)[0]

                                            }

                                            <Link to={item && item.content}>
                                                <DownloadIcon
                                                    className='icon-down'
                                                />
                                            </Link>


                                        </span>
                                        <span className='time'>
                                            {formatDate(item && item.createdAt)}
                                        </span>
                                    </Paper>

                                </Box>
                                :
                                item.messageType === "video"
                                    ?
                                    item && item.content
                                        && item.content.split('.').slice(-1)[0] === "mp3"
                                        ?
                                        < audio
                                            style={{ margin: "5px 0" }}
                                            controls src={item && item.content}
                                        >
                                        </audio>
                                        :
                                        <Box className="body-video">
                                            <ReactPlayer
                                                url={item && item.content}
                                                width='100%'
                                                height='100%'
                                                controls={true}
                                            />
                                        </Box>

                                    :
                                    <></>
                }
            </Box>

            <MenuMessage
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
                item={item}
                listfrient={listfrient}
                handleGetAllMessage={handleGetAllMessage}
                handleGetAllMessageinGroup={handleGetAllMessageinGroup}
                user={user}
            />
        </Box>
    );
};

export default Receiver;