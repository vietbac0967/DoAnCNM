import { Box, Button, Container, FormControl, FormHelperText, Input, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import './Login.scss'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { validatePassword, validatePhoneNumber, validateEmail } from '../../validate/validate';
import { login } from '../../service/UserService';
import { toast } from 'react-toastify';

const Login = () => {

    const theme = useTheme();

    const tablet = useMediaQuery(theme.breakpoints.down('md'))

    const mobile = useMediaQuery(theme.breakpoints.down("sm"))

    const navigate = useNavigate();

    const defaultInput = {
        emailorSDT: "",
        password: ""
    }

    const statusfield = {
        emailorSDT: false,
        password: false
    }

    const senderror = {
        emailorSDT: "",
        password: ""
    }

    const [infologin, setinfologin] = useState(defaultInput);
    const [infostatus, setinfostatus] = useState(statusfield);
    const [infosenderror, setinfosenderror] = useState(senderror);

    const handleOnChange = (e, id) => {
        const _infologin = _.cloneDeep(infologin);
        _infologin[id] = e.target.value;
        setinfologin(_infologin)
    }

    const handleValid = () => {
        let check = true;
        setinfostatus(statusfield);
        setinfosenderror(senderror);
        if (!infologin.emailorSDT) {
            setinfostatus(prevState => ({ ...prevState, emailorSDT: true }))
            setinfosenderror(prevState => ({ ...prevState, emailorSDT: "Bạn cần nhập số điện thoại hoặc email" }))
            check = false;
        } else {
            if (!validateEmail(infologin.emailorSDT) && !validatePhoneNumber(infologin.emailorSDT)) {
                setinfostatus(prevState => ({ ...prevState, emailorSDT: true }))
                setinfosenderror(prevState => ({ ...prevState, emailorSDT: "số điện thoại cần là 10 số và bắt đầu là 0 , email cần theo dạng @gmail.com" }))
                check = false;
            }
        }
        if (!infologin.password) {
            setinfostatus(prevState => ({ ...prevState, password: true }))
            setinfosenderror(prevState => ({ ...prevState, password: "Bạn cần nhập mật khẩu" }))
            check = false;
        } else {
            if (!validatePassword(infologin.password)) {
                setinfostatus(prevState => ({ ...prevState, password: true }))
                setinfosenderror(prevState => ({ ...prevState, password: "password phải từ 5 ký tự trở lên trong đó bao gồm ít nhất 1 ký tự hoa và 1 ký tự đặc biệt" }))
                check = false;
            }
        }

        return check;
    }

    const handleLogin = async () => {
        let check = handleValid();
        if (check === true) {
            let res = await login(infologin);
            if (res && res.EC === 0) {
                navigate("/")
            } else {
                toast.error(res.EM)
            }
        }
    }

    return (
        <Box className="login-container">
            <Box sx={{
                width: tablet ? "60%" : "65%",
                display: mobile ? "none" : "hidden"
            }} className="backgroud-login">
            </Box>
            <Box
                sx={{
                    width: mobile ? "100%"
                        : tablet ? "40%" : "35%"
                }}
                className="login-right">
                <Container>
                    <Box className="box-text-title">
                        <h2 className='text-title'>Đăng Nhập</h2>
                    </Box>
                    <Box className="box-input">
                        <FormControl>
                            <Input className='field-input'
                                placeholder="Email hoặc số điện thoại"
                                startAdornment={
                                    <InputAdornment position='start'>
                                        <PersonOutlineIcon />
                                    </InputAdornment>
                                }
                                size='medium'
                                value={infologin.emailorSDT}
                                onChange={(e) => handleOnChange(e, "emailorSDT")}
                            />
                            {
                                infostatus.emailorSDT
                                    ?
                                    <FormHelperText className="filled-weight-helper-text">
                                        {infosenderror.emailorSDT}
                                    </FormHelperText>
                                    :
                                    <></>
                            }
                        </FormControl>
                        <FormControl>
                            <Input className='field-input'
                                placeholder="Mật khẩu"
                                startAdornment={
                                    <InputAdornment position='start'>
                                        <LockIcon />
                                    </InputAdornment>
                                }
                                size='medium'
                                type='password'
                                value={infologin.password}
                                onChange={(e) => handleOnChange(e, "password")}
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
                    </Box>
                    <Box className="box-button">
                        <Button className='btn-login' variant="contained"
                            onClick={() => handleLogin()}
                        >
                            <span className='text-login'>
                                Đăng Nhập
                            </span>
                        </Button>
                    </Box>
                    <Box className="box-option">
                        <span className='text-notaccout'>Bạn chưa có tài khoản ?
                            <Link to="/register" className='link-register'> Đăng ký tại đây</Link>
                        </span>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Login;