import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>

          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              borderRadius: 20,
              backgroundColor: "#fff",
              width: 300,
              padding: 2,
              justifyContent: "flex-start",
            }}
          >
            <Ionicons
              name="search"
              size={24}
              color="#85B6FF"
              style={{ paddingLeft: 10 }}
            />
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Tìm kiếm"
            ></TextInput>
          </View>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
