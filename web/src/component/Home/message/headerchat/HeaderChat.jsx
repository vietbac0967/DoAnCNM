import React, { useEffect, useRef, useState } from "react";
import { AvatarGroup, Box, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import "./HeaderChat.scss";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import _ from "lodash";
import { handleuserleavegroup } from "../../../../socket/socket";
import InfoModel from "../../../model/infoModel/InfoModel";
import InfoGroupModel from "../../../model/infogroupModel/InfoGroupModel";

const HeaderChat = (props) => {
  const { users, setshowchat, dataredux, setusers } = props;
  const showChatRef = useRef(null);

  const theme = useTheme();
  const mdup = useMediaQuery(theme.breakpoints.up("md"));
  const [user, setuser] = useState({});
  const [openmodelprivate, setopenprivate] = useState(false);
  const [openmodelgroup, setopengroup] = useState(false);

  useEffect(() => {
    if (users && !_.isEmpty(users)) {
      setuser(users);
    }
  }, []);

  useEffect(() => {
    if (users && !_.isEmpty(users)) {
      setuser(users);
    }
  }, [users]);

  const handleCancel = async () => {
    setshowchat(false);
    setusers({});
    if (users && !users.phoneNumber) {
      let data = {
        groupId: users._id,
        user: dataredux.phoneNumber,
        namegroup: users.name,
      };
      handleuserleavegroup(data);
    }
    // await handleGetAllFriend()
  };

  const handleCloseModelPrivate = () => {
    setopenprivate(false);
  };

  const handleCloseModelGroup = () => {
    setopengroup(false);
  };

  return (
    <Box className="header-chat-container">
      <Box display={mdup ? "none" : "block"} className="header-icon-goback">
        <IconButton onClick={() => handleCancel()}>
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box className="info-and-action">
        <Box className="info-user">
          {
            user && (user.type === "private" || user.phoneNumber) ? (
              <Avatar
                sx={{ width: 50, height: 50 }}
                alt="Remy Sharp"
                src={user.avatar}
                onClick={() => setopenprivate(true)}
              />
            ) : (user.type === "group" || !user.phoneNumber) && user.avatar ? (
              <Avatar
                sx={{ width: 50, height: 50 }}
                alt="Remy Sharp"
                src={user.avatar}
                onClick={() => setopengroup(true)}
              />
            ) : (
              <></>
            )
            // <AvatarGroup max={4}>
            //     {user && user.members && user.members.length > 0 &&
            //         user.members.slice(0, 3).map((member, index) => {
            //             return (
            //                 <Avatar
            //                     key={`avatar-${index}`}
            //                     sx={{ width: 40, height: 40 }}
            //                     src={member && member.avatar}

            //                 >
            //                 </Avatar>
            //             )
            //         }
            //         )}
            // </AvatarGroup>
          }

          <Box className="info-name-user">
            <h3>{user && user.name}</h3>
          </Box>
        </Box>
        <Box className="action-info">
          <IconButton
            type="button"
            aria-label="search"
            size={mdup ? "" : "small"}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            type="button"
            aria-label="search"
            size={mdup ? "" : "small"}
          >
            <LocalPhoneIcon />
          </IconButton>
          <IconButton
            type="button"
            aria-label="search"
            size={mdup ? "" : "small"}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
      <InfoModel
        open={openmodelprivate}
        handleCloseModel={handleCloseModelPrivate}
        handleShowChatUser={handleCloseModelPrivate}
        user={user}
      />
      <InfoGroupModel
        open={openmodelgroup}
        handleCloseModel={handleCloseModelGroup}
        handleShowChatUser={handleCloseModelGroup}
        user={user}
        setuser={setusers}
        setshowchat={setshowchat}
      />
    </Box>
  );
};

export default HeaderChat;
