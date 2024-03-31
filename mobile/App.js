import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import StackNavigation from "./src/routes/StackNavigation";
import BottomTab from "./src/routes/BottomTab";

export default function App() {
  return (
    // <LoginScreenV1 />
    <Provider store={store}>
      {/* <VerifyOTPScreen /> */}
      
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
