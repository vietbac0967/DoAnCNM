import {
    Box, Button, Container, FormControlLabel,
    InputBase, Radio, RadioGroup, useMediaQuery, useTheme
} from '@mui/material';
import React from 'react';
import './Register.scss'
import { Link } from 'react-router-dom';

const Register = () => {

    const theme = useTheme();

    const tablet = useMediaQuery(theme.breakpoints.down('md'))

    const mobile = useMediaQuery(theme.breakpoints.down("sm"))


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
                        <InputBase
                            className='field-input'
                            placeholder="Nhập họ tên" />
                        <InputBase
                            className='field-input'
                            placeholder="Nhập email" />
                        <InputBase
                            className='field-input'
                            placeholder="Nhập số điện thoại" />

                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            defaultValue="Nam"
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

                        <InputBase
                            className='field-input'
                            placeholder="Nhập mật khẩu" />
                        <InputBase
                            className='field-input'
                            placeholder="Xác nhận mật khẩu" />
                    </Box>
                    <Box className="box-button">
                        <Button className='btn-Register' variant="contained">
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