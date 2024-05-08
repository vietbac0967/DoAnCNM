import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, OutlinedInput } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import './ContentChat.scss'
import { useDispatch, useSelector } from 'react-redux';
import { sendFile, sendMessage, sendMessageGroup, sendMessageImg, sendMessageImgGroup, sendVideo } from '../../../../service/MessageService';
import { handlesendAllInfo, handlesendinfoAll, handlsendmessange, handlsendmessangeingroup } from '../../../../socket/socket';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import emojidata from '@emoji-mart/data/sets/15/all.json'
import Picker from '@emoji-mart/react'
import _ from 'lodash';
import ImageIcon from '@mui/icons-material/Image';
import SendIcon from '@mui/icons-material/Send';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const ContentChat = (props) => {

    const { users, user, handleGetAllFriend, showchat, mdup } = props;

    const [chat, setchat] = useState("");
    const [userinfo, setuserinfo] = useState({});

    const [emoij, setemoij] = useState(false);
    const [fileupdate, setfileupdate] = useState(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timer = useRef();

    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    // useEffect(() => {
    //     if (listfrient && listfrient.length > 0) {
    //         let index = listfrient.findIndex(item => item.click === true);
    //         if (index !== -1) {
    //             setuserinfo(listfrient[index])

    //         }
    //     }
    // }, [listfrient])

    useEffect(() => {
        if (users && !_.isEmpty(users)) {
            setuserinfo(users)
        }
    }, [users])


    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    useEffect(() => {
        if (user && user.length > 0)
            setuserinfo(user[0])
    }, [user])

    const handleSendChat = async (e) => {
        if (chat) {
            if (userinfo && (userinfo.type === "private" || userinfo.phoneNumber)) {
                let data = {
                    receiverId: userinfo._id,
                    content: chat
                }
                let res = await sendMessage(data)
                if (res) {
                    if (res.EC === 0) {
                        setchat("")
                        handlsendmessange({
                            sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                            , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id }
                        })
                        handlesendAllInfo({
                            sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                            , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id },
                            type: "private"
                        })
                    }
                }
            } else {

                if (userinfo.type === "group") {
                    let data = {
                        groupId: userinfo._id._id,
                        content: chat
                    }
                    let res = await sendMessageGroup(data)
                    if (res) {
                        if (res.EC === 0) {
                            setchat("")
                            handlsendmessangeingroup({ groupId: userinfo._id._id })
                            handlesendAllInfo({
                                groupId: userinfo._id._id,
                                type: "group"
                            })

                        }
                    }
                } else {
                    let data = {
                        groupId: userinfo._id,
                        content: chat
                    }
                    let res = await sendMessageGroup(data)
                    if (res) {
                        if (res.EC === 0) {
                            setchat("")
                            handlsendmessangeingroup({ groupId: userinfo._id })
                            handlesendAllInfo({
                                groupId: userinfo._id,
                                type: "group"
                            })

                        }
                    }
                }
            }

        }
    }

    const handleStartemoij = () => {
        setemoij(!emoij)
    }

    const handleEmojiSelect = (e) => {
        setchat(chat + e.native)
    }

    const handlesendButton = () => {
        handleSendChat()
    }

    const handleSendChatEnter = (e) => {
        if (e.key === 'Enter') {
            handleSendChat()
        }
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!loading) {
                setSuccess(false);
                setLoading(true);
            }
            if (userinfo && (userinfo.type === "private" || userinfo.phoneNumber)) {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("receiverId", userinfo._id)
                let res = await sendMessageImg(formData)
                if (res && res.EC === 0) {
                    setSuccess(true);
                    setLoading(false);
                    handlsendmessange({
                        sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                        , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id }
                    })
                    handlesendAllInfo({
                        sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                        , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id },
                        type: "private"
                    })
                }
            } else {
                if (userinfo.type === "group") {
                    const formData = new FormData();
                    formData.append("image", file);
                    formData.append("groupId", userinfo._id._id)
                    let res = await sendMessageImgGroup(formData)
                    if (res && res.EC === 0) {
                        setSuccess(true);
                        setLoading(false);
                        handlsendmessangeingroup({ groupId: userinfo._id._id })
                        handlesendAllInfo({
                            groupId: userinfo._id._id,
                            type: "group"
                        })
                    }
                } else {
                    const formData = new FormData();
                    formData.append("image", file);
                    formData.append("groupId", userinfo._id._id)
                    let res = await sendMessageImgGroup(formData)
                    if (res && res.EC === 0) {
                        setSuccess(true);
                        setLoading(false);
                        handlsendmessangeingroup({ groupId: userinfo._id._id })
                        handlesendAllInfo({
                            groupId: userinfo._id._id,
                            type: "group"
                        })
                    }
                }
            }

        } else {
            toast.error("Vui lòng chọn ảnh để thực hiện update");
        }
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!loading) {
                setSuccess(false);
                setLoading(true);
            }
            if (userinfo && (userinfo.type === "private" || userinfo.phoneNumber)) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("receiverId", userinfo._id)
                let res = await sendFile(formData)
                if (res && res.EC === 0) {
                    setSuccess(true);
                    setLoading(false);
                    handlsendmessange({
                        sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                        , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id }
                    })
                    handlesendAllInfo({
                        sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                        , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id },
                        type: "private"
                    })
                }
            }
        } else {
            toast.error("Vui lòng chọn ảnh để thực hiện update");
        }
    }

    const handleVideoChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!loading) {
                setSuccess(false);
                setLoading(true);
            }
            if (userinfo && (userinfo.type === "private" || userinfo.phoneNumber)) {
                const formData = new FormData();
                formData.append("video", file);
                formData.append("receiverId", userinfo._id)
                let res = await sendVideo(formData)
                if (res && res.EC === 0) {
                    setSuccess(true);
                    setLoading(false);
                    handlsendmessange({
                        sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                        , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id }
                    })
                    handlesendAllInfo({
                        sender: { phone: dataredux.phoneNumber, userId: dataredux._id }
                        , receiver: { phone: userinfo.phoneNumber, userId: userinfo._id },
                        type: "private"
                    })
                }
            }
        } else {
            toast.error("Vui lòng chọn ảnh để thực hiện update");
        }
    }


    return (
        <Box className="chat-infor-bottom-child-bottom">
            <Box className="div-input-action">
                <input id='previewFile-message' type='file' hidden onChange={(e) => handleFileChange(e)} />
                <label htmlFor="previewFile-message">
                    <IconButton component="span" sx={{ p: '10px' }} aria-label="search">
                        <AttachFileIcon />
                    </IconButton>
                </label>
                <input id='previewFile-video' type='file' hidden onChange={(e) => handleVideoChange(e)} />
                <label htmlFor="previewFile-video">
                    <IconButton component="span" sx={{ p: '10px' }} aria-label="search">
                        <VideoLibraryIcon />
                    </IconButton>
                </label>
                <input id='previewImg-message' type='file' hidden onChange={(e) => handleImageChange(e)} />
                <label htmlFor="previewImg-message">
                    <IconButton component="span" sx={{ p: '10px' }} aria-label="search">
                        <ImageIcon />
                    </IconButton>
                </label>
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
                    className='btn-emoij'
                    onClick={(e) => handleStartemoij(e)}
                >
                    <SentimentSatisfiedAltIcon />
                </IconButton>
                {
                    emoij ?
                        <Box className="div-emoij">
                            <Picker
                                data={emojidata} onEmojiSelect={handleEmojiSelect}
                            />
                        </Box>
                        :
                        <Box></Box>
                }
            </Box>
            <Box className="div-input-and-emo">
                <OutlinedInput
                    className='chat-infor-bottom-child-text'
                    placeholder="Nhập tin nhắn muốn gửi"
                    onKeyDown={(e) => handleSendChatEnter(e)}
                    value={chat}
                    onChange={(e) => setchat(e.target.value)}

                />
                <IconButton color='primary' className='btn-send'
                    onClick={() => handlesendButton()}
                >
                    <SendIcon />
                </IconButton>
            </Box>
            {loading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: 'blue',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
        </Box>
    );
};

export default ContentChat;