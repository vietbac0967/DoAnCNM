import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { validatePhoneNumber } from "../utils/validate";
import { baseURL } from "../api/baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { searchUser, sendFriendRequest } from "../services/user.service";
import { useSelector } from "react-redux";
export default function AddFriendScreen({ navigation }) {
  const token = useSelector((state) => state.token.token);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Thêm bạn bè",
    });
  }, []);
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState({});
  const [status, setStatus] = useState(false);
  const handleSearchUser = async () => {
    if (phone.trim() === "" || !validatePhoneNumber(phone)) {
      Alert.alert(
        "Thông báo",
        "Số điện thoại không hợp lệ. \nVui lòng kiểm tra lại.",
        [{ text: "OK" }]
      );
      return;
    }
    const res = await searchUser(token, phone);
    if (res.EC === 1 && res.EM === "User not found") {
      Alert.alert("Thông báo", "Người dùng không tồn tại", [{ text: "OK" }]);
      return;
    }
    if (res.EC === 1 && res.EM === "User is already your friend") {
      setStatus(true);
    }
    setPhone("");
    setUser(res.DT);
  };
  console.log(user);
  const handleSendRequest = async () => {
    try {
      const res = await baseURL.post(
        "/user/sendFriendRequest",
        { receiver: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { EC, EM, DT } = res.data;
      if (EC === 0 && EM === "Success") {
        Alert.alert("Thông báo", "Gửi lời mời thành công", [{ text: "OK" }]);
        navigation.navigate("Message", {
          isLoading: true,
        });
        return;
      }
    } catch (error) {
      Alert.alert("Thông báo", error, [{ text: "OK" }]);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Nhập số điện thoại"
          style={{
            borderWidth: 1,
            borderColor: "#1d1d1d",
            borderRadius: 5,
            padding: 8,
            width: "80%",
          }}
        ></TextInput>
        <Pressable
          onPress={handleSearchUser}
          style={{
            width: 50,
            backgroundColor: "#74B4E0",
            borderRadius: 50 / 2,
            marginLeft: 10,
          }}
        >
          <AntDesign
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
            name="arrowright"
            size={24}
            color="white"
          />
        </Pressable>
      </View>
      {user.name ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderRadius: 8,
            width: "80%",
            marginTop: 20,
            borderWidth: 1,
          }}
        >
          <Image
            source={{ uri: user.avatar }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50 / 2,
              marginTop: 15,
            }}
          />
          <View style={{ paddingTop: 30 }}>
            <Text>{user.name}</Text>
            <Text>{user.phone}</Text>
          </View>
          {status ? (
            <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate("ChatScreen", { recevierId: user._id });
              }}
            >
              <LinearGradient
                // Button Linear Gradient
                colors={["#00ff87", "#60efff"]}
                style={styles.button}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  NHẮN TIN
                </Text>
              </LinearGradient>
            </Pressable>
          ) : (
            <Pressable style={styles.button} onPress={handleSendRequest}>
              <LinearGradient
                // Button Linear Gradient
                colors={["#25aae1", "#4481eb", "#04befe", "#3f86ed"]}
                style={styles.button}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "600",
                    color: "#fff",
                  }}
                >
                  KẾT BẠN
                </Text>
              </LinearGradient>
            </Pressable>
          )}
        </View>
      ) : (
        ""
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#4184ea",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.75,
    shadowRadius: 15,
  },
});
