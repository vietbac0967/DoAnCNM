import React, { useState } from 'react';
import './Sender.scss'
import { Box, IconButton, Paper } from '@mui/material'
import MenuMessage from '../menuaction/MenuMessage';
import { formatDate } from '../../../../../utils/formatDateOrTime';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';

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

    const [openfile, setopenfile] = useState(false);

    const handleCloseFile = () => {
        setopenfile(false)
    }

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

        </Box >
    );
};

export default Sender;