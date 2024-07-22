import { StyleSheet, Text, View } from "react-native";

export default function RelationButton({title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: 124,
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A30FFA",
    // backgroundColor: "transparent",
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    // height: 24,
    fontSize: 16,
    fontFamily: "Pretendard",
    fontWeight: '600',
    color: "white"
  }
}) 