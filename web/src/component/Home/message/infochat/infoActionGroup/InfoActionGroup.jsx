import React, { useEffect, useState } from 'react';
import './InfoActionGroup.scss'
import { Avatar, Box } from '@mui/material';
import { getInfoUser } from '../../../../../service/UserService';

const InfoActionGroup = (props) => {

    const { item } = props;

    const [user, setuser] = useState({})
    const [arruser, setarruser] = useState([]);

    const handleGetUpdateDeputy = async () => {
        if (
            item && item.includes("-id-1-")
        ) {
            let elements = item.split('-id-1-').slice(1);
            if (elements) {
                let res = await getInfoUser({
                    userId: elements
                })
                if (res && res.EC === 0) {
                    setuser(res.DT)
                }
            }
        } else if (item && item.includes("-id-2-")) {
            let elements = item.split('-id-2-').slice(1);
            if (elements) {
                let res = await getInfoUser({
                    userId: elements
                })
                if (res && res.EC === 0) {
                    setuser(res.DT)
                }
            }
        } else if (item && item.includes("-id-3-")) {
            let elements = item.split('-id-3-').slice(1);
            if (elements && elements.length > 0) {
                let members = await Promise.all(elements.map(async (item, index) => {
                    let res = await getInfoUser({ userId: item })
                    return res.DT;
                }))
                setarruser(members)
            }
        } else if (item && item.includes("-id-4-")) {
            let elements = item.split('-id-4-').slice(1);
            if (elements && elements.length > 0) {
                let members = await Promise.all(elements.map(async (item, index) => {
                    let res = await getInfoUser({ userId: item })
                    return res.DT;
                }))
                setarruser(members)
            }
        }
    }

    useEffect(() => {
        handleGetUpdateDeputy()
    }, [])

    return (
        <Box className="info-action-group-container">
            <Box className="info-action-group-body">
                {
                    item && item.includes("-id-1-")
                        ?
                        <>
                            <span className='text-name-action-info-in-group'>
                                {
                                    user && user.name
                                }
                            </span>
                            <span className='text-action-info-in-group'>
                                &nbsp;đã được bổ nhiệm thành phó nhóm
                            </span>
                        </>

                        :
                        item && item.includes("-id-2-")
                            ?
                            <Box className="div-action-2">
                                <Avatar
                                    sx={{ width: 20, height: 20 }}
                                    src={user && user.avatar} />
                                <span className='text-name-action-info-in-group'>
                                    {
                                        user && user.name
                                    }
                                </span>
                                <span className='text-action-info-in-group'>
                                    &nbsp;đã rời khỏi nhóm
                                </span>
                            </Box>
                            :
                            item && item.includes("-id-3-")
                                ?
                                <>
                                    {
                                        arruser && arruser.length > 0
                                        && arruser.map((item, index) => {
                                            return (
                                                <Box className="div-action-2"
                                                    key={`div-action-2-index-${index}`}
                                                >
                                                    <Avatar
                                                        sx={{ width: 20, height: 20 }}
                                                        src={item && item.avatar} />
                                                    <span className='text-name-action-info-in-group'>
                                                        {
                                                            item && item.name
                                                        }
                                                    </span>
                                                    <span className='text-action-info-in-group'>
                                                        &nbsp;đã được thêm vào nhóm
                                                    </span>
                                                </Box>
                                            )
                                        })
                                    }
                                </>
                                :
                                item && item.includes("-id-4-")
                                    ?
                                    <>
                                        {
                                            arruser && arruser.length > 0
                                            && arruser.map((item, index) => {
                                                return (
                                                    <Box className="div-action-2"
                                                        key={`div-action-3-index-${index}`}
                                                    >
                                                        <Avatar
                                                            sx={{ width: 20, height: 20 }}
                                                            src={item && item.avatar} />
                                                        <span className='text-name-action-info-in-group'>
                                                            {
                                                                item && item.name
                                                            }
                                                        </span>
                                                        <span className='text-action-info-in-group'>
                                                            &nbsp;đã bị đuổi khỏi nhóm
                                                        </span>
                                                    </Box>
                                                )
                                            })
                                        }
                                    </>
                                    :
                                    <></>
                }
            </Box>

        </Box>
    );
};

export default InfoActionGroup;