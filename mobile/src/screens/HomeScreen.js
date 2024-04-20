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
import { handleCusttomClientSocket } from "../utils/socket";
import { selectUser } from "../app/userSlice";
export default function HomeScreen({ navigation, route }) {
  const token = useSelector((state) => state.token.token);
  const [conversations, setConversations] = useState([]);
  const user = useSelector(selectUser);
  const isFocused = useIsFocused();
  console.log("user in home screen is:::", user);

  const getConversations = async () => {
    try {
      const conversations = await getConversationsService(token);
      const { EM, EC, DT } = conversations;
      if (EC === 0 && EM === "Success") {
        setConversations(DT);
      } else {
        Alert.alert("Error", EM);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    // socket.current = io(URL_SERVER);
    if (user) {
      console.log("phone number:::", user.phoneNumber);
      handleCusttomClientSocket({ customId: user.phoneNumber });
    }
  }, [user]);

  useEffect(() => {
    if (isFocused) {
      getConversations();
    }
    //   // getListFriend();
    //   // getListFriend();
  }, [isFocused]);

  console.log("conversations:::", conversations.length);
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
            style={{ paddingTop: 5 }}
            name="person-add-outline"
            size={24}
            color="#fff"
          />
        </Pressable>
      ),
    });
  }, []);
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
