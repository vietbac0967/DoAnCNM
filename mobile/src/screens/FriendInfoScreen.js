import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AntDesign, FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { getReceiverService } from "../services/user.service";

export default function FriendInfoScreen({ navigation, route }) {
  const friendId = route.params?.recevierId;
  const [friend, setFriend] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Thông tin bạn bè",
    });
  }, [navigation]);

  const getFriend = async () => {
    try {
      const response = await getReceiverService(friendId);
      setFriend(response);
    } catch (error) {
      console.log("error:::", error);
    }
  };

  useEffect(() => {
    getFriend();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <Image style={styles.background} source={require("../assets/bg.jpg")} />
        <AntDesign name="left" size={24} color="black" style={{ position: "absolute", top: 50, left: 20 }} onPress={() => navigation.goBack()} />
        <View style={styles.headerInfo}>
          <Image style={styles.avatar} source={{ uri: friend?.avatar }} />
          <Text style={styles.name}>{friend?.name}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Thông tin cá nhân</Text>
        <View style={{ flexDirection: "row", borderColor:"#ddd", borderBottomWidth: 0.5 }}>
          <Text style={{fontSize: 12, color: "gray", position: "absolute" }}>Giới tính</Text>
          <Text style={styles.infoText}>{friend?.gender}</Text>
        </View>
        <View style={{ flexDirection: "row", borderColor:"#ddd", borderBottomWidth: 0.5, marginTop: 10 }}>
          <Text style={{fontSize: 12, color: "gray", position: "absolute"}}>Email</Text>
          <Text style={styles.infoText}>{friend?.email}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{fontSize: 12, color: "gray", position: "absolute"}}>Điện thoại</Text>
          <Text style={styles.infoText}>{friend?.phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {},
  background: {
    position: "absolute",
    width: "100%",
    height: 250,
  },
  headerInfo: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 150,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    shadowColor: "#000",
    marginLeft: 20,
    marginTop: 25,
  },
  infoContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  infoTitle: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: "bold",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  infoText: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 120,
  },
});
