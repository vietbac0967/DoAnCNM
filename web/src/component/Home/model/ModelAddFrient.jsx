import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import ChildAddFrient from './child/ChildAddFrient';
import { getuserbyPhone } from '../../../service/UserService';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Divider, Input, useMediaQuery, useTheme } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

// import exampleAvatar from '../../assets/Ellipse_191.png';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1
};

function ModelAddFrient(props) {

    const { open, handleClose, phoneNumber, setPhoneNumber } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    const theme = useTheme();

    const sm = useMediaQuery(theme.breakpoints.down('sm'))

    const [user, setuser] = useState({});

    const handleChange = (event) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setPhoneNumber(inputValue);
        }
    };

    const handleGetuserByPhone = async () => {
        let res = await getuserbyPhone({ phone: phoneNumber })
        if (res && res.EC === 0) {
            setuser(res.DT)
        } else {
            setuser("")
        }
    }

    useEffect(() => {
        handleGetuserByPhone();
    }, [phoneNumber])


    return (
        <div>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleClose}
            >
                <Container>
                    <Box sx={style}
                        width={sm ? "80%" : 400}
                        borderRadius={2}
                        className="modal-group-container"
                    >
                        <Box className="info-header-group"
                        >
                            <span className='header-title-group'>
                                Thêm bạn
                            </span>
                            <IconButton
                                onClick={() => handleClose()}
                            >
                                <CancelIcon />
                            </IconButton>
                        </Box>
                        <Divider />
                        <Box sx={{ pt: 2, pb: 2 }}>
                            <TextField
                                id="phone-number-input"
                                label="Số điện thoại"
                                variant="outlined"
                                value={phoneNumber}
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    inputMode: 'numeric',
                                    pattern: '[0-9]*',
                                }}
                                sx={{

                                }}
                            />
                        </Box>
                        <Divider />
                        <Box>
                            <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 15, fontWeight: 600 }}>
                                Bạn bè bạn có thể biết
                            </Typography>
                            {
                                user && !_.isEmpty(user) ?
                                    <ChildAddFrient
                                        user={user}
                                        setuser={setuser}
                                    />
                                    :
                                    <></>
                            }

                        </Box>
                    </Box>
                </Container>
            </Modal>
        </div >
    );
}
export default ModelAddFrient