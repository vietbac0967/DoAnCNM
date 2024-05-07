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
import { getAllFriend } from '../../../service/UserService';
import { CreateGroup } from '../../../service/GroupService';
import { handlesendaddgroup, handlesendinfoAll, handlesendtext } from '../../../socket/socket';
import { fechUserToken } from '../../../redux/UserSlice';

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

    const { open, handleClose } = props
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
        if (dataredux && dataredux.friends && dataredux.friends.length > 0) {
            let data = dataredux.friends.map((item, index) => {
                return {
                    ...item, checked: false
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
        if (namegroup) {
            let arr = [...choosegroup.map((item, index) => {
                return item._id
            }), dataredux._id]
            let data = {
                groupName: namegroup,
                members: arr
            }
            let res = await CreateGroup(data)
            if (res && res.EC === 0) {
                let phonearr = [...choosegroup.map((item, index) => {
                    return item.phoneNumber
                })]
                handlesendtext({ receiver: phonearr })
                handleCloseModel()
                dispatch(fechUserToken())
                handlesendinfoAll({ arrmember: arr })
            } else {
                toast.error(res.EM)
            }
        } else {
            toast.error("group name is not empty")
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
                            <h4>Tạo Nhóm</h4>
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
                            <Input className='input-name-group' placeholder="Nhập tên nhóm"
                                value={namegroup}
                                error={namegroup ? false : true}
                                onChange={(e) => setnamegroup(e.target.value)}
                            />
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
                                disabled={choosegroup && choosegroup.length > 1 ? false : true}
                                onClick={() => handleAddGroup()}
                            >
                                Tạo Nhóm
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