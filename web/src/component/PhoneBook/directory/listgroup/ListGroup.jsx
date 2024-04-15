import React, { useState } from 'react';
import HeaderDirectory from '../header/HeaderDirectory';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Typography } from '@mui/material';
import Group from './Group/Group';

const ListGroup = () => {
    const [openModalId, setOpenModalId] = useState(null);

    const handleOpen = (id) => {
        setOpenModalId(id);
    };

    const handleClose = () => {
        setOpenModalId(null);
    };
    const DUMMYDATA = [
        { id: '1', alt: 'Remy Sharp', src: 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800', name: 'Remy Sharp' },
        { id: '2', alt: 'Remy Sharp', src: 'https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800', name: 'Remy Sharp' }
    ];
    return (
        <div>
            <HeaderDirectory
                titleHeader={{ title: "Danh Sách Nhóm", icon: <PeopleOutlineIcon fontSize='large' /> }}
            />
            {DUMMYDATA.map(item => (
                <Group
                    key={item.id}
                    id={item.id}
                    alt={item.alt}
                    src={item.src}
                    name={item.name}
                    handleClick={handleOpen}
                    handleClose={handleClose}
                    openModalId={openModalId}
                />
            ))}
        </div>
    );
};

export default ListGroup;