import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function GroupCard({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate("ChatGroup", { group : item });
      }}
    >
      <View style={{}}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: item.author.avatar }}
        ></Image>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item?.name}</Text>
        {item?.messages.length > 0 ? (
          <Text style={styles.text}>
            {item?.messages[item?.messages.length - 1]?.content}
          </Text>
        ) : (
          <Text style={styles.text}>
            Nhóm được tạo bởi {item?.author.name} lúc {item?.createdAt}
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
    marginBottom: 6,
  },
  text: {
    fontSize: 11,
  },
});
