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
          style={[
            !isCurrentUser
              ? {
                  alignSelf: "flex-start",
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  // margin: 10,
                  borderRadius: 7,
                  maxWidth: "60%",
                }
              : {
                  alignSelf: "flex-end",
                  backgroundColor: "#DCF8C6",
                  paddingHorizontal: 8,
                  paddingVertical: 5,
                  maxWidth: "60%",
                  borderRadius: 7,
                  marginRight: 10,
                },
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
          <View style={{ backgroundColor: "#fff", alignSelf: "flex-start", borderRadius: 15, marginBottom: 5 }}>
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
