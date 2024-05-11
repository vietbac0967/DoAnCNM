import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign, FontAwesome, Feather } from "@expo/vector-icons";
import { getReceiverService } from "../services/user.service";
export default function SettingScreen({ navigation, route }) {
  const recevierId = route.params?.receiverId;
  const [recevier, setReceiver] = useState({});
  console.log("receiverId:::", recevierId);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Tùy chọn",
    });
  }, [navigation]);
  const getReceiver = async () => {
    try {
      const response = await getReceiverService(recevierId);
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
          width={50 * 2}
          height={50 * 2}
          borderRadius={25 * 2}
          resizeMode="contain"
          source={{ uri: recevier?.avatar }}
        ></Image>
        <Text style={styles.name}>{recevier?.name}</Text>
      </View>
      <View style={styles.navbar}>
        <Pressable
          onPress={() =>
            navigation.navigate("SearchMessage", {
              recevierId,
            })
          }
        >
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
          <Text style={styles.text}>Tìm {"\n"} tin nhắn</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("SearchMessage", {
              recevierId,
            })
          }
        >
          <FontAwesome
            name="user-o"
            size={24}
            color="black"
            style={{ marginLeft: 13 }}
          />
          <Text style={styles.text}>Trang {"\n"} cá nhân</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("SearchMessage", {
              recevierId,
            })
          }
        >
          <Feather
            name="edit"
            size={24}
            color="black"
            style={{ marginLeft: 13 }}
          />
          <Text style={styles.text}>Đổi {"\n"} hình nền</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("SearchMessage", {
              recevierId,
            })
          }
        >
          <FontAwesome
            name="bell-o"
            size={24}
            color="black"
            style={{ marginLeft: 13 }}
          />
          <Text style={styles.text}>Tắt thông {"\n"}báo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    flexDirection: "row",
    marginTop: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop:10,
  },
  text: {
    textAlign: "center",
    fontSize: 13,
  },
});
