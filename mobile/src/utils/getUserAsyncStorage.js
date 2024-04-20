import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
  return await AsyncStorage.getItem("user");
};
