import React, { useState } from 'react';
import './InfoGroupModel.scss'
import { Box, Container, Divider, Modal, useMediaQuery, useTheme } from '@mui/material';
import HeaderInfoGroup from './header/HeaderInfoGroup';
import ContentInfoGroup from './content/ContentInfoGroup';
import HeaderUpdateAVTGroup from './header/HeaderUpdateAVTGroup'
import ContentUpdateAVTGroup from './content/ContentUpdateAVTGroup'
import HeaderUpdateNameGroup from './header/HeaderUpdateNameGroup';
import ContentUpdateNameGroup from './content/ContentUpdateNameGroup';
import HeaderListMembers from './header/HeaderListMembers';
import ContentListMembers from './content/ContentListMembers';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const InfoGroupModel = (props) => {

    const { open, handleCloseModel, user, handleShowChatUser, setuser, setshowchat } = props;

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
                        className="info-container-model-group"
                    >
                        {
                            update === +0
                                ?
                                <>
                                    <HeaderInfoGroup
                                        handleCloseModel={handleCloseModel}
                                    />
                                    <Divider />
                                    <ContentInfoGroup
                                        handleMessage={handleMessage}
                                        user={user}
                                        updateImg={update}
                                        setupdateimg={setupdate}
                                        handleCloseModel={handleCloseModel}
                                        setshowchat={setshowchat}
                                        setuser={setuser}
                                    />
                                </>

                                : update === +1
                                    ?
                                    <>
                                        <HeaderUpdateAVTGroup
                                            handleCloseModel={handleCloseModel}
                                            updateImg={update}
                                            setupdateimg={setupdate}
                                        />
                                        <Divider />
                                        <ContentUpdateAVTGroup
                                            handleCloseModel={handleCloseModel}
                                            user={user}
                                        />
                                    </>

                                    :
                                    update === +2
                                        ?
                                        <>
                                            <HeaderUpdateNameGroup
                                                handleCloseModel={handleCloseModel}
                                                updateUser={update}
                                                setupdateUser={setupdate}
                                            />
                                            <Divider />
                                            <ContentUpdateNameGroup
                                                user={user}
                                                handleCloseModel={handleCloseModel}

                                            />
                                        </>
                                        : update === +3
                                            ?
                                            <>
                                                <HeaderListMembers
                                                    handleCloseModel={handleCloseModel}
                                                    updateUser={update}
                                                    setupdateUser={setupdate}
                                                />
                                                <Divider />
                                                <ContentListMembers
                                                    user={user}
                                                    handleCloseModel={handleCloseModel}
                                                    handleShowChatUser={handleShowChatUser}
                                                    setuser={setuser}

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

export default InfoGroupModel;