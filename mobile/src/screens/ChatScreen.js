import React, {
  useState,
  useEffect,
  useref,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo,
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
  ActivityIndicator,
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
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
// import * as ImagePicker from "expo-image-picker";
import { URL_SERVER } from "@env";
import MessageCard from "../components/MessageCard";
import {
  handlSendMessageSocket,
  handleInConversation,
  handleReceiveInConversation,
  handleRefreshMessageSenderSocket,
  handleRefreshMessageSocket,
  handleSendNotification,
} from "../utils/socket";
import axios from "axios";
import { selectUser } from "../app/userSlice";
import { sendNotificationService } from "../services/notification.service";
import Loading from "../components/Loading";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
const ChatScreen = ({ navigation, route }) => {
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
  const [activeUsers, setActiveUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  
  const handleEmojiPress = () => {
    setShowEmojiSelector(!showEmojiSelector);
    inputRef.current.blur();
  };

  const pickImage = async (status) => {
    try {
      let result;
      if (status === "camera") {
        result = await ImagePicker.launchCameraAsync({
          mediaType: "photo",
          aspect: [4, 3],
          quality: 1,
        });
      }
      if (status === "library") {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 1,
        });
      }
      if (!result.canceled) {
        setIsLoadingUpload(true);
        if (result.assets[0].type === "image") {
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
            setIsLoadingUpload(false);
            if (messages.length >= 20) {
              setMessages([DT, ...messages.slice(0, -1)]);
            } else {
              setMessages([DT, ...messages]);
            }
            handlSendMessageSocket({
              sender: { phone: user.phoneNumber, userId: user._id },
              receiver: { phone: receiver.phoneNumber, userId: receiver._id },
            });
          } else {
            Alert.alert("Cảnh báo", "Tải ảnh không thành công");
            setIsLoadingUpload(false);
          }
        } else {
          const formData = new FormData();
          formData.append("video", {
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
            type: result.assets[0].mimeType,
          });
          const token = await AsyncStorage.getItem("accessToken");
          formData.append("receiverId", recevierId);
          const response = await axios.post(
            `${URL_SERVER}/api/message/sendVideo`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const { EC, EM } = response.data;
          if (EC === 0) {
            handlSendMessageSocket({
              sender: { phone: user.phoneNumber, userId: user._id },
              receiver: { phone: receiver.phoneNumber, userId: receiver._id },
            });
            setIsLoadingUpload(false);
          } else {
            Alert.alert("Cảnh báo", "Tải video không thành công");
            setIsLoadingUpload(false);
          }
        }
      }
    } catch (error) {
      setIsLoadingUpload(false);
      Alert.alert("Cảnh báo", "Hình ảnh quá lớn, vui lòng chọn hình ảnh khác");
    }
  };

  const handleSendFile = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });
      if (!document.canceled) {
        setIsLoadingUpload(true);
        const formData = new FormData();
        formData.append("file", {
          uri: document.assets[0].uri,
          name: document.assets[0].name,
          type: document.assets[0].mimeType,
        });
        const token = await AsyncStorage.getItem("accessToken");
        formData.append("receiverId", recevierId);
        const response = await axios.post(
          `${URL_SERVER}/api/message/sendFile`,
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
          setIsLoadingUpload(false);
          setMessages([DT, ...messages.slice(0, -1)]);
          handlSendMessageSocket({
            sender: { phone: user.phoneNumber, userId: user._id },
            receiver: { phone: receiver.phoneNumber, userId: receiver._id },
          });
        } else {
          setIsLoadingUpload(false);
          Alert.alert("Cảnh báo", "Tải file không thành công");
        }
      }
    } catch (error) {
      setIsLoadingUpload(false);
      Alert.alert("Cảnh báo", "Tải file không thành công");
    }
  };

  const handleSend = async () => {
    try {
      const { DT, EC, EM } = await sendMessageService(recevierId, message);
      if (EC === 0 && EM === "Success") {
        if (messages.length >= 20) {
          setMessages([DT, ...messages.slice(0, -1)]);
        } else {
          setMessages([DT, ...messages]);
        }
        handlSendMessageSocket({
          sender: { phone: user.phoneNumber, userId: user._id },
          receiver: { phone: receiver.phoneNumber, userId: receiver._id },
        });
        if (
          !activeUsers.some((user) => user.customId === receiver.phoneNumber)
        ) {
          handleSendNotification({ receiver, message: DT });
          const response = await sendNotificationService(
            recevierId,
            null,
            "text",
            message
          );
          const { EC, EM } = response;
          if (EC === 0 && EM === "Success") {
            console.log("Send notification success");
          } else {
            console.log("Send notification failed");
            throw new Error(EM);
          }
        }
      }
      setMessage("");
    } catch (error) {
      setIsLoading(false);
      setIsRefreshing(false);
      console.log("error:::", error);
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
          const response = await recallMessageService(selectMessage._id);
          setModalVisible(false);
          const { EC, EM, DT } = response;
          if (EC === 0 && EM === "Success") {
            setMessages(
              messages.filter((message) => message._id !== selectMessage._id)
            );
            handlSendMessageSocket({
              sender: { phone: user.phoneNumber, userId: user._id },
              receiver: {
                phone: receiver.phoneNumber,
                userId: receiver._id,
              },
            });
          }
        },
      },
    ]);
  };

  const handleDeleteMessage = async () => {
    try {
      const response = await deleteMessageService(selectMessage._id);
      const { EC, EM, DT } = response;
      if (EC === 0 && EM === "Success") {
        setModalVisible(false);
        setMessages(
          messages.filter((message) => message._id !== selectMessage._id)
        );
        setIsLoading(false);
        setIsRefreshing(false);
        console.log("current page is", currentPage);
      } else {
        Alert("Thông báo", "Xóa không thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async () => {
    setIsLoading(true);
    try {
      const response = await getMessagesService(recevierId, currentPage);
      if (isRefreshing) {
        setMessages(response);
      } else {
        setMessages([...messages, ...response]);
      }
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.log("error:::", error.message);
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const getReceiver = async () => {
    try {
      const response = await getReceiverService(recevierId);
      setReceiver(response);
    } catch (error) {
      console.log("error:::", error);
    }
  };
  // fetching data
  useEffect(() => {
    // if (user) {
    handleRefreshMessageSocket(async (data) => {
      console.log("data refresh message:::", data);
      await refreshMessages();
      getMessages();
    });
    // });
    // handleReceiveInConversation(async (data) => {
    //   console.log("data user avtive is:::", data);
    //   setActiveUsers(data);
    // });
    // handleRefreshMessageSenderSocket(async (data) => {
    //   console.log("data message sender:::", data);
    //   getMessages();
    // });
  }, []);
  const refreshMessages = async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
  };
  const renderLoader = () => {
    return isLoading && messages.length > 0 ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    ) : null;
  };
  const handleLoadMore = () => {
    if (!isLoading) {
      setCurrentPage(currentPage + 1);
    }
  };
  useEffect(() => {
    getMessages();
  }, [currentPage]);

  useEffect(() => {
    getReceiver();
  }, []);

  useEffect(() => {
    handleInConversation({
      customId: user.phoneNumber,
    });
  }, [user]);

  // info receiver
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
          <Pressable
            onPress={() =>
              navigation.navigate("Setting", {
                receiverId: receiver._id,
              })
            }
            style={styles.settingButton}
          >
            <Ionicons name="list" size={24} color="#fff" />
          </Pressable>
        </View>
      ),
    });
  }, [navigation, receiver]);

  if (isLoadingUpload) {
    return <Loading content={""} />;
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={styles.container}
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
          />
        )}
        keyExtractor={(item) => item._id}
        // ListFooterComponent={renderLoader}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        onRefresh={refreshMessages}
        refreshing={isRefreshing}
        inverted
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
          <Ionicons
            name="image-outline"
            size={24}
            color="gray"
            onPress={handlePresentModalPress}
          />
          <Ionicons
            name="document-text-outline"
            size={24}
            color="gray"
            onPress={handleSendFile}
          />
        </View>

        <Pressable
          onPress={() => handleSend()}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Ionicons name="send" size={24} color="#33D1FF" />
        </Pressable>
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Pressable
            style={styles.btn}
            onPress={() => {
              pickImage("camera");
            }}
          >
            <Feather name="camera" size={24} color="black" />
            <Text
              style={{ textAlign: "center", fontSize: 13, paddingLeft: 20 }}
            >
              Chụp Ảnh
            </Text>
          </Pressable>

          <Pressable
            style={styles.btn}
            onPress={() => {
              pickImage("library");
            }}
          >
            <MaterialIcons name="library-books" size={24} color="black" />
            <Text
              style={{ textAlign: "center", fontSize: 13, paddingLeft: 20 }}
            >
              Thư viện của bạn
            </Text>
          </Pressable>
        </BottomSheetView>
      </BottomSheetModal>

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
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#A3D8FF",
    borderRadius: 20,
    padding: 10,
    marginVertical: 15,
    width: "90%",
  },
});

export default ChatScreen;
