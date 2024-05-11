import React from 'react';
import './CheckBoxFriend.scss'
import { Avatar, Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const CheckBoxFriend = (props) => {

    const { item } = props;

    const handleChecked = (e) => {
        props.handleChoose({
            ...props.item, checked: e.target.checked
        })
    }

    return (
        <FormGroup className='check-box-friend-container'>
            <FormControlLabel control={
                <Checkbox
                    disabled={props.item.isexixst}
                    onChange={(e) => handleChecked(e)}
                    checked={props.item.checked}
                />
            } label={
                <Box className="check-box-friend-container-body">
                    <Box>
                        <Avatar
                            sx={{ width: 45, height: 45 }}
                            src={item && item.avatar}
                        >
                        </Avatar>
                    </Box>
                    <Box className="child-chat-right">
                        <h4>
                            {props.item && `${props.item.name}`}
                        </h4>
                    </Box>

                </Box>
            } />
        </FormGroup>
    );
};

export default CheckBoxFriend;