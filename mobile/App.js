import { Provider } from "react-redux";
import { store } from "./src/app/store";
import StackNavigation from "./src/routes/StackNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
export default function App() {
  return (
    // <LoginScreenV1 />
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <StackNavigation />
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
// import React, { useCallback, useMemo, useRef } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import {
//   BottomSheetModal,
//   BottomSheetView,
//   BottomSheetModalProvider,
// } from "@gorhom/bottom-sheet";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function App() {
//   // ref
//   const bottomSheetModalRef = useRef(null);

//   // variables
//   const snapPoints = useMemo(() => ["25%", "50%"], []);

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleSheetChanges = useCallback((index) => {
//     console.log("handleSheetChanges", index);
//   }, []);

//   // renders
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <BottomSheetModalProvider>
//         <View style={styles.container}>
//           <Button
//             onPress={handlePresentModalPress}
//             title="Present Modal"
//             color="black"
//           />
//           <BottomSheetModal
//             ref={bottomSheetModalRef}
//             index={1}
//             snapPoints={snapPoints}
//             onChange={handleSheetChanges}
//           >
//             <BottomSheetView style={styles.contentContainer}>
//               <Text>Awesome 🎉</Text>
//             </BottomSheetView>
//           </BottomSheetModal>
//         </View>
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: "center",
//     backgroundColor: "grey",
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
// });
