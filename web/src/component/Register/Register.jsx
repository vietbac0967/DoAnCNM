import {
    Box, Button, Container, FormControl, FormControlLabel,
    FormHelperText,
    InputBase, Radio, RadioGroup, useMediaQuery, useTheme
} from '@mui/material';
import React, { useState } from 'react';
import './Register.scss'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { validatePassword, validatePhoneNumber, validateEmail } from '../../validate/validate';
import { register } from '../../service/UserService';
import { toast } from 'react-toastify';


const Register = () => {

    const theme = useTheme();

    const tablet = useMediaQuery(theme.breakpoints.down('md'))

    const mobile = useMediaQuery(theme.breakpoints.down("sm"))

    const defaultInput = {
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "Nam",
        password: "",
        confirmpassword: ""
    }

    const statusfield = {
        fullName: false,
        email: false,
        phoneNumber: false,
        password: false,
        confirmpassword: false
    }

    const senderror = {
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmpassword: ""
    }

    const [inforegister, setinforegister] = useState(defaultInput);
    const [infostatus, setinfostatus] = useState(statusfield);
    const [infosenderror, setinfosenderror] = useState(senderror);

    const handleValid = () => {
        let check = true;
        setinfostatus(statusfield);
        setinfosenderror(senderror);
        if (!inforegister.fullName) {
            setinfostatus(prevState => ({ ...prevState, fullName: true }))
            setinfosenderror(prevState => ({ ...prevState, fullName: "Bạn cần nhập họ tên" }))
            check = false;
        }
        if (!inforegister.email) {
            setinfostatus(prevState => ({ ...prevState, email: true }))
            setinfosenderror(prevState => ({ ...prevState, email: "Bạn cần nhập địa chỉ email" }))
            check = false;
        } else {
            if (!validateEmail(inforegister.email)) {
                setinfostatus(prevState => ({ ...prevState, email: true }))
                setinfosenderror(prevState => ({ ...prevState, email: "email cần theo dạng @gmail.com" }))
                check = false;
            }
        }
        if (!inforegister.phoneNumber) {
            setinfostatus(prevState => ({ ...prevState, phoneNumber: true }))
            setinfosenderror(prevState => ({ ...prevState, phoneNumber: "Bạn cần nhập số điện thoại" }))
            check = false;
        } else {
            if (!validatePhoneNumber(inforegister.phoneNumber)) {
                setinfostatus(prevState => ({ ...prevState, phoneNumber: true }))
                setinfosenderror(prevState => ({ ...prevState, phoneNumber: "số điện thoại cần là 10 số và bắt đầu là 0" }))
                check = false;
            }
        }
        if (!inforegister.password) {
            setinfostatus(prevState => ({ ...prevState, password: true }))
            setinfosenderror(prevState => ({ ...prevState, password: "Bạn cần nhập mật khẩu" }))
            check = false;
        } else {
            if (!validatePassword(inforegister.password)) {
                setinfostatus(prevState => ({ ...prevState, password: true }))
                setinfosenderror(prevState => ({ ...prevState, password: "password phải từ 5 ký tự trở lên trong đó bao gồm ít nhất 1 ký tự hoa và 1 ký tự đặc biệt" }))
                check = false;
            }
        }
        if (!inforegister.confirmpassword) {
            setinfostatus(prevState => ({ ...prevState, confirmpassword: true }))
            setinfosenderror(prevState => ({ ...prevState, confirmpassword: "Bạn cần nhập lại mật khẩu" }))
            check = false;
        } else {
            if (inforegister.confirmpassword !== inforegister.password) {
                setinfostatus(prevState => ({ ...prevState, confirmpassword: true }))
                setinfosenderror(prevState => ({ ...prevState, confirmpassword: "mật khẩu không khớp" }))
                check = false;
            }
        }

        return check;
    }

    const handleOnChange = (e, id) => {
        const _inforegister = _.cloneDeep(inforegister);
        _inforegister[id] = e.target.value;
        setinforegister(_inforegister)
    }

    const handleRegister = async () => {
        let check = handleValid()
        if (check === true) {
            let res = await register(inforegister);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                setinforegister(defaultInput)
            } else {
                toast.error(res.EM)
            }
        }
    }

    return (
        <Box className="Register-container">
            <Box sx={{
                width: tablet ? "60%" : "65%",
                display: mobile ? "none" : "hidden"
            }} className="backgroud-Register">
            </Box>
            <Box
                sx={{
                    width: mobile ? "100%"
                        : tablet ? "40%" : "35%"
                }}
                className="Register-right">
                <Container>
                    <Box className="box-text-title">
                        <h2 className='text-title'>Đăng Ký</h2>
                    </Box>
                    <Box className="box-input">
                        <FormControl>
                            <InputBase
                                className='field-input'
                                placeholder="Nhập họ tên"
                                value={inforegister.fullName}
                                onChange={(e) => handleOnChange(e, "fullName")}
                            />
                            {
                                infostatus.fullName
                                    ?
                                    <FormHelperText className="filled-weight-helper-text">
                                        {infosenderror.fullName}
                                    </FormHelperText>
                                    :
                                    <></>
                            }
                        </FormControl>
                        <FormControl>
                            <InputBase
                                className='field-input'
                                placeholder="Nhập email"
                                value={inforegister.email}
                                onChange={(e) => handleOnChange(e, "email")}
                            />
                            {
                                infostatus.email
                                    ?
                                    <FormHelperText className="filled-weight-helper-text">
                                        {infosenderror.email}
                                    </FormHelperText>
                                    :
                                    <></>
                            }
                        </FormControl>
                        <FormControl>
                            <InputBase
                                className='field-input'
                                placeholder="Nhập số điện thoại"
                                value={inforegister.phoneNumber}
                                onChange={(e) => handleOnChange(e, "phoneNumber")}

                            />
                            {
                                infostatus.phoneNumber
                                    ?
                                    <FormHelperText className="filled-weight-helper-text">
                                        {infosenderror.phoneNumber}
                                    </FormHelperText>
                                    :
                                    <></>
                            }
                        </FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={inforegister.gender}
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
                                value="Nu"
                                control={<Radio />}
                                label="Nu"
                            />
                        </RadioGroup>
                        <FormControl>
                            <InputBase
                                className='field-input'
                                placeholder="Nhập mật khẩu"
                                value={inforegister.password}
                                onChange={(e) => handleOnChange(e, "password")}
                                type='password'
                            />
                            {
                                infostatus.password
                                    ?
                                    <FormHelperText className="filled-weight-helper-text">
                                        {infosenderror.password}
                                    </FormHelperText>
                                    :
                                    <></>
                            }
                        </FormControl>
                        <FormControl>
                            <InputBase
                                className='field-input'
                                placeholder="Xác nhận mật khẩu"
                                value={inforegister.confirmpassword}
                                onChange={(e) => handleOnChange(e, "confirmpassword")}
                                type='password'

                            />
                            {
                                infostatus.confirmpassword
                                    ?
                                    <FormHelperText className="filled-weight-helper-text">
                                        {infosenderror.confirmpassword}
                                    </FormHelperText>
                                    :
                                    <></>
                            }
                        </FormControl>
                    </Box>
                    <Box className="box-button">
                        <Button className='btn-Register' variant="contained"
                            onClick={() => handleRegister()}
                        >
                            <span className='text-Register'>
                                Đăng Ký
                            </span>
                        </Button>
                    </Box>
                    <Box className="box-option">
                        <span className='text-notaccout'>Bạn đã có tài khoản ?
                            <Link className='link-register' to="/login"> Đăng Nhập</Link>
                        </span>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Register;