import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { URL_SERVER } from "@env";

import { selectToken } from "../app/tokenSlice";
export default function ConversationCard({ item, navigation }) {
  console.log("URL_SERVER:::", URL_SERVER);
  const token = useSelector(selectToken);
  const [receiver, setReceiver] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  // const getNotifications = async () => {
  //   try {
  //     const response = await getNotificationService(token, receiver);
  //     const { EM, EC, DT } = response;
  //     if (EM === "Success" && EC === 0) {
  //       setNotifications(DT);
  //     } else {
  //       Alert.alert("Error", EM);
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", error.message);
  //   }
  // };

  useEffect(() => {
    // socket.current = io(URL_SERVER);
    // // socket.current = io("http://192.168.0.6:5000");
    // console.log("URL_SERVER:::", URL_SERVER);
    // if (item?.type === "private") {
    //   socket.current.emit("add-user", item?._id);
    //   setReceiver(item?._id);
    // } else {
    //   socket.current.emit("join-group", item?._id._id);
    //   setReceiver(item?._id._id);
    // }
    // getNotifications();
  }, []);

  // const handleReadNotification = async () => {
  //   try {
  //     const response = await readNotificationService(token, receiver);
  //     const { EM, EC } = response;
  //     if (EM === "Success" && EC === 0) {
  //       dispatch(setNotifications([]));
  //     } else {
  //       Alert.alert("Error", EM);
  //     }
  //   } catch (error) {
  //     Alert.alert("Error", error.message);
  //   }
  // };

  // console.log("notifications:::", notifications);
  return (
    <Pressable
      style={styles.btn}
      onPress={() => {
        if (item?.type === "private") {
          navigation.navigate("ChatScreen", {
            recevierId: item?._id,
          });
        } else {
          navigation.navigate("ChatGroup", {
            group: item?._id,
          });
        }
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{
          uri: item?.avatar || "https://avatar.iran.liara.run/public",
        }}
        defaultSource={require("../assets/avt.jpg")}
      ></Image>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>

        {notifications.length > 0 && (
          <>
            {notifications[notifications.length - 1]?.messageType ===
              "text" && (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {notifications[notifications.length - 1].content.length > 30
                    ? notifications[notifications.length - 1]?.content.slice(
                        0,
                        30
                      )
                    : notifications[notifications.length - 1]?.content}
                </Text>
                <Text>{notifications.length}</Text>
              </View>
            )}
            {notifications[notifications.length - 1].messageType ===
              "image" && (
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  [Hình ảnh]
                </Text>
                <Text>{notifications.length}</Text>
              </View>
            )}
          </>
        )}

        {item?.messageType === "text" &&
          (item?.message.length > 30 ? (
            <Text>{item.message.slice(0, 30)}</Text>
          ) : (
            <Text>{item.message}</Text>
          ))}
        {item?.messageType === "image" && <Text>[Hình ảnh]</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.7,
    borderColor: "#D0D0D0",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
  },
});
