import {
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import api, { baseURL } from "../api/baseURL";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "../services/user.service";
import { selectUser, setUser } from "../app/userSlice";
export default function LoginScreen({ navigation }) {
  const [passwordShow, setPasswordShow] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUser);


  // get user and save info user to async storage
  const getUser = async () => {
    try {
      const response = await getUserInfo();
      const { EC, EM, DT } = response;
      if (EC === 0 && EM === "Success") {
        const { _id, name, email, phoneNumber, avatar } = DT;
        dispatch(setUser({ _id, name, email, phoneNumber, avatar }));
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (token && refreshToken) {
        await getUser();
        navigation.navigate("Main");
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    try {
      if (username.trim() === "" || password.trim() === "") {
        Alert.alert("Cảnh báo", "Hãy nhập đầy đủ thông tin");
        return;
      }
      const response = await baseURL.post("/auth/login", {
        username,
        password,
      });
      const { EM, EC, DT } = response.data;
      if (EM === "User not verified" && EC === 0) {
        alert("Hãy xác thực email của bạn");
        return;
      }
      if (EM === "Success" && EC === 0 && DT) {
        setPassword("");
        setUsername("");
        const { accessToken, refreshToken } = DT;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await getUser();
        navigation.navigate("Main");
      }
      if (EC == 1 && EM == "User not found") {
        Alert.alert("Cảnh báo", "Tài khoản hoặc mật khẩu không đúng");
        return;
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
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
            alignItems: "center",
            paddingTop: 40,
            // flex: 1,
          }}
        >
          <Image source={require("../assets/poster.png")} style={styles.logo} />
        </View>

        <KeyboardAvoidingView
          keyboardVerticalOffset={60}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.panel}
        >
          <View style={styles.input}>
            <Feather name="phone" size={24} color="black" />
            <TextInput
              value={username}
              onChangeText={setUsername}
              style={{
                flex: 1,

                marginLeft: 8,
              }}
              placeholder="Email hoặc số điện thoại"
            ></TextInput>
          </View>
          <View style={styles.input}>
            <Feather name="lock" size={24} color="black" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={{
                flex: 1,
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
          <Pressable
            onPress={() => navigation.navigate("ForgotPassword")}
            style={{ marginTop: 8, marginLeft: 200 }}
          >
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
        </KeyboardAvoidingView>
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
  logo: {
    width: 300,
    height: 350,
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
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
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
