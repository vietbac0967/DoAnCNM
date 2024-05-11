import { Avatar, Box, Divider, Drawer, IconButton } from '@mui/material';
import React from 'react';
import './DrawerAddGroup.scss'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Scrollbars from 'react-custom-scrollbars-2';
import CancelIcon from '@mui/icons-material/Cancel';

const DrawerAddGroup = (props) => {

    const { opendrawer, choosegroup, handleCancelAdds } = props;

    const handleCancelAdd = (item) => {
        handleCancelAdds(item)
    }


    return (
        <Drawer
            PaperProps={{
                style: {
                    height: '40%',
                    width: '300px',
                    border: 1,
                    borderStyle: 'solid',
                    borderRadius: 5,
                    borderColor: "#eeeeee"
                },
            }}
            variant="persistent"
            anchor="right"
            open={opendrawer}
        >
            <Box className='drawer-container'
            >
                <IconButton color='primary'
                    onClick={() => props.handleoffdrawer()}
                >
                    <ChevronRightIcon />
                </IconButton>
                <Divider />
                <Box className="drawer-body">
                    <Scrollbars style={{ width: "100%", height: "100%" }}>
                        {
                            choosegroup && choosegroup.length > 0
                            && choosegroup.map((item, index) => {
                                return (
                                    <Box className="drawer-child" key={`child-drawer-${index}`}>
                                        <Box className="drawer-child-left">
                                            <Box>
                                                <Avatar
                                                    sx={{ width: 30, height: 30 }}
                                                    src={item && item.avatar}
                                                >

                                                </Avatar>
                                            </Box>
                                            <Box className="child-chat-right">
                                                <h4 className='text-drawer'>
                                                    {item && `${item.name}`}
                                                </h4>
                                            </Box>
                                        </Box>
                                        <Box className="drawer-child-right">
                                            <IconButton color='primary' size='small'
                                                onClick={() => handleCancelAdd(item)}
                                            >
                                                <CancelIcon />
                                            </IconButton>
                                        </Box>

                                    </Box>
                                )
                            })
                        }
                    </Scrollbars>
                </Box>

            </Box>
        </Drawer>
    );
};

export default DrawerAddGroup;