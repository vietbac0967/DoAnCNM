import React from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const ListGroup = () => {
    return (
        <div>
            <HeaderDirectory
                titleHeader={{ title: "Danh Sách Nhóm", icon: <PeopleOutlineIcon fontSize='large' /> }}
            />
        </div>
    );
};

export default ListGroup;