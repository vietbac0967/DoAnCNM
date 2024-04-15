import {
  Alert,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { baseURL } from "../api/baseURL";
import { useSelector } from "react-redux";
import { Ionicons, AntDesign, EvilIcons } from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { io } from "socket.io-client";
import { URL_SERVER } from "@env";
import { getUserInfo } from "../services/user.service";
import {
  deleteMessageService,
  recallMessageService,
  sendMessageGroupService,
} from "../services/message.service";
import formatDateOrTime from "../utils/formatDateOrTime";
import * as ImagePicker from "expo-image-picker";
import MessageGroupCard from "../components/MessageGroupCard";
export default function ChatGroupScreen({ route, navigation }) {
  const token = useSelector((state) => state.token.token);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [selectMessage, setSelectMessage] = useState({});
  const inputRef = useRef(null);
  const socket = useRef();
  const user = useRef({});
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const group = route.params?.group;
  const scrollViewRef = useRef(null);
  const getMessagesGroup = async () => {
    try {
      const response = await baseURL.get("/message/messagesGroup", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          groupId: group._id,
        },
      });
      const { EM, EC, DT } = response.data;
      if (EC === 0 && EM === "Success") {
        setMessages(DT);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    }
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
        formData.append("groupId", group._id);
        const response = await baseURL.post(
          "/message/sendImageGroup",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const { DT, EC, EM } = response.data;
        if (EC === 0 && EM === "Success") {
          socket.current.emit("send-group-msg", {
            groupId: group._id,
            message: DT,
          });
          setMessage("");
          getMessagesGroup();
          return;
        }
      }
    } catch (error) {
      console.error("Error while picking image and sending message:", error);
      Alert.alert("Cảnh báo", "Kích thước ảnh quá lớn, vui lòng chọn ảnh khác");
    }
  };
  const handleSendMessage = async () => {
    try {
      const response = await sendMessageGroupService(token, group._id, message);
      const { EM, EC, DT } = response;
      console.log("DT:::", DT);
      if (EC === 0 && EM === "Success") {
        socket.current.emit("send-group-msg", {
          groupId: group._id,
          message: DT,
        });
        setMessage("");
        getMessagesGroup();
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };
  const handleContentSizeChange = () => {
    scrollToBottom();
  };

  const handleDeleteMessage = async () => {
    try {
      const response = await deleteMessageService(token, selectMessage?._id);
      const { EC, EM, DT } = response;
      console.log("response:::", response);
      if (EC === 0 && EM === "Success") {
        getMessagesGroup();
        setModalVisible(false);
      } else {
        Alert("Thông báo", "Xóa không thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleRecallMessage = async () => {
    try {
      Alert.alert("Cảnh báo", "Bạn có muốn thu hồi nhắn này không?", [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            try {
              const response = await recallMessageService(
                token,
                selectMessage?._id
              );
              console.log("response:::", response);
              const { EC, EM, DT } = response;
              if (EC === 0 && EM === "Success") {
                setModalVisible(false);
                socket.current.emit("recall-group-msg", {
                  groupId: group._id,
                  messageId: selectMessage?._id,
                });

                // Update the messages state by filtering out the deleted message
                setMessages((messages) =>
                  messages.filter(
                    (message) => message._id !== selectMessage._id
                  )
                );
              }
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const getInfo = async () => {
    try {
      const response = await getUserInfo(token);
      console.log("response:::", response);
      const { EM, EC, DT } = response;
      if (EC === 0 && EM === "Success") {
        user.current = DT;
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };
  useEffect(() => {
    getMessagesGroup();
    getInfo();
  }, []);
  // add socket id to room
  useEffect(() => {
    socket.current = io(URL_SERVER);
    socket.current.emit("join-group", group._id);
    return () => {
      socket.current.disconnect();
    };
  }, [group._id]);
  // envent receive message
  useEffect(() => {
    if (socket.current) {
      socket.current.on("group-msg-receive", (data) => {
        console.log("Received group message:", data);
        // Handle received message, e.g., update state to display the message
        setMessages((prevMessages) => [...prevMessages, data]);
        // getMessagesGroup();
      });
      socket.current.on("group-recall", (data) => {
        getMessagesGroup();
      });
    }
  }, []);
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
            <View>
              <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
                {group?.name}
              </Text>
              <Text>{group?.members.length + 1} Thành viên</Text>
            </View>
          </View>
        </View>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("GroupInfo", {
              group: group,
            });
          }}
        >
          <AntDesign name="bars" size={24} color="black" />
        </Pressable>
      ),
    });
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={1}
    >
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
              disabled={selectMessage.senderId?._id !== user.current?._id}
              onPress={handleRecallMessage}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                display:
                  selectMessage.senderId?._id === user.current?._id
                    ? "flex"
                    : "none",
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalImageVisible}
        onRequestClose={() => setModalImageVisible(false)}
      >
        <Pressable
          style={styles.modalBackGround}
          onPressOut={() => setModalImageVisible(false)}
        >
          <View style={styles.modalImageContainer}>
            <Image
              source={require("../assets/loading.gif")}
              style={{
                width: 100,
                height: 100,
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: -50 }, { translateY: -50 }],
              }}
            />
            <Image
              source={{ uri: selectMessage.content }}
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              resizeMode="contain"
            />
            <Feather
              name="x"
              size={25}
              color="#363636"
              style={{ position: "absolute", top: 50, right: 20 }}
              onPress={() => setModalImageVisible(false)}
            />
          </View>
        </Pressable>
      </Modal>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageGroupCard
            message={item}
            userId={user.current?._id}
            setModalVisible={setModalVisible}
            setModalImageVisible={setModalImageVisible}
            setSelectMessage={setSelectMessage}
          />
        )}
        keyExtractor={(item) => item._id}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={handleContentSizeChange}
      />
      {/* <ScrollView>
        {messages.length > 0 &&
          messages.map((message) => {
            const isCurrentUser = message.senderId?._id === user.current?._id;
            if (message.messageType === "text") {
              return (
                <View
                  key={message._id}
                  style={{
                    flexDirection: "row",
                    justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                    marginVertical: 10,
                  }}
                >
                  {!isCurrentUser && (
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        marginRight: 10,
                      }}
                      resizeMode="cover"
                      source={{ uri: message.senderId?.avatar }}
                    />
                  )}
                  <Pressable
                    key={message._id}
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    style={[
                      {
                        backgroundColor: isCurrentUser ? "#DCF8C6" : "white",
                        padding: 8,
                        borderRadius: 7,
                        maxWidth: "60%",
                        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 13,
                        textAlign: isCurrentUser ? "right" : "left",
                      }}
                    >
                      {message.content}
                    </Text>
                    <Text
                      style={{
                        textAlign: isCurrentUser ? "right" : "left",
                        fontSize: 9,
                        color: "gray",
                        marginTop: 5,
                      }}
                    >
                      {formatDateOrTime(message?.createdAt)}
                    </Text>
                  </Pressable>
                </View>
              );
            }
            // Return null for non-text messages
          })}
      </ScrollView> */}

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
          <Entypo
            onPress={() => {
              pickImage();
            }}
            name="camera"
            size={24}
            color="gray"
          />

          <Feather name="mic" size={24} color="gray" />
        </View>

        <Pressable onPress={() => handleSendMessage()}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(238, 240, 241)",
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
  modalImageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    elevation: 20,
    flexDirection: "row",
  },
});
