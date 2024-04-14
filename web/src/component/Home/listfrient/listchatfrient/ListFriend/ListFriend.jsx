import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person'; // Import this MUI icon
import Friend from '../friend/Friend';

const ListFriend = () => {
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

            {DUMMYDATA.map(item => (
                <Friend
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

export default ListFriend;
