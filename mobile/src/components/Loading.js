import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import React from "react";

export default function Loading({ content }) {
  return (
    <SafeAreaView style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#000fff"></ActivityIndicator>
      <Text>Đang tải {content} ...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});
