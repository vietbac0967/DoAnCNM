import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { baseURL } from '../api/baseURL';
import { validateEmail } from "../utils/validate";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const handleRequestOTP = async () => {
  try {
    const response = await baseURL.post("/auth/forgotPassword", {email});
    const { EC, EM, DT } = response.data;
    if (EC === 1 && EM === "User not found") {
      Alert.alert("Thông báo", "Không tìm thấy tài khoản");
      return;
    }
    if (EC === 0 && EM === "Success") {
      Alert.alert("Thông báo", "Yêu cầu khôi phục mật khẩu thành công", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("ForgotPasswordOTP", { email })
        },
      ]);
    }
  } catch (error) {
    Alert.alert("Thông báo", "Thất bại", error.message);
    console.log(error);
  }
};          


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập địa chỉ email của bạn"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRequestOTP}
      >
        <Text style={styles.buttonText}>Gửi yêu cầu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Quay lại đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#00ACEE',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginLink: {
    marginTop: 20
  },
  loginText: {
    color: '#00ACEE',
    fontSize: 16
  }
});
