import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Pressable } from "react-native";

export default function BottomButton({text, selected}) {
  const backgroundColor = selected ? "#A30FFA" : "rgba(163, 15, 250, 0.15)";

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.buttonBoxContainer}>
        <Pressable style={[styles.buttonBox, {backgroundColor}]}>
          <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 12,
    // backgroundColor: "yellow"
  },
  buttonBoxContainer: {
    paddingHorizontal: 20
  },
  buttonBox: {
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: "600"
  }
})