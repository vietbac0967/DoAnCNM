import React, { useEffect, useRef, useState } from "react";
import "./Message.scss";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import InfoChat from "./infochat/InfoChat";
import ContentChat from "./contentchat/ContentChat";
import HeaderChat from "./headerchat/HeaderChat";
import {
  handlerefreshMessange,
  handlerefreshMessangeingroup,
  handlerefreshMessangesennder,
} from "../../../socket/socket";
import {
  getAllMessage,
  getMessagesGroup,
} from "../../../service/MessageService";
import _ from "lodash";

const Message = (props) => {
  const {
    users,
    setshowchat,
    showchat,
    mdup,
    dataredux,
    setusers,
    setpage,
    page,
  } = props;

  const user = useRef({});

  useEffect(() => {
    if (user.current) {
      if (user.current.type === "private" || user.current.phoneNumber) {
        handlerefreshMessange(async (data) => {
          if (data.phone === user.current.phoneNumber) {
            await handleGetAllMessage({ userId: data.userId });
          }
        });
        handlerefreshMessangesennder(async (data) => {
          await handleGetAllMessage({ userId: data.userId });
        });
      } else {
        if (user.current.type === "group") {
          handlerefreshMessangeingroup(async (data) => {
            if (users && !_.isEmpty(users)) {
              if (data.groupId === users._id._id) {
                await handleGetAllMessageinGroup({ groupId: data.groupId });
              }
            }
          });
        } else {
          handlerefreshMessangeingroup(async (data) => {
            if (users && !_.isEmpty(users)) {
              if (data.groupId === users._id) {
                await handleGetAllMessageinGroup({ groupId: data.groupId });
              }
            }
          });
        }
      }
    }
  }, [user.current]);

  useEffect(() => {
    if (users && !_.isEmpty(users)) {
      let data = users;
      user.current = data;
      if (users && (users.type === "private" || users.phoneNumber)) {
        handleGetAllMessage({ userId: users._id });
      } else {
        if (users.type === "group") {
          handleGetAllMessageinGroup({ groupId: users._id._id });
        } else {
          handleGetAllMessageinGroup({ groupId: users._id });
        }
      }
    }
  }, [users]);

  const [listmessage, setlistmessage] = useState([]);

  const handleGetAllMessage = async (data) => {
    if (users && !_.isEmpty(users)) {
      let res = await getAllMessage({ receiverId: data.userId, page: page });
      if (res && res.EC === 0) {
        setlistmessage(res.DT);
      } else {
        setlistmessage([]);
      }
    }
  };

  const handleGetAllMessageinGroup = async (data) => {
    if (users && !_.isEmpty(users)) {
      let res = await getMessagesGroup(data.groupId);
      if (res && res.EC === 0) {
        setlistmessage(res.DT);
      } else {
        setlistmessage([]);
      }
    }
  };

  return (
    <Box className="message-container">
      <Box className="message-header">
        <HeaderChat
          users={users}
          setshowchat={setshowchat}
          dataredux={dataredux}
          setusers={setusers}
        />
      </Box>
      <Divider orientation="horizontal" />

      <Box className="message-info">
        <InfoChat
          users={users}
          handleGetAllMessage={handleGetAllMessage}
          setlistmessage={setlistmessage}
          listmessage={listmessage}
          user={user.current}
          handleGetAllMessageinGroup={handleGetAllMessageinGroup}
          page={page}
          setpage={setpage}
        />
      </Box>
      <Divider orientation="horizontal" />

      <Box className="message-content">
        <ContentChat
          users={users}
          user={user.current}
          showchat={showchat}
          setshowchat={setshowchat}
          mdup={mdup}
        />
      </Box>
    </Box>
  );
};

export default Message;
