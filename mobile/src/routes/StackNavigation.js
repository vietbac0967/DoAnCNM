import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import BottomTab from "./BottomTab";
import VerifyOTPScreen from "../screens/VerifyOTPScreen";
import AddFriendScreen from "../screens/AddFriendScreen";
import ChatScreen from "../screens/ChatScreen";
import FriendRequestScreen from "../screens/FriendRequestScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ForgotPasswordOTPScreen from "../screens/ForgotPasswordOTPScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import ChatGroupScreen from "../screens/ChatGroupScreen";
import UserInfoScreen from "../screens/UserInfoScreen";
import UpdateUserInfoScreen from "../screens/UpdateUserInfoScreen";
const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Main"
          component={BottomTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          // options={{ headerShown: false }}
          options={{ headerStyle: { backgroundColor: "#F279A6" }}}
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTPScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="AddFriend"
          component={AddFriendScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="FriendRequest"
          component={FriendRequestScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ForgotPasswordOTP"
          component={ForgotPasswordOTPScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="CreateGroup"
          component={CreateGroupScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ChatGroupScreen"
          component={ChatGroupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserInfo"
          component={UserInfoScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="UpdateUserInfo"
          component={UpdateUserInfoScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
