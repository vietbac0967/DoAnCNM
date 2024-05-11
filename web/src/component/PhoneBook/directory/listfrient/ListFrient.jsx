import React, { useEffect, useState } from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import './ListFrient.scss'
import { Scrollbars } from 'react-custom-scrollbars-2';
import SearchFriend from './search/SearchFriend';
import ChildFriend from './child/ChildFriend';
import removeDiacritics from 'remove-diacritics';
import _ from 'lodash';

const ListFrient = (props) => {

    const { setshowchat, dataredux, setuser, users } = props;

    const [listuser, setlistuser] = useState([]);

    const [value, setvalue] = useState(0);
    const [search, setsearch] = useState("")

    useEffect(() => {
        if (dataredux && dataredux.friends && dataredux.friends.length > 0) {
            if (value === +0) {
                setlistuser([...dataredux.friends].sort((a, b) => a.name.localeCompare(b.name)))
            } else {
                setlistuser([...dataredux.friends].sort((a, b) => b.name.localeCompare(a.name)))
            }
        }
    }, [])

    useEffect(() => {
            if (value === +0) {
                setlistuser([...dataredux.friends].sort((a, b) => a.name.localeCompare(b.name)))
            } else {
                setlistuser([...dataredux.friends].sort((a, b) => b.name.localeCompare(a.name)))
            }
    }, [dataredux])

    useEffect(() => {
        handleChangeValue()
    }, [value])

    const handleChangeValue = () => {
        if (dataredux && dataredux.friends && dataredux.friends.length > 0) {
            if (value === +0) {
                setlistuser([...dataredux.friends].sort((a, b) => a.name.localeCompare(b.name)))
            } else {
                setlistuser([...dataredux.friends].sort((a, b) => b.name.localeCompare(a.name)))
            }
        }
    }

    useEffect(() => {
        if (dataredux && dataredux.friends && dataredux.friends.length > 0) {
            if (search !== null) {
                let data = _.cloneDeep(dataredux.friends)
                let arr = data.filter(user => removeDiacritics(user.name.toLowerCase()).includes(removeDiacritics(search.toLowerCase())));
                setlistuser(arr);
            } else {
                handleChangeValue()
            }
        }

    }, [search])


    return (
        <Box className="list-friend-container">
            <HeaderDirectory
                titleHeader={{ title: "Danh Sách bạn bè", icon: <PersonIcon fontSize='large' /> }}
                setshowchat={setshowchat}
                users={users}
                dataredux={dataredux}
            />
            <Box className="list-frient-body">
                <Scrollbars style={{ width: '100%', height: '100%' }}>

                    <Box
                        className="quantity-friend"
                    >
                        <span className='text-quantity-friend'>
                            {
                                listuser
                                    && listuser.length > 0
                                    ?
                                    <>
                                        Bạn bè({listuser.length})
                                    </>
                                    :
                                    <></>
                            }
                        </span>
                    </Box>
                    <Box
                        className="list-show-friend"
                    >
                        <Box className="list-show-friend-search">
                            <SearchFriend
                                value={value}
                                setvalue={setvalue}
                                search={search}
                                setsearch={setsearch}
                            />
                        </Box>
                        <Box className="list-show-friend-get">
                            {
                                listuser
                                    && listuser.length > 0
                                    ? listuser.map((item, index) => {
                                        return (
                                            <Box key={`index-list-friend-${index}`}>
                                                <ChildFriend
                                                    user={item}
                                                    setuser={setuser}
                                                    handleChangeValue={handleChangeValue}
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

        </Box >
    );
};

export default ListFrient;