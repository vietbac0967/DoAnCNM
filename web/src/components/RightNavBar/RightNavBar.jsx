import React from 'react'
import Box from '@mui/material/Box'
import FriendListComponent from '../Group/FriendListComponent/FriendListComponent'
import JoinedGroupComponent from '../Group/JoinedGroupComponent/JoinedGroupComponent'
import FriendRequestComponent from '../Group/FriendRequestComponent/FriendRequestComponent'
function RightNavBar() {
    return (
        <Box
            flex={8}
            bgcolor={'#B3C8CF'}
        >
            {/* <FriendListComponent /> */}
            {/* <JoinedGroupComponent /> */}
            <FriendRequestComponent />
        </Box>
    )
}

export default RightNavBar