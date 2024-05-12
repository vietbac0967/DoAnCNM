import { Pressable, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign, FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { getReceiverService } from "../services/user.service";

export default function SettingScreen({ navigation, route }) {
  const receiverId = route.params?.receiverId;
  const [receiver, setReceiver] = useState({});
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Tùy chọn",
      headerTintColor: "#fff",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="chevron-back-outline"
            size={24}
            color="#fff"
          />
         
        </View>
      ),});
      
  }, []);

  const getReceiver = async () => {
    try {
      const response = await getReceiverService(receiverId);
      setReceiver(response);
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    getReceiver();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: receiver?.avatar }}
          defaultSource={require("../assets/avt.jpg")}
        />
        <Text style={styles.name}>{receiver?.name}</Text>
      </View>
      <View style={styles.navbar}>
        <OptionButton
          icon={<Ionicons name="search-outline" size={24} color="black" />}
          text="Tìm tin nhắn"
          onPress={() =>
            navigation.navigate("SearchMessage", {
              receiverId,
            })
          }
        />
        <OptionButton
          icon={<Ionicons name="person-outline" size={24} color="black" />}
          text="Trang cá nhân"
          onPress={() =>
            navigation.navigate("FriendInfo", {
              receiverId,
            })
          }
        />
        <OptionButton
          icon={<Ionicons name="color-palette-outline" size={24} color="black" />}
          text="Đổi hình nền"
          
        />
        <OptionButton
          icon={<Ionicons name="notifications-outline" size={24} color="black" />}
          text="Tắt thông báo"
          
        />
      </View>
    </View>
  );
}

function OptionButton({ icon, text, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.option}>
      <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "#ddd", justifyContent: "center", alignItems: "center" }}>
        {icon}
      </View>
      <Text style={styles.optionText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  option: {
    alignItems: "center",
  },
  optionText: {
    width: 80,
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
  },
});
