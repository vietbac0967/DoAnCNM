import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import formatDateOrTime from "../utils/formatDateOrTime";
import {
  handleReceiveNotification,
  handleRefreshNotificationToGroup,
} from "../utils/socket";
import {
  getNotificationService,
  readNotificationService,
} from "../services/notification.service";
import { selectUser } from "../app/userSlice";
export default function ConversationCard({ item, navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (item?.type === "private") {
      setReceiver(item?._id);
    } else {
      setReceiver(item?._id._id);
    }
  }, []);
  const handleReadNotification = async () => {
    try {
      if (receiver) {
        const response = await readNotificationService(receiver);
        const { EM, EC } = response;
        if (EM === "Success" && EC === 0) {
          getNotifications();
        } else {
          Alert.alert("Error", EM);
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  const getNotifications = async () => {
    try {
      if (receiver) {
        const response = await getNotificationService(receiver);
        const { EM, EC, DT } = response;
        if (EM === "Success" && EC === 0) {
          setNotifications(DT);
        } else {
          Alert.alert("Error", EM);
        }
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  useEffect(() => {
    getNotifications();
  }, [receiver]);

  useEffect(() => {
    if (item?.type === "private") {
      handleReceiveNotification((data) => {
        console.log("data notification is:::", data);
        if (data?.message.senderId._id === item?._id) {
          // setReceiver(data?.message.senderId._id);
          // setNotification(data?.message.content);
          setNotifications((prev) => [...prev, data.message]);
        }
      });
    }
    if (item?.type === "group") {
      handleRefreshNotificationToGroup((data) => {
          console.log("data notification is:::", data);
        if (data?.groupId === item?._id._id) {
          setNotifications((prev) => [...prev, data.message]);
        }
      });
    }
  }, []);

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? "#E5E5E5" : "#F1F1F1" },
        styles.btn,
      ]}
      onPress={() => {
        if (item?.type === "private") {
          handleReadNotification();
          navigation.navigate("ChatScreen", {
            recevierId: item?._id,
          });
        } else {
          handleReadNotification();
          navigation.navigate("ChatGroup", {
            group: item?._id,
          });
        }
      }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{
            uri: item?.avatar || "https://avatar.iran.liara.run/public",
          }}
          defaultSource={require("../assets/avt.jpg")}
        ></Image>
        {item?.type === "private" ? (
          <View
            style={{
              padding: 1,
              height: 18,
              width: 18,
              borderRadius: 20,
              borderColor: "#F1F1F1",
              borderWidth: 2.5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#19F719",
              position: "absolute",
              bottom: -2,
              right: -2,
            }}
          ></View>
        ) : (
          <View
            style={{
              padding: 1,
              height: 23,
              width: 23,
              borderRadius: 20,
              borderColor: "#F1F1F1",
              borderWidth: 2.5,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#8FB6FF",
              position: "absolute",
              bottom: -3,
              right: -3,
            }}
          >
            <Text style={{ fontSize: 8, fontWeight: "bold" }}>
              {item.members && item.members.length > 0
                ? item.members.length + 1
                : ""}
            </Text>
          </View>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {notifications.length > 0 ? (
            <>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                {notifications[notifications.length - 1]?.content}
              </Text>
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "red",
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center", // Add this
                    justifyContent: "center",
                  }}
                >
                  {notifications.length}
                </Text>
              </View>
            </>
          ) : (
            <>
              {/* <View>
                {item?.messageType === "text" ? (
                  item?.message.content.slice(0, 6) === "##TB##" ? (
                    <Text style={{ color: "gray" }}>
                      {item.message.content.length > 37
                        ? item.message.content.slice(0, 37).slice(7) + "..."
                        : item.message.content}
                    </Text>
                  ) : (
                    <Text style={{ color: "gray" }}>
                      {item.message.senderId !== item?._id ? "Bạn: " : ""}
                      {item.message.content.length > 11
                        ? item.message.content.slice(0, 11) + "..."
                        : item.message.content}
                    </Text>
                  )
                ) : item?.messageType === "image" ? (
                  <Text style={{ color: "gray" }}>
                    {item.message.senderId !== item?._id ? "Bạn: " : ""}
                    [Hình ảnh]
                  </Text>
                ) : (
                  <Text style={{ color: "gray" }}>
                    Hãy trò chuyện cùng nhau nào!
                  </Text>
                )}
              </View> */}
              <View>
                {(() => {
                  let messageContent = "";
                  let senderPrefix = "";

                  if (item?.messageType === "text") {
                    if (item?.message.content.slice(0, 6) === "##TB##") {
                      messageContent =
                        item.message.content.length > 37
                          ? item.message.content.slice(0, 37).slice(7) + "..."
                          : item.message.content;
                    } else {
                      senderPrefix =
                        item.message.senderId !== item?._id ? "Bạn: " : "";
                      messageContent =
                        item.message.content.length > 11
                          ? item.message.content.slice(0, 11) + "..."
                          : item.message.content;
                    }
                  } else if (item?.messageType === "image") {
                    senderPrefix =
                      item.message.senderId !== item?._id ? "Bạn: " : "";
                    messageContent = "[Hình ảnh]";
                  } else if (item?.messageType === "video") {
                    item.message.senderId !== item?._id ? "Bạn: " : "";
                    messageContent = "[Video]";
                  } else if (item?.messageType === "file") {
                    item.message.senderId !== item?._id ? "Bạn: " : "";
                    messageContent = "[File]";
                  } else {
                    messageContent = "Hãy trò chuyện cùng nhau nào!";
                  }
                  return (
                    <Text style={{ color: "gray" }}>
                      {senderPrefix}
                      {messageContent}
                    </Text>
                  );
                })()}
              </View>

              <View>
                <Text style={{ color: "gray" }}>
                  {item.message.createdAt
                    ? formatDateOrTime(item.message.createdAt)
                    : ""}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",

    padding: 10,
  },
});
