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

// import exampleAvatar from '../../assets/Ellipse_191.png';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2
};

function ModelAddFrient(props) {

    const { open, handleClose, phoneNumber, setPhoneNumber } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

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
                onClose={handleClose}
            // aria-labelledby="modal-modal-title"
            // aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ borderBottom: 1, flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                        <Typography variant="h6" >
                            Thêm bạn
                        </Typography>
                        <IconButton
                            sx={{ position: 'absolute', right: 10, top: 10, width: '5' }}
                            edge="end"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ pt: 2 }}>
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
                    <Box>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: 12, }}>
                            May you know
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
            </Modal>
        </div >
    );
}
export default ModelAddFrient