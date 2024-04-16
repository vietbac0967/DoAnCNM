import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GroupScreen from "../screens/GroupScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function BottomTab({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          // position: "absolute",
          // bottom: 0,
          // left: 0,
          // right: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
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
          tabBarLabel: "Tin nhắn",
          headerStyle: {
            backgroundColor: "#00ACED",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="message-processing"
                size={24}
                color="#00ACED"
              />
            ) : (
              <MaterialCommunityIcons
                name="message-processing-outline"
                size={24}
                color="gray"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          // headerShown: false,
          tabBarLabel: "Liên hệ",
          headerStyle: {
            backgroundColor: "#00ACED",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="contacts"
                size={24}
                color="#00ACED"
              />
            ) : (
              <MaterialCommunityIcons
                name="contacts-outline"
                size={24}
                color="gray"
              />
            ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={GroupScreen}
        options={{
          // headerShown: false,
          tabBarLabel: "Nhóm",
          headerStyle: {
            backgroundColor: "#00ACED",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color="#00ACED"
              />
            ) : (
              <MaterialCommunityIcons
                name="account-group-outline"
                size={24}
                color="gray"
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
            <MaterialCommunityIcons
              name="account-circle"
              size={24}
              color="#00ACED"
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color="gray"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
