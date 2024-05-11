import { Avatar, Box, Button, Container, Divider, IconButton, Modal, Paper, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './InfoModel.scss'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import background1 from '../../../assets/img/backgroud1.jpg'
import background2 from '../../../assets/img/backgroud2.jpg'
import background3 from '../../../assets/img/backgroud3.jpg'
import Scrollbars from 'react-custom-scrollbars-2';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import HeaderInfoUser from './header/HeaderInfoUser';
import ContentUserInfo from './content/ContentUserInfo';
import HeaderUpdateAVT from './header/HeaderUpdateAVT';
import ContentUpdateAVT from './content/ContentUpdateAVT';
import HeaderUpdateInfoUser from './header/HeaderUpdateInfoUser';
import ContentUpdateUser from './content/ContentUpdateUser';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const InfoModel = (props) => {

    const { open, handleCloseModel, user, handleShowChatUser } = props;

    const theme = useTheme();

    const [update, setupdate] = useState(0)

    const sm = useMediaQuery(theme.breakpoints.down('sm'))

    const handleMessage = () => {
        handleCloseModel()
        handleShowChatUser()
    }


    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleCloseModel}
            >
                <Container>
                    <Box
                        width={sm ? "90%" : 400}
                        borderRadius={1}
                        sx={style}
                        className="info-container"
                    >
                        {
                            update === +0
                                ?
                                <>
                                    <HeaderInfoUser
                                        handleCloseModel={handleCloseModel}
                                    />
                                    <Divider />
                                    <ContentUserInfo
                                        handleMessage={handleMessage}
                                        user={user}
                                        updateImg={update}
                                        setupdateimg={setupdate}
                                    />
                                </>

                                : update === +1
                                    ?
                                    <>
                                        <HeaderUpdateAVT
                                            handleCloseModel={handleCloseModel}
                                            updateImg={update}
                                            setupdateimg={setupdate}
                                        />
                                        <Divider />
                                        <ContentUpdateAVT
                                            handleCloseModel={handleCloseModel}
                                        />
                                    </>

                                    :
                                    update === +2
                                        ?
                                        <>
                                            <HeaderUpdateInfoUser
                                                handleCloseModel={handleCloseModel}
                                                updateUser={update}
                                                setupdateUser={setupdate}
                                            />
                                            <Divider />
                                            <ContentUpdateUser
                                                user={user}
                                                handleCloseModel={handleCloseModel}

                                            />
                                        </>
                                        :
                                        <></>
                        }

                    </Box>

                </Container>
            </Modal>
        </>
    );
};

export default InfoModel;