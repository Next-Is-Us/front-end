import { StyleSheet, Text, View } from "react-native";

export default function RelationButton({relation}) {
  const backgroundColor = relation === "엄마" ? "#A30FFA" : relation === "자녀" ? "#39C3B6" : "#A30FFA";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>{relation}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: 124,
    // height: 48,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "transparent",
    borderRadius: 5.7,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 8 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 4,
  },
  title: {
    // height: 24,
    fontSize: 12,
    fontFamily: "Pretendard",
    fontWeight: '600',
    color: "white"
  }
}) 