import React from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import PersonIcon from '@mui/icons-material/Person';

const ListFrient = () => {
    return (
        <div>
            <HeaderDirectory
                titleHeader={{ title: "Danh Sách bạn bè", icon: <PersonIcon fontSize='large' /> }}
            />
        </div>
    );
};

export default ListFrient;