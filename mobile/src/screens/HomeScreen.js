import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import ConversationCard from "../components/ConversationCard";
import { getConversationsService } from "../services/conversation.service";
import {
  handleCusttomClientSocket,
  handleInConversation,
  handleLeaveConversationInGroup,
  handleOutConversation,
} from "../utils/socket";
import { selectUser } from "../app/userSlice";
import Loading from "../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function HomeScreen({ navigation, route }) {
  const [conversations, setConversations] = useState([]);
  const user = useSelector(selectUser);
  console.log("user home screen is", user);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const getConversations = async () => {
    try {
      const conversations = await getConversationsService();
      const { EM, EC, DT } = conversations;
      if (EC === 0 && EM === "Success") {
        setConversations(DT);
        setIsLoading(false);
      } else {
        await AsyncStorage.removeItem("accessTokne");
        await AsyncStorage.removeItem("refreshToken");
      }
    } catch (error) {
      if (error.message === "Refresh token error") {
        navigation.navigate("Login");
      }
      Alert.alert("Error", error.message);
    }
  };
  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    if (user) {
      handleCusttomClientSocket({ customId: user.phoneNumber });
    }
  }, [user]);

  useEffect(() => {
    if (isFocused) {
      getConversations();
      handleOutConversation({
        phone: user.phoneNumber,
      });
    }
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <Ionicons
            style={{ paddingTop: 8 }}
            name="search"
            size={24}
            color="#fff"
          />
          <Pressable
            onPress={() => navigation.navigate("Search")}
            style={{ width: 200 }}
          >
            <Text
              style={{
                paddingTop: 10,
                paddingLeft: 20,
                fontSize: 12,
                color: "#fff",
              }}
            >
              Tìm kiếm
            </Text>
          </Pressable>
        </View>
      ),
      headerRight: () => (
        <Pressable
          style={{ marginRight: 20 }}
          onPress={() => navigation.navigate("AddFriend")}
        >
          <Ionicons
            style={{ paddingTop: 8 }}
            name="person-add-outline"
            size={24}
            color="#fff"
          />
        </Pressable>
      ),
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={({ item }) => (
          <ConversationCard item={item} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* {friends.map((friend) => (
        <UserChat key={friend._id} navigation={navigation} item={friend} />
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  search: {
    marginTop: 25,
    height: 40,
    flexDirection: "row",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "white",
    justifyContent: "space-around",
  },
});
