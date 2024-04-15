import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import formatDateOrTime from "../utils/formatDateOrTime";

export default function MessageCard({
  message,
  receiverId,
  setModalVisible,
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
          marginVertical: 10,
        
        }}
        key={message._id}
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
          onPress={() => {
            setSelectMessage(message);
            setModalVisible(true);
          }}
          style={[
            !isCurrentUser
              ? {
                  alignSelf: "flex-start",
                  backgroundColor: "white",
                  padding: 8,
                  margin: 10,
                  borderRadius: 7,
                  maxWidth: "60%",
                }
              : {
                  alignSelf: "flex-end",
                  backgroundColor: "#DCF8C6",
                  padding: 8,
                  maxWidth: "60%",
                  borderRadius: 7,
                  margin: 10,
                },
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
  if (message.messageType === "image") {
    return (
      <Pressable
        onPress={() => {
          setSelectMessage(message);
          setModalVisible(true);
        }}
        style={[
          !isCurrentUser
            ? {
                alignSelf: "flex-end",
                padding: 8,
                maxWidth: "60%",
                borderRadius: 7,
                margin: 10,
              }
            : {
                alignSelf: "flex-start",
                padding: 8,
                margin: 10,
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
        />
        <Pressable
          onPress={() => {
            setSelectMessage(message);
            setModalVisible(true);
          }}
          style={{
            width: 70,
            borderRadius: 35,
            backgroundColor: "gray",
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "white",
              paddingVertical: 5,
              paddingHorizontal: 2,
            }}
          >
            {formatDateOrTime(message?.createdAt)}
          </Text>
        </Pressable>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({});
