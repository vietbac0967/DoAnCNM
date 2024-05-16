import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'
import { login } from '../../service/UserService'
import { toast } from 'react-toastify'
// import { login } from '../../service/admin.service'
const AdminLogin = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const navigate = useNavigate()

    const onButtonClick = async () => {
        if ('' === email || '' === password) {
            setEmailError('Vui lòng nhập email và password')
        }
        try {
            const response = await login({ username: email, password })
            if (response && response.EC === 0) {
                navigate('/admin')
            } else {
                toast.error(response.EM)
            }

        } catch (error) {
            console.log(error.response.data)
        }

    }
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    const changePassword = (e) => {
        setPassword(e.target.value)
    }
    return (
        <div className="loginBox">
            {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            <img className="user" src="https://i.ibb.co/yVGxFPR/2.png" height="100px" width="100px" />
            <h3>Admin </h3>

            <div className="inputBox">
                <input id="uname" value={email} type="text" name="Username" placeholder="Username" onChange={changeEmail} />
                <input id="pass" value={password} type="password" name="Password" placeholder="Password" onChange={changePassword} />
            </div>
            <button onClick={onButtonClick} type='submit'>Login</button>
        </div >
    )
}

export default AdminLogin