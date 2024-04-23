import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { baseURL } from "../api/baseURL";
import { RadioButton } from "react-native-paper";
import { getUserInfo } from "../services/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdateUserInfoScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    email: "",
    createdAt: "",
  });
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    email: "",
  });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await getUserInfo();
        const { DT, EM, EC } = response;
        if (EC === 0 && EM === "Success") {
          setUserInfo(DT);
          setUpdatedUserInfo(DT);
        } else {
          console.log("Error getting user:", EM);
        }
      } catch (error) {
        console.log("Error getting user:", error);
      }
    };
    getUser();
  }, []);

  const handleInputChange = (field, value) => {
    setIsChanged(true);
    setUpdatedUserInfo({ ...updatedUserInfo, [field]: value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      const response = await baseURL.post("/update", updatedUserInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { EC, EM, DT } = response.data;
      if (EC === 0 && EM === "Success") {
        setUserInfo(DT);
        alert("Cập nhật thông tin thành công!");
        navigation.goBack();
      } else {
        console.log("Error updating user info:", EM);
      }

      console.log("Updated user info:", updatedUserInfo);
      setIsChanged(false);
    } catch (error) {
      console.log("Error updating user info:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </Pressable>
        <Text style={styles.title}>Cập nhật thông tin tài khoản</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Tên:</Text>
          <TextInput
            style={styles.input}
            value={updatedUserInfo.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Giới tính:</Text>
          <RadioButton.Group
            onValueChange={(value) => handleInputChange("gender", value)}
            value={updatedUserInfo.gender}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.radioButtonContainer}>
                <Text style={styles.radioButtonLabel}>Nam</Text>
                <RadioButton value="Nam" />
              </View>
              <View style={styles.radioButtonContainer}>
                <Text style={styles.radioButtonLabel}>Nữ</Text>
                <RadioButton value="Nữ" />
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Điện thoại:</Text>
          <TextInput
            style={styles.input}
            value={updatedUserInfo.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
          />
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={updatedUserInfo.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Ngày tham gia:</Text>
          <Text>{userInfo.createdAt}</Text>
        </View>
      </View>
      <Pressable
        style={[
          styles.saveButton,
          isChanged ? {} : { backgroundColor: "gray" },
        ]}
        onPress={handleSaveChanges}
        disabled={!isChanged}
      >
        <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
  },
  userInfoContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: "#33CCFF",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioButtonLabel: {
    marginRight: 10,
  },
});

export default UpdateUserInfoScreen;
