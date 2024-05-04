import React, { useEffect, useState } from 'react';
import { AvatarGroup, Box, IconButton } from '@mui/material'
import './ChatInfo.scss'
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import ImageIcon from '@mui/icons-material/Image';
import { getInfoUser } from '../../../../../service/UserService';

const ChatInfo = (props) => {

    const { avatar, name, click, user } = props;

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)

    const [userinfo, setuserinfo] = useState({})
    const [arruserinfo, setarruserinfo] = useState([]);

    const handleGetUpdateDeputy = async () => {
        if (
            user && user.message && user.message.content.includes("-id-1-")
        ) {
            let elements = user.message.content.split('-id-1-').slice(1);
            if (elements) {
                let res = await getInfoUser({
                    userId: elements
                })
                if (res && res.EC === 0) {
                    setuserinfo(res.DT)
                }
            }
        } else if (user && user.message && user.message.content.includes("-id-2-")) {
            let elements = user.message.content.split('-id-2-').slice(1);
            if (elements) {
                let res = await getInfoUser({
                    userId: elements
                })
                if (res && res.EC === 0) {
                    setuserinfo(res.DT)
                }
            }
        } else if (user && user.message && user.message.content.includes("-id-3-")) {
            let elements = user.message.content.split('-id-3-').slice(1);
            if (elements && elements.length > 0) {
                let members = await Promise.all(elements.map(async (item, index) => {
                    let res = await getInfoUser({ userId: item })
                    return res.DT;
                }))
                setarruserinfo(members)
            }
        } else if (user && user.message && user.message.content.includes("-id-4-")) {
            let elements = user.message.content.split('-id-4-').slice(1);
            if (elements && elements.length > 0) {
                let members = await Promise.all(elements.map(async (item, index) => {
                    let res = await getInfoUser({ userId: item })
                    return res.DT;
                }))
                setarruserinfo(members)
            }
        }
    }

    useEffect(() => {
        handleGetUpdateDeputy()
    }, [])

    useEffect(() => {
        handleGetUpdateDeputy()
    }, [user])


    return (
        <Box className={click === true ? "chat-info-container active" : "chat-info-container"}>
            <Box className="avt-info">
                {
                    user && user.type === "private"
                        ?
                        <Avatar
                            sx={{ width: 50, height: 50 }}
                            alt="Remy Sharp" src={avatar} />
                        : user.type === "group" && user.avatar ?
                            <Avatar
                                sx={{ width: 50, height: 50 }}
                                alt="Remy Sharp" src={avatar} />
                            :
                            <>
                            </>
                    // <AvatarGroup max={4}>
                    //     {user && user.members && user.members.length > 0 &&
                    //         user.members.slice(0, 3).map((member, index) => {
                    //             return (
                    //                 <Avatar
                    //                     key={`avatar-${index}`}
                    //                     sx={{ width: 40, height: 40 }}
                    //                     src={member && member.avatar}

                    //                 >
                    //                 </Avatar>
                    //             )
                    //         }
                    //         )}
                    // </AvatarGroup>
                }


            </Box>
            <Box className="name-chat-info">
                <Box className="name-info">
                    {name}
                </Box>
                <Box className="chat-info">
                    {
                        user && user.message
                            ? user.message.messageType === "text"
                                ? user.message.content.includes("-id-1-")
                                    ?
                                    <Box
                                        className="text-message"
                                    >
                                        {userinfo && userinfo.name} đã được bổ nhiệm thành phó nhóm
                                    </Box>
                                    :
                                    user.message.content.includes("-id-2-")
                                        ?
                                        <Box
                                            className="text-message"
                                        >
                                            {userinfo && userinfo.name} đã rời khỏi nhóm
                                        </Box>
                                        :
                                        user.message.content.includes("-id-3-")
                                            ?
                                            <Box
                                                className="text-message"
                                            >
                                                {arruserinfo && arruserinfo.length > 0 && arruserinfo[arruserinfo.length - 1].name} đã được thêm vào nhóm
                                            </Box>
                                            :
                                            user.message.content.includes("-id-4-")
                                                ?
                                                <Box
                                                    className="text-message"
                                                >
                                                    {arruserinfo && arruserinfo.length > 0 && arruserinfo[arruserinfo.length - 1].name} đã bị đuổi khỏi nhóm
                                                </Box>
                                                :
                                                user.message.senderId === dataredux._id
                                                    ?
                                                    <Box
                                                        className="text-message"
                                                    >
                                                        Bạn:{user.message.content}
                                                    </Box>
                                                    :
                                                    <Box
                                                        className="text-message"

                                                    >
                                                        {user.message.content}
                                                    </Box>
                                :
                                user.message.messageType === "image"
                                    ? user.message.senderId === dataredux._id
                                        ?
                                        <Box
                                            className="text-message"
                                        >
                                            Bạn:<ImageIcon /> Hình ảnh
                                        </Box>
                                        :
                                        <Box
                                            className="text-message"

                                        >
                                            <ImageIcon /> Hình ảnh
                                        </Box>
                                    :
                                    <></>
                            :
                            <Box
                                className="text-message"

                            >
                                Gửi lời chào , Bắt đầu cuộc trò chuyện....
                            </Box>
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default ChatInfo;