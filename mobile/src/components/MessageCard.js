import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import formatDateOrTime from "../utils/formatDateOrTime";
import { Video, ResizeMode } from "expo-av";
import { Feather } from "@expo/vector-icons";
export default function MessageCard({
  message,
  receiverId,
  setModalVisible,
  setModalImageVisible,
  setSelectMessage,
  userId,
}) {
  const video = useRef(null);
  let isCurrentUser = null;
  if (receiverId) {
    isCurrentUser = message.senderId?._id !== receiverId;
  }
  if (userId) {
    isCurrentUser = message.senderId?._id === userId;
  }
  if (message.messageType === "text") {
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
              marginRight: 2,
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
                }
              : {
                  alignSelf: "flex-start",
                  paddingHorizontal: 8,
                  borderRadius: 7,
                  maxWidth: "60%",
                },
          ]}
        >
          <Image
            source={{ uri: message.content }}
            resizeMode="cover"
            style={{
              width: 200,
              height: 200,
              borderRadius: 7,
              alignItems: "flex-end",
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
  if (message.messageType === "video") {
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
              marginRight: 2,
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
          onPress={() => {
            setSelectMessage(message);
            // setModalImageVisible(true);
          }}
          style={[
            isCurrentUser
              ? {
                  alignSelf: "flex-end",
                  maxWidth: "60%",
                  borderRadius: 7,
                  marginRight: 10,
                }
              : {
                  alignSelf: "flex-start",
                  paddingHorizontal: 8,
                  borderRadius: 7,
                  maxWidth: "60%",
                },
          ]}
        >
          <Video
            ref={video}
            source={{ uri: message.content }}
            style={styles.video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
          <Pressable
            onPress={() => {
              setSelectMessage(message);
              setModalVisible(true);
            }}
            style={{
              alignSelf: "flex-end",
              backgroundColor: "gray",
              borderRadius:20,
              marginTop:5,
              alignItems:"center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 9,
                color: "white",
                paddingTop: 5,
                paddingHorizontal: 5,
                paddingVertical:2
              }}
            >
              {formatDateOrTime(message?.createdAt)}
            </Text>
          </Pressable>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    width: 320,
    height: 200,
    alignItems: "flex-end",
  },
});
