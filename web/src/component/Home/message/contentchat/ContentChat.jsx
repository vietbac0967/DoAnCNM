import React, { useEffect, useRef, useState } from "react";
import { Box, OutlinedInput } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import "./ContentChat.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  sendMessageGroup,
} from "../../../../service/MessageService";
import {
  handlesendAllInfo,
  handlesendinfoAll,
  handlsendmessange,
  handlsendmessangeingroup,
} from "../../../../socket/socket";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import data from "@emoji-mart/data/sets/14/twitter.json";
import Picker from "@emoji-mart/react";
import _ from "lodash";

const ContentChat = (props) => {
  const { users, user, handleGetAllFriend, showchat, mdup } = props;

  const [chat, setchat] = useState("");
  const [userinfo, setuserinfo] = useState({});

  const [emoij, setemoij] = useState(false);

  // useEffect(() => {
  //     if (listfrient && listfrient.length > 0) {
  //         let index = listfrient.findIndex(item => item.click === true);
  //         if (index !== -1) {
  //             setuserinfo(listfrient[index])

  //         }
  //     }
  // }, [listfrient])

  useEffect(() => {
    if (users && !_.isEmpty(users)) {
      setuserinfo(users);
    }
  }, [users]);

  const dispatch = useDispatch();
  const dataredux = useSelector((state) => state.userisaccess.account);

  useEffect(() => {
    if (user && user.length > 0) setuserinfo(user[0]);
  }, [user]);

  const handleSendChat = async (e) => {
    console.log("user info is::", userinfo);
    if (e.key === "Enter") {
      if (chat) {
        if (userinfo && userinfo.type === "private") {
          let data = {
            receiverId: userinfo._id,
            content: chat,
          };
          let res = await sendMessage(data);
          if (res) {
            if (res.EC === 0) {
              setchat("");
              handlsendmessange({
                sender: { phone: dataredux.phoneNumber, userId: dataredux._id },
                receiver: { phone: userinfo.phoneNumber, userId: userinfo._id },
              });
              handlesendAllInfo({
                sender: { phone: dataredux.phoneNumber, userId: dataredux._id },
                receiver: { phone: userinfo.phoneNumber, userId: userinfo._id },
                type: "private",
              });
            }
          }
        } else {
          let data = {
            groupId: userinfo._id._id,
            content: chat,
          };
          let res = await sendMessageGroup(data);
          if (res) {
            if (res.EC === 0) {
              setchat("");
              handlsendmessangeingroup({ groupId: userinfo._id._id });
              handlesendAllInfo({
                groupId: userinfo._id._id,
                type: "group",
              });
            }
          }
        }
      }
    }
  };

  const handleStartemoij = () => {
    setemoij(!emoij);
  };

  const handleEmojiSelect = (emoij) => {
    setchat(chat + emoij.native);
  };

  return (
    <Box className="chat-infor-bottom-child-bottom">
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <AttachFileIcon />
      </IconButton>
      <Box className="div-input-and-emo">
        <OutlinedInput
          className="chat-infor-bottom-child-text"
          placeholder="Nhập tin nhắn muốn gửi"
          onKeyDown={(e) => handleSendChat(e)}
          value={chat}
          onChange={(e) => setchat(e.target.value)}
        />

        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          className="btn-emoij"
          onClick={() => handleStartemoij()}
        >
          <SentimentSatisfiedAltIcon />
        </IconButton>
        {emoij ? (
          <Box className="div-emoij">
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </Box>
        ) : (
          <Box></Box>
        )}
      </Box>
    </Box>
  );
};

export default ContentChat;
