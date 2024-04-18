// Import useState từ react
import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { getFriends } from "../services/user.service"; // Make sure to import your service
import { getGroupsService } from "../services/group.service";

export default function SearchScreen({ navigation, route }) {
  const [search, setSearch] = useState("");
  const token = useSelector((state) => state.token.token);
  const isLoading = route.params?.isLoading;
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // State mới để lưu trữ kết quả tìm kiếm

  const getListFriend = async () => {
    try {
      const friends = await getFriends(token);
      setFriends(friends); // Ban đầu, kết quả tìm kiếm là toàn bộ danh sách bạn bè
    } catch (error) {
      console.log("error:::", error);
    }
  };

  const getListGroups = async () => {
    try {
      const response = await getGroupsService(token);
      const { EC, EM, DT } = response;
      if (EC === 0) {
        setGroups(DT);
      }
    } catch (error) {
      console.log("error:::", error);
    }
  };
  useEffect(() => {
    handleSearch(search);
  }, [search]);
  useEffect(() => {
    getListFriend();
  }, [isLoading]);
  useEffect(() => {
    getListGroups();
  }, [isLoading]);

  // Hàm thực hiện tìm kiếm
  const handleSearch = (text) => {
    setSearch(text); // Cập nhật state của ô tìm kiếm

    // Tìm kiếm trong danh sách bạn bè
    const filtered = [...friends, ...groups].filter((temp) =>
      temp.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(filtered); // Cập nhật danh sách kết quả tìm kiếm
  };

  const renderFriendItem = ({ item }) =>
    item.author === undefined ? (
      <Pressable
        style={{ paddingHorizontal: 10 }}
        onPress={() =>
          navigation.navigate("ChatScreen", {
            recevierId: item._id,
          })
        }
      >
        <View style={styles.friendItem}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.friendInfo}>
            <Text>{item.name}</Text>
            <View style={styles.contactButtons}>
              <Pressable style={styles.contactButton}>
                <Ionicons name="call" size={20} color="grey" />
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    ) : (
      <Pressable
        style={{ paddingHorizontal: 10 }}
        onPress={() =>
          navigation.navigate("ChatGroup", {
            group: item,
          })
        }
      >
        <View style={styles.friendItem}>
          <Image source={{ uri: item?.avatar || item?.author.avatar }} style={styles.avatar}/>
          <View style={styles.friendInfo}>
            <Text>{item.name}</Text>
          </View>
        </View>
      </Pressable>
    );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Pressable>

          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
              borderRadius: 20,
              backgroundColor: "#fff",
              width: 280,
              padding: 2,
              justifyContent: "flex-start",
            }}
          >
            <Ionicons
              name="search"
              size={24}
              color="#85B6FF"
              style={{ paddingLeft: 10 }}
            />
            <TextInput
              style={{ paddingLeft: 10 }}
              placeholder="Tìm kiếm"
              value={search}
              onChangeText={handleSearch} // Gắn hàm tìm kiếm vào onChangeText của TextInput
              autoFocus={true}
            />
          </View>
        </View>
      ),
    });
  }, [navigation, search]);

  return (
    <View style={styles.container}>
      <FlatList
        data={searchResults} // Sử dụng danh sách kết quả tìm kiếm thay vì danh sách bạn bè
        renderItem={renderFriendItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
  },
  contactButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
});
