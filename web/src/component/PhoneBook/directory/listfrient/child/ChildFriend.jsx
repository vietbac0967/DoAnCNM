import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import "./ChildFriend.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InfoModel from "../../../../model/infoModel/InfoModel";
import { deleteFriend } from "../../../../../service/UserService";
import { fechUserToken } from "../../../../../redux/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { handlesendtext } from "../../../../../socket/socket";

const ChildFriend = (props) => {
  const { user, setuser, handleChangeValue, setpage } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [openmodel, setopenmodel] = useState(false);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowChatUser = () => {
    setuser(user);
    setpage(1);
  };

  const handleCloseModel = () => {
    setopenmodel(false);
  };

  const handledeleteFriend = async () => {
    let res = await deleteFriend({ friendId: user._id });
    if (res && res.EC === 0) {
      dispatch(fechUserToken());
      handlesendtext({ receiver: user.phoneNumber });
    }
  };

  return (
    <Box className="child-friend-container-1">
      <Box className="child-friend-info" onClick={() => handleShowChatUser()}>
        <Box className="child-friend-avt">
          <Avatar
            sx={{ width: 50, height: 50 }}
            alt="Remy Sharp"
            src={user && user.avatar}
          />
        </Box>
        <Box className="child-friend-name">{user && user.name}</Box>
      </Box>
      <Box className="child-friend-action">
        <IconButton onMouseDown={(e) => handleClick(e)}>
          <MoreHorizIcon />
        </IconButton>
      </Box>

      <Menu
        id="basic-button"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={() => setopenmodel(true)}>Xem Thông Tin</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handledeleteFriend()}>
          <span style={{ color: "red" }}>Xóa bạn</span>
        </MenuItem>
      </Menu>
      <InfoModel
        open={openmodel}
        handleCloseModel={handleCloseModel}
        user={user}
        handleShowChatUser={handleShowChatUser}
      />
    </Box>
  );
};

export default ChildFriend;
