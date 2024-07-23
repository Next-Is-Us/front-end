import { StyleSheet, View, Text } from "react-native";

export default function InformConditionText({ name }) {
  return (
    <View style={styles.selectConditionTextContainer}>
      <Text style={styles.informText}>
        <Text style={styles.nameText}>{name}</Text>님의
      </Text>
      <Text style={styles.informText}>오늘의 상태를 알려주세요!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  selectConditionTextContainer: {
    marginTop: 24,
  },
  nameText: {
    color: "black",
    fontFamily: "Prentendard",
    fontSize: 20,
    fontWeight: "600",
  },
  informText: {
    color: "black",
    fontFamily: "Prentendard",
    fontSize: 20,
    fontWeight: "400",
  },
});
