import User from '../modules/user';
import bcrypt from 'bcrypt';
import JwtAction from '../jwt/JwtAction';
import { v4 as uuidv4 } from 'uuid';

import { validateEmail, validatePassword, validatePhoneNumber } from '../valid/validate';

const saltRounds = 10;

const hashPassword = async (password) => {
    let passwordhash = await bcrypt.hash(password, saltRounds);
    return passwordhash;
}

const comparePassword = async (password, hashpassword) => {
    let check = await bcrypt.compare(password, hashpassword);
    return check;
}

const registerService = async (data) => {
    try {
        let fullName = data.fullName;
        let email = data.email;
        let phoneNumber = data.phoneNumber;
        let password = data.password;
        let gender = data.gender;
        let confirmpassword = data.confirmpassword;
        if (fullName !== null && phoneNumber !== null
            && email !== null && password !== null && confirmpassword !== null && gender !== null
        ) {
            if (validateEmail(email) === true && validatePhoneNumber(phoneNumber) === true && validatePassword(password) === true) {
                let user = await User.findOne(
                    { $or: [{ phoneNumber: phoneNumber }, { email: email }] }

                ).exec();

                if (user) {
                    return {
                        EC: 1,
                        EM: 'user is exists',
                        DT: ''
                    }
                } else {
                    if (password === confirmpassword) {
                        let passwordhash = await hashPassword(password);
                        const user1 = new User({
                            fullName: fullName,
                            gender: gender,
                            phoneNumber: phoneNumber,
                            email: email,
                            password: passwordhash
                        })
                        await user1.save();
                        return {
                            EC: 0,
                            EM: 'create user success!',
                            DT: ''
                        }
                    } else {
                        return {
                            EC: 1,
                            EM: 'password is not alike confirmpassowrd',
                            DT: ''
                        }
                    }
                }
            } else {
                return {
                    EC: 1,
                    EM: 'email , phonenumber or password is not format',
                    DT: ''
                }
            }
        }
        else {
            return {
                EC: 1,
                EM: 'data is empty',
                DT: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'error from server services',
            DT: ''
        }
    }
}

const loginService = async (data) => {
    try {
        let emailorSDT = data.emailorSDT;
        let password = data.password;
        if (emailorSDT !== null && password !== null) {
            if ((validatePhoneNumber(emailorSDT) === true || validateEmail(emailorSDT) === true) && validatePassword(password) === true) {
                let user = await User.findOne(
                    { $or: [{ phoneNumber: emailorSDT }, { email: emailorSDT }] }

                ).exec();
                if (user) {
                    let check = await comparePassword(password, user.password)
                    if (check) {
                        let data = {
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            phoneNumber: user.phoneNumber
                        }
                        let access_token = null;
                        let refresh_token = null;
                        if (user.refresh_token && user.exp_refresh_token) {
                            if (user.exp_refresh_token < new Date()) {
                                access_token = await JwtAction.jwtSign(data);
                                refresh_token = await uuidv4();
                                let date = new Date();
                                date.setDate(date.getDate() + 15)
                                // date.setSeconds(date.getSeconds() + 30);
                                await User.findOneAndUpdate(
                                    {
                                        email: user.email,
                                        phoneNumber: user.phoneNumber
                                    },
                                    {
                                        refresh_token: refresh_token,
                                        exp_refresh_token: date
                                    },
                                    { upsert: true }
                                )
                            } else {
                                access_token = await JwtAction.jwtSign(data);
                                refresh_token = user.refresh_token;
                                let date = new Date();
                                date.setDate(date.getDate() + 15)
                                // date.setSeconds(date.getSeconds() + 30);
                                await User.findOneAndUpdate(
                                    {
                                        email: user.email,
                                        phoneNumber: user.phoneNumber
                                    },
                                    {
                                        refresh_token: refresh_token,
                                        exp_refresh_token: date
                                    },
                                    { upsert: true }
                                )
                            }
                        } else {
                            access_token = await JwtAction.jwtSign(data);
                            refresh_token = await uuidv4();
                            let date = new Date();
                            date.setDate(date.getDate() + 15)
                            // date.setSeconds(date.getSeconds() + 30);
                            await User.findOneAndUpdate(
                                {
                                    email: user.email,
                                    phoneNumber: user.phoneNumber
                                },
                                {
                                    refresh_token: refresh_token,
                                    exp_refresh_token: date
                                },
                                { upsert: true }
                            )
                        }
                        return {
                            EC: 0,
                            EM: 'login user success!',
                            DT: {
                                access_token, refresh_token
                            }
                        }
                    } else {
                        return {
                            EC: 1,
                            EM: 'email or password is not exactly',
                            DT: ''
                        }
                    }
                } else {
                    return {
                        EC: 1,
                        EM: 'email or password is not exactly',
                        DT: ''
                    }
                }
            }
        } else {
            return {
                EC: 1,
                EM: 'data is empty',
                DT: ''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EC: 1,
            EM: 'error from server services',
            DT: ''
        }
    }
}

module.exports = {
    registerService, loginService
}