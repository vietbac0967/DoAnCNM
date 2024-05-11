import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import formatDateOrTime from "../utils/formatDateOrTime";
export default function GroupCard({ item }) {
  const navigation = useNavigation();
  // const socket = useRef(null);
  // useEffect(() => {
  //   socket.current = io(URL_SERVER);
  //   socket.current.emit("join-group", item._id);
  //   return () => {
  //     socket.current.disconnect();
  //   };
  // }, [item._id]);
  // // update group when receive message
  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("group-rename", (data) => {
  //       if (data.groupId === item._id) {
  //         item.name = data.name;
  //       }
  //     });
  //     socket.current.on("group-avatar", (data) => {
  //       if (data.groupId === item._id) {
  //         item.avatar = data.avatar;
  //       }
  //     });
  //   }
  // }, []);
  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: pressed ? "#E5E5E5" : "#F1F1F1" },
        styles.container,
      ]}
      onPress={() => {
        navigation.navigate("ChatGroup", { group: item });
      }}
    >
      <View style={{ marginLeft: 5 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: item?.avatar || item?.author.avatar }}
        ></Image>
      </View>
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item?.name}</Text>
        {item?.messages && item?.messages.length > 0 ? (
          <Text style={styles.text}>
            {item?.messages[item?.messages.length - 1]?.content}
          </Text>
        ) : (
          <Text style={styles.text}>
            Nhóm được tạo bởi {item?.author.name} lúc{" "}
            {formatDateOrTime(item?.createdAt)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 11,
  },
});
