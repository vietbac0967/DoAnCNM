import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import formatDateOrTime from "../utils/formatDateOrTime";

export default function MessageGroupCard({
  message,
  receiverId,
  setModalVisible,
  setModalImageVisible,
  setSelectMessage,
  userId,
}) {
  let isCurrentUser = null;
  if (receiverId) {
    isCurrentUser = message.senderId?._id !== receiverId;
  }
  if (userId) {
    isCurrentUser = message.senderId?._id === userId;
  }
  const first5Chars = message.content.slice(0, 6);
  let isAnnounce = false;
  if (first5Chars === "##TB##") { isAnnounce = true; }
  if (message.messageType === "text" && isAnnounce) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
           borderRadius: 7, margin: 5
        }}
       
      >
        <Text style={{ fontSize: 13, padding:3, textAlign: 'center', color: "gray" }}>{message.content.slice(7)}</Text>
      </View>
    );
  }

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
            pressed && { opacity: 0.5, backgroundColor: isCurrentUser ? "#A3BA91" : "#A7A7A7" }, // Độ mờ thay đổi khi nhấn
          ]}
        >
          {!isCurrentUser && (
          <Text style={{ fontSize: 10, textAlign: "left", fontWeight: "bold", color: "#1C2932" }}>
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
          <View style={{ backgroundColor: "#fff", alignSelf: "flex-start", borderRadius: 15, marginBottom: 5, borderWidth: 0.8, borderColor: "#ddd" }}>
          <Text style={{ fontSize: 10, textAlign: "left", fontWeight: "bold", color: "#1C2932", paddingHorizontal: 8, paddingVertical: 5 }}>
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
}

const styles = StyleSheet.create({});
