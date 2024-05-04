import {
    Box, Button, Checkbox, Container, FormControlLabel, FormGroup,
    IconButton, Input, InputBase, Modal, useMediaQuery, useTheme
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './ModuleGroup.scss'
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxFriend from './CheckBoxFriend';
import Scrollbars from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import DrawerAddGroup from './DrawerAddGroup';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { toast } from 'react-toastify';
import { getAllFriend } from '../../../../../service/UserService';
import { handlesendAllInfo, handlesendinfoAll, handlesendtext, handlsendmessangeingroup } from '../../../../../socket/socket';
import { fechUserToken } from '../../../../../redux/UserSlice';
import { addMember } from '../../../../../service/GroupService';
import { sendMessageGroup } from '../../../../../service/MessageService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ModuleGroup = (props) => {

    const { open, handleClose, group, handleGetAllUserInfo } = props
    const theme = useTheme();

    const sm = useMediaQuery(theme.breakpoints.down('sm'))

    const dispatch = useDispatch();
    const dataredux = useSelector((state) => state.userisaccess.account)
    const [arrUser, setarrUser] = useState([]);
    const [usersearch, setusersearch] = useState({})
    const [listuser, setlistuser] = useState([]);

    const [opendrawer, setopendrawer] = useState(false)

    const [choosegroup, setchoosegroup] = useState([]);

    const [namegroup, setnamegroup] = useState('');
    const [search, setsearch] = useState('');

    useEffect(() => {
        handleCustomData()
    }, [])

    const handleopendrawer = () => {
        setopendrawer(true)
    }

    const handleoffdrawer = () => {
        setopendrawer(false)
    }

    useEffect(() => {
        handleCustomData()
    }, [dataredux])

    const handleChoose = (user) => {
        let cparruser = _.cloneDeep(arrUser);
        let index = cparruser.findIndex((item) => item._id === user._id);
        if (index !== -1) {
            cparruser[index].checked = !cparruser[index].checked;
            if (!_.isEmpty(usersearch)) {
                setusersearch((prevUser) => ({ ...prevUser, checked: !prevUser.checked }));
            }
        } else {
            if (usersearch) {
                setusersearch((prevUser) => ({ ...prevUser, checked: !prevUser.checked }));
            }
        }

        setarrUser(cparruser)

        let arr = [...choosegroup]
        if (user.checked === true) {
            arr.push(user)
        } else {
            arr.pop(user)
        }
        setchoosegroup(arr)

    }

    const handleCustomData = () => {
        if (dataredux && dataredux.friends && dataredux.friends.length > 0
            && group && group.members && group.members.length > 0
        ) {
            let data = dataredux.friends.map((item, index) => {
                let checked = null;
                if (typeof group._id === "object") {
                    checked = group.members.some(member => member === item._id)
                } else {
                    checked = group.members.some(member => member._id === item._id)
                }
                return {
                    ...item, checked: checked, isexixst: checked
                }
            })
            setarrUser(data)
        }
    }

    const handleCancelAdd = (user) => {
        if (arrUser && arrUser.length > 0) {
            let cparruser = _.cloneDeep(arrUser)
            if (choosegroup && choosegroup.length > 0) {
                let data = choosegroup.filter((item) => item._id !== user._id);
                setchoosegroup(data)
                let index = cparruser.findIndex((item) => item._id === user._id);
                if (index !== -1) {
                    cparruser[index].checked = false;
                    if (!_.isEmpty(usersearch)) {
                        setusersearch((prevUser) => ({ ...prevUser, checked: !prevUser.checked }));
                    }
                } else {
                    if (usersearch) {
                        setusersearch((prevUser) => ({ ...prevUser, checked: !prevUser.checked }));
                    }
                }
                setarrUser(cparruser)
            }
        }

    }

    const handleCloseModel = () => {
        handleClose();
        setchoosegroup([]);
        handleCustomData();
        handleoffdrawer();
        setsearch("")
        setnamegroup("")
        setusersearch({})
    }

    const getAlluser = async () => {
        let res = await getAllFriend();
        if (res) {
            if (res.EC === 0) {
                setlistuser(res.DT)
            }
        }
    }

    const handleSearch = () => {
        let cplistuser = _.cloneDeep(listuser);
        if (dataredux.phoneNumber !== search) {
            let index = cplistuser.findIndex((item) => item.phoneNumber === search)
            if (index !== -1) {
                let index2 = choosegroup.findIndex((item) => item._id === cplistuser[index]._id)
                if (index2 !== -1) {
                    setusersearch({ ...cplistuser[index], checked: true })
                } else {
                    setusersearch({ ...cplistuser[index], checked: false })
                }

            } else {
                setusersearch({})
            }
        }


    }

    useEffect(() => {
        handleSearch()
    }, [search])

    useEffect(() => {
        getAlluser()
    }, [])

    const handleAddGroup = async () => {
        if (choosegroup && choosegroup.length > 0) {
            let arr = [...choosegroup.map((item, index) => {
                return item._id
            })]
            if (group) {
                if (typeof group._id === "object") {
                    let data = {
                        groupId: group._id._id,
                        members: arr
                    }
                    let res = await addMember(data)
                    if (res && res.EC === 0) {
                        toast.success("Thêm thành viên thành công")
                        handlesendinfoAll({ arrmember: arr })
                        handleCloseModel()
                        dispatch(fechUserToken())
                        handleGetAllUserInfo()
                        let data = {
                            groupId: group._id._id,
                            content: `###-id-3-${arr}`
                        }
                        let res = await sendMessageGroup(data)
                        if (res) {
                            if (res.EC === 0) {
                                handlsendmessangeingroup({ groupId: group._id._id })
                                handlesendAllInfo({
                                    groupId: group._id._id,
                                    type: "group"
                                })

                            }
                        }
                    } else {
                        toast.error("Thêm thành viên thất bại")
                    }
                } else {
                    let data = {
                        groupId: group._id,
                        members: arr
                    }
                    let res = await addMember(data)
                    if (res && res.EC === 0) {
                        toast.success("Thêm thành viên thành công")
                        handlesendinfoAll({ arrmember: arr })
                        handleCloseModel()
                        dispatch(fechUserToken())
                        let data = {
                            groupId: group._id,
                            content: `###-id-3-${arr}`
                        }
                        let res = await sendMessageGroup(data)
                        if (res) {
                            if (res.EC === 0) {
                                handlsendmessangeingroup({ groupId: group._id })
                                handlesendAllInfo({
                                    groupId: group._id,
                                    type: "group"
                                })

                            }
                        }
                    } else {
                        toast.error("Thêm thành viên thất bại")
                    }
                }
            }

        } else {
            toast.error("Vui lòng chọn thành viên để thêm")
        }
    }


    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={handleCloseModel}
            >
                <Container>
                    <Box sx={style}
                        width={sm ? "80%" : 400}
                        borderRadius={2}
                        className="modal-group-container"
                    >
                        <Box className="module-group-title">
                            <h4>Thêm thành viên nhóm</h4>
                            <IconButton color='primary' className='btn-show-drawer'
                                onClick={() => handleopendrawer()}
                            >
                                <ChevronLeftIcon fontSize='large' />
                                <Box className="number-container"
                                >
                                    <span className="text-index">
                                        {
                                            choosegroup.length
                                        }
                                    </span>
                                </Box>
                            </IconButton>
                        </Box>
                        <hr />
                        <Box className="module-group-body">
                            {/* <Input className='input-name-group' placeholder="Nhập tên nhóm"
                                value={namegroup}
                                error={namegroup ? false : true}
                                onChange={(e) => setnamegroup(e.target.value)}
                            /> */}
                            <Box className="box-find">
                                <span className='icon-search'>
                                    <SearchIcon />
                                </span>
                                <InputBase
                                    className='input-find-sdt'
                                    placeholder="Tìm kiếm số điện thoại"
                                    value={search}
                                    onChange={(e) => setsearch(e.target.value)}
                                />
                            </Box>
                            <hr />
                            <Box className="list-friend-checkbox">
                                <h4 className='title-list-friend-checkbox'>Danh sách bạn bè</h4>
                                <Box className="list-friend-checkbox-child">
                                    <Box className="list-friend-checkbox-child-left">
                                        <Scrollbars style={{ width: "100%", height: "100%" }}>
                                            {
                                                usersearch && !_.isEmpty(usersearch)
                                                    ?
                                                    <CheckBoxFriend
                                                        item={usersearch}
                                                        handleChoose={handleChoose}
                                                    />
                                                    : <>
                                                        {
                                                            arrUser && arrUser.length > 0
                                                            && arrUser.map((item, index) => {
                                                                return (
                                                                    <Box key={`key-checkbox-${index}`}
                                                                    >
                                                                        <CheckBoxFriend
                                                                            item={item}
                                                                            handleChoose={handleChoose}
                                                                        />
                                                                    </Box>
                                                                )
                                                            })
                                                        }
                                                    </>
                                            }

                                        </Scrollbars>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                        <hr />
                        <Box className="module-group-footer">
                            <Button variant="outlined" startIcon={<CancelIcon />} className='btn-cancel'
                                onClick={() => handleCloseModel()}
                            >
                                Hủy
                            </Button>
                            <Button variant="contained" endIcon={<AddCircleOutlineIcon />} className='btn-confirm'
                                disabled={choosegroup && choosegroup.length > 0 ? false : true}
                                onClick={() => handleAddGroup()}
                            >
                                Thêm thành viên
                            </Button>
                        </Box>
                        <DrawerAddGroup
                            opendrawer={opendrawer}
                            handleoffdrawer={handleoffdrawer}
                            choosegroup={choosegroup}
                            handleChoose={handleChoose}
                            handleCancelAdds={handleCancelAdd}
                        />

                    </Box>
                </Container>
            </Modal >
        </>

    );
};

export default ModuleGroup;