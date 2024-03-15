import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreenV1 from "./screens/LoginScreen";
import { Provider } from "react-redux";
import { store } from "./app/store";
import StackNavigation from "./routes/StackNavigation";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <LoginScreenV1 />
    <Provider store={store}>
      <StackNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
