import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  Alert,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  deleteMessageService,
  getMessagesService,
  recallMessageService,
  sendMessageService,
} from "../services/message.service";
import { getReceiverService } from "../services/user.service";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const ChatScreen = ({ navigation, route }) => {
  const token = useSelector((state) => state.token.token);
  // const ENDPOINT = "http://192.168.0.104/5000";
  // const socket = io(ENDPOINT);

  const [messages, setMessages] = useState([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const { recevierId } = route.params;
  const socket = useRef();
  const [selectMessage, setSetlectMessage] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Đang hoạt động"); // Trạng thái mặc định
  const [modalVisible, setModalVisible] = useState(false);
  const [receiver, setReceiver] = useState({});
  const scrollViewRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };
  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const getMessages = async () => {
    try {
      const response = await getMessagesService(token, recevierId);
      // console.log("response:::", response);
      setMessages(response);
    } catch (error) {
      console.log("error:::", error);
    }
  };

  const getReceiver = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await getReceiverService(token, recevierId);
      setReceiver(response);
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    socket.current = io("http://192.168.0.104:5000");
    socket.current.emit("add-user", recevierId);
  }, []);

  useEffect(() => {
    getMessages();
  }, []);
  // useEffect(() => {
  // }, []);
  const handleSend = async () => {
    try {
      const { DT, EC, EM } = await sendMessageService(
        token,
        recevierId,
        message
      );
      if (EC === 0 && EM === "Success") {
        socket.current.emit("send-msg", {
          from: DT.receiverId,
          to: DT.senderId,
          msg: DT.content,
        });
        setMessage("");
        getMessages();
        return;
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        getMessages();
      });
    }
  }, []);
  useEffect(() => {
    getReceiver();
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (time) => {
    const options = { hour: "numeric", minute: "numeric" };
    return new Date(time).toLocaleString("en-US", options);
  };
  const handleRecallMessage = (messageID) => {
    Alert.alert("Cảnh báo", "Bạn có muốn xóa tin nhắn này không?", [
      {
        text: "Không",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Có",
        onPress: async () => {
          const response = await recallMessageService(token, selectMessage._id);
          setModalVisible(false);
          if (response) {
            getMessages();
          }
        },
      },
    ]);
  };
  const handleDeleteMessage = async () => {
    try {
      const response = await deleteMessageService(token, selectMessage._id);
      const { EC, EM, DT } = response;
      if (EC === 0 && EM === "Success") {
        getMessages();
        setModalVisible(false);
      } else {
        Alert("Thông báo", "Xóa không thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={24} color="black" style={{marginTop: 30}}/>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={{ uri: receiver?.avatar }} style={styles.avatar} />
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={styles.headerText}>{receiver?.name}</Text>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => console.log("Call")}>
            <Ionicons name="call-outline" size={24} color="#566573" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Videocall")}
            style={styles.videocallButton}
          >
            <Ionicons name="videocam-outline" size={24} color="#566573" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Setting")}
            style={styles.settingButton}
          >
            <Ionicons name="list-outline" size={24} color="#566573" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      >
        {/* Header for user about image, name  */}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            style={styles.modalBackGround}
            activeOpacity={1}
            onPressOut={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              {/* xóa tin nhắn ở phía người gửi */}
              <Pressable
                onPress={handleDeleteMessage}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <EvilIcons name="trash" size={30} color="red" />
                <Text style={{ textAlign: "center", fontWeight: "400" }}>
                  Xóa tin nhắn
                </Text>
              </Pressable>
              {/* Thu hồi tin nhắn ở hai phía */}
              <Pressable
                disabled={selectMessage.receiverId !== receiver?._id}
                onPress={() => handleRecallMessage(message._id)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  display:
                    selectMessage.receiverId !== receiver?._id
                      ? "none"
                      : "flex",
                }}
              >
                <FontAwesome name="refresh" size={22} color="orange" />
                <Text style={{ textAlign: "center", fontWeight: "400" }}>
                  Thu hồi tin nhắn
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        {messages.length > 0 &&
          messages.map((message) => (
            <Pressable
              onPress={() => {
                setSetlectMessage(message);
                setModalVisible(true);
              }}
              key={message._id}
              style={[
                message.senderId?._id === receiver?._id
                  ? {
                      alignSelf: "flex-start",
                      backgroundColor: "white",
                      padding: 8,
                      margin: 10,
                      borderRadius: 7,
                      maxWidth: "60%",
                    }
                  : {
                      alignSelf: "flex-end",
                      backgroundColor: "#DCF8C6",
                      padding: 8,
                      maxWidth: "60%",
                      borderRadius: 7,
                      margin: 10,
                    },
              ]}
            >
              <Text style={{ fontSize: 13, textAlign: "left" }}>
                {message.content}
              </Text>
            </Pressable>
          ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 25,
        }}
      >
        <Entypo
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="emoji-happy"
          size={24}
          color="gray"
        />

        <TextInput
          inputMode="text"
          value={message}
          onChangeText={setMessage}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Type Your message..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          {/* <Entypo onPress={{}} name="camera" size={24} color="gray" /> */}

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable onPress={() => handleSend()}>
          {/* <Text style={{ color: "white", fontWeight: "bold" }}>Send</Text> */}
          <Ionicons name="send" size={24} color="#33D1FF" />
        </Pressable>
      </View>

      {showEmojiSelector && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((prevMessage) => prevMessage + emoji);
          }}
          style={{ height: 200 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(238, 240, 241)",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#eaeaea",
    position: "sticky",
    top: 0,
  },
  titleContainer: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    marginLeft: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 14,
    color: "#666",
  },
  rightIcons: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: 10,
    marginTop: 30,
  },
  videocallButton: {
    marginLeft: 15,
  },
  settingButton: {
    marginLeft: 15,
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#95E7FF",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ChatScreen;
