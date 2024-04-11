import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function FriendCard({ item, user, setUser }) {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.btn}
      onPress={() => {
        setUser(item.name);
      }}
    >
      <Image
        style={{ width: 50, height: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item.avatar }}
      ></Image>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex:1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#D0D0D0",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
  },
});
