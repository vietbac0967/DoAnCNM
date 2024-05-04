import React, { useEffect, useState } from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import _ from 'lodash';
import removeDiacritics from 'remove-diacritics';
import { Box } from '@mui/material';
import SearchGroup from './search/SearchGroup';
import ChildGroup from './child/ChildGroup';
import Scrollbars from 'react-custom-scrollbars-2';
import './ListGroup.scss'
import { GetGroupbyUser } from '../../../../service/GroupService';

const ListGroup = (props) => {

    const { setshowchat, dataredux, setuser, users } = props;

    const [listuser, setlistuser] = useState([]);

    const [value, setvalue] = useState(0);
    const [search, setsearch] = useState("")

    useEffect(() => {
        // if (dataredux && dataredux.groups && dataredux.groups.length > 0) {
        //     if (value === +0) {
        //         setlistuser([...dataredux.groups].sort((a, b) => a.name.localeCompare(b.name)))
        //     } else {
        //         setlistuser([...dataredux.groups].sort((a, b) => b.name.localeCompare(a.name)))
        //     }
        // }
        handleGetAllGroup()
    }, [])

    const handleGetAllGroup = async () => {
        if (dataredux) {
            let res = await GetGroupbyUser();
            if (res && res.EC === 0) {
                if (value === +0) {
                    setlistuser([...res.DT].sort((a, b) => a.name.localeCompare(b.name)))
                } else {
                    setlistuser([...res.DT].sort((a, b) => b.name.localeCompare(a.name)))
                }
            }
        }
    }

    useEffect(() => {
        handleChangeValue()
    }, [value])

    const handleChangeValue = () => {
        if (dataredux && dataredux.groups && dataredux.groups.length > 0) {
            if (value === +0) {
                setlistuser([...dataredux.groups].sort((a, b) => a.name.localeCompare(b.name)))
            } else {
                setlistuser([...dataredux.groups].sort((a, b) => b.name.localeCompare(a.name)))
            }
        }
    }

    useEffect(() => {
        if (dataredux && dataredux.groups && dataredux.groups.length > 0) {
            if (search !== null) {
                let data = _.cloneDeep(dataredux.groups)
                let arr = data.filter(user => removeDiacritics(user.name.toLowerCase()).includes(removeDiacritics(search.toLowerCase())));
                setlistuser(arr);
            } else {
                handleChangeValue()
            }
        }

    }, [search])


    return (
        <Box className="list-group-container">
            <HeaderDirectory
                titleHeader={{ title: "Danh Sách Nhóm", icon: <PeopleOutlineIcon fontSize='large' /> }}
                setshowchat={setshowchat}
                users={users}
                dataredux={dataredux}
            />
            <Box className="list-group-body">
                <Scrollbars style={{ width: '100%', height: '100%' }}>

                    <Box
                        className="quantity-group"
                    >
                        <span className='text-quantity-group'>
                            {
                                listuser
                                    && listuser.length > 0
                                    ?
                                    <>
                                        Nhóm và cộng đồng({listuser.length})
                                    </>
                                    :
                                    <></>
                            }
                        </span>
                    </Box>
                    <Box
                        className="list-show-group"
                    >
                        <Box className="list-show-group-search">
                            <SearchGroup
                                value={value}
                                setvalue={setvalue}
                                search={search}
                                setsearch={setsearch}
                            />
                        </Box>
                        <Box className="list-show-group-get">
                            {
                                listuser
                                    && listuser.length > 0
                                    ? listuser.map((item, index) => {
                                        return (
                                            <Box key={`index-list-group-${index}`}>
                                                <ChildGroup
                                                    user={item}
                                                    setuser={setuser}
                                                    dataredux={dataredux}
                                                    handleGetAllGroup={handleGetAllGroup}
                                                />
                                            </Box>

                                        )
                                    })
                                    :
                                    <></>
                            }
                        </Box>
                    </Box>
                </Scrollbars>
            </Box>
        </Box>
    );
};

export default ListGroup;