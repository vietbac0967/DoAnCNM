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
import { Entypo, Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { URL_SERVER } from "@env";
import {
  deleteMessageService,
  getMessagesGroupService,
  recallMessageService,
  sendMessageGroupService,
} from "../services/message.service";
import * as ImagePicker from "expo-image-picker";
import MessageGroupCard from "../components/MessageGroupCard";
import Loading from "../components/Loading";
import {
  handleInConversation,
  handleJoinGroupSocket,
  handleReceiveInConversation,
  handleReceiveMessageInGroup,
  handleReceiveMessageInGroupSocket,
  handleRefreshUserInGroup,
  handleSendMessageInGroupSocket,
  handleSendNotificationToGroup,
} from "../utils/socket";
import { selectUser } from "../app/userSlice";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { sendNotificationService } from "../services/notification.service";
export default function ChatGroupScreen({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [selectMessage, setSelectMessage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const group = route.params?.group;
  const user = useSelector(selectUser);
  const [activeUsers, setActiveUsers] = useState([]);

  const getMessagesGroup = async () => {
    try {
      const response = await getMessagesGroupService(group._id);
      const { EM, EC, DT } = response;
      if (EC === 0 && EM === "Success") {
        setMessages(DT);
      }
      console.log("messages:", messages);
    } catch (error) {
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
        setIsLoading(true);
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
        const token = await AsyncStorage.getItem("accessToken");
        formData.append("groupId", group._id);
        const response = await axios.post(
          `${URL_SERVER}/api/message/sendImageGroup`,
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
          setIsLoading(false);
          handleSendMessageInGroupSocket({
            groupId: group._id,
            message: DT,
          });
          setMessage("");
          getMessagesGroup();
        } else {
          Alert.alert("Cảnh báo", EM);
        }
      }
    } catch (error) {
      Alert.alert("Cảnh báo", error.message);
    }
  };

  const handleSendFile = async () => {
    try {
      setIsLoading(true);
      const document = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });
      if (!document.canceled) {
        const formData = new FormData();
        formData.append("file", {
          uri: document.assets[0].uri,
          name: document.assets[0].name,
          type: document.assets[0].mimeType,
        });
        const token = await AsyncStorage.getItem("accessToken");
        formData.append("groupId", group._id);
        const response = await axios.post(
          `${URL_SERVER}/api/message/sendFileGroup`,
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
          setIsLoading(false);
          setMessages((prevMessages) => [...prevMessages, DT]);
          handleSendMessageInGroupSocket({
            groupId: group._id,
            message: DT,
          });
        } else {
          setIsLoading(false);
          Alert.alert("Cảnh báo", "Tải file không thành công");
        }
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert("Cảnh báo", "Tải file không thành công");
    }
  };

  const handleSendMessage = async () => {
    try {
      const response = await sendMessageGroupService(group._id, message);
      const { EM, EC, DT } = response;
      if (EC === 0 && EM === "Success") {
        handleSendMessageInGroupSocket({
          groupId: group._id,
          message: DT,
        });
        if (message.startsWith("@All")) {
          const response = await sendNotificationService(
            null,
            group._id,
            "text",
            message
          );
          const { EM, EC, DT } = response;
          if (EM === 0 && EC === "Success") {
            handleSendNotificationToGroup({
              groupId: group._id,
              message: DT,
            });
          } else {
            Alert.alert("Thông báo", "Gửi thông báo không thành công");
          }
        }
        setMessage("");
        getMessagesGroup();
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  const handleDeleteMessage = async () => {
    try {
      const response = await deleteMessageService(selectMessage?._id);
      const { EC, EM, DT } = response;
      if (EC === 0 && EM === "Success") {
        getMessagesGroup();
        setModalVisible(false);
      } else {
        Alert("Thông báo", "Xóa không thành công");
      }
    } catch (error) {
      Alert.alert("Error", error.message)
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
              const response = await recallMessageService(selectMessage?._id);
              const { EC, EM, DT } = response;
              if (EC === 0 && EM === "Success") {
                setModalVisible(false);
                handleSendMessageInGroupSocket({
                  groupId: group._id,
                  message: DT,
                });
                getMessagesGroup();
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

  useEffect(() => {
    if (group._id && user) {
      handleJoinGroupSocket({
        groupId: group._id,
        namegroup: group.name,
        user: user,
      });
    }
    getMessagesGroup();
  }, []);

  useEffect(() => {
    handleRefreshUserInGroup((data) => {
      console.log("user in group:::", data);
    });
  }, []);

  // add group id to socket

  useEffect(() => {
    handleReceiveMessageInGroupSocket((data) => {
      getMessagesGroup();
    });
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="chevron-back"
            size={24}
            color="#fff"
          />
          <Image
            style={{ width: 40, height: 40 }}
            resizeMode="cover"
            source={{ uri: group?.avatar }}
          ></Image>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {group?.name}
              </Text>
              <Text style={{ marginLeft: 10, color: "#fff" }}>
                {group?.members.length + 1} Thành viên
              </Text>
            </View>
          </View>
        </View>
      ),
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("GroupInfo", {
              groupId: group._id,
            });
          }}
        >
          <AntDesign name="bars" size={24} color="#fff" />
        </Pressable>
      ),
    });
  }, [navigation, group]);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={100}
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
              disabled={selectMessage.senderId?._id !== user?._id}
              onPress={handleRecallMessage}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                display:
                  selectMessage.senderId?._id === user?._id ? "flex" : "none",
              }}
            >
              <FontAwesome name="refresh" size={22} color="orange" />
              <Text style={{ textAlign: "center", fontWeight: "400" }}>
                Thu hồi tin nhắn
              </Text>
            </Pressable>
            {/* Chuyển tiếp tin nhắn */}
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
          <MessageGroupCard
            message={item}
            userId={user?._id}
            setModalVisible={setModalVisible}
            setModalImageVisible={setModalImageVisible}
            setSelectMessage={setSelectMessage}
          />
        )}
        keyExtractor={(item) => item._id}
      />
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
          <Ionicons name="image-outline" size={24} color="gray" onPress={pickImage} />
          
          <Ionicons
            name="document-text-outline"
            size={24}
            color="gray"
            onPress={handleSendFile}
          />
        </View>

        <Pressable
          onPress={() => handleSendMessage()}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
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
