import React, {
  useState,
  useEffect,
  useref,
  useLayoutEffect,
  useCallback,
  useRef,
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
import { getReceiverService, getuser } from "../services/user.service";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { URL_SERVER } from "@env";
import MessageCard from "../components/MessageCard";
import {
  handlSendMessageSocket,
  handleRefreshMessageSenderSocket,
  handleRefreshMessageSocket,
} from "../utils/socket";
import axios from "axios";
import { selectToken } from "../app/tokenSlice";
import { selectUser } from "../app/userSlice";
const ChatScreen = ({ navigation, route }) => {
  const token = useSelector(selectToken);
  const [messages, setMessages] = useState([]);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const { recevierId } = route.params;
  const inputRef = useRef(null);
  const [selectMessage, setSelectMessage] = useState({});
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Đang hoạt động"); // Trạng thái mặc định
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [receiver, setReceiver] = useState({});
  const scrollViewRef = useRef(null);
  const user = useSelector(selectUser);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  console.log("user in chat screen:::", user);

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
        const response = await axios.post(
          `${URL_SERVER}/api/message/sendImage`,
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
          handlSendMessageSocket({
            sender: { phone: user.phoneNumber, userId: user._id },
            receiver: { phone: receiver.phoneNumber, userId: receiver._id },
          });
          setMessage("");
          getMessages();
        }else{
          Alert.alert("Cảnh báo", EM)
        }
      }
    } catch (error) {
      Alert.alert("Cảnh báo", error.message);
    }
  };
  // get all messages of conversation
  const getMessages = async () => {
    try {
      const response = await getMessagesService(token, recevierId);
      setMessages(response);
    } catch (error) {
      console.log("error:::", error);
    }
  };

  const getReceiver = async () => {
    try {
      // const token = await AsyncStorage.getItem("token");
      const response = await getReceiverService(token, recevierId);
      setReceiver(response);
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    if (user) {
      handleRefreshMessageSocket(async (data) => {
        console.log("data refresh message:::", data);
        getMessages();
      });
      handleRefreshMessageSenderSocket(async (data) => {
        console.log("data message sender:::", data);
        getMessages();
      });
    }
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
      if (EC === 0 && EM === "Success") {
        handlSendMessageSocket({
          sender: { phone: user.phoneNumber, userId: user._id },
          receiver: { phone: receiver.phoneNumber, userId: receiver._id },
        });
        setMessage("");
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };

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
            handlSendMessageSocket({
              sender: { phone: user.phoneNumber, userId: user._id },
              receiver: {
                phone: receiver.phoneNumber,
                userId: receiver._id,
              },
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
            name="chevron-back-outline"
            size={24}
            color="#fff"
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                resizeMode: "cover",
              }}
              source={{ uri: receiver?.avatar }}
              defaultSource={require("../assets/avt.jpg")}
            />

            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {receiver?.name && receiver.name.length > 17
                ? receiver.name.substring(0, 17) + "..."
                : receiver.name}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => (
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => console.log("Call")}>
            <Ionicons name="call" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Videocall")}
            style={styles.videocallButton}
          >
            <Ionicons name="videocam" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Setting")}
            style={styles.settingButton}
          >
            <Ionicons name="list" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, receiver]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
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
            <Pressable
              onPress={() => {
                navigation.navigate("ForwardMessage", {
                  messageId: selectMessage._id,
                });
                setModalVisible(false);
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Entypo name="forward" size={24} color="#9AC8CD" />
              <Text>Chuyển tiếp</Text>
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
          <MessageCard
            message={item}
            receiverId={recevierId}
            setModalVisible={setModalVisible}
            setModalImageVisible={setModalImageVisible}
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
        <Ionicons
          onPress={handleEmojiPress}
          style={{ marginRight: 5 }}
          name="happy-outline"
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
          <Ionicons name="image" size={24} color="gray" onPress={pickImage} />

          <Ionicons name="mic" size={24} color="gray" />
        </View>

        <Pressable onPress={() => handleSend()} style={({pressed}) => ({opacity: pressed ? 0.5 : 1 })}>
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
    marginRight: 3,
    marginTop: 3,
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
  modalImageContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    elevation: 20,
    flexDirection: "row",
  },
});

export default ChatScreen;
