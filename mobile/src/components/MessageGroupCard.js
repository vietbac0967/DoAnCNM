import { Pressable, StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import formatDateOrTime from "../utils/formatDateOrTime";
import { Feather } from "@expo/vector-icons";
import { getUserByIdService } from "../services/user.service";
export default function MessageGroupCard({
  message,
  receiverId,
  setModalVisible,
  setModalImageVisible,
  setSelectMessage,
  userId,
  navigation,
}) {
  const [user, setuser] = useState({});

  let isCurrentUser = null;
  if (receiverId) {
    isCurrentUser = message.senderId?._id !== receiverId;
  }
  if (userId) {
    isCurrentUser = message.senderId?._id === userId;
  }

  const first5Chars = message.content.slice(0, 6);
  let isAnnounce = false;
  if (first5Chars.includes("##")) {
    isAnnounce = true;
  }

  if (message.messageType === "text" && isAnnounce) {
    if (
      message.content.includes("-id-1-") ||
      message.content.includes("-id-2-") ||
      message.content.includes("-id-3-") ||
      message.content.includes("##TB##")
    ) {
      const id = message.content.slice(9);
      const getUser = async () => {
        try {
          const response = await getUserByIdService(id);
          const { DT, EC, EM } = response;
          if (EC === 0 && EM === "Success") {
            setuser(DT);
          }
        } catch (error) {
          Alert.alert("Error", error.message);
        }
      };
      useEffect(() => {
        getUser();
      }, []);
    }
    return (
      <>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            backgroundColor: "white",
            marginVertical: 4,
            marginHorizontal: 20,
            borderWidth: 0.8,
            borderColor: "#ddd",
            paddingVertical: 5,
          }}
        >
          {message?.content.includes("-id-1-") && (
            <View>
              <Image
                source={{ uri: user?.avatar }}
                width={30}
                height={30}
                borderRadius={15}
                resizeMode="contain"
              ></Image>
              <Text>{user?.name} đã được bổ nhiệm thành phó nhóm</Text>
            </View>
          )}
          {message?.content.includes("-id-2-") && (
            <Text>{user?.name} đã rời khỏi nhóm</Text>
          )}
          {message?.content.includes("-id-3-") && (
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: user?.avatar }}
                width={30}
                height={30}
                borderRadius={15}
                resizeMode="contain"
              ></Image>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  paddingVertical: 5,
                  paddingHorizontal: 4,
                }}
              >
                {user?.name + " "}
              </Text>
              <Text style={{ paddingVertical: 4 }}>tham gia nhóm</Text>
            </View>
          )}
          {message?.content.includes("##TB##") && (
            <Text>{message?.content.slice(7)}</Text>
          )}
        </View>
      </>
    );
  }
  const directToFriendInfo = () => {
    navigation.navigate("FriendInfo", {
      receiverId: message.senderId?._id,
    });
  };

  if (message.messageType === "text" && !isAnnounce) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
          marginVertical: 5,
        }}
        key={message._id}
      >
        {!isCurrentUser && (
          <Pressable onPress={directToFriendInfo}>
            <Image
              style={{
                width: 25,
                height: 25,
                borderRadius: 20,
                marginRight: 10,
                marginLeft: 10,
              }}
              resizeMode="cover"
              source={{ uri: message.senderId?.avatar }}
              defaultSource={require("../assets/avt.jpg")}
            />
          </Pressable>
        )}
        <Pressable
          onLongPress={() => {
            setSelectMessage(message);
            setModalVisible(true);
          }}
          style={({ pressed }) => [
            {
              alignSelf: isCurrentUser ? "flex-end" : "flex-start",
              backgroundColor: isCurrentUser ? "#DCF8C6" : "white",
              paddingHorizontal: 8,
              paddingVertical: 5,
              maxWidth: "60%",
              borderWidth: 0.8,
              borderColor: "#ddd",
              borderRadius: 7,
              marginRight: isCurrentUser ? 10 : 0,
            },
            pressed && {
              opacity: 0.5,
              backgroundColor: isCurrentUser ? "#A3BA91" : "#A7A7A7",
            }, // Độ mờ thay đổi khi nhấn
          ]}
        >
          {!isCurrentUser && (
            <Text
              style={{
                fontSize: 10,
                textAlign: "left",
                fontWeight: "bold",
                color: "#1C2932",
              }}
            >
              {message.senderId?.name}
            </Text>
          )}
          <Text style={{ fontSize: 13, textAlign: "left", marginTop: 5 }}>
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
      </View>
    );
  }
  if (message.messageType === "image") {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
          marginVertical: 5,
        }}
        key={message._id}
      >
        {!isCurrentUser && (
          <Image
            style={{
              width: 25,
              height: 25,
              borderRadius: 20,
              marginLeft: 10,
            }}
            source={{ uri: message.senderId?.avatar }}
            defaultSource={require("../assets/avt.jpg")}
          />
        )}
        <Pressable
          onLongPress={() => {
            setSelectMessage(message);
            setModalVisible(true);
          }}
          onPress={() => {
            setSelectMessage(message);
            setModalImageVisible(true);
          }}
          style={[
            isCurrentUser
              ? {
                  alignSelf: "flex-end",
                  maxWidth: "60%",
                  borderRadius: 7,
                  marginRight: 10,
                  // margin: 10,
                }
              : {
                  alignSelf: "flex-start",
                  paddingHorizontal: 8,
                  borderRadius: 7,
                  maxWidth: "60%",
                },
          ]}
        >
          {!isCurrentUser && (
            <View
              style={{
                backgroundColor: "#fff",
                alignSelf: "flex-start",
                borderRadius: 15,
                marginBottom: 5,
                borderWidth: 0.8,
                borderColor: "#ddd",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  textAlign: "left",
                  fontWeight: "bold",
                  color: "#1C2932",
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                }}
              >
                {message.senderId?.name}
              </Text>
            </View>
          )}

          <Image
            source={{ uri: message.content }}
            resizeMode="cover"
            style={{
              width: 200,
              height: 200,
              borderRadius: 7,
            }}
            defaultSource={require("../assets/nopicture.jpg")}
          />
          <Pressable
            onPress={() => {
              setSelectMessage(message);
              setModalVisible(true);
            }}
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 9,
                color: "gray",
                paddingTop: 5,
                paddingHorizontal: 8,
              }}
            >
              {formatDateOrTime(message?.createdAt)}
            </Text>
          </Pressable>
        </Pressable>
      </View>
    );
  }
  if (message.messageType === "file") {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
          marginVertical: 5,
        }}
        key={message._id}
      >
        {!isCurrentUser && (
          <Image
            style={{
              width: 25,
              height: 25,
              borderRadius: 20,
              marginRight: 10,
              marginLeft: 10,
            }}
            resizeMode="cover"
            source={{ uri: message.senderId?.avatar }}
            defaultSource={require("../assets/avt.jpg")}
          />
        )}

        <Pressable
          onLongPress={() => {
            setSelectMessage(message);
            setModalVisible(true);
          }}
          style={({ pressed }) => [
            {
              alignSelf: isCurrentUser ? "flex-end" : "flex-start",
              backgroundColor: isCurrentUser ? "#DCF8C6" : "white",
              paddingHorizontal: 8,
              paddingVertical: 5,
              maxWidth: "60%",
              borderWidth: 0.8,
              borderColor: "#ddd",
              borderRadius: 7,
              marginRight: isCurrentUser ? 10 : 0,
            },
            pressed && {
              opacity: 0.5,
              backgroundColor: isCurrentUser ? "#A3BA91" : "#A7A7A7",
            }, // Độ mờ thay đổi khi nhấn
          ]}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Feather
              name="file"
              size={24}
              color="rgb(203,123,197)"
              style={{ marginRight: 10 }}
            />
            <View style={{}}>
              <Text style={{ fontSize: 13, textAlign: "left" }}>
                {message?.content.split("/").pop()}
              </Text>
              <Text style={{ fontSize: 9, color: "gray" }}>
                {(message?.fileSize / 1000).toFixed(2) + "KB"}
              </Text>
            </View>
          </View>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({});
