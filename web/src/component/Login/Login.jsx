import { Box, Button, Container, Input, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import './Login.scss'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

const Login = () => {

    const theme = useTheme();

    const tablet = useMediaQuery(theme.breakpoints.down('md'))

    const mobile = useMediaQuery(theme.breakpoints.down("sm"))


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
                        <Input className='field-input'
                            placeholder="Tên đăng nhập"
                            startAdornment={
                                <InputAdornment position='start'>
                                    <PersonOutlineIcon />
                                </InputAdornment>
                            }
                            size='medium'
                        />

                        <Input className='field-input'
                            placeholder="Mật khẩu"
                            startAdornment={
                                <InputAdornment position='start'>
                                    <LockIcon />
                                </InputAdornment>
                            }
                            size='medium'
                        />
                    </Box>
                    <Box className="box-button">
                        <Button className='btn-login' variant="contained">
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