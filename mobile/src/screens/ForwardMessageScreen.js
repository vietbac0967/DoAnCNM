import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getConversationForward,
  getConversationsService,
} from "../services/converstation.service";
import ForwardMessageCard from "../components/ForwardMessageCard";
export default function ForwardMessageScreen({ navigation, route }) {
  const token = useSelector((state) => state.token.token);
  const [isLoading, setIsLoading] = useState(true);
  const messageId = route.params?.messageId;
  const [conversation, setConversation] = useState([]);
  const getConversation = async () => {
    try {
      const response = await getConversationForward(token, messageId);
      const { DT, EM, EC } = response;
      if (EC === 0 && EM === "Success") {
        setConversation(DT);
      } else {
        Alert.alert("Something went wrong", EM);
      }
    } catch (error) {
      Alert.alert("Error", "Error getting conversation", [{ text: "OK" }]);
    }
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Chia sẻ",
    });
    getConversation();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={conversation}
        renderItem={({ item }) => (
          <ForwardMessageCard item={item} messageId={messageId} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
