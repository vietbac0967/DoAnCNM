import { Box, Button, Divider, FormControlLabel, InputBase, Radio, RadioGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import './ContentUpdateNameGroup.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fechUserToken } from '../../../../redux/UserSlice';
import { updateNameGroup } from '../../../../service/GroupService';

const ContentUpdateNameGroup = (props) => {

    const { user, handleCloseModel } = props;
    const dispatch = useDispatch();


    const [userInfo, setuserInfo] = useState({
        name: '',
        groupId: ""
    });



    useEffect(() => {
        if (user) {
            if (user.type === "group")
                setuserInfo({
                    name: user.name,
                    groupId: user._id._id
                })
            else {
                setuserInfo({
                    name: user.name,
                    groupId: user._id
                })
            }
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
                let res = await updateNameGroup(userInfo);
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

export default ContentUpdateNameGroup;