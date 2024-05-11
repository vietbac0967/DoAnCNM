import React from "react";
import { Pressable, Text, View, Image } from "react-native";

const ChatMessageItem = ({
  item,
  receiver,
  recevierId,
  setSelectMessage,
  setModalVisible,
}) => {
  if (item.messageType === "text") {
    return (
      <Pressable
        onPress={() => {
          setSelectMessage(item);
          setModalVisible(true);
        }}
        style={[
          item.senderId?._id === receiver?._id
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
        <Text style={{ fontSize: 13, textAlign: "left" }}>{item.content}</Text>
        <Text
          style={{
            textAlign: "right",
            fontSize: 9,
            color: "gray",
            marginTop: 5,
          }}
        >
          {formatDateOrTime(item?.createdAt)}
        </Text>
      </Pressable>
    );
  }
  if (item.messageType === "image") {
    return (
      <Pressable
        onPress={() => {
          setSelectMessage(item);
          setModalVisible(true);
        }}
        style={[
          item?.senderId?._id !== recevierId
            ? {
                alignSelf: "flex-end",
                // backgroundColor: "#DCF8C6",
                padding: 8,
                maxWidth: "60%",
                borderRadius: 7,
                margin: 10,
              }
            : {
                alignSelf: "flex-start",
                // backgroundColor: "white",
                padding: 8,
                margin: 10,
                borderRadius: 7,
                maxWidth: "60%",
              },
        ]}
      >
        <View>
          <Image
            source={{ uri: item.content }}
            resizeMode="cover"
            style={{
              width: 200,
              height: 200,
              borderRadius: 7,
              alignItems: "flex-end",
            }}
          />
          <Pressable
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
              {formatDateOrTime(item?.createdAt)}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    );
  }
};

export default ChatMessageItem;
