import { Box, Button, Divider, FormControlLabel, InputBase, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import './ContentUpdateUser.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
import { updateUserInfo } from '../../../../service/UserService';
import { useDispatch } from 'react-redux';
import { fechUserToken } from '../../../../redux/UserSlice';
import { handlesendAllInfo } from '../../../../socket/socket';

const ContentUpdateUser = (props) => {

    const { user, handleCloseModel } = props;
    const dispatch = useDispatch();

    const [userInfo, setuserInfo] = useState({
        name: '',
        gender: '',
        phoneNumber: "",
        email: ""
    });


    useEffect(() => {
        if (user) {
            setuserInfo({
                name: user.name,
                gender: user.gender,
                phoneNumber: user.phoneNumber,
                email: user.email
            })
        }
    }, [])

    const handleOnChange = (e, id) => {
        const _infoUser = _.cloneDeep(userInfo);
        _infoUser[id] = e.target.value;
        setuserInfo(_infoUser)
    }

    const handleUpdateUserInfo = async () => {
        if (userInfo) {
            if (userInfo.name) {
                let res = await updateUserInfo(userInfo);
                if (res && res.EC === 0) {
                    toast.success("Cập nhật thông tin thành công!")
                    handleCloseModel()
                    dispatch(fechUserToken())
                } else {
                    toast.error("Vui lòng nhập đủ thông tin cập nhật!")
                }
            } else {
                toast.error("Vui lòng nhập đủ thông tin cập nhật!")

            }
        }

    }

    return (
        <Box
            className="info-body-update-user"
        >
            <Scrollbars style={{ width: "100%", height: "100%" }}>

                <Box className="info-user-model">
                    <Box className="info-user-model-name">
                        <label className='name-display'>
                            Tên hiển thị
                        </label>
                        <Box
                        >
                            <InputBase
                                className='input-name-display'
                                value={userInfo && userInfo.name}
                                onChange={(e) => handleOnChange(e, "name")}
                            />
                        </Box>
                    </Box>
                    <Box className="info-user-model-gender">
                        <label className='gender-display'>
                            Thông tin cá nhân
                        </label>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={userInfo && `${userInfo.gender}`}
                            onChange={(e) => handleOnChange(e, "gender")}
                        >
                            <FormControlLabel
                                className='radio-custom'
                                value="Nam"
                                control={<Radio />}
                                label="Nam"
                            />
                            <FormControlLabel
                                className='radio-custom'
                                value="Nữ"
                                control={<Radio />}
                                label="Nữ"
                            />
                        </RadioGroup>
                    </Box>
                    <Box className="info-user-footer">
                        <Button variant='contained'
                            className='btn-save-in-model'
                            onClick={() => handleUpdateUserInfo()}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Scrollbars>
        </Box>
    );
};

export default ContentUpdateUser;