import { Alert, FlatList, View, TextInput } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MessageCard from "../components/MessageCard";
import {
  getAllMessagesService,
  getMessagesGroupService,
} from "../services/message.service";
import { Ionicons } from "@expo/vector-icons";
import MessageGroupCard from "../components/MessageGroupCard";
import { useSelector } from "react-redux";
import { selectUser } from "../app/userSlice";
export default function SearchMessageScreen({ navigation, route }) {
  const recevierId = route.params?.recevierId;
  const groupId = route.params?.groupId;
  const [messages, setMessages] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const user = useSelector(selectUser);
  const getMessages = async () => {
    try {
      if (recevierId) {
        const response = await getAllMessagesService(recevierId);
        const { EM, EC, DT } = response;
        if (EC !== 0) {
          Alert.alert(EM);
          return;
        }
        setMessages(DT);
      }
      if (groupId) {
        const response = await getMessagesGroupService(groupId);
        const { EM, EC, DT } = response;
        if (EC !== 0) {
          Alert.alert(EM);
          return;
        }
        setMessages(DT);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View style={{ marginLeft: 15 }}>
            <TextInput
              placeholder="Nhập tin nhắn văn bản"
              onChangeText={setTextSearch}
            ></TextInput>
          </View>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={messages.filter((message) =>
          message.content.toLowerCase().includes(textSearch.toLowerCase())
        )}
        renderItem={({ item }) => {
          if (groupId) {
            return <MessageGroupCard userId={user._id} message={item} />;
          } else {
            return <MessageCard message={item} receiverId={recevierId} />;
          }
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
