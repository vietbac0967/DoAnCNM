import { Avatar, Box, Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import background1 from '../../../../assets/img/backgroud1.jpg'
import background2 from '../../../../assets/img/backgroud2.jpg'
import background3 from '../../../../assets/img/backgroud3.jpg'
import './ContentUserInfo.scss'

const ContentUserInfo = (props) => {

    const { user, handleMessage, setupdateimg } = props;

    const [backgroundImg, setBackgroundImg] = useState('');
    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)


    useEffect(() => {
        const backgroundImages = [
            background1, background2, background3
        ];

        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        const randomBgImg = backgroundImages[randomIndex];

        setBackgroundImg(randomBgImg);
    }, []);

    return (
        <Box
            className="info-body"
        >
            <Scrollbars style={{ width: "100%", height: "100%" }}>

                <Box className="info-bg"
                    sx={{
                        backgroundImage: `url(${backgroundImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >

                </Box>
                <Box className="info-user">
                    <Box className="info-user-avt">
                        <Box className="info-avt-and-action">
                            <Avatar
                                sx={{ width: 80, height: 80 }}
                                alt="Remy Sharp"
                                className='info-user-avatar'
                                src={user && user.avatar}
                            />
                            {
                                dataredux && user &&
                                    dataredux._id === user._id
                                    ?
                                    <>
                                        <IconButton className='info-user-action-avt'
                                            onClick={() => setupdateimg(1)}
                                        >
                                            <CameraAltIcon />
                                        </IconButton>
                                    </>

                                    :
                                    <></>

                            }

                        </Box>


                        <span className='info-user-name'>
                            {user && user.name}
                        </span>
                        {
                            dataredux && user &&
                                dataredux._id === user._id
                                ?
                                <Box className="info-user-custom">
                                    <IconButton
                                        onClick={() => setupdateimg(2)}

                                    >
                                        <DriveFileRenameOutlineIcon />
                                    </IconButton>
                                </Box>
                                :
                                <></>

                        }

                    </Box>
                    {
                        dataredux && user &&
                            dataredux._id === user._id
                            ?
                            <></>
                            :
                            <Box className="info-user-action">
                                <Button
                                    variant='contained'
                                    className='btn-send-message'
                                    style={{
                                        backgroundColor: "#b2ebf2",
                                    }}
                                    onClick={() => handleMessage()}
                                >
                                    <span className='text-action-message'>
                                        Nhắn tin
                                    </span>
                                </Button>
                            </Box>
                    }

                </Box>
                <Box className="info-user-des">
                    <span className='info-user-des-title'>
                        Thông tin cá nhân
                    </span>
                    <Box className='info-user-des-gender'>
                        <span className='info-user-text'>
                            Giới tính
                        </span>
                        <span className='info-user-if'>
                            {user && user.gender}
                        </span>
                    </Box>
                    <Box className='info-user-des-gender'>
                        <span className='info-user-text'>
                            Điện thoại
                        </span>
                        <span className='info-user-if'>
                            {user && user.phoneNumber}
                        </span>
                    </Box>
                </Box>
                <Box className="info-action">
                    {
                        dataredux && user &&
                            dataredux._id === user._id
                            ?
                            <Box className="info-action-btn"
                                onClick={() => setupdateimg(2)}
                            >
                                <DriveFileRenameOutlineIcon />
                                <span className='info-action-text'>
                                    Cập nhật thông tin
                                </span>
                            </Box>
                            :
                            <Box className="info-action-btn">
                                <DeleteIcon />
                                <span className='info-action-text'>
                                    Xóa bạn khỏi danh sách bạn bè
                                </span>
                            </Box>
                    }

                </Box>
            </Scrollbars>
        </Box>
    );
};

export default ContentUserInfo;