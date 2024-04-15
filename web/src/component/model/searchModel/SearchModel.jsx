import React from 'react';
import { Box } from '@mui/material'
import './SearchModel.scss'

const SearchModel = () => {
    return (
        <Box className="search-form-container">
            {/* {
                usersearch && !_.isEmpty(usersearch) ?
                    <>
                        <ChildFriend
                            item={usersearch}
                            textsearch={props.textsearch}
                            handleCloses={props.handleClose}
                        />
                    </>
                    :
                    <>
                        {
                            dataredux && dataredux.listfriend &&
                            dataredux.listfriend.map((item, index) => {
                                return (
                                    <ChildFriend key={`friend-${index}`}
                                        item={item}
                                        textsearch={props.textsearch}
                                        handleCloses={props.handleClose}

                                    />
                                )
                            })
                        }
                    </>
            } */}
        </Box>
    );
};

export default SearchModel;