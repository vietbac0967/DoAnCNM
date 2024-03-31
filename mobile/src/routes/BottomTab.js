import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GroupScreen from "../screens/GroupScreen";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }}
    >
      <Tab.Screen
        name="Message"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Tin nhắn",

          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="message1" size={24} color="#00ACED" />
            ) : (
              <AntDesign name="message1" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Liên hệ",

          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="contacts" size={24} color="#00ACED" />
            ) : (
              <AntDesign name="contacts" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={GroupScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Nhóm",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account-group-outline"
                size={24}
                color="#00ACED"
              />
            ) : (
              <MaterialCommunityIcons
                name="account-group-outline"
                size={24}
                color="black"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Cá nhân",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SimpleLineIcons name="user" size={24} color="#00ACED" />
            ) : (
              <SimpleLineIcons name="user" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
