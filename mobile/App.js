import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import StackNavigation from "./src/routes/StackNavigation";

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
