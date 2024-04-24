import React from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import PersonIcon from '@mui/icons-material/Person';

const ListFrient = (props) => {

    const { setshowchat } = props;

    return (
        <div>
            <HeaderDirectory
                titleHeader={{ title: "Danh Sách bạn bè", icon: <PersonIcon fontSize='large' /> }}
                setshowchat={setshowchat}
            />
        </div>
    );
};

export default ListFrient;