import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import { useEffect, useState } from "react";
  import { baseURL } from "../api/baseURL";
  import { OtpInput } from "react-native-otp-entry";
  const ForgotPasswordOTPScreen = ({ route, navigation }) => {
    const { email } = route.params;
    const [otp, setOtp] = useState("");
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(59);
  
    useEffect(() => {
      const interval = setInterval(() => {
        //  Decrease second by 1
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(interval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(interval); // Clear interval
    }, [seconds]);
  
    const resendOTP = async () => {
      try {
        const { EC, EM, DT } = await baseURL.post("/auth/reSendEmail", { email });
        setMinutes(1);
        setSeconds(59);
        if (EC === 0 && EM === "Success") {
          alert("Gửi lại mã OTP thành công");
        } else {
          alert("Gửi lại mã OTP thất bại");
        }
      } catch (error) {
        alert("Resend OTP failed with Error", error.message);
        console.log(error);
      }
    };
    const handleSubmit = async () => {
      try {
        const response = await baseURL.post("/auth/forgotPasswordOTP", { email, otp });
        const { EC, EM, DT } = response.data;
        console.log("data is::::", response.data);
        if (EC === 0 && EM === "Success") {
          alert("Xác thực thành công");
          navigation.navigate("ResetPassword", { email });
        }
        if (EC === 1 && EM === "OTP expired") {
          alert("Mã OTP đã hết hạn");
        }
        if (EC === 1 && EM === "Invalid OTP") {
          alert("Mã OTP không chính xác");
        }
      } catch (error) {
        alert("Xác thực thất bại", error.message);
        console.log(error);
      }
    };
    return (
      <View style={{ flex: 1, backgroundColor: "#f1f1f1" }}>
        <KeyboardAvoidingView
          style={{ height: "100%", width: "100%", backgroundColor: "white" }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>Surprise Message</Text>
            <Text style={{ fontSize: 36, fontWeight: "600", color: "#111" }}>
              Xác nhận mã OTP để khôi phục mật khẩu
            </Text>
  
            <Text style={{ fontSize: 20, color: "#111" }}>
              Nhập 6 số đã được gửi qua email
            </Text>
            <Text style={{ fontSize: 25, marginVertical: 20 }}>{email}</Text>
          </View>
  
          <View style={{ paddingHorizontal: 15 }}>
            <OtpInput
              numberOfDigits={6}
              focusColor="green"
              focusStickBlinkingDuration={500}
              onTextChange={(text) => setOtp(text)}
            />
            {/* Verify OTP for user */}
            <Pressable
              onPress={handleSubmit}
              style={{
                borderRadius: 81,
                paddingHorizontal: 80,
                backgroundColor: "#00ACEE",
                marginTop: 20,
                paddingVertical: 16,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 26,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Xác nhận
              </Text>
            </Pressable>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 10,
              }}
            >
              <Text style={{ fontSize: 18 }}>
                OTP hết hạn sau{" "}
                <Text
                  style={{ color: seconds > 0 ? "rgba(73, 96, 251,1)" : "red" }}
                >
                  {minutes < 10 ? `0${minutes}` : minutes}:{""}
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>{" "}
                giây
              </Text>
              <Pressable
                disabled={seconds > 0 || minutes > 0}
                onPress={resendOTP}
              >
                <Text
                  style={{
                    color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                    fontSize: 18,
                  }}
                >
                  Gửi lại mã OTP
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  };
  
  export default ForgotPasswordOTPScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    text: {
      fontSize: 36,
      marginVertical: 45,
      color: "#111",
    },
    borderStyleBase: {
      width: 30,
      height: 45,
    },
  });
  