import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getGroupsService } from "../services/group.service";
import GroupCard from "../components/GroupCard";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
export default function GroupScreen({ navigation, route }) {
  const token = useSelector((state) => state.token.token);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(route.params?.isLoading || false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    getGroups();
  }, []);
  const getGroups = async () => {
    try {
      const response = await getGroupsService(token);
      const { EC, EM, DT } = response;
      if (EC === 0) {
        setGroups(DT);
      } else {
        Alert.alert("Cảnh báo", EM);
      }
    } catch (error) {
      Alert.alert("Cảnh báo", "Có một sự cố sảy ra");
    }
  };

  // useEffect(() => {
  //   getGroups();
  // }, []);

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
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text style={styles.title}>Nhóm</Text>

        <Pressable
          onPress={() => {
            navigation.navigate("CreateGroup");
          }}
        >
          <AntDesign name="addusergroup" size={30} color="black" />
        </Pressable>
      </View>
      <Text style={{ fontSize: 13, fontWeight: "bold", marginBottom: 10 }}>
        Nhóm đã tham gia {groups.length}
      </Text>
      {/* <View>
        <Pressable style={styles.contactButton} 
        onPress={() => navigation.navigate("ChatScreen",{recevierId: item._id} )}>
            <Feather name="message-square" size={20} color="grey" />
          </Pressable>
          </View> */}
      <FlatList
        data={groups}
        renderItem={({ item }) => <GroupCard item={item} />}
        keyExtractor={(item) => item._id}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    // marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  memberContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  memberInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
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
