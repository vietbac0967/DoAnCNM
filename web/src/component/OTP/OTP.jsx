import { Box, Button, Input, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { CgSpinner } from 'react-icons/cg';
import './OTP.scss'
import img from '../../assets/img/backgroudOTP.png'
import { useNavigate, useParams } from 'react-router-dom';
import { resendEmail, verifyOTP } from '../../service/UserService';
import { toast } from 'react-toastify';

const OTP = () => {

    const { email } = useParams();

    const navigate = useNavigate();

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);


    const onOTPVerify = async () => {
        let res = await verifyOTP({
            email: email,
            otp: otp
        })
        if (res && res.EC === 0) {
            toast.success(res.EM);
            navigate("/login");
        } else {
            toast.error(res.EM)
        }
    }

    const handleSendEmail = async () => {
        let res = await resendEmail({ email: email })
        if (res && res.EC === 0) {
            setCountdown(60);
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#FBF8DD',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <img style={{ width: '15rem' }} src={img} />
            <Typography variant='h3'>Xác thực OTP</Typography>
            <Typography variant='h6'>vui lòng nhập mã số chúng tôi gửi cho bạn.</Typography>
            <Typography variant='h6'>
                Có giá trị trong <span className="countdown">{`OTP Countdown: ${countdown} seconds`}</span>
            </Typography>
            <Box sx={{}}>
                <OtpInput
                    containerStyle="otpContainer"
                    inputStyle={{
                        width: '3rem',
                        height: '3rem',
                        margin: '0 0.2rem',
                        fontSize: '1.5rem',
                        borderRadius: 5,
                        border: '1px solid #B3C8CF',
                        textAlign: 'center',

                    }}
                    inputType='text'
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input  {...props} />}
                />
                <Button
                    sx={{ marginTop: '1rem', }}
                    variant="outlined"
                    onClick={onOTPVerify}
                    disabled={countdown === 0 ? true : false}
                >
                    {loading ?? <CgSpinner size={20} className='spin' />}
                    <span>
                        Xác nhận otp
                    </span>
                </Button>
                <Typography>Chưa nhận được mã? <span className='send-email'
                    onClick={() => handleSendEmail()}
                >Gửi lại</span></Typography>
            </Box>
        </Box >
    )
};

export default OTP;