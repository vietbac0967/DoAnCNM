import React from 'react';
import { View, Text, StyleSheet, FlatList ,Image,Pressable,TextInput} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
const FriendListScreen = () => {

//   const friends = [
//     { id: '1', name: 'John' },
//     { id: '2', name: 'Alice' },
//     { id: '3', name: 'Bob' },
//     { id: '4', name: 'Emily' },
//     { id: '5', name: 'Michael' },
//     { id: '6', name: 'Sarah' },
//   ]; 

  
//   const renderItem = ({ item }) => (
//     <View style={styles.friendItem}>
//       <Text>{item.name}</Text>
//     </View>
//   );

  return (
    <View style={styles.container} >
      {/* Search bar */}
      <View style={styles.search} >
        <Ionicons
          style={{ paddingTop: 8 }}
          name="search"
          size={24}
          color="#85B6FF"
        />
        <TextInput
          placeholder="Tìm kiếm"
          placeholderTextColor={"#B1B1B1"}
          style={{ 
            flex:1, 
            outlineStyle: "none" }}
        ></TextInput>
        <Pressable>
          <Ionicons
            style={{ paddingTop: 5 }}
            name="person-add-outline"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}> 
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <Feather name="list" size={18} color="black" />
    <Text >Danh sách bạn bè</Text>
    </View>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <MaterialCommunityIcons name="email-newsletter" size={18} color="black" />
    <Text >Lời mời kết bạn</Text>
    </View>
    </View>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
    <Image
          source={{ uri: "https://www.w3schools.com/w3images/avatar6.png" }}
          style={{ width: 50, height: 50, borderRadius: "50%", marginTop: 5 }}
        ></Image>
        <Text>get cái name nó vô đây nè hỏng biết get</Text>
        <Zocial name="call" size={24} color="black" />
        <MaterialIcons name="video-call" size={30} color="black" />
    </View>




{/* 
      <FlatList
        data={friends}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />  */}
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f1f1f1",
    },
    search: {
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

export default FriendListScreen;
