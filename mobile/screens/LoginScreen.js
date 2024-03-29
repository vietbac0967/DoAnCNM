import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { baseURL } from "../api/baseURL";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken } from "../app/tokenSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LoginScreenV1({ navigation }) {
  const [passwordShow, setPasswordShow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("Main");
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    baseURL.post("/auth/login", { username, password }).then((response) => {
      const data = response.data;
      console.log("data is", data);
      if (data.message === "Login success" && data.token) {
        setPassword("");
        setUsername("");
        dispatch(setToken(data.token));
        AsyncStorage.setItem("token", data.token);
        navigation.navigate("Main");
      } else {
        alert("Username or password incorrect", data.message);
      }
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/background.png")}
      >
        {/* Info view */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 40,
          }}
        >
          <View style={[styles.eclipse, {}]}>
            <Image
              style={styles.avatar}
              source={require("../assets/men.png")}
            ></Image>
          </View>
          <View style={[styles.eclipse, { padding: 10 }]}>
            <Image
              resizeMode="cover"
              style={{ width: "100%", height: 150, borderRadius: "50%" }}
              source={require("../assets/girl.png")}
            ></Image>
          </View>
        </View>
        {/* Avatar two */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingTop: 20,
          }}
        >
          <View style={[styles.eclipse]}>
            <Image
              style={styles.avatar}
              resizeMode="cover"
              source={require("../assets/smartphone.png")}
            ></Image>
          </View>
          <View style={[styles.eclipse, { padding: 10 }]}>
            <Image
              style={{ width: "100%", height: 150, borderRadius: "50%" }}
              resizeMode="cover"
              source={require("../assets/senior.png")}
            ></Image>
          </View>
        </View>

        <View style={styles.panel}>
          <View style={styles.input}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              onChangeText={setUsername}
              style={{
                flex: 1,
                outlineStyle: "none",
                marginLeft: 8,
              }}
              placeholder="Email hoặc số điện thoại"
            ></TextInput>
          </View>
          <View style={styles.input}>
            <Feather name="lock" size={24} color="black" />
            <TextInput
              onChangeText={setPassword}
              style={{
                flex: 1,
                outlineStyle: "none",
                marginLeft: 8,
              }}
              placeholder="Mật khẩu"
              secureTextEntry={passwordShow}
            ></TextInput>
            <Pressable onPress={() => setPasswordShow(!passwordShow)}>
              {passwordShow ? (
                <Ionicons name="eye-off" size={24} color="black" />
              ) : (
                <Ionicons name="eye" size={24} color="black" />
              )}
            </Pressable>
          </View>
          <Pressable style={{ marginTop: 8, marginLeft: 200 }}>
            <Text style={{ fontSize: 15, fontWeight: 400, textAlign: "right" }}>
              Quên mật khẩu ?
            </Text>
          </Pressable>
          {/* Btn DANG NHAP */}
          <Pressable
            onPress={handleLogin}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              gap: 10,
              borderRadius: 81,
              backgroundColor: "#00ACEE",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "600",
                color: "#fff",
              }}
            >
              ĐĂNG NHẬP
            </Text>
          </Pressable>

          <Pressable>
            <Text
              style={{
                marginTop: 20,
                fontSize: 15,
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Bạn chưa có tài khoản ?{" "}
              <Text
                style={{ color: "#00ACEE", fontWeight: "600" }}
                onPress={() => navigation.navigate("Register")}
              >
                Đăng ký
              </Text>
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  eclipse: {
    width: 165,
    height: 162,
    borderRadius: 87,
    backgroundColor: "#00ACEE",
  },
  avatar: {
    borderRadius: "50%",
    width: 167,
    height: 165,
  },
  panel: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  input: {
    flexDirection: "row",
    paddingHorizontal: 13,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00ACEE",
    width: 340,
    marginTop: 40,
    padding: 8,
  },
});
