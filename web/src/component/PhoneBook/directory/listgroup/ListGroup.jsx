import React from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

const ListGroup = (props) => {

    const { setshowchat } = props;


    return (
        <div>
            <HeaderDirectory
                titleHeader={{ title: "Danh Sách Nhóm", icon: <PeopleOutlineIcon fontSize='large' /> }}
                setshowchat={setshowchat}
            />
        </div>
    );
};

export default ListGroup;