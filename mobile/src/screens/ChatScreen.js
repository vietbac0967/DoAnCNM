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
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  deleteMessageService,
  getMessagesService,
  recallMessageService,
  sendImageService,
  sendMessageService,
} from "../services/message.service";
import { getReceiverService } from "../services/user.service";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { URL_SERVER } from "@env";
import { baseURL } from "../api/baseURL";
import ChatMessageItem from "../components/ChatMessageItem";
import MessageCard from "../components/MessageCard";
const ChatScreen = ({ navigation, route }) => {
  const token = useSelector((state) => state.token.token);
  const [messages, setMessages] = useState([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const { recevierId } = route.params;
  const socket = useRef();
  const inputRef = useRef(null);
  const [selectMessage, setSelectMessage] = useState({});
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
    inputRef.current.blur();
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        let localUri = result.assets[0].uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : "image";
        const formData = new FormData();
        formData.append("image", {
          uri: localUri,
          name: filename,
          type,
        });
        formData.append("receiverId", recevierId);
        const response = await baseURL.post("/message/sendImage", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        const { DT, EC, EM } = response.data;
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
      }
    } catch (error) {
      console.error("Error while picking image and sending message:", error);
      Alert.alert("Cảnh báo", "Kích thước ảnh quá lớn, vui lòng chọn ảnh khác");
    }
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
    socket.current = io(URL_SERVER);
    socket.current.emit("add-user", recevierId);
  }, []);

  useEffect(() => {
    getMessages();
  }, []);

  const handleSend = async () => {
    try {
      const { DT, EC, EM } = await sendMessageService(
        token,
        recevierId,
        message
      );
      console.log("DT:::", DT);
      if (EC === 0 && EM === "Success") {
        socket.current.emit("send-msg", {
          from: DT.receiverId,
          to: DT.senderId._id,
          msg: DT,
        });
        setMessage("");
        getMessages();
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (data) => {
        console.log("data:::", data);
        setMessages((prevMessages) => [...prevMessages, data.msg]);
      });
      socket.current.on("recall", (msg) => {
        // setMessages((prevMessages) => {
        //   const newMessages = prevMessages.map((message) => {
        //     if (message._id === msg._id) {
        //       return msg;
        //     }
        //     return message;
        //   });
        //   return newMessages;
        // });
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

  const formatDate = (date) => {
    const options = { hour: "2-digit", minute: "2-digit" };
    const formattedTime = new Date(date).toLocaleTimeString("vi-VN", options);
    return formattedTime;
  };
  const formatDateOrTime = (updatedAt) => {
    const today = new Date();
    const updatedAtDate = new Date(updatedAt);

    if (updatedAtDate.toDateString() === today.toDateString()) {
      // Display time if updatedAt is today
      return formatDate(updatedAt);
    } else {
      // Display full date if updatedAt is not today
      return updatedAtDate.toLocaleDateString("en-US");
    }
  };
  const handleRecallMessage = (messageID) => {
    Alert.alert("Cảnh báo", "Bạn có muốn thu hồi nhắn này không?", [
      {
        text: "Không",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Có",
        onPress: async () => {
          const response = await recallMessageService(token, selectMessage._id);
          const { EC, EM, DT } = response;
          setModalVisible(false);
          if (EC === 0 && EM === "Success") {
            socket.current.emit("recall-msg", {
              from: selectMessage.receiverId,
              to: selectMessage.senderId,
              msg: selectMessage.content,
            });
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
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                resizeMode: "cover",
              }}
              source={{ uri: receiver?.avatar }}
            />

            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
              {receiver?.name}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
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
      ),
    });
  }, [navigation, receiver]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={1}
      style={styles.container}
    >
      {/* <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      > */}
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
                  selectMessage.receiverId !== receiver?._id ? "none" : "flex",
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
      {/* 
      {messages.length > 0 &&
          messages.map((message) => {
            if (message.messageType === "text") {
              return (
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
                  <Text
                    style={{
                      textAlign: "right",
                      fontSize: 9,
                      color: "gray",
                      marginTop: 5,
                    }}
                  >
                    {formatDateOrTime(message?.createdAt)}
                  </Text>
                </Pressable>
              );
            }
            if (message.messageType === "image") {
              return (
                <Pressable
                  onPress={() => {
                    setSetlectMessage(message);
                    setModalVisible(true);
                  }}
                  key={message._id}
                  style={[
                    message?.senderId?._id !== recevierId
                      ? {
                          alignSelf: "flex-end",
                          // backgroundColor: "#DCF8C6",
                          padding: 8,
                          maxWidth: "60%",
                          borderRadius: 7,
                          margin: 10,
                        }
                      : {
                          alignSelf: "flex-start",
                          // backgroundColor: "white",
                          padding: 8,
                          margin: 10,
                          borderRadius: 7,
                          maxWidth: "60%",
                        },
                  ]}
                >
                  <View>
                    <Image
                      source={{ uri: message.content }}
                      resizeMode="cover"
                      style={{
                        width: 200,
                        height: 200,
                        borderRadius: 7,
                        alignItems: "flex-end",
                      }}
                    />
                    <Pressable
                      style={{
                        width: 70,
                        borderRadius: 35,
                        backgroundColor: "gray",
                        alignSelf: "flex-end",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 11,
                          color: "white",
                          paddingVertical: 5,
                          paddingHorizontal: 2,
                        }}
                      >
                        {formatDateOrTime(message?.createdAt)}
                      </Text>
                    </Pressable>
                  </View>
                </Pressable>
              );
            }
          })} */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageCard
            message={item}
            receiverId={recevierId}
            setModalVisible={setModalVisible}
            setSelectMessage={setSelectMessage}
            key={item._id}
          />
        )}
        keyExtractor={(item) => item._id}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      />
      {/* </ScrollView> */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: "#dddddd",
          marginBottom: showEmojiSelector ? 0 : 1,
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
          ref={inputRef}
          inputMode="text"
          value={message}
          onChangeText={setMessage}
          onFocus={() => setShowEmojiSelector(false)}
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholder="Nhập tin nhắn..."
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginHorizontal: 8,
          }}
        >
          <Entypo onPress={pickImage} name="camera" size={24} color="gray" />

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
          style={{ height: 320 }}
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
    flexDirection: "row",
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
    marginTop: 7,
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
