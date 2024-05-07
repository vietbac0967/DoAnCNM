import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material'
import './SearchModel.scss'
import ChildFriend from './child/ChildFriend';

const SearchModel = (props) => {

    const { dataredux, handleClick, search } = props

    const [listuser, setlistuser] = useState([]);

    useEffect(() => {
        if (dataredux) {
            if (dataredux.friends && dataredux.friends.length > 0) {
                setlistuser(dataredux.friends)
            }
        }
    }, [])

    useEffect(() => {
        if (dataredux) {
            if (dataredux.friends && dataredux.friends.length > 0) {
                setlistuser(dataredux.friends)
            }
        }
    }, [dataredux])

    useEffect(() => {
        if (search) {
            if (dataredux) {
                if (dataredux.friends && dataredux.friends.length > 0) {
                    let arr = [];
                    let index = dataredux.friends.findIndex((item) => item.phoneNumber === search)
                    if (index !== -1) {
                        arr.push(dataredux.friends[index])
                        setlistuser(arr)
                    }
                }
            }
        }
    }, [search])

    return (
        <Box className="search-form-container">
            {
                listuser.map((item, index) => {
                    return (
                        <Box key={`search-form-${index}`}>
                            <ChildFriend
                                user={item}
                                handleClick={handleClick}
                            />
                        </Box>
                    )
                })
            }
        </Box>
    );
};

export default SearchModel;