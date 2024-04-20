import React from "react";
import { View, Text, Pressable, Image } from "react-native"; 
import { Ionicons } from "@expo/vector-icons"; 

const FunctionUnavailableScreen = ({ navigation, route }) => {

  const name  = route.params.screenTitle; 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerLeft: () => (
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              style={{ padding: 5 }}
              name="chevron-back"
              size={24}
              color="black"
            />
          </Pressable>
        </View>
      ),
    });
  }, [navigation]); // Add navigation as a dependency
  return (
    <View style={{ height: "80%", justifyContent: "center", alignItems: "center" }}>
        <Image source={require("../assets/warning.gif")} style={{ width: 100, height: 100 }} />
      <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
        Function Unavailable
      </Text>
      <Text style={{ marginTop: 5 }}>
        Sorry, this function is currently unavailable.
      </Text>
    </View>
  );
};

export default FunctionUnavailableScreen;
